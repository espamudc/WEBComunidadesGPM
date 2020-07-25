import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import { MatSnackBar, MatTable, MatTableDataSource, MatDialog } from '@angular/material';
import { CuestionarioGenericoService } from 'src/app/services/cuestionario-generico.service';
import { ComponenteCuestionarioGenericoService } from 'src/app/services/componente-cuestionario-generico.service';
import { SeccionComponenteCuestionarioGenericoService } from 'src/app/services/seccion-componente-cuestionario-generico.service';
import { TipoPreguntaSeccionComponenteCuestionarioGenericoService } from 'src/app/services/tipo-pregunta-seccion-componente-cuestionario-generico.service';
import { PreguntaSeccionComponenteCuestionarioGenericoService } from 'src/app/services/pregunta-seccion-componente-cuestionario-generico.service';

// export interface OpcionPregunta{
//   IdPregunta:number;
//   IdPreguntaEncriptada:string;
//   Descripcion:string;
//   Estado:string;
// }

@Component({
  selector: 'app-estructura-cuestionario-generico',
  templateUrl: './estructura-cuestionario-generico.component.html',
  styleUrls: ['./estructura-cuestionario-generico.component.css']
})



export class EstructuraCuestionarioGenericoComponent implements OnInit {

  constructor(
    private snackBarComponent: MatSnackBar,
    private cuestionarioGenericoService:CuestionarioGenericoService,
    private componenteCuestionarioGenericoService:ComponenteCuestionarioGenericoService,
    private seccionComponenteCuestionarioGenericoService:SeccionComponenteCuestionarioGenericoService,
    private tipoPreguntaSeccionComponenteCuestionarioGenericoService:TipoPreguntaSeccionComponenteCuestionarioGenericoService,
    private preguntaSeccionComponenteCuestionarioGenericoService:PreguntaSeccionComponenteCuestionarioGenericoService
  ) {

    this.formCuestionarioGenerico = new FormGroup({
      _cmbCuestionarioGenerico : new FormControl('',[Validators.required]),
      _cmbComponenteCuestionarioGenerico : new FormControl('',[Validators.required]),
      _cmbSeccionComponenteCuestionarioGenerico : new FormControl('',[Validators.required])
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
    });

    this.formPreguntaTipoSeleccion = new FormGroup({
      _idPreguntaEncriptado: new FormControl(''),
      _idOpcionPreguntaSeleccion: new FormControl(''),
      _descripcion : new FormControl('',[Validators.required]),
    });



    //this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_obligatorio").setValue("true");
   }
   checked=true;
  formCuestionarioGenerico:FormGroup;
  formComponenteCuestionarioGenerico:FormGroup;
  formSeccionComponenteCuestionarioGenerico:FormGroup;
  formPreguntaSeccionComponenteCuestionarioGenerico:FormGroup;

  formPreguntaTipoSeleccion :FormGroup;
  _listaOpcionesPregunta:any[]=[];

  //---------------CuestionarioGenerico------------------------------------------------------------
  get _cmbCuestionarioGenerico(){
    return this.formCuestionarioGenerico.get("_cmbCuestionarioGenerico");
  }
  get _cmbComponenteCuestionarioGenerico(){
    return this.formCuestionarioGenerico.get("_cmbComponenteCuestionarioGenerico");
  }
  get _cmbSeccionComponenteCuestionarioGenerico(){
    return this.formCuestionarioGenerico.get("_cmbSeccionComponenteCuestionarioGenerico");
  }
  //---------------formComponenteCuestionarioGenerico----------------------------------------------
  get _idComponenteEncriptado(){
    return this.formComponenteCuestionarioGenerico.get("_idComponenteEncriptado");
  }
  get _idCuestionarioGenericoEncriptado(){
    return this.formComponenteCuestionarioGenerico.get("_idCuestionarioGenericoEncriptado");
  }
  get _descripcion(){
    return this.formComponenteCuestionarioGenerico.get("_descripcion");
  }
  get _orden(){
    return this.formComponenteCuestionarioGenerico.get("_orden");
  }
  //---------------formSeccionComponenteCuestionarioGenerico----------------------------------------------
  get _idSeccionEncriptado(){
    return this.formSeccionComponenteCuestionarioGenerico.get("_idSeccionEncriptado");
  }
  get _idComponenteEncriptadoSeccion(){
    return this.formSeccionComponenteCuestionarioGenerico.get("_idComponenteEncriptado");
  }
  get _descripcionSeccion(){
    return this.formSeccionComponenteCuestionarioGenerico.get("_descripcion");
  }
  get _ordenSeccion(){
    return this.formSeccionComponenteCuestionarioGenerico.get("_orden");
  }
  //---------------formPreguntaSeccionComponenteCuestionarioGenerico----------------------------------------------
  get _idPreguntaEncriptado(){
    return this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_idPreguntaEncriptado");
  }
  get _cmbTipoPregunta(){
    return this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_cmbTipoPregunta");
  }
  get _cmbSeccion(){
    return this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_cmbSeccion");
  }
  get _descripcionPregunta(){
    return this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_descripcion");
  }
  get _obligatorio(){
    return this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_obligatorio");
  }
  get _ordenPregunta(){
    return this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_orden");
  }
  get _leyendaSuperior(){
    return this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_leyendaSuperior");
  }
  get _leyendaLateral(){
    return this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_leyendaLateral");
  }
  get _observacion(){
    return this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_observacion");
  }
  _obligatorioPregunta=true;
  _obligatorioPregunta_true=true;
  _obligatorioPregunta_false=false;
  //formPreguntaTipoSeleccionUnica-------------------------------------------------------------
  
  get pregunta_seleccion_idPreguntaEncriptado(){
    return this.formPreguntaTipoSeleccion.get("_idPreguntaEncriptado");
  }
  get pregunta_seleccion_idOpcionPreguntaSeleccion(){
    return this.formPreguntaTipoSeleccion.get("_idOpcionPreguntaSeleccion");
  }
  get pregunta_seleccion_descripcion(){
    return this.formPreguntaTipoSeleccion.get("_descripcion");
  }

  //-------------------------------------------------------------

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

  ngOnInit() {
    this._cargarMisCuestionariosGenericos();
    
    //this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_obligatorio").setValue("true");
  }

  Columns: string[] = ['descripcion', 'orden', 'acciones'];

  // @ViewChild('tablaComponentesCuestionarioGenerico',{static:false})           ElementRef_tablaComponentesCuestionarioGenerico          : ElementRef;
  // @ViewChild('formComponente',{static:false})                                 ElementRef_formComponente                                : ElementRef;
  // @ViewChild('formSeccion',{static:false})                                    ElementRef_formSeccion                                   : ElementRef;
  // @ViewChild('tablaSeccionesComponentesCuestionarioGenerico',{static:false})  ElementRef_tablaSeccionesComponentesCuestionarioGenerico : ElementRef;

  logica_componentes=true;
  logica_secciones= false;
  logica_preguntas= false;
  _btnAccionC="Guardar";

  _listaCuestionariosGenericos:any[]=[];
  _cargarMisCuestionariosGenericos(){
    // console.log(localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado'));
    
    this.cuestionarioGenericoService._consultarCuestionarioGeneriocoPorIdAsignarUsuarioTipoUsuarioEncriptado(
      localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado')
    )
      .then(data=>{
        if (data['http']['codigo']=='200') {
          // console.log(data['respuesta']);
          // 
          this._listaCuestionariosGenericos = data['respuesta'];
          // data['respuesta'].map(item=>{
          //   console.log(item.CuestionarioGenerico);
          //   this._listaCuestionariosGenericos.push(item.CuestionarioGenerico);
          //   // this._listaCuestionariosGenericos.push(item['CuestionarioGenerico']);
          // });
          console.log("lista",this._listaCuestionariosGenericos);
          
          // console.log(data['http']['codigo']);
          
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else{
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error=>{

      }).finally(()=>{
        //this.MatTableCuestionariosGenericos.renderRows();
      });
  }

  _onChangeCmbCuestionariosGenericos(event?){


     // this.formCuestionarioGenerico.get("_cmbCuestionarioGenerico").reset();
     this.formCuestionarioGenerico.get("_cmbComponenteCuestionarioGenerico").reset();
     this.formCuestionarioGenerico.get("_cmbSeccionComponenteCuestionarioGenerico").reset();
    this._listaComponentesCuestionarioGenerico = null;
    this._listaSeccionesComponenteCuestionarioGenerico = null;
    this._listaPreguntasSeccionComponenteCuestionarioGenerico=null;


    console.log(event.value);
    this.formCuestionarioGenerico.get("_cmbComponenteCuestionarioGenerico").reset();
    this._consultarComponentesDeCuestionario(event.value);
    //this.formComponenteCuestionarioGenerico.get("_idCuestionarioGenericoEncriptado").setValue(event.value);
    this.logica_componentes=true;
    this.logica_secciones =false;
    this.logica_preguntas =false;


   

    this.formComponenteCuestionarioGenerico.reset();
    this.formSeccionComponenteCuestionarioGenerico.reset();
    this.formPreguntaSeccionComponenteCuestionarioGenerico.reset();
    this._btnAccionC ="Guardar";
    // this.ElementRef_tablaComponentesCuestionarioGenerico.nativeElement.style          ="visible:visible";
    // this.ElementRef_formComponente.nativeElement.style                               ="visible:visible";
    // this.ElementRef_formSeccion.nativeElement.style                                  ="overflow: hidden";
    // this.ElementRef_tablaSeccionesComponentesCuestionarioGenerico.nativeElement.style="overflow: hidden";

  }
  _onChangeCmbComponentesCuestionarioGenerico(event?){


    // this.formCuestionarioGenerico.get("_cmbCuestionarioGenerico").reset();
    //this.formCuestionarioGenerico.get("_cmbComponenteCuestionarioGenerico").reset();
    this.formCuestionarioGenerico.get("_cmbSeccionComponenteCuestionarioGenerico").reset();

    this.logica_preguntas=false;
    this.logica_componentes=false;
    this.logica_secciones =true;
    console.log("s:",event.value);
    
    this._consultarSeccionesDeComponentesDeCuestionario(event.value);
    this.formSeccionComponenteCuestionarioGenerico.reset();
    this.formPreguntaSeccionComponenteCuestionarioGenerico.reset();
  }

  _onChangeCmbSeccionComponentesCuestionarioGenerico(event?){
    this.logica_preguntas=true;
    this.logica_componentes=false;
    this.logica_secciones =false;
    console.log("sa:",event.value);
    this._consultarTiposPreguntas();
    this._consultarPreguntasSeccionComponenteCuestionarioGenerico(event.value);
    this.formPreguntaSeccionComponenteCuestionarioGenerico.reset();
  }

  _listaComponentesCuestionarioGenerico:any[]=[];
  _consultarComponentesDeCuestionario(_IdCuestionarioGenericoEncriptado){
    this.componenteCuestionarioGenericoService._consultarComponentesDeCuestionario(_IdCuestionarioGenericoEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaComponentesCuestionarioGenerico= data['respuesta'];
          console.log(this._listaComponentesCuestionarioGenerico);
          
        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  _listaSeccionesComponenteCuestionarioGenerico:any[]=[];



  _validarAccionFormComponenteCuestionarioGenerico(){
    // 
    console.log(this._listaComponentesCuestionarioGenerico.length);
    if (this._btnAccionC=="Guardar") {
      this._insertarComponenteCuestionarioGenerico(); 
    }else if (this._btnAccionC=="Actualizar"){
      this._modificarComponenteCuestionarioGenerico();
    }
  }

  _insertarComponenteCuestionarioGenerico(){

    // var item = this._listaComponentesCuestionarioGenerico.find();
    
    if (this._listaComponentesCuestionarioGenerico.length==0) {
      
      this.formComponenteCuestionarioGenerico.get("_orden").setValue(1);
    } else {
      let orden = this._listaComponentesCuestionarioGenerico[this._listaComponentesCuestionarioGenerico.length-1].Orden+1;
      this.formComponenteCuestionarioGenerico.get("_orden").setValue(orden);
    }
    console.log("orden:",this.formComponenteCuestionarioGenerico.get("_orden").value);
    
    this.formComponenteCuestionarioGenerico.get("_idCuestionarioGenericoEncriptado").setValue( this.formCuestionarioGenerico.get("_cmbCuestionarioGenerico").value);

    this.componenteCuestionarioGenericoService._insertarComponenteCuestionarioGenerico(
      this.formComponenteCuestionarioGenerico.get("_idCuestionarioGenericoEncriptado").value,
      this.formComponenteCuestionarioGenerico.get("_descripcion").value,
      this.formComponenteCuestionarioGenerico.get("_orden").value
    )
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._consultarComponentesDeCuestionario(this.formComponenteCuestionarioGenerico.get("_idCuestionarioGenericoEncriptado").value);
          this.formComponenteCuestionarioGenerico.reset();
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else{
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error=>{
        console.log(error);
        
      }).finally(()=>{
        
      });
  }
  _eliminarComponenteCuestionarioGenerico(_item){
    this.componenteCuestionarioGenericoService._eliminarComponenteCuestionarioGenerico(_item.IdComponenteEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._consultarComponentesDeCuestionario(this.formCuestionarioGenerico.get("_cmbCuestionarioGenerico").value)
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else{
          this.mensaje(data['http']['mensaje']);
        }
        console.log("eliminar",data);
        
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  _consultarSeccionesDeComponentesDeCuestionario(_idComponenteEncriptado){
    this.seccionComponenteCuestionarioGenericoService._consultarSeccionDeComponentesDeCuestionarioGenerico(_idComponenteEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaSeccionesComponenteCuestionarioGenerico = data['respuesta'];
          // console.log(this._listaSeccionesComponenteCuestionarioGenerico);
          
        }
      }).catch(error=>{
        console.log("error",error);
        
      }).finally(()=>{

      });
  }

  _validarAccionFormformSeccionComponenteCuestionarioGenerico(){
    
    if (this._btnAccionS=="Guardar") {
      this._insertarSeccionDeComponenteDeCuestionarioGenerico();
    }else if(this._btnAccionS=="Actualizar"){
      this._modificarSeccionDeComponenteDeCuestionarioGenerico();
    }
  }

  _insertarSeccionDeComponenteDeCuestionarioGenerico(){
    
    this.formSeccionComponenteCuestionarioGenerico.get("_orden").setValue(this._listaSeccionesComponenteCuestionarioGenerico.length+1);

    console.log("descripcion",this.formSeccionComponenteCuestionarioGenerico.get("_descripcion").value);
    this.seccionComponenteCuestionarioGenericoService._insertarSeccionDeComponenteDeCuestionarioGenerico(
      this.formCuestionarioGenerico.get("_cmbComponenteCuestionarioGenerico").value,
      this.formSeccionComponenteCuestionarioGenerico.get("_descripcion").value,
      this.formSeccionComponenteCuestionarioGenerico.get("_orden").value
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarSeccionesDeComponentesDeCuestionario(this.formCuestionarioGenerico.get("_cmbComponenteCuestionarioGenerico").value);
        this.formSeccionComponenteCuestionarioGenerico.reset();
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{

    }).finally(()=>{

    });
  }

  nuevaListaComponentesReordenada:any[]=[];
  _reordenarComponentes(_item){
    this._consultarComponentesDeCuestionario(this.formComponenteCuestionarioGenerico.get("_idCuestionarioGenericoEncriptado").value);
    this._listaComponentesCuestionarioGenerico.map(element=>{
      if (element.Orden>=_item.Orden) {
        this.nuevaListaComponentesReordenada.push(element);
      }
    });
    this.nuevaListaComponentesReordenada.map((element,index)=>{
      element.Orden = _item.Orden+index+1;
    });
  }

  _eliminarSeccionComponenteCuestionarioGenerico(_item){
    var index = _item.Orden;



    this.seccionComponenteCuestionarioGenericoService._eliminarSeccionDeComponenteDeCuestionarioGenerico(_item.IdSeccionEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._consultarSeccionesDeComponentesDeCuestionario(this.formCuestionarioGenerico.get("_cmbComponenteCuestionarioGenerico").value)
          this.formComponenteCuestionarioGenerico.reset();
        }else{
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  _prepararComponenteCuestionarioGenerico(_item){

    //this.formCuestionarioGenerico.get("_cmbCuestionarioGenerico").setValue;

    this.formComponenteCuestionarioGenerico.get("_idComponenteEncriptado").setValue(_item.IdComponenteEncriptado);
    this.formComponenteCuestionarioGenerico.get("_idCuestionarioGenericoEncriptado").setValue(_item.CuestionarioGenerico.IdCuestionarioGenericoEncriptado);
    this.formComponenteCuestionarioGenerico.get("_descripcion").setValue(_item.Descripcion);
    this.formComponenteCuestionarioGenerico.get("_orden").setValue(_item.Orden);

    this._btnAccionC ="Actualizar";


  }

  _modificarComponenteCuestionarioGenerico(){
    this.componenteCuestionarioGenericoService._modificarComponenteCuestionarioGenerico(
      this.formComponenteCuestionarioGenerico.get("_idComponenteEncriptado").value,
      this.formComponenteCuestionarioGenerico.get("_idCuestionarioGenericoEncriptado").value,
      this.formComponenteCuestionarioGenerico.get("_descripcion").value,
      this.formComponenteCuestionarioGenerico.get("_orden").value
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarComponentesDeCuestionario( this.formComponenteCuestionarioGenerico.get("_idCuestionarioGenericoEncriptado").value);
        this.formComponenteCuestionarioGenerico.reset();
        this._btnAccionC="Guardar";
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{

    }).finally(()=>{

    });
  }


  _btnAccionS="Guardar";
  _prepararSeccionDeComponenteDeCuestionarioGenerico(_item){
    this.formSeccionComponenteCuestionarioGenerico.get("_idSeccionEncriptado").setValue(_item.IdSeccionEncriptado);
    this.formSeccionComponenteCuestionarioGenerico.get("_idComponenteEncriptado").setValue(_item.Componente.IdComponenteEncriptado);
    this.formSeccionComponenteCuestionarioGenerico.get("_descripcion").setValue(_item.Descripcion);
    this.formSeccionComponenteCuestionarioGenerico.get("_orden").setValue(_item.Orden);
    this._btnAccionS="Actualizar";

    console.log(

      "IDComponente",this.formSeccionComponenteCuestionarioGenerico.get("_idComponenteEncriptado").value

    );
    

  }

  _modificarSeccionDeComponenteDeCuestionarioGenerico(){
    // 
    this.seccionComponenteCuestionarioGenericoService._modificarSeccionDeComponenteDeCuestionarioGenerico(
      this.formSeccionComponenteCuestionarioGenerico.get("_idSeccionEncriptado").value,
      this.formSeccionComponenteCuestionarioGenerico.get("_idComponenteEncriptado").value,
      this.formSeccionComponenteCuestionarioGenerico.get("_descripcion").value,
      this.formSeccionComponenteCuestionarioGenerico.get("_orden").value
    )
    .then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarSeccionesDeComponentesDeCuestionario(this.formSeccionComponenteCuestionarioGenerico.get("_idComponenteEncriptado").value);
        this.formSeccionComponenteCuestionarioGenerico.reset();
        this._btnAccionS="Guardar";
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{

    }).finally(()=>{});
  }

  _listaTipoPreguntaSeccionComponenteCuestionarioGenericoService:any[]=[];
  _consultarTiposPreguntas(){
    this.tipoPreguntaSeccionComponenteCuestionarioGenericoService._consultarTipoPreguntas()
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaTipoPreguntaSeccionComponenteCuestionarioGenericoService=data['respuesta'];
        }
      }).catch(error=>{

      }).finally(()=>{});
  }
  agregarLeyendas=false;
  _onChangeCmb_cmbTipoPregunta(event?){
    var TipoPregunta = this._listaTipoPreguntaSeccionComponenteCuestionarioGenericoService.find(p=>p.IdTipoPreguntaEncriptado == this._cmbTipoPregunta.value);
    if(TipoPregunta.Identificador == 4){
      this.agregarLeyendas=true;
      this.checked = true;
    }else{
      this.agregarLeyendas=false;
      this.checked = false;
    }
  }

  _listaPreguntasSeccionComponenteCuestionarioGenerico:any[]=[];
  _consultarPreguntasSeccionComponenteCuestionarioGenerico(idSeccionEncriptado){
    
    let id = this.formCuestionarioGenerico.get("_cmbSeccionComponenteCuestionarioGenerico").value;
    this.preguntaSeccionComponenteCuestionarioGenericoService._consultarPreguntasSeccionComponenteCuestionarioGenerico(idSeccionEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          console.log(data);
          
          this._listaPreguntasSeccionComponenteCuestionarioGenerico= data['respuesta'];

          //this._listaPreguntasSeccionComponenteCuestionarioGenerico.sort(data=>data.Orden);

        }
      }).catch(error=>{
        console.log(error);
        
      }).finally(()=>{

      });
  }

  _validarAccionFormformPreguntaSeccionComponenteCuestionarioGenerico(){
    if (this._btnAccionP=="Guardar") {
      this._insertarPreguntaSeccionComponenteCuestionarioGenerico();
    }else if(this._btnAccionP=="Actualizar"){
      this._modificarPreguntaSeccionDeComponenteDeCuestionarioGenerico();
    }
  }

  _btnAccionP="Guardar";
  _insertarPreguntaSeccionComponenteCuestionarioGenerico(){
    console.log(this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_obligatorio").value);

    

    let _orden = this._listaPreguntasSeccionComponenteCuestionarioGenerico.length+1; 
    //console.log(_orden);
    
    if (this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_obligatorio").value==null) {
      this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_obligatorio").setValue(true);
    }

    //console.log(this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_obligatorio").value);
    

    this.preguntaSeccionComponenteCuestionarioGenericoService._insertarPreguntasSeccionComponenteCuestionarioGenerico(
      this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_cmbTipoPregunta").value,
      this.formCuestionarioGenerico.get("_cmbSeccionComponenteCuestionarioGenerico").value,
      this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_descripcion").value,
      _orden,
      this._obligatorioPregunta,
      this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_leyendaSuperior").value,
      this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_leyendaLateral").value,
      this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_observacion").value
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._listaPreguntasSeccionComponenteCuestionarioGenerico.push(data['respuesta']);
        //this._consultarPreguntasSeccionComponenteCuestionarioGenerico(this.formCuestionarioGenerico.get("_cmbSeccionComponenteCuestionarioGenerico").value);
        this.formPreguntaSeccionComponenteCuestionarioGenerico.reset();
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{

    }).finally(()=>{

    });
  }

  _eliminarPreguntaSeccionComponenteCuestionarioGenerico(_item){
    let id = _item.IdPreguntaEncriptado;
    let idSeccion = _item.Seccion.IdSeccionEncriptado;
    this.preguntaSeccionComponenteCuestionarioGenericoService._eliminarPreguntasSeccionComponenteCuestionarioGenerico(id)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          let element = this._listaPreguntasSeccionComponenteCuestionarioGenerico.find(item=>item.IdPreguntaEncriptado===_item.IdPreguntaEncriptado);
          let index = this._listaPreguntasSeccionComponenteCuestionarioGenerico.indexOf(element);
          let orden = this._listaPreguntasSeccionComponenteCuestionarioGenerico[index].Orden;

          this._listaPreguntasSeccionComponenteCuestionarioGenerico.splice(index,1);
          
          for (let i = index; i<= this._listaPreguntasSeccionComponenteCuestionarioGenerico.length ; i++) {
            this.preguntaSeccionComponenteCuestionarioGenericoService._modificarPreguntasSeccionComponenteCuestionarioGenerico(
              this._listaPreguntasSeccionComponenteCuestionarioGenerico[i].IdPreguntaEncriptado,
              this._listaPreguntasSeccionComponenteCuestionarioGenerico[i].TipoPregunta.IdTipoPreguntaEncriptado,
              this._listaPreguntasSeccionComponenteCuestionarioGenerico[i].Seccion.IdSeccionEncriptado,
              this._listaPreguntasSeccionComponenteCuestionarioGenerico[i].Descripcion,
              this._listaPreguntasSeccionComponenteCuestionarioGenerico[i].leyendaSuperior,
              this._listaPreguntasSeccionComponenteCuestionarioGenerico[i].leyendaLateral,
              this._listaPreguntasSeccionComponenteCuestionarioGenerico[i].Observacion,
              orden,
              this._listaPreguntasSeccionComponenteCuestionarioGenerico[i].Obligatorio,
             
            ).then(data=>{
              if (data['http']['codigo']=='200') {
                
              } else {
                
              }
            }).catch(error=>{

            }).finally(()=>{
              
            });
            orden++;

          }


          // this._consultarPreguntasSeccionComponenteCuestionarioGenerico(idSeccion);
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else{
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }
  
  _OcultarcmbTipoPregunta=false;
  _prepararPreguntaSeccionDeComponenteDeCuestionarioGenerico(_item){

    console.log(_item);
    this._OcultarcmbTipoPregunta=true;
    // this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_cmbTipoPregunta");

    if(_item.TipoPregunta.Identificador == 4){
      this.agregarLeyendas=true;
    }else{
      this.agregarLeyendas=false;
    }
    this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_idPreguntaEncriptado").setValue(_item.IdPreguntaEncriptado);
    this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_cmbTipoPregunta").setValue(_item.TipoPregunta.IdTipoPreguntaEncriptado);
    this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_cmbSeccion").setValue(_item.Seccion.IdSeccionEncriptado);
    this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_descripcion").setValue(_item.Descripcion);
    this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_leyendaSuperior").setValue(_item.leyendaSuperior);
    this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_leyendaLateral").setValue(_item.leyendaLateral);
    
    if(_item.Observacion==true){
      this.checked=true
    }else{
      this.checked=false
    }
    this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_obligatorio").setValue(_item.Obligatorio);
    this._obligatorioPregunta = _item.Obligatorio;
    this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_orden").setValue(_item.Orden);
    this._btnAccionP="Actualizar";
    console.log("obligatorio",this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_obligatorio").value);
    
  }

  _modificarPreguntaSeccionDeComponenteDeCuestionarioGenerico(){
    //this.formCuestionarioGenerico.get("_cmbSeccionComponenteCuestionarioGenerico").value
    this.preguntaSeccionComponenteCuestionarioGenericoService._modificarPreguntasSeccionComponenteCuestionarioGenerico(
      this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_idPreguntaEncriptado").value,
      this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_cmbTipoPregunta").value,
      this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_cmbSeccion").value,
      this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_descripcion").value,
      this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_leyendaSuperior").value,
      this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_leyendaLateral").value,
      this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_observacion").value,
      this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_orden").value,
      this._obligatorioPregunta
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarPreguntasSeccionComponenteCuestionarioGenerico(this.formPreguntaSeccionComponenteCuestionarioGenerico.get("_cmbSeccion").value);
        this._btnAccionP="Guardar";
        this.formPreguntaSeccionComponenteCuestionarioGenerico.reset();
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{
      console.log("PREGUNTA - MODIFICAR -ERROR:",error);
      
    }).finally(()=>{
      this._OcultarcmbTipoPregunta=false;
    });
  }

  _subirPreguntaSeccionComponenteCuestionarioGenerico(_item){
    this.preguntaSeccionComponenteCuestionarioGenericoService._subirPreguntaSeccionComponenteCuestionarioGenerico(_item.IdPreguntaEncriptado
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        const index = this._listaPreguntasSeccionComponenteCuestionarioGenerico.findIndex((inc: any) => inc.IdPreguntaEncriptado === _item.IdPreguntaEncriptado);
        var ElementoAnterior = this._listaPreguntasSeccionComponenteCuestionarioGenerico[index-1];
        this._listaPreguntasSeccionComponenteCuestionarioGenerico[index-1] = this._listaPreguntasSeccionComponenteCuestionarioGenerico[index];   
        this._listaPreguntasSeccionComponenteCuestionarioGenerico[index] = ElementoAnterior;

         //this.allExpandState = !this.allExpandState; 

      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{

    }).finally(()=>{

    });

  }

  _bajarPreguntaSeccionComponenteCuestionarioGenerico(_item){
    this.preguntaSeccionComponenteCuestionarioGenericoService._bajarPreguntaSeccionComponenteCuestionarioGenerico(_item.IdPreguntaEncriptado
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        const index = this._listaPreguntasSeccionComponenteCuestionarioGenerico.findIndex((inc: any) => inc.IdPreguntaEncriptado === _item.IdPreguntaEncriptado);
        var ElementoSiguiente = this._listaPreguntasSeccionComponenteCuestionarioGenerico[index+1];
        this._listaPreguntasSeccionComponenteCuestionarioGenerico[index+1] = this._listaPreguntasSeccionComponenteCuestionarioGenerico[index];   
        this._listaPreguntasSeccionComponenteCuestionarioGenerico[index] = ElementoSiguiente;
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{

    }).finally(()=>{

    });

  }

  _subirComponenteCuestionarioGenerico(_item){

    
    this.preguntaSeccionComponenteCuestionarioGenericoService._subirComponenteCuestionarioGenerico(_item.IdComponenteEncriptado
      ).then(data=>{
        if (data['http']['codigo']=='200') {
          const index = this._listaComponentesCuestionarioGenerico.findIndex((inc: any) => inc.IdComponenteEncriptado === _item.IdComponenteEncriptado);
          var ElementoAnterior = this._listaComponentesCuestionarioGenerico[index-1];
          this._listaComponentesCuestionarioGenerico[index-1] = this._listaComponentesCuestionarioGenerico[index];   
          this._listaComponentesCuestionarioGenerico[index] = ElementoAnterior;
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else {
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error=>{
  
      }).finally(()=>{
  
      });
  }

  _subirSeccionCuestionarioGenerico(_item){
    this.preguntaSeccionComponenteCuestionarioGenericoService._subirSeccionCuestionarioGenerico(_item.IdSeccionEncriptado
      ).then(data=>{
        if (data['http']['codigo']=='200') {
          const index = this._listaSeccionesComponenteCuestionarioGenerico.findIndex((inc: any) => inc.IdSeccionEncriptado === _item.IdSeccionEncriptado);
          var ElementoAnterior = this._listaSeccionesComponenteCuestionarioGenerico[index-1];
          this._listaSeccionesComponenteCuestionarioGenerico[index-1] = this._listaSeccionesComponenteCuestionarioGenerico[index];   
          this._listaSeccionesComponenteCuestionarioGenerico[index] = ElementoAnterior;
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else {
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error=>{
  
      }).finally(()=>{
  
      });
  }

  _bajarComponenteCuestionarioGenerico(_item){

   
    this.preguntaSeccionComponenteCuestionarioGenericoService._bajarComponenteCuestionarioGenerico(_item.IdComponenteEncriptado
      ).then(data=>{
        if (data['http']['codigo']=='200') {
          const index = this._listaComponentesCuestionarioGenerico.findIndex((inc: any) => inc.IdComponenteEncriptado === _item.IdComponenteEncriptado);
          var ElementoSiguiente = this._listaComponentesCuestionarioGenerico[index+1];
          this._listaComponentesCuestionarioGenerico[index+1] = this._listaComponentesCuestionarioGenerico[index];   
          this._listaComponentesCuestionarioGenerico[index] = ElementoSiguiente;
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else {
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error=>{
  
      }).finally(()=>{
  
      });
  }

  _bajarSeccionCuestionarioGenerico(_item){

   
    this.preguntaSeccionComponenteCuestionarioGenericoService._bajarSeccionCuestionarioGenerico(_item.IdSeccionEncriptado
      ).then(data=>{
        if (data['http']['codigo']=='200') {
          const index = this._listaSeccionesComponenteCuestionarioGenerico.findIndex((inc: any) => inc.IdSeccionEncriptado === _item.IdSeccionEncriptado);
          var ElementoSiguiente = this._listaSeccionesComponenteCuestionarioGenerico[index+1];
          this._listaSeccionesComponenteCuestionarioGenerico[index+1] = this._listaSeccionesComponenteCuestionarioGenerico[index];   
          this._listaSeccionesComponenteCuestionarioGenerico[index] = ElementoSiguiente;
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else {
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error=>{
  
      }).finally(()=>{
  
      });
  }

}