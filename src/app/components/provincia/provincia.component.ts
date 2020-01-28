import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { LugaresService } from 'src/app/services/lugares.service';
// import { PersonaService } from 'src/app/services/persona.service';
// import { Provincia } from 'src/app/interfaces/provincia/provincia';
import sweetalert from 'sweetalert';
import { MatTable, MatDialog } from '@angular/material';
import { ModalLugarRepresentanteComponent } from '../modal-lugar-representante/modal-lugar-representante.component';
// import { MatTable } from '@angular/material';


@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.css']
})
export class ProvinciaComponent implements OnInit {

  // myForm: FormGroup;
  @ViewChild('testButton', { static: false }) testButton: ElementRef;

  constructor(
    private lugaresService:LugaresService,
    private modalLugarRepresentante:MatDialog,
  ) {
    // this.myForm = new FormGroup({
    //   _provincia: new FormControl('', [Validators.required])
    // })
  }

  ngOnInit() {
    
   this._consultarProvincias();
  }

  // get _provincia() {
  //   return this.myForm.get('_provincia');
  // }

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
      }else{
        console.log(data['http']);
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
      }else{
        console.log(data['http']);
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
      }else{
        console.log(data['http']);
      }
    }).catch(error=>{
      
    }).finally(()=>{
      
    });
  }

  _prepararProvincia(_item){
    this._idProvinciaEncriptado =_item.IdProvinciaEncriptado;
    this._codigoProvincia       =_item.CodigoProvincia;
    this._nombreProvincia       =_item.NombreProvincia;
    this._descripcionProvincia  =_item.DescripcionProvincia;
    this._rutaLogoProvincia     =_item.RutaLogoProvincia;
    this._btnAccion = "Modificar";
    this._validarBoton();
  }


  
  _verRepresentante(_item){
    let dialogRef = this.modalLugarRepresentante.open(ModalLugarRepresentanteComponent, {
      width: '900px',
      height: '500px',
      data: { lugar_tipo: 'provincia', lugar_data: _item }
    });
    dialogRef.afterClosed().subscribe(result=>{
      // console.log(result);
      if (result) {
        
      }
    }); 
  }

}