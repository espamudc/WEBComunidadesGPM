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
    this.myForm = new FormGroup({
      _valorUsuario: new FormControl('', [Validators.required]),
      _contrasena: new FormControl('', [Validators.required])
    })
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

  onChangeInputUsuario() {
   
    this._validarCompletos();
  }



  get _valorUsuario() {
    return this.myForm.get('_valorUsuario');
  }

  get _contrasena() {
    return this.myForm.get('_contrasena');
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

  _IdPersonaEncriptado:string="0";
  _insertarUsuario(){
    console.log(this._IdPersonaEncriptado);
    
    this.usuarioService._insertarUsuario(
      this._IdPersonaEncriptado,
      this.myForm.get('_valorUsuario').value,
      this.myForm.get('_contrasena').value
    ).then(data=>{
      if (data['http']['codigo']=='200') {
          this._consultarUsuarios();
          this._refrescarForm();
      }else{
        console.log(data['http']);
        this.mensaje(data['http']['mensaje']);

      }
    }).catch(error=>{
      console.log(error);
    });
  }

  _IdUsuarioEncriptado:string="0";
  _prepararUsuario(_usuario:any){
    console.log(_usuario);
    
    this.testInput.nativeElement.disabled = false;
    this.nuevoUsuario = 'Modificar Usuario';

    this._IdUsuarioEncriptado = _usuario.IdUsuarioEncriptado;
    // debugger
    this._IdPersonaEncriptado = _usuario.Persona.IdPersonaEncriptado;
    this.myForm.get('_valorUsuario').setValue(_usuario.Correo);
    // this.myForm.get('_contrasena').setValue(_usuario.ClaveEncriptada) ;
    this.cedula = _usuario.Persona.NumeroIdentificacion;
    this.nombres = _usuario.Persona.PrimerNombre +" "+_usuario.Persona.SegundoNombre;
    this.apellidos = _usuario.Persona.PrimerApellido +" "+_usuario.Persona.SegundoApellido;
    this._refrescar = true;
    this._validar=false;
    this.testButton.nativeElement.value = "modificar";

  }
  _modificarUsuario(){


    console.log(this._IdPersonaEncriptado);
    
    this.usuarioService._modificarUsuario(
      this._IdUsuarioEncriptado,
      this._IdPersonaEncriptado,
      this.myForm.get('_valorUsuario').value,
      this.myForm.get('_contrasena').value
    ).then(data=>{
      if (data['http']['codigo']=='200') {
          this._consultarUsuarios();
          this._refrescarForm();
          console.log(data);
          
      }else{
        console.log(data['http']);
        this.mensaje(data['http']['mensaje']);

      }
    }).catch(error=>{
      this.mensaje("Verifique si faltan por completar")
      console.log(error);
    });
  }
  _refrescar:boolean=false;
  _refrescarForm(){
    this.myForm.reset();
    this.cedula="Numero de Identificación"
    this.nombres="Nombres";
    this.apellidos="Apellidos";
    this._refrescar = false;
    this.nuevoUsuario = 'Nuevo Usuario';
    this.testButton.nativeElement.value="insertar";
  }

  _eliminarUsuario(_item){
    console.log(_item.IdUsuarioEncriptado);
    
    this.usuarioService._eliminarUsuario(
      _item.IdUsuarioEncriptado
    ).then(data=>{
      if (data['http']['codigo']=='200') {
          this._consultarUsuarios();
          this._refrescarForm();
          console.log(data);
          
          var obj= this._listaUsuarios.find(dato=>dato._IdUsuarioEncriptado===_item.IdUsuarioEncriptado);
          var indexOf = this._listaUsuarios.indexOf(obj);
          this._listaUsuarios.splice(indexOf,1);
          
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
        this._IdPersonaEncriptado = result.IdPersonaEncriptado;
        this.nombres    = result.PrimerNombre+' '+result.SegundoNombre;
        this.apellidos  = result.PrimerApellido+' '+result.SegundoApellido;
        this.cedula     = result.NumeroIdentificacion;
      }
    },error=>{},()=>{
      this._validarCompletos();
    }); 
  }

  _validacionFormulario() {
    console.log(this.testButton.nativeElement.value);
    if (this.myForm.valid) {
      if (this.testButton.nativeElement.value == "insertar") {
        this._insertarUsuario();
      } else if (this.testButton.nativeElement.value == "modificar") {
        this._modificarUsuario();
        this.testButton.nativeElement.value = "insertar";
      }
    }else{
      this.mensaje("Verifique si los datos están completos.")
    }
  }

  _validar=true;
  _validarCompletos(){
    
    if (
      this.nombres     !=""     && 
      this.apellidos   !=""     &&
      this.cedula      !=""     
    ) {
      this._validar=false;
    }else{
      this._validar=true;
    }
  }


}
