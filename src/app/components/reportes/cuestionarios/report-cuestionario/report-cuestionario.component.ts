import { Component, Injectable, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FlatTreeControl } from "@angular/cdk/tree";
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import { MatSnackBar, MatTable, MatTableDataSource, MatDialog } from '@angular/material';
import { CuestionarioGenericoService } from 'src/app/services/cuestionario-generico.service';
import { CabeceraVersionCuestionarioService } from 'src/app/services/cabecera-version-cuestionario.service';
import { LugaresService } from 'src/app/services/lugares.service';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from "@angular/material/tree";
import { BehaviorSubject, Observable } from "rxjs";


const LOAD_MORE = "LOAD_MORE";

export class LoadmoreNode {
  childrenChange = new BehaviorSubject<LoadmoreNode[]>([]);

  get children(): LoadmoreNode[] {
    return this.childrenChange.value;
  }

  constructor(
    public item: string,
    public hasChildren = false,
    public loadMoreParentItem: string | null = null
  ) {}
}

export class LoadmoreFlatNode {
  constructor(
    public item: string,
    public level = 1,
    public expandable = false,
    public loadMoreParentItem: string | null = null
  ) {}
}

@Injectable()
export class LoadmoreDatabase {
  batchNumber = 100;
  dataChange = new BehaviorSubject<LoadmoreNode[]>([]);
  nodeMap = new Map<string, LoadmoreNode>();

  rootLevelNodes: string[] = [];
  dataMap = new Map<string, string[]>();

  recibirData(preguntas) {
  
    this.rootLevelNodes = [];
  
    this.dataMap.set('', []);
    this.dataChange.next([])
    preguntas.listaPreguntas.map((pregunta) => {
      
      var preguntas = [];
      var respuestas = [];
  
      var nombres = pregunta.Descripcion;
      

      pregunta.ListaRespuestas.map((respuesta) => {
        respuestas.push(respuesta.DescripcionRespuestaAbierta);
        preguntas=[];

      });

      this.dataMap.set(nombres, respuestas);
      this.rootLevelNodes.push(nombres);
      
    });
    const data = this.rootLevelNodes.map((name) => this._generateNode(name));


    this.dataChange.next(data);
   
  }
  

  loadMore(item: string, onlyFirstTime = false) {
    
    if (!this.nodeMap.has(item) || !this.dataMap.has(item)) {
      return;
    }
    const parent = this.nodeMap.get(item)!;
    const children = this.dataMap.get(item)!;
    if (onlyFirstTime && parent.children!.length > 0) {
      return;
    }
    const newChildrenNumber = parent.children!.length + this.batchNumber;
    const nodes = children
      .slice(0, newChildrenNumber)
      .map((name) => this._generateNode(name));
    if (newChildrenNumber < children.length) {
      nodes.push(new LoadmoreNode(LOAD_MORE, false, item));
    }

    parent.childrenChange.next(nodes);
    this.dataChange.next(this.dataChange.value);
  }

  private _generateNode(item: string): LoadmoreNode {
    if (this.nodeMap.has(item)) {
      return this.nodeMap.get(item)!;
    }

    const result = new LoadmoreNode(item, this.dataMap.has(item));
    this.nodeMap.set(item, result);
    return result;
  }
}

@Component({
  selector: 'app-report-cuestionario',
  templateUrl: './report-cuestionario.component.html',
  styleUrls: ['./report-cuestionario.component.css'],
  providers: [LoadmoreDatabase]
})
export class ReportCuestionarioComponent implements OnInit {

  constructor(
    private snackBarComponent: MatSnackBar,
    private cuestionarioGenericoService:CuestionarioGenericoService,
    private cabeceraVersionCuestionarioService:CabeceraVersionCuestionarioService,
    private lugaresService:LugaresService,
    private router: Router,
    private _database: LoadmoreDatabase,
    private dialog: MatDialog,
  
  ) 
  {
    this.formCuestionarioGenerico = new FormGroup({
      _cmbCuestionarioGenerico : new FormControl('',[Validators.required]),
      _cmbVersionCuestionarioGenerico : new FormControl('',[Validators.required]),
      _cmbComunidadCuestionarioGenerico : new FormControl('',[Validators.required])
    });

    this.formComponenteCuestionarioGenerico = new FormGroup({
      _idComponenteEncriptado : new FormControl(''),
      _idCuestionarioGenericoEncriptado : new FormControl('',[Validators.required]),
      _descripcion : new FormControl('',[Validators.required]),
      _orden : new FormControl('',[Validators.required])
    });

    this.formSeccionComponenteCuestionarioGenerico = new FormGroup({
      _idSeccionEncriptado : new FormControl(''),
      _idComponenteEncriptado : new FormControl('',[Validators.required]),
      _descripcion : new FormControl('',[Validators.required]),
      _orden : new FormControl('',[Validators.required])
    });

    this.formPreguntaSeccionComponenteCuestionarioGenerico = new FormGroup({
      _idPreguntaEncriptado : new FormControl(''),
      _cmbTipoPregunta : new FormControl('',[Validators.required]),
      _cmbSeccion : new FormControl(''),
      _obligatorio : new FormControl('',[Validators.required]),
      _descripcion : new FormControl('',[Validators.required]),
      _leyendaSuperior : new FormControl(''),
      _leyendaLateral : new FormControl(''),
      _orden : new FormControl(''),
      _observacion:new FormControl(''),
      _campoObservacion:new FormControl(''),
    });

    this.formPreguntaTipoSeleccion = new FormGroup({
      _idPreguntaEncriptado: new FormControl(''),
      _idOpcionPreguntaSeleccion: new FormControl(''),
      _descripcion : new FormControl('',[Validators.required]),
    });

    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );

    this.treeControl = new FlatTreeControl<LoadmoreFlatNode>(
      this.getLevel,
      this.isExpandable
    );

    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
    this.methodChange();
   }
   checked=true;
   test="";
  formCuestionarioGenerico:FormGroup;
  formComponenteCuestionarioGenerico:FormGroup;
  formSeccionComponenteCuestionarioGenerico:FormGroup;
  formPreguntaSeccionComponenteCuestionarioGenerico:FormGroup;
  formPreguntaTipoSeleccion :FormGroup;
  _listaOpcionesPregunta:any[]=[];

  get _cmbCuestionarioGenerico(){
    return this.formCuestionarioGenerico.get("_cmbCuestionarioGenerico");
  }
  get _cmbVersionCuestionarioGenerico(){
    return this.formCuestionarioGenerico.get("_cmbVersionCuestionarioGenerico");
  }
  get _cmbComunidadCuestionarioGenerico(){
    return this.formCuestionarioGenerico.get("_cmbComunidadCuestionarioGenerico");
  }

  mensaje(_mensaje:string,_duracion?:number,_opcion?:number,_color?:string){
    if (_duracion==null) {
       _duracion=3000;
    }
    if (_opcion==1) {
      _mensaje="Datos ingresados correctamente";
    }
    if (_opcion==2) {
      _mensaje="Datos modificados correctamente";
    }
    if (_opcion==3) {
      _mensaje="Datos eliminados correctamente";
    }
    if (_color==null) {
      _color ="gpm-danger";
    }
    let snackBarRef = this.snackBarComponent.open(_mensaje,null,{duration:_duracion,panelClass:['text-white',`${_color}`],data:{}});
  }

  

  tipoUsurio='';
  _obligatorioPregunta=true;
  _obligatorioPregunta_true=true;

  consultarDatos(cuestionario, version, comunidad) {
    // this.dataSource.data= [];
      
    //   await this.cuestionarioGenericoService
    //     ._cuestionariogenerico_consultarporpreguntaRandom(
    //       cuestionario, version, comunidad
    //     )
    //     .then((data) => {
          
    //       if (data["http"]["codigo"] == "200") {
    //         this._database.recibirData(data["respuesta"]);
    //       } else {
    //         this._database.recibirData('');
    //       }
    //     });

    this._listaPreguntasSeccionComponenteCuestionarioGenerico=[];
    this.cuestionarioGenericoService._cuestionariogenerico_consultarporpreguntaRandom(cuestionario, version, comunidad)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaPreguntasSeccionComponenteCuestionarioGenerico= data['respuesta'];
        }
      })
      this._obligatorioPregunta=true;
      this._obligatorioPregunta_true=true;
      this.logica_preguntas=true;

  
  }

  ngOnInit() {
    this.tipoUsurio= localStorage.getItem('IdTipoUsuarioEncriptado');
    if(this.tipoUsurio==''){
      this.router.navigateByUrl("/login");
    }
    this._cargarMisCuestionariosGenericos();
    // this.preguntaSeccionComponenteCuestionarioGenericoService.refresh$.subscribe(()=>{
    //   this._consultarPreguntasSeccionComponenteCuestionarioGenerico(this.test);
    // })
  }

  quitarRandom(val) {
    var cad = val;
    var count= cad.length;
    
    var cadenaFinal= cad.substring(count,7);
    
    return cadenaFinal;
      
   }
  
  nodeMap = new Map<string, LoadmoreFlatNode>();
  treeControl: FlatTreeControl<LoadmoreFlatNode>;
  treeFlattener: MatTreeFlattener<LoadmoreNode, LoadmoreFlatNode>;
  dataSource: MatTreeFlatDataSource<LoadmoreNode, LoadmoreFlatNode>;

  methodChange(){
    
    this._database.dataChange.subscribe((data) => {
      
        this.dataSource = new MatTreeFlatDataSource(
        this.treeControl,
        this.treeFlattener
      );
      this.dataSource.data=[];
      
      this.dataSource.data = data;
    });
  }


  getChildren = (node: LoadmoreNode): Observable<LoadmoreNode[]> =>
    node.childrenChange;

  transformer = (node: LoadmoreNode, level: number) => {
    const existingNode = this.nodeMap.get(node.item);

    if (existingNode) {
      return existingNode;
    }

    const newNode = new LoadmoreFlatNode(
      node.item,
      level,
      node.hasChildren,
      node.loadMoreParentItem
    );
    this.nodeMap.set(node.item, newNode);
    return newNode;
  };

  getLevel = (node: LoadmoreFlatNode) => node.level;

  isExpandable = (node: LoadmoreFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: LoadmoreFlatNode) => _nodeData.expandable;

  isLoadMore = (_: number, _nodeData: LoadmoreFlatNode) =>
    _nodeData.item === LOAD_MORE;

  loadMore(item: string) {
    this._database.loadMore(item);
  }

  loadChildren(node: LoadmoreFlatNode) {
    this._database.loadMore(node.item, true);
  }

  logica_componentes=true;
  logica_secciones= false;
  logica_preguntas= false;
  _btnAccionC="Guardar";
  _listaCuestionariosGenericos:any[]=[];

  
  _onChangeCmbComunidadCuestionarioGenerico(event) {
    
    this.methodChange();
    if (event.value != 0) {
      const obj = this._listaCuestionariosGenericos.find(
        (data) =>
          data.CuestionarioGenerico.IdCuestionarioGenericoEncriptado ===
          event.value
      );
      const index = this._listaCuestionariosGenericos.indexOf(obj);
    }
    this.consultarDatos(this.formCuestionarioGenerico.get("_cmbCuestionarioGenerico").value, this.formCuestionarioGenerico.get("_cmbVersionCuestionarioGenerico").value, event.value);
    
  }

  _cargarMisCuestionariosGenericos(){
    this.cuestionarioGenericoService._consultarCuestionarioGeneriocoPorIdAsignarUsuarioTipoUsuarioEncriptado(
      localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado')
    )
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaCuestionariosGenericos = data['respuesta'];
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else{
          this.mensaje(data['http']['mensaje']);
        }
      })
  }

  _onChangeCmbCuestionariosGenericos(event?){
    this.formCuestionarioGenerico.get("_cmbVersionCuestionarioGenerico").reset();
    this._listaVersionesCuestionario=null;
    this._listaComunidadesCuestionarioGenerico=null;
    this._consultarVersionesDeCuestionario(event.value);
    this.logica_componentes=true;
    this.logica_secciones =false;
    this.logica_preguntas =false;
    this._btnAccionC ="Guardar";
    this.consultarDatos('','','');
  }


  _listaComponentesCuestionarioGenerico:any[]=[];
  _listaComunidadesCuestionarioGenerico:any[]=[];
  _listaPreguntasSeccionComponenteCuestionarioGenerico:any[]=[];
  _listaVersionesCuestionario:any[]=[];




  _consultarVersionesDeCuestionario(_IdCuestionarioGenericoEncriptado){
    this.cabeceraVersionCuestionarioService._consultarCabeceraVersionCuestionario(_IdCuestionarioGenericoEncriptado)
    .then(data=>{
      if (data['http']['codigo']=='200') {
        this._listaVersionesCuestionario=data['respuesta'];

      }

    }).catch(error=>{

    }).finally(()=>{

    });
  }

  _onChangeCmbVersionCuestionarioGenerico(event?){
    this.formCuestionarioGenerico.get("_cmbComunidadCuestionarioGenerico").reset();
    this.logica_preguntas=false;
    this.logica_componentes=false;
    this.logica_secciones =true;
    this._listaComunidadesCuestionarioGenerico=null;
    this._consultarComunidadesDeCuestionario(this.formCuestionarioGenerico.get("_cmbCuestionarioGenerico").value, event.value);
    this.consultarDatos('','','');
  }

  _consultarComunidadesDeCuestionario(_idCuestionarioEncriptado, _idVersionEncriptado){
    this.lugaresService._consultarComunidadesPorVersion(_idCuestionarioEncriptado, _idVersionEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaComunidadesCuestionarioGenerico = data['respuesta'];
        }
      })
  }


}
