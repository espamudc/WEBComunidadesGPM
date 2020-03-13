import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { LugaresService } from 'src/app/services/lugares.service';
// import { PersonaService } from 'src/app/services/persona.service';
// import { Provincia } from 'src/app/interfaces/provincia/provincia';
import sweetalert from 'sweetalert';
import { MatTable, MatDialog, MatSnackBar, MatButton } from '@angular/material';
import { ModalLugarRepresentanteComponent } from '../modal-lugar-representante/modal-lugar-representante.component';
// import { MatTable } from '@angular/material';


@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.css']
})
export class ProvinciaComponent implements OnInit,AfterContentInit {

  // myForm: FormGroup;
  @ViewChild('testButton', { static: false }) testButton: ElementRef;

  constructor(
    private lugaresService:LugaresService,
    private modalLugarRepresentante:MatDialog,
    private snackBarComponent:MatSnackBar
  ) {
    this.formProvincia = new FormGroup({
      _idProvinciaEncriptado  : new FormControl(''),
      _codigo                 : new FormControl('',[Validators.required]),
      _nombre                 : new FormControl('',[Validators.required]),
      _descripcion            : new FormControl(''),
      _rutaLogoProvincia      : new FormControl(''),
    });
  }

  ngOnInit() {
    
   this._consultarProvincias();
   
  }
  ngAfterContentInit(){
    //this.btnAccionHtml._elementRef.nativeElement.addClass('col-6');
  }
  
  //-----------------------------------------------------------------------------------------
  formProvincia : FormGroup;

  get formProvincia_idProvinciaEncriptado(){
    return this.formProvincia.get("_idProvinciaEncriptado");
  }
  get formProvincia_codigo(){
    return this.formProvincia.get("_codigo");
  }
  get formProvincia_nombre(){
    return this.formProvincia.get("_nombre");
  }
  get formProvincia_rutaLogoProvincia(){
    return this.formProvincia.get("_rutaLogoProvincia");
  }
  get formProvincia_descripcion(){
    return this.formProvincia.get("_descripcion");
  }
  //-----------------------------------------------------------------------------------------
  

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

  _validarFormProvincia(){
    if (this._btnAccion==="Guardar") {
      this._ingresarProvincia2();
    }else if (this._btnAccion==="Modificar") {
      this._modificarProvincia2();
    } 
  }
  _ingresarProvincia2(){

    if (
      this.formProvincia_descripcion.value == null || 
      this.formProvincia_descripcion.value == 'null' 
    ) {
      this.formProvincia_descripcion.setValue('');
    }
    if (
      this.formProvincia_rutaLogoProvincia.value == null || 
      this.formProvincia_rutaLogoProvincia.value == 'null' 
    ) {
      this.formProvincia_rutaLogoProvincia.setValue('');
    }

    this.lugaresService._insertarProvincia(
      this.formProvincia_codigo.value,
      this.formProvincia_nombre.value,
      this.formProvincia_descripcion.value,
      this.formProvincia_rutaLogoProvincia.value,
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarProvincias();
        this.formProvincia.reset();
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        console.log(data['http']);
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{
      
    }).finally(()=>{

    });
  }
  _modificarProvincia2(){
    if (
      this.formProvincia_descripcion.value == null || 
      this.formProvincia_descripcion.value == 'null' 
    ) {
      this.formProvincia_descripcion.setValue('');
    }
    if (
      this.formProvincia_rutaLogoProvincia.value == null || 
      this.formProvincia_rutaLogoProvincia.value == 'null' 
    ) {
      this.formProvincia_rutaLogoProvincia.setValue('');
    }
    
    this.lugaresService._modificarProvincia(
      this.formProvincia_idProvinciaEncriptado.value,
      this.formProvincia_codigo.value,
      this.formProvincia_nombre.value,
      this.formProvincia_descripcion.value,
      this.formProvincia_rutaLogoProvincia.value
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarProvincias();
        this.formProvincia.reset();
        this._btnAccion ="Modificar";
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        console.log(data['http']);
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{
      
    }).finally(()=>{
      
    });
  }
  //-----------------------------------------------------------------------------------------
  _validar=true;

  tablaProvincias = ['codigo','provincia', 'acciones'];
  
  _idProvinciaEncriptado="";
  _codigoProvincia="";
  _nombreProvincia="";
  _descripcionProvincia="";
  _rutaLogoProvincia="";

  _btnAccion="Guardar";

  @ViewChild('frmProvincia',{static:false}) frmProvincia:Form;
  @ViewChild(MatTable,{static:false})  MatTableProvincias : MatTable<any>;

  _limpiarForm(){
    this._idProvinciaEncriptado="";
    this._codigoProvincia="";
    this._nombreProvincia="";
    this._descripcionProvincia="";
    this._rutaLogoProvincia="";

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
      this._codigoProvincia      !="" &&
      this._nombreProvincia     
      // this._descripcionProvincia !="" &&
      // this._rutaLogoProvincia    !="" 
    ) {
      this._validar=false;
    }else{
      this._validar=true;
    }

  }

  _validarBoton(){
    if (
      this._codigoProvincia      !="" &&
      this._nombreProvincia     
      // this._descripcionProvincia !="" &&
      // this._rutaLogoProvincia    !="" 
    ) {
      this._validar=false;
    }else{
      this._validar=true;
    }
  }

  _validarFormulario(){
    if (
      this._codigoProvincia      !="" &&
      this._nombreProvincia      
      // this._descripcionProvincia !="" &&
      // this._rutaLogoProvincia    !="" 
    ) {
      if (this._validar===false) {
        if (this._btnAccion==="Guardar") {
          this._ingresarProvincia();
        }else if (this._btnAccion==="Modificar") {
          this._modificarProvincia();
        } 
      }
      
    }
  }




  _listaProvincias:any[]=[];
  _consultarProvincias(){
    //this.native_codigoProvincia.nativeElement.value;
    this.lugaresService._consultarProvincias()
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaProvincias=data['respuesta'];
          console.log(data['respuesta']);
          
        }else{
          console.log(data['http']);
        }
      })
      .catch(error=>{
        console.log(error);
      }).finally(()=>{

      });
  }

  _ingresarProvincia(){
    this.lugaresService._insertarProvincia(
      this._codigoProvincia,
      this._nombreProvincia,
      this._descripcionProvincia,
      this._rutaLogoProvincia
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarProvincias();
        this._limpiarForm();
        this._validar=true;
        this._validarBoton();
        // this._validarFormulario();
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        console.log(data['http']);
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{
      
    }).finally(()=>{

    });
  }
  _modificarProvincia(){
    this.lugaresService._modificarProvincia(
      this._idProvinciaEncriptado,
      this._codigoProvincia,
      this._nombreProvincia,
      this._descripcionProvincia,
      this._rutaLogoProvincia
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarProvincias();
        this._limpiarForm();
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        console.log(data['http']);
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{
      
    }).finally(()=>{
      
    });
  }
  _eliminarProvincia(_item){
    this.lugaresService._eliminarProvincia(
      _item.IdProvinciaEncriptado
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarProvincias();
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        console.log(data['http']);
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{
      
    }).finally(()=>{
      
    });
  }

  _prepararProvincia(_item){
    
    this.formProvincia_idProvinciaEncriptado.setValue(_item.IdProvinciaEncriptado);
    this.formProvincia_codigo               .setValue(_item.CodigoProvincia);
    this.formProvincia_nombre               .setValue(_item.NombreProvincia);
    this.formProvincia_descripcion          .setValue(_item.DescripcionProvincia);
    this.formProvincia_rutaLogoProvincia    .setValue(_item.RutaLogoProvincia);
    // this.formProvincia_idProvinciaEncriptado.setValue(_item.IdProvinciaEncriptado);


    this._idProvinciaEncriptado =_item.IdProvinciaEncriptado;
    this._codigoProvincia       =_item.CodigoProvincia;
    this._nombreProvincia       =_item.NombreProvincia;
    this._descripcionProvincia  =_item.DescripcionProvincia;
    if (this._descripcionProvincia=='null') {
      this._descripcionProvincia="";
    }
    this._rutaLogoProvincia     =_item.RutaLogoProvincia;
    this._btnAccion = "Modificar";
    this._validarBoton();

  }
  
  _verRepresentante(_item){
    let dialogRef = this.modalLugarRepresentante.open(ModalLugarRepresentanteComponent, {
      width: 'auto',
      height: 'auto',
      data: { lugar_tipo: 'provincia', lugar_data: _item }
    });
    dialogRef.afterClosed().subscribe(result=>{
      // console.log(result);
      if (result) {
        
      }
    },erro=>{

    },()=>{
      this._consultarProvincias();
    }); 

  }



}