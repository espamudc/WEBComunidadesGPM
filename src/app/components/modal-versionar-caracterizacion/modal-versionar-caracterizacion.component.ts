import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { CaracterizacionService } from 'src/app/services/caracterizacion.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-versionar-caracterizacion',
  templateUrl: './modal-versionar-caracterizacion.component.html',
  styleUrls: ['./modal-versionar-caracterizacion.component.css']
})
export class ModalVersionarCaracterizacionComponent implements OnInit {

  constructor(
    private CaracterizacionService: CaracterizacionService,
    private dialogRef: MatDialogRef<ModalVersionarCaracterizacionComponent>,
    private snackBarComponent: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
   }
   accionesEjecutada = false;
   // save() {
   //   this.dialogRef.close(this.accionesEjecutada);
   // }
   close() {
     this.dialogRef.close(this.accionesEjecutada);
   }

  tituloEncabezado = '';
  descripcionEncabezado = '';
  version = '';
  _listaComponentes: any[] = [];
  Publicado = '';
  FechaPublicacion = '';
  Periodo = '';
  PaginaCargada = false;
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
  listaModeloCaracterizacion: any[] = [];

  _consultarCabeceraVersion() {
    this.PaginaCargada=true;
    var ejecutado=false;
    this._listaComponentes=[];
    this.listaModeloCaracterizacion = [];
    this.CaracterizacionService._consultarCabeceraVersionBody(this.data.IdCabeceraVersionModeloEncriptado)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          ejecutado=true;
          this.listaModeloCaracterizacion = data['respuesta'][0];
        } else {
          console.log(data['http']);
        }
      })
      .catch(error => {
        console.log(error);
      }).finally(() => {
        if(ejecutado!=false){
          this._listaComponentes = this.listaModeloCaracterizacion['AsignarComponenteGenerico'];
          this.PaginaCargada=false;
        }
      });
  }
  _ListaVersionDeCaracterizacion: any[] = [];
  eliminarItemComponenteGenerico(data?) {
    var ejecutado=false;
    this.CaracterizacionService._eliminarVersionamientoModelo(
      data.AsignarDescripcionComponenteTipoElemento.VersionamientoModelo.IdVersionamientoModeloEncriptado,
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        this.accionesEjecutada = true;
        if(data['respuesta'] == "true"){
          ejecutado=false;
        }
        if(data['respuesta'] == "false"){
          ejecutado=true;
        }
      } else if (data['http']['codigo'] == '500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      } else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      if(ejecutado!=false){
        this._consultarCabeceraVersion();
      }else{
        this.dialogRef.close(this.accionesEjecutada);
      }
    });
  }
  ngOnInit() {
    this.PaginaCargada=true;
    this.tituloEncabezado = this.data.ModeloGenerico.Nombre;
    this.descripcionEncabezado = this.data.ModeloGenerico.Descripcion;
    this.version = 'VERSIÓN ' + this.data.Version;
    if(this.data.ModeloPublicado==null){
      this.Publicado = '0';
    }else{
      this.Publicado = '1';
      this.FechaPublicacion = this.data.ModeloPublicado.FechaPublicacion;
      this.Periodo = this.data.ModeloPublicado.Periodo.Descripcion;
    }
    this._listaComponentes = this.data.AsignarComponenteGenerico;
    this.PaginaCargada=false;
  }

}
