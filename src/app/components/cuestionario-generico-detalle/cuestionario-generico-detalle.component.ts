import { Component, OnInit, ViewChild, Input, Inject, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CuestionarioGenericoService } from 'src/app/services/cuestionario-generico.service';
import { ComponenteCuestionarioGenericoService } from 'src/app/services/componente-cuestionario-generico.service';
import { SeccionComponenteCuestionarioGenericoService } from 'src/app/services/seccion-componente-cuestionario-generico.service';
import { PreguntaSeccionComponenteCuestionarioGenericoService } from 'src/app/services/pregunta-seccion-componente-cuestionario-generico.service';
import { PreguntaAbiertaService } from 'src/app/services/tipo-preguntas/pregunta-abierta.service';
import { MatTable, MatSnackBar, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { PreguntaSeleccionService } from 'src/app/services/tipo-preguntas/pregunta-seleccion.service';
import { PreguntaEncajonarService } from 'src/app/services/pregunta-encajonar.service';
import { PreguntaMatrizService } from 'src/app/services/tipo-preguntas/pregunta-matriz.service';
import { CabeceraVersionCuestionarioService } from 'src/app/services/cabecera-version-cuestionario.service';

export interface Seccion{
  _preguntas ?: any[];
}
export interface Componente{
  _secciones ?: Seccion[];
}
export interface CuestionarioGenerico{ 
  _componentes? : Componente[];
}


@Component({
  selector: 'app-cuestionario-generico-detalle',
  templateUrl: './cuestionario-generico-detalle.component.html',
  styleUrls: ['./cuestionario-generico-detalle.component.css']
})
export class CuestionarioGenericoDetalleComponent implements OnInit,AfterViewInit {

  constructor(
    private cuestionarioGenericoService :CuestionarioGenericoService,
    private componenteCuestionarioGenericoService:ComponenteCuestionarioGenericoService,
    private seccionComponenteCuestionarioGenericoService:SeccionComponenteCuestionarioGenericoService,
    private preguntaSeccionComponenteCuestionarioGenericoService:PreguntaSeccionComponenteCuestionarioGenericoService,

    private preguntaAbiertaService : PreguntaAbiertaService,
    private preguntaSeleccionService:PreguntaSeleccionService,
    private preguntaEncajonarService:PreguntaEncajonarService,
    private preguntaMatrizService:PreguntaMatrizService,

    private cabeceraVersionCuestionarioService:CabeceraVersionCuestionarioService,

    private snackBarComponent:MatSnackBar,

   
  ) {
    



    this.formCuestionarioGenericoDetalle = new FormGroup({
      _cmbCuestinario : new FormControl('',[Validators.required]),
      _idCabeceraVersionCuestionario : new FormControl(''),
      _idAsignarResponsableEncriptado : new FormControl('',[Validators.required]),
      _caracteristica : new FormControl(''),
      _version : new FormControl('',[Validators.min(1)]),
      _fechaCreacion : new FormControl(''),
      _estado : new FormControl('')
    });
    
  }



  ngOnInit() {
    this._cargarMisCuestionariosGenericos();
    //console.log("modaldata",this.ModalData);
    
  }
  
  ngAfterViewInit(){
    // try {
    //   console.log("modaldata",this.ModalData);
      
      
    //   this.verform = false;
    // } catch (ex) {
    //   //this.verform = true;
    // }
  }

   formCuestionarioGenericoDetalle : FormGroup;
  get formCuestionarioGenericoDetalle_cmbCuestinario(){
    return this.formCuestionarioGenericoDetalle.get("_cmbCuestinario");
  }
  get formCuestionarioGenericoDetalle_caracteristica(){
    return this.formCuestionarioGenericoDetalle.get("_caracteristica");
  }
  get formCuestionarioGenericoDetalle_version(){
    return this.formCuestionarioGenericoDetalle.get("_version");
  }
  get formCuestionarioGenericoDetalle_idAsignarResponsableEncriptado(){
    return this.formCuestionarioGenericoDetalle.get("_idAsignarResponsableEncriptado");
  }

  _listaCuestionariosGenericos:any[]=[];
  _listaComponentesCuestionarioGenerico:any[]=[];
  _listaSeccionesComponenteCuestionarioGenerico:any[]=[];
  _listaPreguntasSeccionComponenteCuestionarioGenerico:any[]=[];

  ColumnsPreguntaAbierta = ['tipo_dato','minimo','maximo'];
  _listaOpcionesPreguntasAbiertas:any[]=[];

  ColumnsPreguntaEncajonada: string[] = ['icono','descripcion'];
  _listaOpcionesPreguntaSeleccion:any[]=[];
  _listaPreguntaEncajonadas:any[]=[];

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

  // @Input() ModalData ={};
  @ViewChild('tablaOpcionesPreguntaAbierta',{static:false}) tablaOpcionesPreguntaAbierta : MatTable<any>;
  @ViewChild('tablaPreguntasEncajonadas',{static:false}) tablaPreguntasEncajonadas : MatTable<any>;

  _cuestionarioGenerico : CuestionarioGenerico[];

  _onChangeCmbCuestionariosGenericos(event){
    // this._consultarComponentesDeCuestionario(event.value);
    if (event.value==0) {
      
    } else {
      const obj=  this._listaCuestionariosGenericos.find(data=>data.CuestionarioGenerico.IdCuestionarioGenericoEncriptado===event.value);
      const index = this._listaCuestionariosGenericos.indexOf(obj);

      this.formCuestionarioGenericoDetalle_idAsignarResponsableEncriptado.setValue(obj.IdAsignarResponsableEncriptado); 
      console.log("idAsignarResponsable:",this.formCuestionarioGenericoDetalle_idAsignarResponsableEncriptado.value);
    
    }
    this._cuestionariogenerico_consultarporidconcomponenteconseccionconpregunta(event.value);
    
  }

  _cargarMisCuestionariosGenericos(){
    // console.log(localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado'));
    // this._listaCuestionariosGenericos=null;

    this.cuestionarioGenericoService._consultarCuestionarioGeneriocoPorIdAsignarUsuarioTipoUsuarioEncriptado(
      localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado')
    )
      .then(data=>{
        if (data['http']['codigo']=='200') {
          // console.log(data['respuesta']);
          // 
          this._listaCuestionariosGenericos=[];
          this._listaCuestionariosGenericos = data['respuesta'];
          console.log("mis cuestionarios",this._listaCuestionariosGenericos);
          
          // data['respuesta'].map(item=>{
          //   console.log(item.CuestionarioGenerico);
          //   this._listaCuestionariosGenericos.push(item.CuestionarioGenerico);
          //   // this._listaCuestionariosGenericos.push(item['CuestionarioGenerico']);
          // });
          console.log("lista",this._listaCuestionariosGenericos);
          
          // console.log(data['http']['codigo']);
          
        }
        // else if (data['http']['codigo']=='500') {
        //   this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        // }else{
        //   this.mensaje(data['http']['mensaje']);
        // }
      }).catch(error=>{

      }).finally(()=>{
        
        //this.MatTableCuestionariosGenericos.renderRows();
      });
  }
  _consultarComponentesDeCuestionario(_IdCuestionarioGenericoEncriptado){
    this.componenteCuestionarioGenericoService._consultarComponentesDeCuestionario(_IdCuestionarioGenericoEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaComponentesCuestionarioGenerico=[];
          this._listaComponentesCuestionarioGenerico= data['respuesta'];
          console.log(this._listaComponentesCuestionarioGenerico);
          
        }
      }).catch(error=>{

      }).finally(()=>{
        
        for (let index = 0; index < this._listaComponentesCuestionarioGenerico.length; index++) {
          const element = this._listaComponentesCuestionarioGenerico[index];
          this._consultarSeccionesDeComponentesDeCuestionario(element.IdComponenteEncriptado)
        }
      });
  }

  _consultarSeccionesDeComponentesDeCuestionario(_idComponenteEncriptado){
    this.seccionComponenteCuestionarioGenericoService._consultarSeccionDeComponentesDeCuestionarioGenerico(_idComponenteEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaSeccionesComponenteCuestionarioGenerico=[];
          this._listaSeccionesComponenteCuestionarioGenerico = data['respuesta'];
          // console.log(this._listaSeccionesComponenteCuestionarioGenerico);
          
        }
      }).catch(error=>{
        console.log("error",error);
        
      }).finally(()=>{
        for (let index = 0; index < this._listaSeccionesComponenteCuestionarioGenerico.length; index++) {
          const element = this._listaSeccionesComponenteCuestionarioGenerico[index];
          this._consultarPreguntasSeccionComponenteCuestionarioGenerico(element.IdSeccionEncriptado);
        }
      });
  }

  _consultarPreguntasSeccionComponenteCuestionarioGenerico(idSeccionEncriptado){

    this.preguntaSeccionComponenteCuestionarioGenericoService._consultarPreguntasSeccionComponenteCuestionarioGenerico(idSeccionEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          console.log(data);
          this._listaPreguntasSeccionComponenteCuestionarioGenerico=[];
          this._listaPreguntasSeccionComponenteCuestionarioGenerico= data['respuesta'];

          //this._listaPreguntasSeccionComponenteCuestionarioGenerico.sort(data=>data.Orden);

        }
      }).catch(error=>{
        console.log(error);
        
      }).finally(()=>{

      });
  }

  _consultarOpcionesPreguntas(_pregunta){
    if (_pregunta.TipoPregunta.Identificador==1) {
      
      this._consultarOpcionesPreguntasAbiertas(_pregunta.IdPreguntaEncriptado);
    }else if (_pregunta.TipoPregunta.Identificador==2 || _pregunta.TipoPregunta.Identificador===3) {
      this._consultarOpcionesPreguntaSeleccion(_pregunta.IdPreguntaEncriptado);
    }else if (_pregunta.TipoPregunta.Identificador==4) {
      
      this._consultaOpcionesPreguntaConfigurarMatriz(_pregunta.IdPreguntaEncriptado);
    }
  }

  _consultarOpcionesPreguntasAbiertas(_idPreguntaEncriptado){
    this.preguntaAbiertaService._consultarOpcionesPreguntasAbiertas(_idPreguntaEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaOpcionesPreguntasAbiertas=[];
          console.log("lista de Opciones",data['respuesta']);
          this._listaOpcionesPreguntasAbiertas.push(data['respuesta']);
          this._listaOpcionesPreguntasAbiertas.map((item,index)=>{
            console.log("item",item.TipoDato.Descripcion );

          });
          
          // this._listaOpcionesPreguntasAbiertas.push(data['respuesta']);
          // console.log("sfasdasd",this._listaOpcionesPreguntasAbiertas);

        }
      }).catch(error=>{

      }).finally(()=>{
        this.tablaOpcionesPreguntaAbierta.renderRows();
      });
  }
 
  _consultarOpcionesPreguntaSeleccion(_IdPreguntaSeleccionEncriptado){

    this.preguntaSeleccionService._consultarOpcionPreguntaSeleccion(
      _IdPreguntaSeleccionEncriptado
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._listaOpcionesPreguntaSeleccion =[];
        this._listaOpcionesPreguntaSeleccion = data['respuesta'];
        console.log("opciones preguntas seleccion",this._listaOpcionesPreguntaSeleccion);
        
      }else{

      }
    }).catch(error=>{

    }).finally(()=>{

    });
  }

  _consultarPreguntasEncajonadas(_item){
    console.log("opcion",_item);
    //this._pregunta_consultarpornoencajonadasporopcionpreguntaseleccion(_item.IdOpcionPreguntaSeleccionEncriptado);
    this.preguntaEncajonarService._preguntaencajonada_consultarporidopcionpreguntaseleccion(_item.IdOpcionPreguntaSeleccionEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaPreguntaEncajonadas=[];
          this._listaPreguntaEncajonadas = data['respuesta'];
          console.log("_listaPreguntaEncajonadas",this._listaPreguntaEncajonadas);
          
        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  _listaPreguntaConfigurarMatriz:any[]=[];
  _consultaOpcionesPreguntaConfigurarMatriz(_IdPreguntaEncriptado){
    this._listaPreguntaConfigurarMatriz=[];
    console.log(_IdPreguntaEncriptado);
 
    this.preguntaMatrizService._consultarPreguntaConfigurarMatriz(_IdPreguntaEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          console.log("matriz-->",data['respuesta']);
          
          this._listaPreguntaConfigurarMatriz=data['respuesta'];
          this._vistaPreguntaConfigurarMatriz();
        } else {
          
        }
      }).catch(error=>{

      }).finally(()=>{
        //this._vistaPreguntaConfigurarMatriz();
      });
  }

  FilaOpcionUnoMatriz: any[] = [];
  ColumnsOpcionDosMatriz: any[] = [];
  _vistaPreguntaConfigurarMatriz(){

    this._listaPreguntaConfigurarMatriz.map((element,index)=>{
      this.FilaOpcionUnoMatriz.push(element.OpcionUnoMatriz);
    });
    let unicosOpcionUno = [ ];
    
    this.FilaOpcionUnoMatriz.map((element,index)=>{
      let x= unicosOpcionUno.find(data=>data.IdOpcionUnoMatrizEncriptado===element.IdOpcionUnoMatrizEncriptado);
      if (unicosOpcionUno.indexOf( x ) == -1){
        unicosOpcionUno.push(element);
      }
    });

    this.FilaOpcionUnoMatriz = unicosOpcionUno;
    //------------------------------------------------------------------------------------
    this._listaPreguntaConfigurarMatriz.map((element,index)=>{
      this.ColumnsOpcionDosMatriz.push(element.OpcionDosMatriz);
    });

    let unicosOpcionDos = [ ];

    this.ColumnsOpcionDosMatriz.map((element,index)=>{
      let x= unicosOpcionDos.find(data=>data.IdOpcionDosMatrizEncriptado===element.IdOpcionDosMatrizEncriptado);
      if (unicosOpcionDos.indexOf( x ) == -1){
        unicosOpcionDos.push(element);
      }
    });
    

    this.ColumnsOpcionDosMatriz = unicosOpcionDos;

    console.log("unicosOpcionDos",unicosOpcionDos);
  }

  _cargarCuestionarioGenerico:any={};
  _cuestionariogenerico_consultarporidconcomponenteconseccionconpregunta(_IdCuestionarioGenericoEncriptado){
    this._cargarCuestionarioGenerico = {};
    this.cuestionarioGenericoService._cuestionariogenerico_consultarporidconcomponenteconseccionconpregunta(_IdCuestionarioGenericoEncriptado)
      .then(data=>{
        
        if (data['http']['codigo']=='200') {
          
          this._cargarCuestionarioGenerico = data['respuesta'];

        } else {
          
        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  _insertarCabeceraVersionCuestionario(){
    this.cabeceraVersionCuestionarioService._insertarCabeceraVersionCuestionario(
      this.formCuestionarioGenericoDetalle_idAsignarResponsableEncriptado.value,
      this.formCuestionarioGenericoDetalle_caracteristica.value,
      this.formCuestionarioGenericoDetalle_version.value
    ).then(data=>{
      if (data['http']['codigo']=="500") {
        this.mensaje(data['http']['mensaje']);
      } else if(data['http']['codigo']=="200") {
        this.mensaje("Cuestionario versionado correctamente");
      }else{
        this.mensaje(data['http']['mensaje'],3000,0,'primary');
      }
    }).catch(error=>{

    }).finally(()=>{})
  }

  _validarForm(){
    
    this._insertarCabeceraVersionCuestionario();
  }

}
