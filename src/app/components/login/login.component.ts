import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

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

    localStorage.setItem("_correo",'');
    localStorage.setItem("_clave",'');
    localStorage.setItem("token",'');
    localStorage.setItem('IdAsignarUsuarioTipoUsuarioEncriptado','');
    localStorage.setItem('IdTipoUsuarioEncriptado','');
    
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
    this.usuarioService._login(this._correo,this._clave,"")
        .then(data=>{
          if (data['http']['codigo']=='200') {

            this._verFormularioLogin=false;
            this._misTiposUsuarios = data['respuesta'];
            localStorage.setItem("token", data['token']);

            if (this._misTiposUsuarios.length<0) {
              this.mensaje("No Tiene Roles Asignados");
            }else if (this._misTiposUsuarios.length==1) {

              localStorage.setItem('IdAsignarUsuarioTipoUsuarioEncriptado',this._misTiposUsuarios[0].IdAsignarUsuarioTipoUsuarioEncriptado)
              localStorage.setItem('IdTipoUsuarioEncriptado',this._misTiposUsuarios[0].TipoUsuario.IdTipoUsuarioEncriptado)
              if (localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado').length==0) {

              }else{
                this.router.navigateByUrl("/inicio/inicio");
              }

            }else if (this._misTiposUsuarios.length>1) {
              this._verFormularioMisTiposUsuarios=true;
            }

          }else if (data['http']['codigo']=='500') {
            this.mensaje("A ocurrido un error inesperado, intente más tarde.")
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

    if (this.formMisRoles.get('_cmbTiposUsuarios').value!=null ) {
      localStorage.setItem("IdAsignarUsuarioTipoUsuarioEncriptado",this.formMisRoles.get('_cmbTiposUsuarios').value);
      localStorage.setItem("IdTipoUsuarioEncriptado",this.formMisRoles.get('_cmbTiposUsuarios').value);
      if (localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado').length==0) {

      }else{
        this.router.navigateByUrl("/inicio/inicio");
      }

    }else{
      this.mensaje("Seleccione un Rol");
    }

  }
  idRol = "0";
  _seleccionarRol(event){
    this.idRol = event.target.value;
  }

}
