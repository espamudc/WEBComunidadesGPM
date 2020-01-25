import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { PanelAdministracionService } from 'src/app/services/panel-administracion.service';
import { PersonaService } from 'src/app/services/persona.service';
import { Parroquia } from 'src/app/interfaces/parroquia/parroquia';
import { Canton } from 'src/app/interfaces/canton/canton';
import sweetalert from 'sweetalert';
import { LugaresService } from 'src/app/services/lugares.service';
import { CantonComponent } from '../canton/canton.component';
import { MatTable } from '@angular/material';


@Component({
  selector: 'app-parroquia',
  templateUrl: './parroquia.component.html',
  styleUrls: ['./parroquia.component.css']
})
export class ParroquiaComponent implements OnInit {

  

  constructor(
    private lugaresService:LugaresService
  ) {

  }

  ngOnInit() {
    this._consultarParroquias();
    this._consultarCantones();
  }

  tablaParroquias = ['codigo','parroquia', 'canton', 'acciones'];
  tablaCantones = ['canton', 'acciones'];

  _idCantonEncriptado=""; _nombreCanton=""; _listaCantones:any[]=[]; _idProvinciaEncriptado=""; _nombreProvincia="";// la Canton que se escoje

  _validar=true;
  _idParroquiaEncriptado="";
  _codigoParroquia="";
  _nombreParroquia="";
  _descripcionParroquia="";
  _rutaLogoParroquia="";

  _btnAccion="Guardar";

  @ViewChild('frmParroquia',{static:false}) frmParroquia:Form;
  @ViewChild(CantonComponent,{static:false}) CantonComponent: CantonComponent;

  _limpiarForm(){
    //----------Provincia-------------
    this._idProvinciaEncriptado ="";
    this._nombreProvincia ="";
    //----------Canton-------------
    this._idCantonEncriptado = "";
    this._nombreCanton       = "";
    //------------------------------
    this._idParroquiaEncriptado="";
    this._codigoParroquia="";
    this._nombreParroquia="";
    this._descripcionParroquia="";
    this._rutaLogoParroquia="";

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
      this._codigoParroquia      !="" &&
      this._nombreParroquia      !="" &&
      this._nombreCanton   !=""
      // this._descripcionParroquia !="" &&
      // this._rutaLogoParroquia    !=""
    ) {
      this._validar=false;
    }else{
      this._validar=true;
    }

  }

  _validarBoton(){
    if (
      this._codigoParroquia      !="" &&
      this._nombreParroquia      !="" &&
      this._nombreCanton         !="" &&
      this._nombreProvincia      !=""
      // this._descripcionParroquia !="" &&
      // this._rutaLogoParroquia    !=""
    ) {
      this._validar=false;
    }else{
      this._validar=true;
    }
  }

  _validarFormulario(){
    if (
      this._codigoParroquia      !="" &&
      this._nombreParroquia
      // this._descripcionParroquia !="" &&
      // this._rutaLogoParroquia    !=""
    ) {
      if (this._validar===false) {
        if (this._btnAccion==="Guardar") {
          this._ingresarParroquia();
        }else if (this._btnAccion==="Modificar") {
          this._modificarParroquia();
        }
      }

    }
  }

  _listaParroquias:any[]=[];
  _consultarParroquias(){
    //this.native_codigoParroquia.nativeElement.value;
    this.lugaresService._consultarParroquias()
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaParroquias=data['respuesta'];
          console.log(this._listaParroquias);

        }else{
          console.log(data['http']);
        }
      })
      .catch(error=>{
        console.log(error);
      }).finally(()=>{

      });
  }

  _ingresarParroquia(){

    this.lugaresService._insertarParroquia(
      this._codigoParroquia,
      this._nombreParroquia,
      this._descripcionParroquia,
      this._rutaLogoParroquia,
      this._idCantonEncriptado,
      this._idProvinciaEncriptado,
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarParroquias();
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
  _modificarParroquia(){
    this.lugaresService._modificarParroquia(
      this._idParroquiaEncriptado,
      this._codigoParroquia,
      this._nombreParroquia,
      this._descripcionParroquia,
      this._rutaLogoParroquia,
      this._idCantonEncriptado,
      this._idProvinciaEncriptado
    ).then(data=>{
      // console.log(data);
      
      if (data['http']['codigo']=='200') {
        this._consultarParroquias();
        this._limpiarForm();
      }else{
        console.log(data['http']);
      }
    }).catch(error=>{

    }).finally(()=>{

    });
  }
  _eliminarParroquia(_item){
    this.lugaresService._eliminarParroquia(
      _item.IdParroquiaEncriptado
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarParroquias();
      }else{
        console.log(data['http']);
      }
    }).catch(error=>{

    }).finally(()=>{

    });
  }
  _CantonQuitada:any="";
  _prepararParroquia(_item){
    //------------------Provincia--------------------------------------
    this._idProvinciaEncriptado = _item.Canton.Provincia.IdProvinciaEncriptado;
    this._nombreProvincia       = _item.Canton.Provincia.NombreProvincia;
    //------------------Canton----------------------------------------
    this._idCantonEncriptado = _item.Canton.IdCantonEncriptado;
    this._nombreCanton       = _item.Canton.NombreCanton;
    //---------------------------------------------------------
    this._idParroquiaEncriptado =_item.IdParroquiaEncriptado;
    this._codigoParroquia       =_item.CodigoParroquia;
    this._nombreParroquia       =_item.NombreParroquia;
    this._descripcionParroquia  =_item.DescripcionParroquia;
    this._rutaLogoParroquia     =_item.RutaLogoParroquia;
    this._btnAccion = "Modificar";
    this._validarBoton();
  }
  @ViewChild('MatTableCantones',{static:false}) MatTableCantones :MatTable<any>;
  _prepararCanton(_item){
    //------------------Provincia--------------------------------------
    this._idProvinciaEncriptado = _item.Provincia.IdProvinciaEncriptado;
    this._nombreProvincia       = _item.Provincia.NombreProvincia;
    //------------------Canton----------------------------------------
    this._idCantonEncriptado =_item.IdCantonEncriptado;
    this._nombreCanton       =_item.NombreCanton;

    // this._idProvinciaEncriptado = _item.Provincia.IdProvinciaEncriptado;

    if (this._CantonQuitada!="") {
      // this._consultarCantones();
      this._listaCantones.push(this._CantonQuitada);

    }
    
    var obj = this._listaCantones.find(dato=>dato.IdCantonEncriptado==_item.IdCantonEncriptado);
    console.log(obj);
    
    var index = this._listaCantones.indexOf(obj);
    console.log(index);
    
    this._listaCantones.splice(index,1);
    this._CantonQuitada = _item;

    this.MatTableCantones.dataSource = this._listaCantones;
    // this._listaCantones.sort();
    this.MatTableCantones.renderRows();

  }

  _consultarCantones(){
    //this.native_codigoCanton.nativeElement.value;
    this.lugaresService._consultarCantones()
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaCantones=data['respuesta'];
        }else{
          console.log(data['http']);
        }
      })
      .catch(error=>{
        console.log(error);
      }).finally(()=>{
        // this._listaCantones.sort();
      });
  }

}


