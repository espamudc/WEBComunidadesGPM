import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatTable } from '@angular/material';
import { LugaresService } from 'src/app/services/lugares.service';

@Component({
  selector: 'app-modal-lugar-representante',
  templateUrl: './modal-lugar-representante.component.html',
  styleUrls: ['./modal-lugar-representante.component.css']
})
export class ModalLugarRepresentanteComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private lugaresService:LugaresService
  ) { }

  ngOnInit() {
    this._cargartabla();
  }
  ngAfterViewInit(){
    var _fecha_hoy="";
    var _fecha = new Date();
    var _mes ="";

    console.log(_fecha.getMonth());
    
    if (_fecha.getMonth()>=9){
      _mes = (_fecha.getMonth()+1).toString();
    }
    else if (_fecha.getMonth()<=8) {
      _mes = "0" + (_fecha.getMonth()+1);
    }
    _fecha_hoy = _fecha.getFullYear().toString() + '-' + _mes + '-' + _fecha.getDate().toString();
    this._fechaIngreso_.nativeElement.value= _fecha_hoy;
    this._fechaSalida_.nativeElement.value = _fecha_hoy;
    console.log(_fecha.getFullYear().toString() + '-' + _mes + '-' + _fecha.getDate().toString());
    
  }

  tablaRepresentantes = ['representante','fechaIngreso','fechaSalida', 'acciones'];
  _listaRepresentantes:any[]=[];

  // //PROVINCIA-----------------------------------------
  // _idProvinciaEncriptado="";  _nombreProvincia="";
  // //CANTON--------------------------------------------
  // _idCantonEncriptado="";     _nombreCanton="";
  // //PARROQUIA-----------------------------------------
  // _idParroquiaEncriptado="";  _nombreParroquia="";
  // //COMUNIDAD-----------------------------------------
  // _idComunidadEncriptado="";  _nombreComunidad="";
  // //--------------------------------------------------

  _nombreLugar="";
  _idLugarEcriptado;
  _representante="";
  _fechaIngreso="2020-01-27";
  _fechaSalida="";
  
  @ViewChild('fechaIngreso',{static:false}) _fechaIngreso_  : ElementRef;
  @ViewChild('fechaSalida',{static:false})  _fechaSalida_   : ElementRef;

  _titulo_representante = "";
  _validar=true;
  _btnAccion="Guardar";

  _limpiarForm(){

    this._representante="";
    this._fechaIngreso="";
    this._fechaSalida="";

    this._btnAccion = "Guardar";
    this._validar = true;
  }

  _validarCompletos(event){
    if (event.target.value==="") {
      event.target.classList.add("is-invalid");
    }else{
      event.target.classList.remove("is-invalid");
    }

    if (
      this._nombreLugar      !="" &&
      this._representante    !="" &&
      this._fechaIngreso     !=""     
    ) {
      this._validar=false;
    }else{
      this._validar=true;
    }

  }

  _validarBoton(){
    if (
      this._nombreLugar      !="" &&
      this._representante    !="" &&
      this._fechaIngreso     !=""    
    ) {
      this._validar=false;
    }else{
      this._validar=true;
    }
  }

  _validarFormulario(){
    
    if (
      this._nombreLugar      !="" &&
      this._representante    !="" &&
      this._fechaIngreso     !="" 
    ) {
      if (this._validar===false) {
        if (this._btnAccion==="Guardar") {
          this._ingresarRepresentante();
        }
        // else if (this._btnAccion==="Modificar") {
        //   this._modificarProvincia();
        // } 
      }
      
    }
  }

  @ViewChild(MatTable,{static:false}) MatTableRepresentantes: MatTable<any>;
  _cargartabla(){
    console.log(this.data);
    if (this.data.lugar_tipo=="provincia") {
      this._titulo_representante="PREFECTO";
      this._nombreLugar=this.data.lugar_data.NombreProvincia;
      this._idLugarEcriptado = this.data.lugar_data.IdProvinciaEncriptado;
      this._cargarRepresentanteProvincia();
    }else if(this.data.lugar_tipo=="canton"){
      this._titulo_representante="ALCALDE";
      this._nombreLugar=this.data.lugar_data.NombreCanton;
      this._idLugarEcriptado = this.data.lugar_data.IdCantonEncriptado;
      this._cargarRepresentanteCanton();
    }else if(this.data.lugar_tipo=="parroquia"){
      this._titulo_representante="PRESIDENTE DE LA JUNTA PARROQUIAL";
      this._nombreLugar=this.data.lugar_data.NombreParroquia;
      this._idLugarEcriptado = this.data.lugar_data.IdParroquiaEncriptado;
      this._cargarRepresentanteParroquia();
    }else if(this.data.lugar_tipo=="comunidad"){
      this._titulo_representante="LIDER COMUNITARIO";
      this._nombreLugar=this.data.lugar_data.NombreComunidad;
      this._idLugarEcriptado = this.data.lugar_data.IdComunidadEncriptado;
      this._cargarRepresentanteComunidad();
    }
  }
  _eliminarRepresentante(_item){
    
    if (this.data.lugar_tipo=="provincia") {  
      this._eliminarRepresentanteProvincia(_item);
    }else if(this.data.lugar_tipo=="canton"){
      this._eliminarRepresentanteCanton(_item);
    }else if(this.data.lugar_tipo=="parroquia"){
      this._eliminarRepresentanteParroquia(_item);
    }else if(this.data.lugar_tipo=="comunidad"){
      this._eliminarRepresentanteComunidad(_item);
    }
  }

  _ingresarRepresentante(){
    
    if (this.data.lugar_tipo=="provincia") {
      this._ingresarRepresentanteProvincia();
    }else if(this.data.lugar_tipo=="canton"){
      this._ingresarRepresentanteCanton();
    }else if(this.data.lugar_tipo=="parroquia"){
      this._ingresarRepresentanteParroquia();
    }else if(this.data.lugar_tipo=="comunidad"){
      this._ingresarRepresentanteComunidad();
    }
  }

  _onChangeDateInput(event){
    console.log(event.target.value);
    
  }

  //PROVINCIA-------------------------------------------------------------------------------------------
  _cargarRepresentanteProvincia(){
    this.lugaresService._consultarRepresentanteProvincia(this._idLugarEcriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaRepresentantes = data['respuesta'];
          console.log();
        }else{
          console.log(data['http']);
        }
      }).catch(error=>{
        console.log(error);
      }).finally(()=>{
        console.log(this._listaRepresentantes);
        this.MatTableRepresentantes.renderRows();
      });
  }
  _ingresarRepresentanteProvincia(){
    var _fecha = new Date();

    let __fechaIngreso = this._fechaIngreso_.nativeElement.value +  " 0:00:00";
    let __fechaSalida = this._fechaSalida_.nativeElement.value + " 0:00:00";

    this.lugaresService._insertarRepresentanteProvincia(
      this._idLugarEcriptado,
      this._representante,
      __fechaIngreso,
      __fechaSalida 
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._cargarRepresentanteProvincia();
      }else{
        console.log(data['http']);
      }
    }).catch(error=>{
      console.log(error);
    }).finally(()=>{
      
    });


  }
  _eliminarRepresentanteProvincia(_item){

    this.lugaresService._eliminarRepresentanteProvincia(
      _item.IdPrefectoEncriptado,
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._cargarRepresentanteProvincia();
      }else{
        console.log(data['http']);
      }
    }).catch(error=>{
      console.log(error);
    }).finally(()=>{
      
    });

  }
  //CANTON-------------------------------------------------------------------------------------------
  _cargarRepresentanteCanton(){
    this.lugaresService._consultarRepresentanteCanton(this._idLugarEcriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaRepresentantes = data['respuesta'];
        }else{
          console.log(data['http']);
        }
      }).catch(error=>{
        console.log(error);
      }).finally(()=>{
        this.MatTableRepresentantes.renderRows();
      });
  }
  _ingresarRepresentanteCanton(){
    var _fecha = new Date();

    let __fechaIngreso = this._fechaIngreso_.nativeElement.value +  " 0:00:00";
    let __fechaSalida = this._fechaSalida_.nativeElement.value + " 0:00:00";

    this.lugaresService._insertarRepresentanteCanton(
      this._idLugarEcriptado,
      this._representante,
      __fechaIngreso,
      __fechaSalida 
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._cargarRepresentanteCanton();
      }else{
        console.log(data['http']);
      }
    }).catch(error=>{
      console.log(error);
    }).finally(()=>{
      
    });


  }
  _eliminarRepresentanteCanton(_item){

    this.lugaresService._eliminarRepresentanteCanton(
      _item.IdAlcaldeEncriptado,
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._cargarRepresentanteCanton();
      }else{
        console.log(data['http']);
      }
    }).catch(error=>{
      console.log(error);
    }).finally(()=>{
      
    });

  }
  //PARROQUIA-----------------------------------------------------------------------------------------
  _cargarRepresentanteParroquia(){
    this.lugaresService._consultarRepresentanteParroquia(this._idLugarEcriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          console.log(data['respuesta']);
          
          this._listaRepresentantes = data['respuesta'];
        }else{
          console.log(data['http']);
        }
      }).catch(error=>{
        console.log(error);
      }).finally(()=>{
        this.MatTableRepresentantes.renderRows();
      });
  }
  _ingresarRepresentanteParroquia(){
    var _fecha = new Date();

    let __fechaIngreso = this._fechaIngreso_.nativeElement.value +  " 0:00:00";
    let __fechaSalida = this._fechaSalida_.nativeElement.value + " 0:00:00";

    this.lugaresService._insertarRepresentanteParroquia(
      this._idLugarEcriptado,
      this._representante,
      __fechaIngreso,
      __fechaSalida 
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._cargarRepresentanteParroquia();
      }else{
        console.log(data['http']);
      }
    }).catch(error=>{
      console.log(error);
    }).finally(()=>{
      
    });


  }
  _eliminarRepresentanteParroquia(_item){

    this.lugaresService._eliminarRepresentanteParroquia(
      _item.IdPresidenteJuntaParroquialEncriptado,
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._cargarRepresentanteParroquia();
      }else{
        console.log(data['http']);
      }
    }).catch(error=>{
      console.log(error);
    }).finally(()=>{
      
    });

  }
  //COMUNIDAD---------------------------------------------------------------------------------
  _cargarRepresentanteComunidad(){
    this.lugaresService._consultarRepresentanteComunidad(this._idLugarEcriptado)
    .then(data=>{
      if (data['http']['codigo']=='200') {
        console.log(data['respuesta']);
        this._listaRepresentantes = data['respuesta'];
      }else{
        console.log(data['http']);
      }
    }).catch(error=>{
      console.log(error);
    }).finally(()=>{
      this.MatTableRepresentantes.renderRows();
    });
  }
  _ingresarRepresentanteComunidad(){
    var _fecha = new Date();

    let __fechaIngreso = this._fechaIngreso_.nativeElement.value +  " 0:00:00";
    let __fechaSalida = this._fechaSalida_.nativeElement.value + " 0:00:00";

    this.lugaresService._insertarRepresentanteComunidad(
      this._idLugarEcriptado,
      this._representante,
      __fechaIngreso,
      __fechaSalida 
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._cargarRepresentanteComunidad();
      }else{
        console.log(data['http']);
      }
    }).catch(error=>{
      console.log(error);
    }).finally(()=>{
      
    });


  }
  _eliminarRepresentanteComunidad(_item){

    this.lugaresService._eliminarRepresentanteComunidad(
      _item.IdLiderComunitarioEncriptado,
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._cargarRepresentanteComunidad();
      }else{
        console.log(data['http']);
      }
    }).catch(error=>{
      console.log(error);
    }).finally(()=>{
      
    });

  }
}
