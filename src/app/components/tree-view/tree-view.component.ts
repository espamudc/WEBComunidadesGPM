import { FlatTreeControl } from "@angular/cdk/tree";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, Injectable, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";

import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from "@angular/material/tree";
import { BehaviorSubject, Observable } from "rxjs";

import { CuestionarioGenericoService } from "src/app/services/cuestionario-generico.service";
import { MatDialog } from "@angular/material";
import { isNgTemplate } from "@angular/compiler";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

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

  recibirData(componentes) {
  
    this.rootLevelNodes = [];
  
    this.dataMap.set('', []);
    this.dataChange.next([])
    componentes.listaComponente.map((componente) => {
      var secciones = [];
      var preguntas = [];
  
      var nombres = componente.Descripcion;
      
      componente.listaSeccion.map((seccion) => {
        secciones.push(seccion.Descripcion);
        
      if(seccion.listaPregunta.length>0){

        seccion.listaPregunta.map((pregunta) => {
        preguntas.push(pregunta.Descripcion);
        
                
        });
      
        this.dataMap.set(seccion.Descripcion, preguntas);
      }
      
      preguntas=[];

      });

      this.dataMap.set(nombres, secciones);
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
  selector: "app-tree-view",
  templateUrl: "./tree-view.component.html",
  styleUrls: ["./tree-view.component.css"],
  providers: [LoadmoreDatabase],
})
export class TreeViewComponent implements OnInit {
  async consultarDatos(val) {
    this.dataSource.data= [];
      
      await this.cuestionarioGenericoService
        ._cuestionariogenerico_consultarporidconcomponenteconseccionconpreguntaRandom(
          val
        )
        .then((data) => {
          
          if (data["http"]["codigo"] == "200") {
            this._database.recibirData(data["respuesta"]);
          } else {
            this._database.recibirData('');
          }
        });
  
  }
  
  tipoUsurio='';
  ngOnInit() {

    this.tipoUsurio= localStorage.getItem('IdTipoUsuarioEncriptado');
    if(this.tipoUsurio==''){
      this.router.navigateByUrl("/login");
    }
    this._cargarMisCuestionariosGenericos();
  }
  formCuestionarioGenericoDetalle: FormGroup;
  get formCuestionarioGenericoDetalle_cmbCuestinario() {
    return this.formCuestionarioGenericoDetalle.get("_cmbCuestinario");
  }

  _listaCuestionariosGenericos: any[] = [];
  _cargarMisCuestionariosGenericos() {
    this.cuestionarioGenericoService
      ._consultarCuestionarioGeneriocoPorIdAsignarUsuarioTipoUsuarioEncriptado(
        localStorage.getItem("IdAsignarUsuarioTipoUsuarioEncriptado")
      )
      .then((data) => {
        if (data["http"]["codigo"] == "200") {
          this._listaCuestionariosGenericos = [];
          this._listaCuestionariosGenericos = data["respuesta"];
        }
      })
      .catch((error) => {})
      .finally(() => {});
  }

 quitarRandom(val) {
  var cad = val;
  var count= cad.length;
  
  var cadenaFinal= cad.substring(count,7);
  
  return cadenaFinal;
    
 }

  _onChangeCmbCuestionariosGenericos(event) {
    
    this.methodChange();
    if (event.value != 0) {
      const obj = this._listaCuestionariosGenericos.find(
        (data) =>
          data.CuestionarioGenerico.IdCuestionarioGenericoEncriptado ===
          event.value
      );
      const index = this._listaCuestionariosGenericos.indexOf(obj);
    }
    this.consultarDatos(event.value);
    
  }

  nodeMap = new Map<string, LoadmoreFlatNode>();
  treeControl: FlatTreeControl<LoadmoreFlatNode>;
  treeFlattener: MatTreeFlattener<LoadmoreNode, LoadmoreFlatNode>;
  dataSource: MatTreeFlatDataSource<LoadmoreNode, LoadmoreFlatNode>;

  constructor(
    private _database: LoadmoreDatabase,
    private cuestionarioGenericoService: CuestionarioGenericoService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.formCuestionarioGenericoDetalle = new FormGroup({
      _cmbCuestinario: new FormControl("", [Validators.required]),
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
}
