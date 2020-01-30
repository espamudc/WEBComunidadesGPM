import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { UsuarioService } from 'src/app/services/usuario.service';
import { SeguridadService } from '../../services/seguridad.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit ,AfterViewInit{

  

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private seguridadService: SeguridadService,
    private snackBarComponent: MatSnackBar,
  ) {
     this.formMisRoles = new FormGroup({
      _cmbTiposUsuarios: new FormControl('',Validators.required),
    });
  }

  get _cmbTiposUsuarios(){
    return this.formMisRoles.get("_cmbTiposUsuarios");
  }


  formMisRoles:FormGroup;
  formValidarCorreo:FormGroup;

  ngOnInit() {
    // console.log(localStorage.getItem("_clave").length);
    // if(localStorage.getItem("_correo").length >0 && localStorage.getItem("_clave").length >0){
    //   console.log("u--p",localStorage.getItem("_clave").toString());
      
    //   this._validarCorreo = false;
    //   this._login=true;
    //   this._correoUsuario = localStorage.getItem("_correo");
    //   this._clave = localStorage.getItem("_clave");

    //   // this._validarIngreso();
      

    // }else if (localStorage.getItem("_correo").length>0) {
    //   console.log(localStorage.getItem("_clave"));
    //   // debugger
    //   this._validarCorreo =true;
    //   this._login = false;
    //   this._correo = localStorage.getItem("_correo");
    //   // this._validarCorreoIngresado();
    // }
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

  

  _login =false;
  _validarCorreo=true;
  _correoUsuario=null;
  _correo="";
  _clave="";
  _misTiposUsuarios:any[]=[];
  _verFormularioLogin=true;
  _verFormularioMisTiposUsuarios=false;
  _cmbComboTipos="";
  _validarCorreoIngresado(){
    this.usuarioService._validarCorreo(this._correo,"")
      .then(data=>{
        if (data['http']['codigo']=='200') {
          
          this._validarCorreo=false;
          this._login =true;
          this._correoUsuario= data['respuesta'];

          localStorage.setItem("_correo",data['respuesta']);

        }else if(data['http']['codigo']=='404'){
          this.mensaje("El usuario no existe. Intentelo de nuevo");
        }else{
          this.mensaje("Problemas en el Servidor. Por favor Intentelo más tarde.");
        }
      }).catch(error=>{

      }).finally(()=>{});
  }

  _onSubmitForm(){
    if (this._validarCorreo==true) {
      this._validarCorreoIngresado();
    }else if (this._login==true) {
      this._validarIngreso();
    }
  }

  _validarIngreso(){
    // debugger
    this.usuarioService._login(this._correo,this._clave,"")
        .then(data=>{
          if (data['http']['codigo']=='200') {

            this._verFormularioLogin=false;
            this._misTiposUsuarios = data['respuesta'];
            localStorage.setItem("_clave",this._clave);

            if (this._misTiposUsuarios.length<0) {
              this.mensaje("No Tiene Roles Asignados");
            }else if (this._misTiposUsuarios.length==1) {
              this.router.navigateByUrl("/inicio");
            }else if (this._misTiposUsuarios.length>1) {
              this._verFormularioMisTiposUsuarios=true;
            }
            
          }else{
            this.mensaje(data['http']['mensaje']);
          }
        }).catch(error=>{

        }).finally(()=>{

        });
  }

  _verMisTiposDeRoles(item:any){

  }
  _ingresarAlSistema(){
    console.log(this.formMisRoles.get('_cmbTiposUsuarios').value);
    
    if (this._cmbComboTipos!=null ) {
      localStorage.setItem("IdTipoUsuarioEncriptado",this._cmbComboTipos);
      this.router.navigateByUrl("/inicio");
    }else{
      this.mensaje("Seleccione un Rol");
    }
    
  }
  idRol = "0";
  _seleccionarRol(event){
    this.idRol = event.target.value;
    console.log(event.target.value);
    
  }

}
