import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { CaracterizacionService } from 'src/app/services/caracterizacion.service';
import {MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-modal-asignacion-orden',
  templateUrl: './modal-asignacion-orden.component.html',
  styleUrls: ['./modal-asignacion-orden.component.css']
})
export class ModalAsignacionOrdenComponent implements OnInit {

  constructor(
    private CaracterizacionService: CaracterizacionService,
    private dialogRef: MatDialogRef<ModalAsignacionOrdenComponent>,
    private snackBarComponent: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.formAsignarOrden = new FormGroup({
      _orden: new FormControl('', [Validators.required]),
      _componenteDescripcion: new FormControl(''),
      _idComponente : new FormControl(''),
      _idCuestionarioGenerico : new FormControl(''),
      _idAsignacionUsuarioTipoUsuario : new FormControl(''),
      _idModeloGenerico : new FormControl(''),
      _aceptarBoton : new FormControl(''),
      _checkObligatorio : new FormControl(''),
      _idAsignarCuestionarioModelo : new FormControl(''),
    });
  }
  formAsignarOrden: FormGroup;

  get formAsignarOrden_Orden() {
    return this.formAsignarOrden.get("_orden");
  }
  get formAsignarOrden_ComponenteDescripcion() {
    return this.formAsignarOrden.get("_componenteDescripcion");
  }
  get _idComponente() {
    return this.formAsignarOrden.get("_idComponente");
  }
  get _idCuestionarioGenerico() {
    return this.formAsignarOrden.get("_idCuestionarioGenerico");
  }
  get _idAsignacionUsuarioTipoUsuario() {
    return this.formAsignarOrden.get("_idAsignacionUsuarioTipoUsuario");
  }
  get _idModeloGenerico() {
    return this.formAsignarOrden.get("_idModeloGenerico");
  }
  get _aceptarBoton() {
    return this.formAsignarOrden.get("_aceptarBoton");
  }
  get formAsignarOrden_checkObligatorio() {
    return this.formAsignarOrden.get("_checkObligatorio");
  }
  get _idAsignarCuestionarioModelo() {
    return this.formAsignarOrden.get("_idAsignarCuestionarioModelo");
  }
  validarForm()
  {
    this.insertarAsignarCuestionarioModelo();
  }

  insertarAsignarCuestionarioModelo() {
    var ejecutado = false;
    this.CaracterizacionService._insertarAsignarCuestionarioModelo(
      this.data.IdCuestionarioPublicado,
      this._idModeloGenerico.value,
      this._idAsignacionUsuarioTipoUsuario.value,
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        this._idAsignarCuestionarioModelo.setValue(data['respuesta'].IdAsignarCuestionarioModeloEncriptado)
        ejecutado = true;
      } else if (data['http']['codigo'] == '500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      } else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      if(ejecutado!=false){
        this.insertarAsignarComponenteGenerico();
      }
    });
  }

  cargandoGuardar = false;
  insertarAsignarComponenteGenerico() {
    this.cargandoGuardar = true;
    var ejecutado = false;
    // console.log(this._idAsignarCuestionarioModelo.value);
    // console.log(this._idComponente.value);
    // console.log(this.formAsignarOrden_Orden.value);
    this.CaracterizacionService._insertarAsignarComponenteGenerico(
      this._idAsignarCuestionarioModelo.value,
      this._idComponente.value,
      this.formAsignarOrden_Orden.value,
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        ejecutado = true;
        //this._idAsignarCuestionarioModelo.setValue(data['respuesta'].IdAsignarCuestionarioModeloEncriptado)
      } else if (data['http']['codigo'] == '500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      } else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      if(ejecutado!=false){
        this._aceptar();
      }
      this.cargandoGuardar =false;
    });
  }

  mensaje(_mensaje: string, _duracion?: number, _opcion?: number, _color?: string) {
    if (_duracion == null) {
      _duracion = 3000;
    }
    if (_opcion == 1) {
      _mensaje = "Datos ingresados correctamente";
    }
    if (_opcion == 2) {
      _mensaje = "Datos modificados correctamente";
    }
    if (_opcion == 3) {
      _mensaje = "Datos eliminados correctamente";
    }
    if (_color == null) {
      _color = "gpm-danger";
    }
    let snackBarRef = this.snackBarComponent.open(_mensaje, null, { duration: _duracion, panelClass: ['text-white', `${_color}`], data: {} });
  }
  _aceptar(){
    this._aceptarBoton.setValue(1);
    this.dialogRef.close(this.formAsignarOrden);
  }
  _cancelar(){
    this._aceptarBoton.setValue(0);
    this.dialogRef.close(this.formAsignarOrden);
  }



  ngOnInit() {
    this.formAsignarOrden_ComponenteDescripcion.setValue(this.data.AsignarCuestionarioModelo.Descripcion);
    this._idComponente.setValue(this.data.AsignarCuestionarioModelo.IdComponenteEncriptado);
    this._idCuestionarioGenerico.setValue(this.data.AsignarCuestionarioModelo.CuestionarioGenerico.IdCuestionarioGenericoEncriptado);
    this._idAsignacionUsuarioTipoUsuario.setValue(this.data.AsignacionTipoUsuario);
    this._idModeloGenerico.setValue(this.data.IdModeloGenerico);
  }

}
