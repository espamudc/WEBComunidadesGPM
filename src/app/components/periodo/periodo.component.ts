
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonaService } from "../../services/persona.service";
import { PeriodoService } from "../../services/periodo.service";
import { MatDialog } from "@angular/material/dialog";
import { ModalDetallePersonaComponent } from "src/app/components/modal-detalle-persona/modal-detalle-persona.component";
import { SexoService } from 'src/app/services/sexo.service';
import { TipoIdentificacionService } from 'src/app/services/tipo-identificacion.service';
import { LugaresService } from 'src/app/services/lugares.service';
import { MatTable, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {
  _listaPeriodos: any[] = [];
  tablaPeriodos = ['Descripcion', 'fechaInicio', 'fechaFin', 'Acciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private lugaresService: LugaresService,
    private personaService: PersonaService,
    private periodoService: PeriodoService,
    private sexoService: SexoService,
    private tipoIdentificacionService: TipoIdentificacionService,
    private dialog: MatDialog,
    private snackBarComponent: MatSnackBar,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.formPeriodo = new FormGroup({
      _IdPeriodoEncriptado: new FormControl(''),
      _descripcion: new FormControl('', [Validators.required]),
      _fechaInicio: new FormControl('', [Validators.required]),
      _fechaFin: new FormControl('', [Validators.required]),
    });
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
    
    this._consultarPeriodos();
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
  get formPeriodo_IdPeriodoEncriptado() {
    return this.formPeriodo.get("_IdPeriodoEncriptado");
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
  
  _validar = true;
  _listaSexos: any[] = [];
  _listaTipoIdentificacion: any[] = [];
  _cmbSexo: any = "0";
  _cmbTipoIdentificacion: any = "0";
  _cmbParroquia = "0";
  _cmbCanton = "0";
  _cmbProvincia = "0";
  _IdPeriodoEncriptado: any = "0";
  _descripcion = "";
  _fechaInicio = "";
  _fechaFin = "";
  _segundoApellido = "";
  _telefono: string = "";
  _direccion = "";
  _numeroIdentificacion = "";
  panelOpenState: boolean = false;
  myDate = Date.now();
  _btnAccion = "Guardar";
  panelState: boolean = false;
  panelState1: boolean = false;
  @ViewChild('frmPersona', { static: false }) frmPersona: Form;
  @ViewChild('ComboProvincias', { static: false }) ComboProvincias: ElementRef;
  @ViewChild('ComboCantones', { static: false }) ComboCantones: ElementRef;
  @ViewChild('ComboParroquias', { static: false }) ComboParroquias: ElementRef;
  _validarCompletos() {
    if (
     
      this._descripcion != "" &&
      this._fechaFin != "" &&
      this._fechaInicio != ""
     
    ) {
      this._validar = false;
    } else {
      this._validar = true;
    }
  }
  _validarForm() {
    if (
      this._descripcion != "" &&
      this._fechaFin != "" &&
      this._fechaInicio != "" 
     
    ) {
      if (this._btnAccion === "Guardar") {
        this._ingresarPeriodo2();
      }
      else if (this._btnAccion === "Modificar") {
        this._modificarPeriodo2();
      }
    }
  }
  _validarForm2() {
    if (this._btnAccion === "Guardar") {
      this._ingresarPeriodo2();
    }
    else if (this._btnAccion === "Modificar") {
      this._modificarPeriodo2();
    }
  }
  clearMenssageError() {
    this.formPeriodo.controls['_descripcion'].setErrors(null);
    this.formPeriodo.controls['_fechaInicio'].setErrors(null);
    this.formPeriodo.controls['_fechaFin'].setErrors(null);
  }
  _ingresarPeriodo2() {


    
    this.periodoService._insertarPeriodo(
      this.formPeriodo_descripcion.value,
      this.formPeriodo_fechaInicio.value,
      this.formPeriodo_fechaFin.value
    ).then(
      data => {
        if (data['http']['codigo'] == '200') {
          this._consultarPeriodos();
          this._refrescarTabla();
          this._refrescarForm();
          this.clearMenssageError();
          this.formPeriodo.setErrors({ invalid: true });
          this.panelHidden();
          this.mensaje("Periodo registrado", null, 'msj-success');
        } else {
          this.mensaje(data['http']['mensaje']);
        }
      },
    )
      .catch(err => { this.mensaje(err); }
      );
  }
  _modificarPeriodo2() {
    this.periodoService._modificarPeriodo(
      this.formPeriodo_IdPeriodoEncriptado.value,
      this.formPeriodo_descripcion.value,
      this.formPeriodo_fechaInicio.value,
      this.formPeriodo_fechaFin.value
    ).then(ok => {
      if (ok['http']['codigo'] == '200') {
        this._consultarPeriodos();
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
  _consultarPeriodos() {
    this._listaPeriodos = null;
    this.periodoService._consultarPeriodos()
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this._listaPeriodos = data['respuesta'];
          this.dataSource.data = this._listaPeriodos
        }
      }).catch(error => {
      });
  }
  _eliminarPeriodo(_periodo: any) {
    this.periodoService._eliminarPeriodo(_periodo.IdPeriodoEncriptado)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this._consultarPeriodos();
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
  _prepararPeriodo(_periodo: any) {
    this._IdPeriodoEncriptado = _periodo.IdPeriodoEncriptado;
    this._descripcion = _periodo.Descripcion;
    this._fechaInicio = _periodo.FechaInicio;
    this._fechaFin = _periodo.FechaFin;
   
   
  
    this._btnAccion = "Modificar";
    this._validarCompletos();
    this.formPeriodo.get("_IdPeriodoEncriptado").setValue(_periodo.IdPeriodoEncriptado);
    this.formPeriodo.get("_descripcion").setValue(_periodo.Descripcion);
    this.formPeriodo.get("_fechaInicio").setValue(this.datePipe.transform(_periodo.FechaInicio, 'yyyy-MM-dd'));
    this.formPeriodo.get("_fechaFin").setValue(this.datePipe.transform(_periodo.FechaFin, 'yyyy-MM-dd'));
  
  }
  _refrescarForm() {
    this._cmbSexo = "0";
    this._cmbTipoIdentificacion = "0";
    this._cmbParroquia = "0";
    this._cmbCanton = "0";
    this._cmbProvincia = "0";
    this._IdPeriodoEncriptado = "0";
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
  @ViewChild(MatTable, { static: false }) MatTablaPeriodos: MatTable<any>;
  _refrescarTabla() {
    this.MatTablaPeriodos.renderRows();
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
