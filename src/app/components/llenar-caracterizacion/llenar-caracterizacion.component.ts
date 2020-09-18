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

@Component({
  selector: 'app-llenar-caracterizacion',
  templateUrl: './llenar-caracterizacion.component.html',
  styleUrls: ['./llenar-caracterizacion.component.css']
})
export class LlenarCaracterizacionComponent implements OnInit {

  constructor(
    private CaracterizacionService: CaracterizacionService,
    private snackBarComponent: MatSnackBar,
    private lugaresService: LugaresService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.formIngresoCaracterizacion = new FormGroup({
      _representante: new FormControl('', [Validators.required]),
      _myControl: new FormControl('', [Validators.required]),
      _Canton: new FormControl('', [Validators.required]),
      _Parroquia: new FormControl('', [Validators.required]),
    });
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

  listaRepresentantes: any[] = [];
  cargandoRepresentante = false;

  _listaProvincias: any[] = [];
  cargandoProvincias = false;
  _consultarProvincias() {
    this._listaProvincias = [];
    this.myControl.disable();
    this.cargandoProvincias = true;
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
        this.myControl.enable();
        this.cargandoProvincias = false;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          // startWith(''),
          map(value => this._filter(value))
        );
      });
  }
  _listaCantones: any[] = [];
  cargandoCanton = false;
  _cantonesDeUnaProvincia(idProvincia) {
  this._listaCantones = [];
    this.cargandoCanton = true;
    this.cargarTab = false;
    this.listaComponentes1 = [];
    this.listaPublicacionesParroquia.data = [];
    this.mostrarDataCaracterizacionVistaPreviaLugar=false;
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
        this.cargandoCanton = false;
      });
  }
  _listaParroquias: any[] = [];
  cargandoParroquia = false;
  _parroquiasDeUnCanton(idCanton) {
    this._listaParroquias = [];
    this.cargarTab = false;
    this.listaComponentes1 = [];
    this.mostrarDataCaracterizacionVistaPreviaLugar=false;
    this.listaPublicacionesParroquia.data = [];
    this.cargandoParroquia = true;
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
        this.cargandoParroquia = false;
      });
  }
  _cargarRepresentanteParroquia(idParroquia) {
    this.cargarTab = false;
    this.listaComponentes1 = [];
    this.mostrarDataCaracterizacionVistaPreviaLugar=false;
    this.listaPublicacionesParroquia.data = [];

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
        } else {
          this.form_Representante.setValue('');
        }
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
  buscarCaracterizaciones(){
    this.cargarTab = false;
    this._consultarVersionesPublicadasDeUnaParroquia();
    //console.log(this.form_Parroquia.value)
  }
  listaPublicacionesParroquia = new MatTableDataSource<Element[]>();
  CargandoTablaModeloPublicadosVerisonados = false;
  _consultarVersionesPublicadasDeUnaParroquia() {
    this.listaPublicacionesParroquia.data = [];
    this.CargandoTablaModeloPublicadosVerisonados = true;
    this.CaracterizacionService.asignarresponsablemodelopublicado_consultarporparroquia(this.form_Parroquia.value)
      .then(
        data => {
          if (data['http']['codigo'] == '200') {
            this.listaPublicacionesParroquia.data = data['respuesta'];
          } else {
            console.log(data);
          }
        }
      ).catch(error => {
        console.log(error);
      }).finally(() => {
        this.CargandoTablaModeloPublicadosVerisonados = false;
        this.listaPublicacionesParroquia.paginator = this.paginator;
      });
  }
  _dataCabeceraCaracterizacion:any;
  NombreCaracterizacion = '';
  cargarTab = false;
  _buscarCabeceraCaracterizacion(element?){
    this.cargandoIngresoInformacion = true;
    this.NombreCaracterizacion =  element.ModeloPublicado.CabeceraVersionModelo.ModeloGenerico.Nombre +" (VERSIÓN "+element.ModeloPublicado.CabeceraVersionModelo.Version+")";
    console.log(element)
    var ejecutado = false;
    this._dataCabeceraCaracterizacion = "";
    this.CaracterizacionService._cabeceracaracterizacion_consultarporidasignarresponsablemodelopublicado(element.IdAsignarResponsableModeloPublicadoEncriptado)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          ejecutado = true;
          this._dataCabeceraCaracterizacion = data['respuesta']
          //console.log(data['respuesta']);
        } else {
          console.log(data);
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        if(ejecutado != false){
          if(this._dataCabeceraCaracterizacion==null){
            this._cabeceracaracterizacion_insertar(element);
          }else{
            this._prepararInformacion(this._dataCabeceraCaracterizacion.AsignarResponsableModeloPublicado.ModeloPublicado.CabeceraVersionModelo.IdCabeceraVersionModeloEncriptado)
          }
        }
      });
  }
  _cabeceracaracterizacion_insertar(element?){
    var ejecutado = false;
    this.CaracterizacionService._cabeceracaracterizacion_insertar(element.IdAsignarResponsableModeloPublicadoEncriptado)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          ejecutado = true;
          this._dataCabeceraCaracterizacion = data['respuesta'];
        } else {
          console.log(data);
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        if(ejecutado != false){
          this._prepararInformacion(this._dataCabeceraCaracterizacion.AsignarResponsableModeloPublicado.ModeloPublicado.CabeceraVersionModelo.IdCabeceraVersionModeloEncriptado)
        }
      });
  }
  listaComponentes1:any[]=[];
  mostrarDataCaracterizacionVistaPreviaLugar = false;
  cargandoIngresoInformacion = false;
  cargarDatos = false;
  _prepararInformacion(IdCabeceraVersionModeloEncriptado?){
    this.cargarDatos = true;
    if(this.cargandoIngresoInformacion == false){
      this.cargandoIngresoInformacion = true;
    }
    this.listaComponentes1 = [];
    var ejecutado = false;
    this.CaracterizacionService.cabeceraVersionModeloBodyConInformacion_consultar(IdCabeceraVersionModeloEncriptado)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          ejecutado = true;
          this.cargarDatos = false;
          this.listaComponentes1 = data['respuesta'][0].AsignarComponenteGenerico;
        } else {
          console.log(data['http']);
        }
      })
      .catch(error => {
        console.log(error);
      }).finally(() => {
        if(ejecutado!=false){
          this.mostrarDataCaracterizacionVistaPreviaLugar=true;
          this.cargarTab = true;
        }
        if(this.cargandoIngresoInformacion == true){
          this.cargandoIngresoInformacion = false;
        }
      });
  }
  _ingresarInformacion(element?){
    let dialogRef = this.dialog.open(ModalLlenarInformacionComponent, {
      width: '80%',
      height: '80%',
      data: {
        data: element,
        CabeceraCaracterizacion:this._dataCabeceraCaracterizacion
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this._prepararInformacion(this._dataCabeceraCaracterizacion.AsignarResponsableModeloPublicado.ModeloPublicado.CabeceraVersionModelo.IdCabeceraVersionModeloEncriptado);
      }
    }, error => {
    }, () => {
    });
  }

  tipoUsurio='';
  ngOnInit() {

    this.tipoUsurio= localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado');
    if(this.tipoUsurio==''){
      this.router.navigateByUrl("/login");
    }

    setTimeout(() => {
      this._consultarProvincias()
    });
  }

  filteredOptions: Observable<any[]>;
  private _filter(value: string): any[] {
    this.cargarTab = false;
    this.listaComponentes1 = [];
    this.mostrarDataCaracterizacionVistaPreviaLugar=false;
    this.listaPublicacionesParroquia.data = [];
    this._listaCantones = [];
    this._listaParroquias = [];
    this.form_Canton.reset();
    this.form_Parroquia.reset();
    this.form_Representante.setValue('');
    value = value.toLowerCase();
    if (value == '') {
      return [];
    } {
      return this._listaProvincias.filter(option => option.NombreProvincia.toLowerCase().indexOf(value) === 0);
    }
  }
}
