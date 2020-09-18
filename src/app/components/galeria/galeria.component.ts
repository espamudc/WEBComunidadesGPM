import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators, Form, FormBuilder } from '@angular/forms';
import { CaracterizacionService } from 'src/app/services/caracterizacion.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from "@angular/material/dialog";
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<GaleriaComponent>,
    private CaracterizacionService: CaracterizacionService,
    private snackBarComponent: MatSnackBar,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // private _electronService: ElectronService
  ) {}
  incrementador = 1;
  _listaImagenes:any[]=[];
  mostrarCarpeta() {
    this._listaImagenes = [];
    var ejecutado = false;
    this.CaracterizacionService.obtenerCarpeta()
      .then(data => {
        if (data['http']['codigo'] == '200') {
          ejecutado = true;
          this._listaImagenes = data['respuesta'];
          console.log(data['respuesta'])
        } else if (data['http']['codigo'] == '500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        } else {
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        if (ejecutado != false) {
        }
      });
  }
  addImagen(){

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

  tipoUsurio='';
  ngOnInit() {
    this.tipoUsurio= localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado');
    if(this.tipoUsurio==''){
      this.router.navigateByUrl("/login");
    }
    //var BrowserWindow = this._electronService.remote.BrowserWindow;
    this.mostrarCarpeta();
  }

}
