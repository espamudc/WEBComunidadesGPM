import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators, Form, FormBuilder } from '@angular/forms';
import { CaracterizacionService } from 'src/app/services/caracterizacion.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LugaresService } from 'src/app/services/lugares.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { MatDialog } from "@angular/material/dialog";
import { ModalLlenarInformacionComponent } from 'src/app/components/modal-llenar-informacion/modal-llenar-informacion.component';
import { urlImagen } from "../../../environments/environment";
@Component({
  selector: 'app-llenar-caracterizacion',
  templateUrl: './llenar-caracterizacion.component.html',
  styleUrls: ['./llenar-caracterizacion.component.css']
})
export class LlenarCaracterizacionComponent implements OnInit {
  formCaracterizacion: FormGroup;
  constructor(
    private CaracterizacionService: CaracterizacionService,
    private snackBarComponent: MatSnackBar,
    private lugaresService: LugaresService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.formCaracterizacion = new FormGroup({
      _caracterizacion: new FormControl('', [Validators.required]),
      _cuestionario: new FormControl('', [Validators.required]),
      _version: new FormControl('', [Validators.required]),
      _publicado: new FormControl('', [Validators.required]),
      _cmbVersion: new FormControl('', [Validators.required]),
    });
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  tablaCuestionariosRespondidos = ['No', 'TECNICO', 'PROVINCIA', 'CANTON', 'PARROQUIA', 'COMUNIDAD', 'FINALIZADO', 'ACCIONES'];
  get formCaracterizacion_Caracterizacion() {
    return this.formCaracterizacion.get("_caracterizacion");
  }
  get formCaracterizacion_Cuestionario() {
    return this.formCaracterizacion.get("_cuestionario");
  }
  get formCaracterizacion_Version() {
    return this.formCaracterizacion.get("_version");
  }
  get formCaracterizacion_Publicado() {
    return this.formCaracterizacion.get("_publicado");
  }
  get formCaracterizacion_CmbVersion() {
    return this.formCaracterizacion.get("_cmbVersion");
  }
  getCaracterizacion(event) {
    this.formCaracterizacion_Cuestionario.setValue(event.value.AsignarCuestionarioModelo[0].CuestionarioPublicado.CuestionarioGenerico.Nombre)
    this.formCaracterizacion_Version.setValue(event.value.AsignarCuestionarioModelo[0].CuestionarioPublicado.CabeceraVersionCuestionario.Version);
    const formattedDate = formatDate(new Date(event.value.AsignarCuestionarioModelo[0].CuestionarioPublicado.FechaPublicacion), 'yyyy-MM-dd', 'en-US');
    this.formCaracterizacion_Publicado.setValue(formattedDate)
    this._consultarCuestionariosPublicado(event.value.AsignarCuestionarioModelo[0].CuestionarioPublicado.IdCuestionarioPublicadoEncriptado)
    this._consultarVersionesPublicadaActivos(event.value.IdModeloGenericoEncriptado);
  }
  selectCaracterizacion = false;
  listaCaracterizacionPublicadasActivas: any[] = [];
  async _consultarCaracterizacionPublicadaActivos() {
    this.selectCaracterizacion = true;
    var respuesta = await this.CaracterizacionService.ModeloGenericoConVersionesActivas_Consultar();
    if (respuesta['http']['codigo'] == "200") {
      this.listaCaracterizacionPublicadasActivas = [];
      this.listaCaracterizacionPublicadasActivas = respuesta['respuesta'];
      this.formCaracterizacion_Caracterizacion.enable();
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
    this.selectCaracterizacion = false;
  }
  _listaCuestionariosPublicados = new MatTableDataSource<Element[]>();
  tablaCuestionarios = false;
  async _consultarCuestionariosPublicado(_IdCuestionarioPublicado) {
    this.tablaCuestionarios = true;
    var respuesta = await this.CaracterizacionService._consultarCuestionariosPublicado(_IdCuestionarioPublicado);
    if (respuesta['http']['codigo'] == "200") {
      this._listaCuestionariosPublicados.data = [];
      this._listaCuestionariosPublicados.data = respuesta['respuesta'];
      this._listaCuestionariosPublicados.paginator = this.paginator;
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
    this.tablaCuestionarios = false;
  }
  generarReporte(element) {
    console.log(this.formCaracterizacion_CmbVersion.value)
    window.open(urlImagen+"Caracterizacion/Caracterizacion?Encuesta="+element.IdCabeceraRespuestaEncriptado+"&Caracterizacion="+this.formCaracterizacion_CmbVersion.value.CabeceraVersionModelo.IdCabeceraVersionModeloEncriptado);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._listaCuestionariosPublicados.filter = filterValue.toUpperCase();
  }
  listaVersionesPublicadasActivas: any[] = [];
  selectVersiones = false;
  async _consultarVersionesPublicadaActivos(_idModeloGenericoEncriptada) {
    this.selectVersiones = true;
    this.formCaracterizacion_CmbVersion.reset();
    var respuesta = await this.CaracterizacionService._consultarVersionesCaracterizacionPublicadasActivas(_idModeloGenericoEncriptada);
    if (respuesta['http']['codigo'] == "200") {
      this.listaVersionesPublicadasActivas = [];
      this.listaVersionesPublicadasActivas = respuesta['respuesta'];
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
    this.selectVersiones = false;
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
  buscar() {
    console.log(this.formCaracterizacion_CmbVersion.value)
  }

  tipoUsurio='';
  ngOnInit() {

    this.tipoUsurio= localStorage.getItem('IdTipoUsuarioEncriptado');

    if(this.tipoUsurio!='MQA='){
      this.router.navigateByUrl("/inicio/inicio");
    }
    if(this.tipoUsurio==''){
      this.router.navigateByUrl("/login");
    }

    this._consultarCaracterizacionPublicadaActivos();
    this._listaCuestionariosPublicados.filterPredicate = function(data, filter: string): boolean {
      return (
        data['AsignarEncuestado'].AsignarUsuarioTipoUsuarioTecnico.Usuario.Persona.PrimerApellido.toUpperCase()+" "+data['AsignarEncuestado'].AsignarUsuarioTipoUsuarioTecnico.Usuario.Persona.SegundoApellido.toUpperCase()+" "+
        data['AsignarEncuestado'].AsignarUsuarioTipoUsuarioTecnico.Usuario.Persona.PrimerNombre.toUpperCase()+" "+data['AsignarEncuestado'].AsignarUsuarioTipoUsuarioTecnico.Usuario.Persona.SegundoNombre.toUpperCase()
      ).includes(filter);
    };
  }
}
