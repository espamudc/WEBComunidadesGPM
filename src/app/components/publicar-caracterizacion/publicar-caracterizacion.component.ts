import { Injectable, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CaracterizacionService } from 'src/app/services/caracterizacion.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
// import { ModalVersionarCaracterizacionComponent } from "src/app/components/modal-versionar-caracterizacion/modal-versionar-caracterizacion.component";
import { MatDialog } from "@angular/material/dialog";
import { PeriodoService } from 'src/app/services/periodo.service';
import { LugaresService } from 'src/app/services/lugares.service';
import { ModalVistapreviaCaracterizacionComponent } from "src/app/components/modal-vistaprevia-caracterizacion/modal-vistaprevia-caracterizacion.component";
import { MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ModalAsignarRepresentanteModeloPublicadoComponent } from "src/app/components/modal-asignar-representante-modelo-publicado/modal-asignar-representante-modelo-publicado.component";
import { ModalVersionarCaracterizacionComponent } from "src/app/components/modal-versionar-caracterizacion/modal-versionar-caracterizacion.component";

@Component({
  selector: 'app-publicar-caracterizacion',
  templateUrl: './publicar-caracterizacion.component.html',
  styleUrls: ['./publicar-caracterizacion.component.css']
})
@Injectable()
export class PublicarCaracterizacionComponent extends MatPaginatorIntl implements OnInit {
  constructor(
    private CaracterizacionService: CaracterizacionService,
    private snackBarComponent: MatSnackBar,
    private dialog: MatDialog,
    private periodoService: PeriodoService,
    private lugaresService: LugaresService,
    private router: Router
  ) {
    super();
    this.formPublicarVersion = new FormGroup({
      _formCmbCaracterizacion: new FormControl('', [Validators.required]),
      _formCmbVersiones: new FormControl('', [Validators.required]),
      _formCmbPeriodo: new FormControl('', [Validators.required]),
    });
  }
  listaModeloGenericoConVersiones: any[] = [];
  _listaPeriodos: any[] = [];
  _listaVersiones: any[] = [];
  loadingVersiones = false;
  autoComplete = false;
  cmbVersion: string;
  sniperPeriodo = false;
  cmbPeriodo = '0';
  CargandoTablaModeloPublicadosVerisonados = false;
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  _listaVersionesPublicadas = new MatTableDataSource<Element[]>();
  async _consultarModelosGenericosConVersioneSinPublicar() {
    this.autoComplete = true;
    var respuesta = await this.CaracterizacionService._consultarModelosGenericosConVersioneSinPublicar();
    if (respuesta['http']['codigo'] == "200") {
      this.listaModeloGenericoConVersiones = respuesta['respuesta'];
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
    this.autoComplete = false;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  displayFn(IdModeloGenerico) {
    if (!IdModeloGenerico) {
      this._listaVersiones = [];
      return '';
    }
    let index = this.listaModeloGenericoConVersiones.find(state => state.IdModeloGenericoEncriptado === IdModeloGenerico);
    this._consultarVersionPorPublicar(index.IdModeloGenericoEncriptado);
    return index.Nombre;
  }
  private _filter(value: string): any[] {
    const filterValue = value.trim().toLowerCase();
    this._listaVersiones = [];
    this.cmbVersion = '0';
    return this.listaModeloGenericoConVersiones.filter(option => (option.Nombre.trim().toLowerCase()).indexOf(filterValue) === 0);
  }
  async _consultarPeriodos() {
    this.sniperPeriodo = true;
    var respuesta = await this.periodoService._consultarPeriodos();
    if (respuesta['http']['codigo'] == "200") {
      this._listaPeriodos = [];
      this._listaPeriodos = respuesta['respuesta'];
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
    this.sniperPeriodo = false;
    this.formCaracterizacion_cmbPeriodo.setValue("0");
  }
  async _consultarVersionPorPublicar(idModeloGenerico) {
    this.loadingVersiones = true;
    var respuesta = await this.CaracterizacionService._consultarVersionPorPublicar(idModeloGenerico);
    if (respuesta['http']['codigo'] == "200") {
      this._listaVersiones = [];
      this._listaVersiones = respuesta['respuesta'];
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
    this.loadingVersiones = false;
  }
  async _publicarVersion(idCabeceraVersion, idPeriodo, idAsignarTU) {
    this.CargandoTablaModeloPublicadosVerisonados = true;
    var respuesta = await this.CaracterizacionService._insertarPublicarVersionamientoModelo(
      idCabeceraVersion,
      idPeriodo,
      idAsignarTU
    );
    if (respuesta['http']['codigo'] == "200") {
      this._listaVersionesPublicadas.data.push(respuesta['respuesta']);
      this._listaVersionesPublicadas.data = this._listaVersionesPublicadas.data.slice();
      this.myControl.setValue("");
      this.cmbPeriodo = '0';
      this._consultarModelosGenericosConVersioneSinPublicar();
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
    this.CargandoTablaModeloPublicadosVerisonados = false;
  }
  _validarForm() {
    if (this.cmbPeriodo != '0' && this.cmbVersion != '0') {
      this._publicarVersion(this.cmbVersion, this.cmbPeriodo, localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado'));
    }
  }
  async _consultarVersionesCaracterizacionPublicadas() {
    this._listaVersionesPublicadas.data = [];
    this.CargandoTablaModeloPublicadosVerisonados = true;
    var respuesta = await this.CaracterizacionService._consultarVersionesCaracterizacionPublicadas();
    if (respuesta['http']['codigo'] == "200") {
      this._listaVersionesPublicadas.data = [];
      this._listaVersionesPublicadas.data = respuesta['respuesta'];
      this._listaVersionesPublicadas.paginator = this.paginator;
      console.log(this._listaVersionesPublicadas.data);
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
    this.CargandoTablaModeloPublicadosVerisonados = false;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._listaVersionesPublicadas.filter = filterValue.trim();
  }
  async _eliminarPublicacionVersionModelo(element?){
    this.CargandoTablaModeloPublicadosVerisonados = true;
    var respuesta = await this.CaracterizacionService._eliminarModeloPublicado(
      element.IdModeloPublicadoEncriptado,
    );
    if (respuesta['http']['codigo'] == "200") {
      this._listaVersionesPublicadas.data.splice(this._listaVersionesPublicadas.data.indexOf(element), 1);
      this._listaVersionesPublicadas = new MatTableDataSource<Element[]>(this._listaVersionesPublicadas.data.slice());
      this._listaVersionesPublicadas.paginator = this.paginator;
      this.mensaje("Eliminado correctamente", null, 'msj-success');
      this._consultarModelosGenericosConVersioneSinPublicar();
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
    this.CargandoTablaModeloPublicadosVerisonados = false;
  }
  async _DesHabilitarModeloPublicado(element) {
    this.CargandoTablaModeloPublicadosVerisonados = true;
    var respuesta = await this.CaracterizacionService._DesHabilitarModeloPublicad(element.IdModeloPublicadoEncriptado);
    if (respuesta['http']['codigo'] == "200") {
      const index = this._listaVersionesPublicadas.data.findIndex((inc: any) => inc.IdModeloPublicadoEncriptado === element.IdModeloPublicadoEncriptado);
      this._listaVersionesPublicadas.data[index]['Estado'] = false;
      this.mensaje("Deshabilitado correctamente", null, 'msj-success');
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
    this.CargandoTablaModeloPublicadosVerisonados = false;
  }
  async _HabilitarModeloPublicado(element) {
    this.CargandoTablaModeloPublicadosVerisonados = true;
    var respuesta = await this.CaracterizacionService._HabilitarModeloPublicado(element.IdModeloPublicadoEncriptado);
    if (respuesta['http']['codigo'] == "200") {
      const index = this._listaVersionesPublicadas.data.findIndex((inc: any) => inc.IdModeloPublicadoEncriptado === element.IdModeloPublicadoEncriptado);
      this._listaVersionesPublicadas.data[index]['Estado'] = true;
      this.mensaje("Habilitado correctamente", null, 'msj-success');
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
    this.CargandoTablaModeloPublicadosVerisonados = false;
  }
  formPublicarVersion: FormGroup;
  get formCaracterizacionPublicar_cmbCaracterizacion() {
    return this.formPublicarVersion.get("_formCmbCaracterizacion");
  }
  get form_cmbCabeceraVersionCaracterizacion() {
    return this.formPublicarVersion.get("_formCmbVersiones");
  }
  get formCaracterizacion_cmbPeriodo() {
    return this.formPublicarVersion.get("_formCmbPeriodo");
  }
  _prepararModeloGenericoPublicado(element?) {
    element['CabeceraVersionModelo']['caracterizacion'] = element['CabeceraVersionModelo']['ModeloGenerico']['Nombre'];
    let dialogRef = this.dialog.open(ModalVersionarCaracterizacionComponent, {
      width: '80%',
      height: '80%',
      data: element['CabeceraVersionModelo']
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

  tipoUsurio='';
  ngOnInit() {

    this.tipoUsurio= localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado');

    if(this.tipoUsurio!='MQAwADYAOAA='){
      this.router.navigateByUrl("/inicio/inicio");
    }
    if(this.tipoUsurio==''){
      this.router.navigateByUrl("/login");
    }
    this._consultarModelosGenericosConVersioneSinPublicar();
    this._consultarPeriodos();
    this._consultarVersionesCaracterizacionPublicadas();
    this._listaVersionesPublicadas.filterPredicate = function(data, filter: string): boolean {
      return data['CabeceraVersionModelo']['ModeloGenerico']['Nombre'].toLowerCase().includes(filter);
    };
  }
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;
}
