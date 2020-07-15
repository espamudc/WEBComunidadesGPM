
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl, Form } from '@angular/forms';
// Services
import { PersonaService } from "../../services/persona.service";
// Functional Components
import { MatDialog } from "@angular/material/dialog";
// Components
import { ModalDetallePersonaComponent } from "src/app/components/modal-detalle-persona/modal-detalle-persona.component";
import { SexoService } from 'src/app/services/sexo.service';
import { TipoIdentificacionService } from 'src/app/services/tipo-identificacion.service';
import { LugaresService } from 'src/app/services/lugares.service';
import { MatTable, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {
  _listaPersonas: any[] = [];
  tablaPersonas = ['Nombres', 'Apellidos', 'TipoIdentidicacion', 'Identificacion', 'Acciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private lugaresService: LugaresService,
    private personaService: PersonaService,
    private sexoService: SexoService,
    private tipoIdentificacionService: TipoIdentificacionService,
    private dialog: MatDialog,
    private snackBarComponent: MatSnackBar,
  ) {
    this.formPeriodo = new FormGroup({
      _idPersonaEncriptado: new FormControl(''),
      _descripcion: new FormControl('', [Validators.required]),
      _fechaInicio: new FormControl('', [Validators.required]),
      _fechaFin: new FormControl('', [Validators.required]),
      _segundoApellido: new FormControl('', [Validators.required]),
      _cmbTipoIdentificacion: new FormControl('', [Validators.required]),
      _numeroIdentificacion: new FormControl('', [Validators.required]),
      _cmbSexo: new FormControl('', [Validators.required]),
      _telefono: new FormControl(''),
      _cmbProvincia: new FormControl('', [Validators.required]),
      _cmbCanton: new FormControl('', [Validators.required]),
      _cmbParroquia: new FormControl('', [Validators.required]),
      _direccion: new FormControl('', [Validators.required])
    });
  }
  ngOnInit() {
    this._consultarPersonas();
    this._consultarTipoIdentificacion();
    this._consultarSexos();
    this._consultarProvincias();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  formPeriodo: FormGroup;
  get formPeriodo_idPersonaEncriptado() {
    return this.formPeriodo.get("_idPersonaEncriptado");
  }
  get formPeriodo_descripcion() {
    return this.formPeriodo.get("_descripcion");
  }
  get formPeriodo_fechaInicio() {
    return this.formPeriodo.get("_fechaInicio");
  }
  get formPeriodo_fechaFin() {
    return this.formPeriodo.get("_fechaFin");
  }
  get formPeriodo_segundoApellido() {
    return this.formPeriodo.get("_segundoApellido");
  }
  get formPeriodo_cmbTipoIdentificacion() {
    return this.formPeriodo.get("_cmbTipoIdentificacion");
  }
  get formPeriodo_numeroIdentificacion() {
    return this.formPeriodo.get("_numeroIdentificacion");
  }
  get formPeriodo_cmbSexo() {
    return this.formPeriodo.get("_cmbSexo");
  }
  get formPeriodo_telefono() {
    return this.formPeriodo.get("_telefono");
  }
  get formPeriodo_cmbProvincia() {
    return this.formPeriodo.get("_cmbProvincia");
  }
  get formPeriodo_cmbCanton() {
    return this.formPeriodo.get("_cmbCanton");
  }
  get formPeriodo_cmbParroquia() {
    return this.formPeriodo.get("_cmbParroquia");
  }
  get formPeriodo_direccion() {
    return this.formPeriodo.get("_direccion");
  }
  //-------------------------------------------------------------------------------------------
  _validar = true;
  _listaSexos: any[] = [];
  _listaTipoIdentificacion: any[] = [];
  _cmbSexo: any = "0";
  _cmbTipoIdentificacion: any = "0";
  _cmbParroquia = "0";
  _cmbCanton = "0";
  _cmbProvincia = "0";
  _IdPersonaEncriptado: any = "0";
  _descripcion = "";
  _fechaInicio = "";
  _fechaFin = "";
  _segundoApellido = "";
  _telefono: string = "";
  _direccion = "";
  _numeroIdentificacion = "";
  panelOpenState: boolean = false;
  _btnAccion = "Guardar";
  panelState: boolean = false;
  panelState1: boolean = false;
  @ViewChild('frmPersona', { static: false }) frmPersona: Form;
  @ViewChild('ComboProvincias', { static: false }) ComboProvincias: ElementRef;
  @ViewChild('ComboCantones', { static: false }) ComboCantones: ElementRef;
  @ViewChild('ComboParroquias', { static: false }) ComboParroquias: ElementRef;
  _validarCompletos() {
    if (
      this._cmbSexo != "0" &&
      this._cmbTipoIdentificacion != "0" &&
      this.ComboParroquias.nativeElement.value != "0" &&
      this.ComboCantones.nativeElement.value != "0" &&
      this.ComboProvincias.nativeElement.value != "0" &&
      this._descripcion != "" &&
      this._fechaFin != "" &&
      this._segundoApellido != "" &&
      this._telefono != "" &&
      this._direccion != "" &&
      this._numeroIdentificacion != ""
    ) {
      this._validar = false;
    } else {
      this._validar = true;
    }
  }
  _validarForm() {
    if (
      this._cmbSexo != "0" &&
      this._cmbTipoIdentificacion != "0" &&
      this.ComboParroquias.nativeElement.value != "0" &&
      this.ComboCantones.nativeElement.value != "0" &&
      this.ComboProvincias.nativeElement.value != "0" &&
      this._descripcion != "" &&
      this._fechaFin != "" &&
      this._segundoApellido != "" &&
      this._telefono != "" &&
      this._direccion != "" &&
      this._numeroIdentificacion != ""
    ) {
      if (this._btnAccion === "Guardar") {
        this._ingresarPersona2();
      }
      else if (this._btnAccion === "Modificar") {
        this._modificarPersona2();
      }
    }
  }
  _validarForm2() {
    if (this._btnAccion === "Guardar") {
      this._ingresarPersona2();
    }
    else if (this._btnAccion === "Modificar") {
      this._modificarPersona2();
    }
  }
  clearMenssageError() {
    this.formPeriodo.controls['_descripcion'].setErrors(null);
    this.formPeriodo.controls['_fechaInicio'].setErrors(null);
    this.formPeriodo.controls['_fechaFin'].setErrors(null);
    this.formPeriodo.controls['_fechaInicio'].setErrors(null);
    this.formPeriodo.controls['_segundoApellido'].setErrors(null);
    this.formPeriodo.controls['_cmbTipoIdentificacion'].setErrors(null);
    this.formPeriodo.controls['_numeroIdentificacion'].setErrors(null);
    this.formPeriodo.controls['_cmbSexo'].setErrors(null);
    this.formPeriodo.controls['_cmbCanton'].setErrors(null);
    this.formPeriodo.controls['_cmbParroquia'].setErrors(null);
    this.formPeriodo.controls['_cmbProvincia'].setErrors(null);
    this.formPeriodo.controls['_direccion'].setErrors(null);
  }
  _ingresarPersona2() {
    this.formPeriodo.controls['_telefono'].setValue(' ')
    this.personaService._insertarPersona(
      this.formPeriodo_descripcion.value,
      this.formPeriodo_fechaInicio.value,
      this.formPeriodo_fechaFin.value,
      this.formPeriodo_segundoApellido.value,
      this.formPeriodo_numeroIdentificacion.value,
      this.formPeriodo_cmbTipoIdentificacion.value,
      this.formPeriodo_telefono.value,
      this.formPeriodo_cmbSexo.value,
      this.formPeriodo_cmbParroquia.value,
      this.formPeriodo_direccion.value,
      'token'
    ).then(
      data => {
        if (data['http']['codigo'] == '200') {
          this._consultarPersonas();
          this._refrescarTabla();
          this._refrescarForm();
          this.clearMenssageError();
          this.formPeriodo.setErrors({ invalid: true });
          this.panelHidden();
          this.mensaje("Persona registrada", null, 'msj-success');
        } else {
          this.mensaje(data['http']['mensaje']);
        }
      },
    )
      .catch(err => { this.mensaje(err); }
      );
  }
  _modificarPersona2() {
    this.personaService._modificarPersona(
      this.formPeriodo_idPersonaEncriptado.value,
      this.formPeriodo_descripcion.value,
      this.formPeriodo_fechaInicio.value,
      this.formPeriodo_fechaFin.value,
      this.formPeriodo_segundoApellido.value,
      this.formPeriodo_numeroIdentificacion.value,
      this.formPeriodo_cmbTipoIdentificacion.value,
      this.formPeriodo_telefono.value,
      this.formPeriodo_cmbSexo.value,
      this.formPeriodo_cmbParroquia.value,
      this.formPeriodo_direccion.value,
      'token'
    ).then(ok => {
      if (ok['http']['codigo'] == '200') {
        this._consultarPersonas();
        this._refrescarForm();
        this.clearMenssageError();
        this.formPeriodo.setErrors({ invalid: true });
        this.mensaje("Registro actualizado", null, 'msj-success');
        this.panelHidden();
      } else {
        this.mensaje(ok['http']['mensaje']);
      }
    },
    )
      .catch(err => { this.mensaje(err); }
      )
  }
  panelHidden() {
    this.panelState1 = false;
    this.panelState = false;
  }
  _consultarPersonas() {
    this._listaPersonas = null;
    this.personaService._consultarPersonas('token')
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this._listaPersonas = data['respuesta'];
          this.dataSource.data = this._listaPersonas
        }
      }).catch(error => {
      });
  }
  _eliminarPersona(_persona: any) {
    this.personaService._eliminarPersona(_persona.IdPersonaEncriptado)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this._consultarPersonas();
          this._refrescarTabla();
          this._refrescarForm();
          this.mensaje("Registro eliminado", null, 'msj-success');
        } else if (data['http']['codigo'] == '500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        } else {
          this.mensaje(data['http']['mensaje']);
        }
      })
      .catch(error => {
        this.mensaje(error);
      });
  }
  _consultarSexos() {
    this.sexoService.consultarSexos()
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this._listaSexos = data['respuesta'];
        }
      })
      .catch(error => {
        this.mensaje(error);
      });
  }
  _consultarTipoIdentificacion() {
    this.tipoIdentificacionService.consultarTiposIdentificacion()
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this._listaTipoIdentificacion = data['respuesta'];
        }
      })
      .catch(error => {
        this.mensaje(error);
      });
  }
  _verPersona(_persona: any) {
    let dialogRef = this.dialog.open(ModalDetallePersonaComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        _persona: _persona
      }
    });
  }
  _prepararPersona(_persona: any) {
    this._IdPersonaEncriptado = _persona.IdPersonaEncriptado;
    this._descripcion = _persona.PrimerNombre;
    this._fechaInicio = _persona.SegundoNombre;
    this._fechaFin = _persona.PrimerApellido;
    this._segundoApellido = _persona.SegundoApellido;
    this._numeroIdentificacion = _persona.NumeroIdentificacion;
    this._cmbTipoIdentificacion = _persona.TipoIdentificacion.IdTipoIdentificacionEncriptado;
    this._telefono = _persona.Telefono;
    this._cmbSexo = _persona.Sexo.IdSexoEncriptado;
    this._direccion = _persona.Direccion;
    if (this._telefono == 'null') {
      this._telefono = '';
    }
    if (this._fechaInicio == 'null') {
      this._fechaInicio = "";
    }
    this.lugaresService._consultarProvincias();
    this._cantonesDeUnaProvincia(_persona.Parroquia.Canton.Provincia.IdProvinciaEncriptado);
    this._parroquiasDeUnCanton(_persona.Parroquia.Canton.IdCantonEncriptado);
    this.ComboProvincias.nativeElement.value = _persona.Parroquia.Canton.Provincia.IdProvinciaEncriptado;
    this.ComboCantones.nativeElement.value = _persona.Parroquia.Canton.IdCantonEncriptado;
    this.ComboParroquias.nativeElement.value = _persona.Parroquia.IdParroquiaEncriptado;
    this._btnAccion = "Modificar";
    this._validarCompletos();
    this.formPeriodo.get("_idPersonaEncriptado").setValue(_persona.IdPersonaEncriptado);
    this.formPeriodo.get("_descripcion").setValue(_persona.PrimerNombre);
    this.formPeriodo.get("_fechaInicio").setValue(_persona.SegundoNombre);
    this.formPeriodo.get("_fechaFin").setValue(_persona.PrimerApellido);
    this.formPeriodo.get("_segundoApellido").setValue(_persona.SegundoApellido);
    this.formPeriodo.get("_cmbTipoIdentificacion").setValue(_persona.TipoIdentificacion.IdTipoIdentificacionEncriptado);
    this.formPeriodo.get("_numeroIdentificacion").setValue(_persona.NumeroIdentificacion);
    this.formPeriodo.get("_cmbSexo").setValue(_persona.Sexo.IdSexoEncriptado);
    this.formPeriodo.get("_telefono").setValue(_persona.Telefono);
    this.formPeriodo.get("_cmbProvincia").setValue(_persona.Parroquia.Canton.Provincia.IdProvinciaEncriptado);
    this.formPeriodo.get("_cmbCanton").setValue(_persona.Parroquia.Canton.IdCantonEncriptado);
    this.formPeriodo.get("_cmbParroquia").setValue(_persona.Parroquia.IdParroquiaEncriptado);
    this.formPeriodo.get("_direccion").setValue(_persona.Direccion);
  }
  _refrescarForm() {
    this._cmbSexo = "0";
    this._cmbTipoIdentificacion = "0";
    this._cmbParroquia = "0";
    this._cmbCanton = "0";
    this._cmbProvincia = "0";
    this.ComboParroquias.nativeElement.value = "0";
    this.ComboCantones.nativeElement.value = "0";
    this.ComboProvincias.nativeElement.value = "0";
    this._IdPersonaEncriptado = "0";
    this._descripcion = "";
    this._fechaInicio = "";
    this._fechaFin = "";
    this._segundoApellido = "";
    this._telefono = "";
    this._direccion = "";
    this._numeroIdentificacion = "";
    this._btnAccion = "Guardar";
    this._validar = true;
    this.formPeriodo.reset();
    this.clearMenssageError();
    this.formPeriodo.setErrors({ invalid: true });
    this.panelHidden();
  }
  @ViewChild(MatTable, { static: false }) MatTablaPersonas: MatTable<any>;
  _refrescarTabla() {
    this.MatTablaPersonas.renderRows();
  }
  _listaProvincias: any[] = [];
  _consultarProvincias() {
    this.lugaresService._consultarProvincias()
      .then(
        data => {
          if (data['http']['codigo'] == '200') {
            this._listaProvincias = data['respuesta'];
          } else {
          }
        }
      )
      .catch(err => {
        this.mensaje(err);
      }
      )
  }
  _listaCantones: any[] = [];
  _cantonesDeUnaProvincia(event) {
    this.ComboCantones.nativeElement.value = "0";
    this.ComboParroquias.nativeElement.value = "0";
    var id = event;
    if (id != "0") {
      this.lugaresService._consultarCantonesDe(id)
        .then(data => {
          if (data['http']['codigo'] == '200') {
            this._listaCantones = data['respuesta'];
          }
        }).catch(error => {
          this.mensaje(error);
        }).finally(() => {
          this._validarCompletos();
        });
    }
  }
  _listaParroquias: any[] = [];
  _parroquiasDeUnCanton(event) {
    this.ComboParroquias.nativeElement.value = "0";
    var id = event;
    if (id != "0") {
      this.lugaresService._consultarParroquiasDe(id)
        .then(data => {
          if (data['http']['codigo'] == '200') {
            this._listaParroquias = data['respuesta'];
          }
        }).catch(error => {
          this.mensaje(error);
        }).finally(() => {
          this._validarCompletos();
        });
    }
  }
  comunidad: any = "0";
  _listaComunidades: any[] = [];
  _comunidadesDeUnaParroquia(event) {
    var id = event;
    if (id != "0") {
      this.lugaresService._consultarComunidadesDe(id)
        .then(data => {
          if (data['http']['codigo'] == '200') {
            this._listaComunidades = data['respuesta'];
          }
        }).catch(error => {
          this.mensaje(error);
        }).finally(() => {
          this._validarCompletos();
        });
    }
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
}
