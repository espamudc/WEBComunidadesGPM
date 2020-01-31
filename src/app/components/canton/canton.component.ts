import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';

// Services
import { PanelAdministracionService } from 'src/app/services/panel-administracion.service';
import { PersonaService } from 'src/app/services/persona.service';

// Interfaces
import { Provincia } from 'src/app/interfaces/provincia/provincia';
import { Canton } from 'src/app/interfaces/canton/canton';
import sweetalert from 'sweetalert';
import { ProvinciaComponent } from '../provincia/provincia.component';
import { LugaresService } from 'src/app/services/lugares.service';
import { MatTable, MatDialog, MatSnackBar } from '@angular/material';
import { ModalLugarRepresentanteComponent } from '../modal-lugar-representante/modal-lugar-representante.component';

@Component({
  selector: 'app-canton',
  templateUrl: './canton.component.html',
  styleUrls: ['./canton.component.css'],
  // template:`<app-canton (clic)="_consultarProvincias()"></app-canton>`
  // providers: [this._consul]
  // queries:`{{_consultarProvincias()}}`
  // template:`{{_consultarProvincias()}}`
})
export class CantonComponent implements OnInit,AfterViewInit {


  constructor(
    private lugaresService:LugaresService,
    private modalLugarRepresentante:MatDialog,
    private snackBarComponent:MatSnackBar
  ) {

  }


  ngOnInit() {
    //this.provinciaComponent._listaProvincias
    this._consultarCantones();
    this._consultarProvincias();
  }

  ngAfterViewInit(){

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

  tablaCantones = ['codigo','canton', 'provincia', 'acciones'];
  tablaProvincias = ['provincia', 'acciones'];


  _idProvinciaEncriptado=""; _nombreProvincia=""; _listaProvincias:any[]=[]; // la provincia que se escoje

  _validar=true;
  _idCantonEncriptado="";
  _codigoCanton="";
  _nombreCanton="";
  _descripcionCanton="";
  _rutaLogoCanton="";

  _btnAccion="Guardar";

  @ViewChild('frmCanton',{static:false}) frmCanton:Form;
  @ViewChild(ProvinciaComponent,{static:false}) provinciaComponent: ProvinciaComponent;

  _limpiarForm(){

    //----------PROVINCIA-------------
    this._idProvinciaEncriptado = "";
    this._nombreProvincia       = "";
    //------------------------------
    this._idCantonEncriptado="";
    this._codigoCanton="";
    this._nombreCanton="";
    this._descripcionCanton="";
    this._rutaLogoCanton="";

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
      this._codigoCanton      !="" &&
      this._nombreCanton      !="" &&
      this._nombreProvincia   !=""
      // this._descripcionCanton !="" &&
      // this._rutaLogoCanton    !=""
    ) {
      this._validar=false;
    }else{
      this._validar=true;
    }

  }

  _validarBoton(){
    if (
      this._codigoCanton      !="" &&
      this._nombreCanton      !="" &&
      this._nombreProvincia   !=""
      // this._descripcionCanton !="" &&
      // this._rutaLogoCanton    !=""
    ) {
      this._validar=false;
    }else{
      this._validar=true;
    }
  }

  _validarFormulario(){
    if (
      this._codigoCanton      !="" &&
      this._nombreCanton
      // this._descripcionCanton !="" &&
      // this._rutaLogoCanton    !=""
    ) {
      if (this._validar===false) {
        if (this._btnAccion==="Guardar") {
          this._ingresarCanton();
        }else if (this._btnAccion==="Modificar") {
          this._modificarCanton();
        }
      }

    }
  }

  _listaCantones:any[]=[];
  _consultarCantones(){
    //this.native_codigoCanton.nativeElement.value;
    this.lugaresService._consultarCantones()
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaCantones=data['respuesta'];
          console.log(this._listaCantones);

        }else{
          console.log(data['http']);
        }
      })
      .catch(error=>{
        console.log(error);
      }).finally(()=>{

      });
  }

  _ingresarCanton(){

    this.lugaresService._insertarCanton(
      this._codigoCanton,
      this._nombreCanton,
      this._descripcionCanton,
      this._rutaLogoCanton,
      this._idProvinciaEncriptado
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarCantones();
        this._consultarProvincias();
        this._limpiarForm();
        this._validar=true;
        this._validarBoton();
        // this._validarFormulario();
      }else{
        console.log(data['http']);
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{

    }).finally(()=>{

    });
  }
  _modificarCanton(){
    this.lugaresService._modificarCanton(
      this._idCantonEncriptado,
      this._codigoCanton,
      this._nombreCanton,
      this._descripcionCanton,
      this._rutaLogoCanton,
      this._idProvinciaEncriptado
    ).then(data=>{
      // console.log(data);
      
      if (data['http']['codigo']=='200') {
        this._consultarCantones();
        this._consultarProvincias();
        this._limpiarForm();
      }else{
        console.log(data['http']);
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{

    }).finally(()=>{

    });
  }
  _eliminarCanton(_item){
    this.lugaresService._eliminarCanton(
      _item.IdCantonEncriptado
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarCantones();
        this._consultarProvincias();
      }else{
        console.log(data['http']);
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{

    }).finally(()=>{

    });
  }
  _provinciaQuitada:any="";
  _prepararCanton(_item){

    this._idProvinciaEncriptado = _item.Provincia.IdProvinciaEncriptado;
    this._nombreProvincia       = _item.Provincia.NombreProvincia;

    this._idCantonEncriptado =_item.IdCantonEncriptado;
    this._codigoCanton       =_item.CodigoCanton;
    this._nombreCanton       =_item.NombreCanton;
    this._descripcionCanton  =_item.DescripcionCanton;
    if (this._descripcionCanton=='null') {
      this._descripcionCanton="";
    }
    this._rutaLogoCanton     =_item.RutaLogoCanton;
    this._btnAccion = "Modificar";
    this._validarBoton();
  }
  @ViewChild('MatTableProvincias',{static:false}) MatTableProvincias :MatTable<any>;
  _prepararProvincia(_item){

    this._idProvinciaEncriptado =_item.IdProvinciaEncriptado;
    this._nombreProvincia       =_item.NombreProvincia;

    // if (this._provinciaQuitada.IdProvinciaEncriptado!=null) {
      
    //   if (_item.IdProvinciaEncriptado==this._provinciaQuitada.IdProvinciaEncriptado) {
    //     var index = this._listaProvincias.indexOf(_item);
    //     this._listaProvincias.splice(index,1);
    //   }else{
    //     //this._provinciaQuitada = _item;
    //     this.
    //     //var index = this._listaProvincias.indexOf(_item);
    //     //this._listaProvincias.splice(index,1);
    //   }
    // }else{
    //   var index = this._listaProvincias.indexOf(_item);
    //   this._listaProvincias.splice(index,1);
    //   this._provinciaQuitada =_item;
    //   // this._listaProvincias.push(this._provinciaQuitada);
    // }

    // if (this._provinciaQuitada!=null) {
    //   var obj = this._listaProvincias.find(dato=>dato.IdProvinciaEncriptado==this._provinciaQuitada.IdProvinciaEncriptado);
    //   if (obj==null) {
    //     this._listaProvincias.push(this._provinciaQuitada);
    //   }
    // }
    // this._listaProvincias.map(item=>{
    //   if (item.IdProvinciaEncriptado == this._idProvinciaEncriptado) {
    //     var index = this._listaProvincias.indexOf(item);
    //     this._listaProvincias.splice(index,1);
    //   }
    // });

    // var conta = this._listaProvincias.filter(dato=>dato.IdProvinciaEncriptado==_item.IdProvinciaEncriptado).length;


    // if (this._provinciaQuitada!="") {
    //   // this._consultarProvincias();
    //   this._listaProvincias.push(this._provinciaQuitada);

    // }
    
    // var obj = this._listaProvincias.find(dato=>dato.IdProvinciaEncriptado==_item.IdProvinciaEncriptado);
    // console.log(obj);
    
    // var index = this._listaProvincias.indexOf(obj);
    // console.log(index);
    
    // this._listaProvincias.splice(index,1);
    // this._provinciaQuitada = _item;

    this.MatTableProvincias.dataSource = this._listaProvincias;
    // this._listaProvincias.sort();
    this.MatTableProvincias.renderRows();

  }

  _consultarProvincias(){
    //this.native_codigoProvincia.nativeElement.value;
    
    this.lugaresService._consultarProvincias()
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaProvincias=data['respuesta'];
        }else{
          console.log(data['http']);
        }
      })
      .catch(error=>{
        console.log(error);
      }).finally(()=>{
        // this._listaProvincias.sort();
      });
  }


  _verRepresentante(_item){
    let dialogRef = this.modalLugarRepresentante.open(ModalLugarRepresentanteComponent, {
      width: 'auto',
      height: 'auto',
      data: { lugar_tipo: 'canton', lugar_data: _item }
    });
    dialogRef.afterClosed().subscribe(result=>{
      // console.log(result);
      if (result) {
        
      }
    },error=>{

    },()=>{
      this._consultarCantones();
    }); 
  }

}