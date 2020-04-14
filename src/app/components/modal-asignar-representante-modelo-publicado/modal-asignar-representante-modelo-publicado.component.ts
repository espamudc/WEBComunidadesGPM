import { Component, OnInit, Inject, ViewChild,ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators, Form, FormBuilder } from '@angular/forms';
import { CaracterizacionService } from 'src/app/services/caracterizacion.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LugaresService } from 'src/app/services/lugares.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { ModalVistapreviaCaracterizacionComponent } from "src/app/components/modal-vistaprevia-caracterizacion/modal-vistaprevia-caracterizacion.component";
import { MatPaginator, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { MatDialog } from "@angular/material/dialog";
@Component({
  selector: 'app-modal-asignar-representante-modelo-publicado',
  templateUrl: './modal-asignar-representante-modelo-publicado.component.html',
  styleUrls: ['./modal-asignar-representante-modelo-publicado.component.css']
})
export class ModalAsignarRepresentanteModeloPublicadoComponent implements OnInit {

  constructor(
    private CaracterizacionService: CaracterizacionService,
    private dialogRef: MatDialogRef<ModalAsignarRepresentanteModeloPublicadoComponent>,
    private snackBarComponent: MatSnackBar,
    private lugaresService: LugaresService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formIngresoCaracterizacion = new FormGroup({
      _fechaInicio: new FormControl('', [Validators.required]),
      _fechaFinal: new FormControl('', [Validators.required]),
      _representante: new FormControl('', [Validators.required]),
      _myControl: new FormControl('', [Validators.required]),
      _Canton: new FormControl('', [Validators.required]),
      _Parroquia: new FormControl('', [Validators.required]),
    });
    dialogRef.disableClose = true;
  }

  get form_FechaInicio() {
    return this.formIngresoCaracterizacion.get("_fechaInicio");
  }
  get form_FechaFin() {
    return this.formIngresoCaracterizacion.get("_fechaFinal");
  }
  get form_Representante() {
    return this.formIngresoCaracterizacion.get("_representante");
  }
  get myControl() {
    return this.formIngresoCaracterizacion.get("_myControl");
  }
  get form_Canton() {
    return this.formIngresoCaracterizacion.get("_Canton");
  }
  get form_Parroquia() {
    return this.formIngresoCaracterizacion.get("_Parroquia");
  }
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  formIngresoCaracterizacion: FormGroup;
  tituloEncabezado = '';
  version = '';
  descripcionEncabezado = '';
  Periodo = '';
  FechaPublicacion = '';
  provincia = '';
  canton = '';
  parroquia = '';
  listaRepresentantes: any[] = [];
  cargandoRepresentante = false;
  botonGuardar = false;
  borderBool = false;
  errorFecha = false;
  accionesEjecutada = false;
  close(){
    this.dialogRef.close(this.accionesEjecutada);
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
  _cargarRepresentanteParroquia(idParroquia) {
    this.cargandoRepresentante = true;
    this.listaRepresentantes = [];
    var lista: any[];
    this.lugaresService._consultarRepresentanteParroquia(idParroquia)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          lista = data['respuesta'];
        } else {
          console.log(data['http']);
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.cargandoRepresentante = false;
        this.listaRepresentantes = lista.find(p => p.FechaSalida == '0001-01-01T00:00:00');
        if (this.listaRepresentantes != undefined) {
          this.form_Representante.setValue(this.listaRepresentantes['Representante']);
          this.formIngresoCaracterizacion.enable();
        } else {
          this.form_Representante.setValue('');
        }
        //console.log(this.listaRepresentantes);
      });
  }
  displayFn(IdProvinciaEncriptado) {
    if (!IdProvinciaEncriptado) {
      return '';
    }
    this._cantonesDeUnaProvincia(IdProvinciaEncriptado);
    let index = this._listaProvincias.find(state => state.IdProvinciaEncriptado === IdProvinciaEncriptado);
    return index.NombreProvincia;
  }
  guardarRepresentante() {
    if (this.formIngresoCaracterizacion.valid) {
      if (this.form_FechaInicio.value <= this.form_FechaFin.value && this.form_FechaFin.value >= this.form_FechaInicio.value) {
        var ejecutado = false;
        this.CaracterizacionService._insertarAsignaResponsableModeloPublicado(
          localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado'),
          this.data.ModeloPublicado.IdModeloPublicadoEncriptado,
          this.form_FechaInicio.value,
          this.form_FechaFin.value,
          this.form_Parroquia.value,
        ).then(data => {
          if (data['http']['codigo'] == '200') {
            ejecutado = true;
            this.accionesEjecutada = true;
          } else if (data['http']['codigo'] == '500') {
            this.mensaje("A ocurrido un error inesperado, intente más tarde.")
          } else {
            this.mensaje(data['http']['mensaje']);
          }
        }).catch(error => {
          console.log(error);
        }).finally(() => {
          if (ejecutado != false) {
            this.myControl.setValue('');
            this._listaCantones = [];
            this._listaParroquias = [];
            this.form_Canton.reset();
            this.form_Parroquia.reset();
            this.form_Representante.setValue('');
            const d = new Date();
            const formattedDate = formatDate(d, 'yyyy-MM-dd', 'en-US');
            this.form_FechaInicio.setValue(formattedDate);
            this.fechaBase = formattedDate;
            this.form_FechaFin.setValue(formattedDate);
            this.asignarresponsablemodelopublicado_consultarporidmodelopublicado(this.data.ModeloPublicado.IdModeloPublicadoEncriptado);
          }
        });
      } else {
        this.mensaje("Ocurrio un problema con las fechas");
      }
    }
  }
  _listaProvincias: any[] = [];
  _consultarProvincias() {
    this._listaProvincias = [];
    this.lugaresService._consultarProvincias()
      .then(
        data => {
          if (data['http']['codigo'] == '200') {
            this._listaProvincias = data['respuesta'];
          } else {
            console.log(data);
          }
        }
      ).catch(error => {
        console.log(error);
      }).finally(() => {
        this.filteredOptions = this.myControl.valueChanges.pipe(
          // startWith(''),
          map(value => this._filter(value))
        );

      });
  }
  _listaCantones: any[] = [];
  _cantonesDeUnaProvincia(idProvincia) {
    this._listaCantones = [];
    this._listaParroquias = [];
    this.form_Canton.reset();
    this.form_Parroquia.reset();
    this.form_Representante.setValue('');
    this.lugaresService._consultarCantonesDe(idProvincia)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this._listaCantones = data['respuesta'];
        } else {
          console.log(data);
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {
      });
  }
  _listaParroquias: any[] = [];
  _parroquiasDeUnCanton(idCanton) {
    this._listaParroquias = [];
    this.form_Parroquia.reset();
    this.form_Representante.setValue('');
    this.lugaresService._consultarParroquiasDe(idCanton)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this._listaParroquias = data['respuesta'];
        } else {
          console.log(data);
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {
      });
  }
  fechaBase = '';
  _listaLugaresModeloPublicado = new MatTableDataSource<Element[]>();
  cargaAsignacionParroquia = false;
  asignarresponsablemodelopublicado_consultarporidmodelopublicado(idModeloPublicado) {
    this._listaLugaresModeloPublicado.data = [];
    this.cargaAsignacionParroquia = true;
    var ejecutado = false;
    this.CaracterizacionService.asignarresponsablemodelopublicado_consultarporidmodelopublicado(idModeloPublicado)
      .then(
        data => {
          if (data['http']['codigo'] == '200') {
            this._listaLugaresModeloPublicado.data = data['respuesta'];
            ejecutado = true;
          } else {
            ejecutado = false;
            console.log(data);
          }
        }
      ).catch(error => {
        console.log(error);
      }).finally(() => {
        if (ejecutado != false) {
          this._listaLugaresModeloPublicado.paginator = this.paginator;
          this.cargaAsignacionParroquia = false;
        }
      });
  }
  eliminarResponsable(element) {
    var ejecutado = false;
    this.CaracterizacionService.asignarresponsablemodelopublicado_eliminar(
      element.IdAsignarResponsableModeloPublicadoEncriptado,
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        //console.log(data['respuesta']);
        ejecutado = true;
        this.accionesEjecutada = true;
      } else if (data['http']['codigo'] == '500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      } else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      if (ejecutado != false) {
        this.asignarresponsablemodelopublicado_consultarporidmodelopublicado(this.data.ModeloPublicado.IdModeloPublicadoEncriptado);
      }
    });
  }
  _prepararModeloGenericoPublicado(element){
    let dialogRef = this.dialog.open(ModalVistapreviaCaracterizacionComponent, {
      width: '80%',
      height: '80%',
      data:
      {
        data: this.data,
        Lugar: element,
        NumeroComunidades: 2,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    }, error => {
    }, () => {
    });
  }
  _HabilitarAsignarResponsableModeloPublicado(element?) {
    var ejecutado = false;
    this.CaracterizacionService._HabilitarAsignarResponsableModeloPublicado(element.IdAsignarResponsableModeloPublicadoEncriptado)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this.accionesEjecutada = true;
          ejecutado = true;
        } else {
          console.log(data['http']);
        }
      })
      .catch(error => {
        console.log(error);
      }).finally(() => {
        if (ejecutado != false) {
          setTimeout(() => {
            this.asignarresponsablemodelopublicado_consultarporidmodelopublicado(element.ModeloPublicado.IdModeloPublicadoEncriptado);
          });
        }
      });
  }
  _DesHabilitarAsignarResponsableModeloPublicado(element?) {
    var ejecutado = false;
    this.CaracterizacionService._DesHabilitarAsignarResponsableModeloPublicado(element.IdAsignarResponsableModeloPublicadoEncriptado)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this.accionesEjecutada = true;
          ejecutado = true;
        } else {
          console.log(data['http']);
        }
      })
      .catch(error => {
        console.log(error);
      }).finally(() => {
        if (ejecutado != false) {
          setTimeout(() => {
            this.asignarresponsablemodelopublicado_consultarporidmodelopublicado(element.ModeloPublicado.IdModeloPublicadoEncriptado);
          });
        }
      });
  }
  cargandoModal = false;
  ngOnInit() {
    this.cargandoModal = true;
    if (this.data.ModeloPublicado.Estado == true) {
      this.formIngresoCaracterizacion.enable()
    } else {
      this.formIngresoCaracterizacion.disable()
    }
    this.tituloEncabezado = this.data.ModeloGenerico.Nombre;
    this.version = "VERSIÓN " + this.data.Version;
    this.descripcionEncabezado = this.data.ModeloGenerico.Descripcion;
    this.Periodo = this.data.ModeloPublicado.Periodo.Descripcion;
    this.FechaPublicacion = this.data.ModeloPublicado.FechaPublicacion;
    const d = new Date();
    const formattedDate = formatDate(d, 'yyyy-MM-dd', 'en-US');
    this.form_FechaInicio.setValue(formattedDate);
    this.fechaBase = formattedDate;
    this.form_FechaFin.setValue(formattedDate);
    setTimeout(() => {
      this.asignarresponsablemodelopublicado_consultarporidmodelopublicado(this.data.ModeloPublicado.IdModeloPublicadoEncriptado);
    });
    setTimeout(() => {
      this._consultarProvincias()
    });
    this.cargandoModal = false;
  }
  filteredOptions: Observable<any[]>;
  private _filter(value: string): any[] {
    value = value.toLowerCase();
    if(value== ''){
      return [];
    }{
      return this._listaProvincias.filter(option => option.NombreProvincia.toLowerCase().indexOf(value) === 0);
    }
  }
}
