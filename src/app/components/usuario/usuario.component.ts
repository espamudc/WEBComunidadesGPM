import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
import { MatTable, MatSnackBar, getMatTooltipInvalidPositionError } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort'; 
import { MatPaginator } from '@angular/material/paginator';
export interface DialogData {
  cedula: string;
  idPersona: string;
  idUsuario: string;
  nombres: string;
  apellidos: string;
}
export interface UserForm {
  _idUsuarioEncriptado: string;
  _idPersonaEncriptado: string;
  _numeroIdentificacion: string,
  _nombres: string,
  _apellidos: string,
  _usuario: string,
  _clave: string
}
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  estadoHidden: boolean = false;
  myForm: FormGroup;
  formUsuario: FormGroup;
  clave:string;
  @ViewChild('testButton', { static: false }) testButton: ElementRef;
  @ViewChild('testInput', { static: false }) testInput: ElementRef;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private modalAsignacionUsuarioPersona: MatDialog,
    private modalAsignacionUsuarioTiposUsuario: MatDialog,
    private usuarioService: UsuarioService,
    private snackBarComponent: MatSnackBar
  ) {
    this.formulario();
  }
  formulario() {
    this.formUsuario = new FormGroup({
      _idUsuarioEncriptado: new FormControl(''),
      _idPersonaEncriptado: new FormControl(''),
      _numeroIdentificacion: new FormControl({ value: '', disabled: true }, Validators.required),
      _nombres: new FormControl({ value: '', disabled: true }, [Validators.required]),
      _apellidos: new FormControl({ value: '', disabled: true }, [Validators.required]),
      _usuario: new FormControl('', [Validators.required]),
      _clave: new FormControl('', [Validators.required])
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this._consultarUsuarios();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  get formUsuario_idUsuarioEncriptado() {
    return this.formUsuario.get('_idUsuarioEncriptado');
  }
  get formUsuario_idPersonaEncriptado() {
    return this.formUsuario.get('_idPersonaEncriptado');
  }
  get formUsuario_numeroIdentificacion() {
    return this.formUsuario.get('_numeroIdentificacion');
  }
  get formUsuario_nombres() {
    return this.formUsuario.get('_nombres');
  }
  get formUsuario_apellidos() {
    return this.formUsuario.get('_apellidos');
  }
  get formUsuario_usuario() {
    return this.formUsuario.get('_usuario');
  }
  get formUsuario_clave() {
    return this.formUsuario.get('_clave');
  }
  clearMenssageError() {
    this.formUsuario.controls['_usuario'].setErrors(null);
    this.formUsuario.controls['_clave'].setErrors(null);
  }
  mensaje(_mensaje: string, _duracion?: number, _color?: string) {
    if (_duracion == null) {
      _duracion = 3000;
    }
    if (_color == null) {
      _color = "gpm-danger";
    }
    let snackBarRef = this.snackBarComponent.open(_mensaje, null, { duration: _duracion, panelClass: [`${_color}`], verticalPosition: 'bottom', horizontalPosition: 'end'});
  }
  validarForm() {
    if (this._refrescar == true) {
      this._modificarUsuario2();
    } else {
      this._insertarUsuario2();
    }
  }
  _refrescarForm2() {
    this.formUsuario.reset();
    this._refrescar = false;
    this.clearMenssageError();
    this.formUsuario.setErrors({ invalid: true });
  }
  _insertarUsuario2() {
    if (this.formUsuario_clave.value == null || this.formUsuario_usuario.value == null) {
         this.mensaje("Ingrese el usuario y/o contraseña");
    } else {
      this.usuarioService._insertarUsuario(
        this.formUsuario_idPersonaEncriptado.value,
        this.formUsuario_usuario.value,
        this.formUsuario_clave.value
      ).then(data => {
        if (data['http']['codigo'] == '200') {
          this._consultarUsuarios();
          this.formUsuario.reset();
          this.clearMenssageError();
          this.formUsuario.setErrors({ invalid: true });
          this.mensaje("Usuario registrado", null, 'msj-success');
        } else if (data['http']['codigo'] == '500') {
          this.mensaje("Selecciona la persona para asignar el usuario");
        } else if (data['http']['mensaje'] == 'Ingrese el identificador') {
          this.mensaje("Seleccione una persona");
        } else {
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error => {
      });
    }
  }
  _modificarUsuario2() {
    debugger
    if(this.formUsuario_clave.value){
      this.clave=this.formUsuario_clave.value;
    } 
    this.usuarioService._modificarUsuario(
      this.formUsuario_idUsuarioEncriptado.value,
      this.formUsuario_idPersonaEncriptado.value,
      this.formUsuario_usuario.value,
      this.clave
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        this._consultarUsuarios();
        this._refrescarForm2();
        this.clearMenssageError();
        this.formUsuario.setErrors({ invalid: true });
        this.mensaje("Registro actualizado", null, 'msj-success');
      } else if (data['http']['codigo'] == '500') {
        this.mensaje("Selecciona la persona para asignar el usuario", null, 'msj-info');
      } else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error => {
      this.mensaje("Verifique si faltan por completar")
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
  tablaUsuarios = ['usuario', 'nombres', 'acciones'];
  //--------------------------------------------------------------------------------------------
  _listaUsuarios: any[] = [];
  @ViewChild(MatTable, { static: false }) MATtableUsuarios: MatTable<any>;
  _consultarUsuarios() {
    this.usuarioService._cosultarUsuarios()
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this._listaUsuarios = data['respuesta'];
          this.dataSource.data =  this._listaUsuarios
        } else {
        }
      })
      .catch(error => {
      });
  }
  _prepararUsuario(_usuario: any) {
    debugger
    this.formUsuario_idUsuarioEncriptado.setValue(_usuario.IdUsuarioEncriptado);
    this.formUsuario_idPersonaEncriptado.setValue(_usuario.Persona.IdPersonaEncriptado);
    this.formUsuario_nombres.setValue(_usuario.Persona.PrimerNombre + " " + _usuario.Persona.SegundoNombre);
    this.formUsuario_apellidos.setValue(_usuario.Persona.PrimerApellido + " " + _usuario.Persona.SegundoApellido);
    this.formUsuario_numeroIdentificacion.setValue(_usuario.Persona.NumeroIdentificacion);
    this.formUsuario_usuario.setValue(_usuario.Correo);
    this.clave=_usuario.ClaveEncriptada;
    this._refrescar = true;
    this.formUsuario.controls['_clave'].setErrors(null);
  }
  _refrescar: boolean = false;
  _eliminarUsuario(_item) {
    this.usuarioService._eliminarUsuario(
      _item.IdUsuarioEncriptado
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        this._consultarUsuarios();
        this._refrescarForm2();
        this.clearMenssageError();
        this.formUsuario.setErrors({ invalid: true });
        this.mensaje("Registro eliminado",null,'msj-success');
        var obj = this._listaUsuarios.find(dato => dato._IdUsuarioEncriptado === _item.IdUsuarioEncriptado);
        var indexOf = this._listaUsuarios.indexOf(obj);
        this._listaUsuarios.splice(indexOf, 1);
      } else if (data['http']['codigo'] == '500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      } else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error => {
    });
  }
  _abrirModalAsignacionUsuarioTiposUsuario(_usuario) {
    let dialogRef = this.modalAsignacionUsuarioTiposUsuario.open(ModalAsignacionUsuarioTiposUsuarioComponent, {
      width: '500px',
      height: 'auto',
      data: {
        _usuario: _usuario,
      }
    });
  }
  _persona: any;
  _abrirModalAsignacionUsuarioPersona() {
    let dialogRef = this.modalAsignacionUsuarioPersona.open(ModalAsignacionUsuarioPersonaComponent, {
      width: 'auto',
      height: 'auto',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._persona = result;
        this.formUsuario_idPersonaEncriptado.setValue(result.IdPersonaEncriptado);
        this.formUsuario_nombres.setValue(result.PrimerNombre + ' ' + result.SegundoNombre);
        this.formUsuario_apellidos.setValue(result.PrimerApellido + ' ' + result.SegundoApellido);
        this.formUsuario_numeroIdentificacion.setValue(result.NumeroIdentificacion);
      }
    }, error => { }, () => {
    });
  }
}
