import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import sweetalert from "sweetalert"

// Services
import { UsuarioService } from 'src/app/services/usuario.service';
import { PersonaService } from 'src/app/services/persona.service';

// Interfaces
import { Usuario } from 'src/app/interfaces/usuario/usuario';
import { Persona } from 'src/app/interfaces/persona/persona';

// Functional Components
import { MatDialog } from "@angular/material/dialog";

// Components
import { ModalAsignacionUsuarioPersonaComponent } from '../modal-asignacion-usuario-persona/modal-asignacion-usuario-persona.component';
import { ModalAsignacionUsuarioTiposUsuarioComponent } from '../modal-asignacion-usuario-tipos-usuario/modal-asignacion-usuario-tipos-usuario.component';
import { ModalDetalleUsuarioComponent } from '../modal-detalle-usuario/modal-detalle-usuario.component';
import { MatTable, MatSnackBar } from '@angular/material';

export interface DialogData {
  cedula: string;
  idPersona: string;
  idUsuario: string;
  nombres: string;
  apellidos: string;
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  myForm: FormGroup;
  @ViewChild('testButton', { static: false }) testButton: ElementRef;
  @ViewChild('testInput', { static: false }) testInput: ElementRef;

  constructor(
    private modalAsignacionUsuarioPersona: MatDialog,
    private modalAsignacionUsuarioTiposUsuario: MatDialog,
    private modalDetalleUsuario: MatDialog,
    private usuarioService: UsuarioService,
    private personaService: PersonaService,
    private snackBarComponent:MatSnackBar
  ) {


    this.formUsuario = new FormGroup({
      _idUsuarioEncriptado : new FormControl(''),
      _idPersonaEncriptado : new FormControl(''),
      _numeroIdentificacion : new FormControl('', [Validators.required]),
      _nombres : new FormControl('', [Validators.required]),
      _apellidos : new FormControl('', [Validators.required]),
      _usuario: new FormControl('', [Validators.required]),
      _clave: new FormControl('', [Validators.required])

    });

  }

  formUsuario : FormGroup;

  get formUsuario_idUsuarioEncriptado(){
    return this.formUsuario.get('_idUsuarioEncriptado');
  }
  get formUsuario_idPersonaEncriptado(){
    return this.formUsuario.get('_idPersonaEncriptado');
  }
  get formUsuario_numeroIdentificacion(){
    return this.formUsuario.get('_numeroIdentificacion');
  }
  get formUsuario_nombres(){
    return this.formUsuario.get('_nombres');
  }
  get formUsuario_apellidos(){
    return this.formUsuario.get('_apellidos');
  }
  get formUsuario_usuario(){
    return this.formUsuario.get('_usuario');
  }
  get formUsuario_clave (){
    return this.formUsuario.get('_clave');
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

  validarForm(){
    if (this._refrescar==true) {
      this._modificarUsuario2();
    } else {
      this._insertarUsuario2();
    }
  }
  _refrescarForm2(){
    this.formUsuario.reset();
    this._refrescar=false;
  }

  _insertarUsuario2(){
    
    this.usuarioService._insertarUsuario(
      this.formUsuario_idPersonaEncriptado.value,
      this.formUsuario_usuario.value,
      this.formUsuario_clave.value
    ).then(data=>{
      if (data['http']['codigo']=='200') {
          this._consultarUsuarios();
          this.formUsuario.reset();
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        console.log(data['http']);
        this.mensaje(data['http']['mensaje']);

      }
    }).catch(error=>{
      console.log(error);
    });
  }

  _modificarUsuario2(){
    
    this.usuarioService._modificarUsuario(
      this.formUsuario_idUsuarioEncriptado.value,
      this.formUsuario_idPersonaEncriptado.value,
      this.formUsuario_usuario.value,
      this.formUsuario_clave.value
    ).then(data=>{
      if (data['http']['codigo']=='200') {
          this._consultarUsuarios();
          this._refrescarForm2();
        
          
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        console.log(data['http']);
        this.mensaje(data['http']['mensaje']);

      }
    }).catch(error=>{
      this.mensaje("Verifique si faltan por completar")
      console.log(error);
    });
  }

  ///---------------------------------------------------------------------------

  botonInsertar = 'insertar';
  cedula = '';
  nombres = '';
  apellidos = '';
  filterUsuario = '';
  idAsignacionTipoUsuario: string;
  idPersona: string;
  idUsuario: string;
  idUsuarioModalAUP: string;
  inputPersona = true;
  
  inputType = 'password';
  resultadoModal: DialogData;
  nuevoUsuario = 'Nuevo Usuario';

  personas: Persona[] = [];
  usuarios: Usuario[] = [];



  mostrarContrasena() {
    if (this.inputType == 'password') {
      this.inputType = 'text';
    }
    else {
      this.inputType = 'password';
    }
  }

 



  ngOnInit() {
    // this.consultarUsuarios();
    //this.cedula = "Numero de Identificacion"
    this._consultarUsuarios();
  }

  tablaUsuarios = ['usuario', 'nombres', 'acciones'];

  //--------------------------------------------------------------------------------------------
  _listaUsuarios:any[]=[];
  @ViewChild(MatTable,{static:false}) MATtableUsuarios: MatTable<any>;


  _consultarUsuarios(){
    this.usuarioService._cosultarUsuarios()
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaUsuarios = data['respuesta'];
          // this.MATtableUsuarios.dataSource = this._listaUsuarios;
        }else{
          console.log(data['http']);
        }
      })
      .catch(error=>{
        console.log(error);
      });
  }

  _prepararUsuario(_usuario:any){
 

    this.formUsuario_idUsuarioEncriptado.setValue( _usuario.IdUsuarioEncriptado);
    this.formUsuario_idPersonaEncriptado.setValue(_usuario.Persona.IdPersonaEncriptado);
    this.formUsuario_nombres.setValue( _usuario.Persona.PrimerNombre +" "+_usuario.Persona.SegundoNombre );
    this.formUsuario_apellidos.setValue( _usuario.Persona.PrimerApellido +" "+_usuario.Persona.SegundoApellido );
    this.formUsuario_numeroIdentificacion.setValue( _usuario.Persona.NumeroIdentificacion);
    this.formUsuario_usuario.setValue( _usuario.Correo);
    this._refrescar=true;

  }

  _refrescar:boolean=false;
  

  _eliminarUsuario(_item){
    console.log(_item.IdUsuarioEncriptado);
    
    this.usuarioService._eliminarUsuario(
      _item.IdUsuarioEncriptado
    ).then(data=>{
      if (data['http']['codigo']=='200') {
          this._consultarUsuarios();
          this._refrescarForm2();
         
          
          var obj= this._listaUsuarios.find(dato=>dato._IdUsuarioEncriptado===_item.IdUsuarioEncriptado);
          var indexOf = this._listaUsuarios.indexOf(obj);
          this._listaUsuarios.splice(indexOf,1);
          
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        console.log(data['http']);
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{
      console.log(error);
    });
  }

  _abrirModalAsignacionUsuarioTiposUsuario(_usuario) {
    // var listaTipoUsuario = _usuario.ListaTipoUsuario;
    let dialogRef = this.modalAsignacionUsuarioTiposUsuario.open(ModalAsignacionUsuarioTiposUsuarioComponent, {
      width: '500px',
      height: 'auto',
      data: {
        _usuario: _usuario,
      }
    });
  }

  _persona:any;
  _abrirModalAsignacionUsuarioPersona() {
    let dialogRef = this.modalAsignacionUsuarioPersona.open(ModalAsignacionUsuarioPersonaComponent, {
      width: 'auto',
      height: 'auto',
      data: { }
    });
    dialogRef.afterClosed().subscribe(result=>{
      // console.log(result);
      if (result) {
        this._persona = result;
        console.log(this._persona);
        this.formUsuario_idPersonaEncriptado.setValue(result.IdPersonaEncriptado); 
        this.formUsuario_nombres.setValue( result.PrimerNombre+' '+result.SegundoNombre);
        this.formUsuario_apellidos.setValue(result.PrimerApellido+' '+result.SegundoApellido);
        this.formUsuario_numeroIdentificacion.setValue(result.NumeroIdentificacion);

       
      }
    },error=>{},()=>{
      
    }); 
  }





}
