import { Injectable, Component, OnInit, ViewChild } from '@angular/core';
import { CaracterizacionService } from 'src/app/services/caracterizacion.service';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ModalVersionarCaracterizacionComponent } from "src/app/components/modal-versionar-caracterizacion/modal-versionar-caracterizacion.component";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ModalAsignacionOrdenComponent } from "src/app/components/modal-asignacion-orden/modal-asignacion-orden.component";
@Component({
  selector: 'app-versionar-caracterizacion',
  templateUrl: './versionar-caracterizacion.component.html',
  styleUrls: ['./versionar-caracterizacion.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class VersionarCaracterizacionComponent implements OnInit {
  constructor(
    private CaracterizacionService: CaracterizacionService,
    private snackBarComponent: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.formVersionar = new FormGroup({
      _formVersionarCaracteristica: new FormControl('', [Validators.required]),
      _formVersionarVersion: new FormControl('', [Validators.required]),
      _formVersionarCmbCaracterizacion: new FormControl('',[Validators.required]),
      _formVersionarIdModeloGenerico: new FormControl(''),
    });
  }
  formVersionar: FormGroup;
  listaModeloCaracterizacion: any[] = [];
  _listaComponentesPorModeloGenerico: any[] = [];
  cabeceraVersionModelo: any[] = [];
  _listaVersiones: any[] = [];
  _idModeloGenerico = '';
  //_VersionesPorCaracterizacion: any[] = [];
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  _VersionesPorCaracterizacion = new MatTableDataSource<Element[]>();
  get formVersionar_Caracteristica() {
    return this.formVersionar.get("_formVersionarCaracteristica");
  }
  get formVersionar_Version() {
    return this.formVersionar.get("_formVersionarVersion");
  }
  get formVersionar_CmbCaracterizacion() {
    return this.formVersionar.get("_formVersionarCmbCaracterizacion");
  }
  get formVersionarIdModeloGenerico() {
    return this.formVersionar.get("_formVersionarIdModeloGenerico");
  }
  ListaVersionesCarga = false;
  Lista_Versions: any[] = [];
  _seleccionarVersionesPorCaracterizacion(idModeloGenerico) {
    this._VersionesPorCaracterizacion.data = [];
    this.ListaVersionesCarga = true;
    this.Lista_Versions = [];
    this._listaVersiones.map(
      Versiones => {
        if (Versiones.IdModeloGenerico == idModeloGenerico) {
          this.Lista_Versions.push(Versiones);
        }
      })
    if (this.ListaVersionesCarga == true) {
      this.ListaVersionesCarga = false;
    }
    setTimeout(() => {
      this._VersionesPorCaracterizacion.data = this.Lista_Versions;
      this._VersionesPorCaracterizacion.paginator = this.paginator;
      this.CargarLabel()
    });
  }
  CargarLabel() {
    this.paginator._intl.itemsPerPageLabel = 'Registro Por Páginas';
    this.paginator._intl.firstPageLabel = 'Inicio';
    this.paginator._intl.lastPageLabel = 'Ultimo';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
  }
  _validarForm() {
    if (this.formVersionar.valid) {
      this._insertarCabeceraVersionModeloGenerico();
    }else{
      this.mensaje("Falta campos por ingresar");
    }
  }
  async _insertarCabeceraVersionModeloGenerico() {
    var respuesta = await this.CaracterizacionService._insertarCabeceraVersionModelo(
      this.formVersionarIdModeloGenerico.value,
      localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado'),
      this.formVersionar_Caracteristica.value,
      this.formVersionar_Version.value
    );
    if (respuesta['http']['codigo'] == "200") {
      this._VersionesPorCaracterizacion.data.push(respuesta['respuesta']);
      this._VersionesPorCaracterizacion.data = this._VersionesPorCaracterizacion.data.slice();
      this.formVersionar_Version.reset();
      this.formVersionar_Caracteristica.reset();
      this.formVersionar.controls['_formVersionarVersion'].setErrors(null);
      this.formVersionar.controls['_formVersionarCaracteristica'].setErrors(null);
      this.formVersionar.setErrors({ invalid: true });
      this.mensaje("Ingresado correctamente", null, 'msj-success');
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
  }
  async _eliminarCabeceraVersionModelo(data?) {
    this.ListaVersionesCarga = true;
    var respuesta = await this.CaracterizacionService._eliminarCabeceraVersionamientoModelo(
      data.IdCabeceraVersionModeloEncriptado,
    );
    if (respuesta['http']['codigo'] == "200") {
      this.mensaje("Eliminado correctamente", null, 'msj-success');
      this._VersionesPorCaracterizacion.data.splice(this._VersionesPorCaracterizacion.data.indexOf(data), 1);
      this._VersionesPorCaracterizacion = new MatTableDataSource<Element[]>(this._VersionesPorCaracterizacion.data.slice());
      this._VersionesPorCaracterizacion.paginator = this.paginator;
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
    this.ListaVersionesCarga = false;
  }
  async _consultarCabeceraVersion(idModeloGenericoEncriptado?) {
    this.ListaVersionesCarga = true;
    var respuesta = await this.CaracterizacionService._consultarCabeceraVersion(idModeloGenericoEncriptado);
    if (respuesta['http']['codigo'] == "200") {
      this._VersionesPorCaracterizacion.data =  respuesta['respuesta'];
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
    this._VersionesPorCaracterizacion.paginator = this.paginator;
    this.ListaVersionesCarga = false;
  }
  _ListaVersionDeCaracterizacion: any[] = [];
  ListaDescripcionComponenteBody:any[]=[];
  _verModalDetalle(data?) {
      data['caracterizacion'] = this.formVersionar_CmbCaracterizacion.value;
      let dialogRef = this.dialog.open(ModalVersionarCaracterizacionComponent, {
        width: '80%',
        height: '80%',
        data: data
      });
      dialogRef.afterClosed().subscribe(result => {
      }, error => {

      }, () => {
      });
  }
  mensaje(_mensaje: string, _duracion?: number, _color?: string) {
    if (_duracion == null) {
      _duracion = 3000;
    }
    if (_color == null) {
      _color = "gpm-danger";
    }
    let snackBarRef = this.snackBarComponent.open(_mensaje, null, { duration: _duracion, panelClass: [`${_color}`], verticalPosition: 'bottom', horizontalPosition: 'end' });
  }
  seleccionarCaracterizacion(){
    let dialogRef = this.dialog.open(ModalAsignacionOrdenComponent, {
      width: '80%',
      height: '80%',
      data: 2
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined) {
        this._consultarCabeceraVersion(result.IdModeloGenericoEncriptado);
        this.formVersionarIdModeloGenerico.setValue(result.IdModeloGenericoEncriptado);
        this.formVersionar_CmbCaracterizacion.setValue(result.Nombre);
      }
    }, error => {
    }, () => {
    });
  }
  ngOnInit() {
  }
}
