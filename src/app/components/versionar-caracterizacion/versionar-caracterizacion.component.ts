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
      _formVersionarCmbCaracterizacion: new FormControl(''),
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
  ListaVersionesCarga = false;
  // consultarModeloGenerico() {
  //   this.myControl.disable();
  //   this.cargandoAutocomplete=true;
  //   this.CaracterizacionService._consultarModeloGenerico()
  //     .then(data => {
  //       if (data['http']['codigo'] == '200') {
  //         this.listaModeloCaracterizacion = data['respuesta'];
  //       } else {
  //         console.log(data['http']);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     }).finally(() => {
  //       this.cargandoAutocomplete=false;
  //       this.myControl.enable();
  //       this.filteredOptions = this.myControl.valueChanges.pipe(
  //         startWith(''),
  //         map(value => this._filter(value))
  //       );
  //     });
  // }

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
    let index = this.listaModeloCaracterizacion.find(state => state.IdModeloGenericoEncriptado === this.myControl.value);
    if (this.formVersionar.valid) {
      if (index != undefined) {
        this._idModeloGenerico = index.IdModeloGenericoEncriptado;
        this._insertarCabeceraModeloGenerico();
      } else {
      }
    }
  }
  _insertarCabeceraModeloGenerico() {
    var Ejecutado = false;
    this.CaracterizacionService._insertarCabeceraVersionModelo(
      this._idModeloGenerico,
      localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado'),
      this.formVersionar_Caracteristica.value,
      this.formVersionar_Version.value
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        Ejecutado = true;
        //this.cabeceraVersionModelo = data['respuesta'];
      } else if (data['http']['codigo'] == '500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      } else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      if(Ejecutado!=false)
      {
        this.formVersionar_Version.reset();
        this.formVersionar_Caracteristica.setValue('');
        this._consultarCabeceraVersion(this._idModeloGenerico);
      }
    });
  }
  _eliminarCabeceraVersionModelo(data?) {
    var ejecutado = false;
    this.CaracterizacionService._eliminarCabeceraVersionamientoModelo(
      data.IdCabeceraVersionModeloEncriptado,
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        //console.log(data['respuesta']);
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
        this._consultarCabeceraVersion(data.IdModeloGenerico);
      }
    });
  }
  _consultarCabeceraVersion(idModeloGenericoEncriptado?) {
    this.ListaVersionesCarga = true;
    var ejecutado = false;
    this._VersionesPorCaracterizacion.data = [];
    this.CaracterizacionService._consultarCabeceraVersion(idModeloGenericoEncriptado)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this._VersionesPorCaracterizacion.data =  data['respuesta'];
          //console.log(data['respuesta'])
          ejecutado = true;
        } else {
          console.log(data['http']);
        }
      })
      .catch(error => {
        console.log(error);
      }).finally(() => {
        if(ejecutado==true){
          setTimeout(() => {
            this._VersionesPorCaracterizacion.paginator = this.paginator;
            this.CargarLabel()
          });
        }
        this.ListaVersionesCarga = false;
      });
  }
  _ListaVersionDeCaracterizacion: any[] = [];
  ListaDescripcionComponenteBody:any[]=[];
  _verModalDetalle(data?) {
    this.ListaDescripcionComponenteBody=[];
    var ejecutado = false;
    this.CaracterizacionService._consultarCabeceraVersionBody(data.IdCabeceraVersionModeloEncriptado)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          ejecutado = true;
          this.ListaDescripcionComponenteBody=data['respuesta'];
        } else {
          console.log(data['http']);
        }
      })
      .catch(error => {
        console.log(error);
      }).finally(() => {
        if(ejecutado!=false){
          let dialogRef = this.dialog.open(ModalVersionarCaracterizacionComponent, {
            width: '80%',
            height: '80%',
            data: this.ListaDescripcionComponenteBody[0]
          });
          dialogRef.afterClosed().subscribe(result => {
            if(result == true){
              this._consultarCabeceraVersion(data.IdModeloGenerico);
            }
          }, error => {

          }, () => {
          });
        }
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
  displayFn(_IdCuestionarioPublicadoEncriptado) {
    if (!_IdCuestionarioPublicadoEncriptado) {
      this._idModeloGenerico = '';
      return '';
    }
    let index = this.listaModeloCaracterizacion.find(state => state.IdModeloGenericoEncriptado === _IdCuestionarioPublicadoEncriptado);
    this._idModeloGenerico = index.IdModeloGenericoEncriptado;
    this._consultarCabeceraVersion(this._idModeloGenerico);
    return index.Nombre;
  }
  consultarModeloGenericoTodos() {
      this.myControl.disable();
      this.cargandoAutocomplete=true;
      this.CaracterizacionService._consultarModeloGenericoTodos()
        .then(data => {
          if (data['http']['codigo'] == '200') {
            this.listaModeloCaracterizacion = data['respuesta'];
          } else {
            console.log(data['http']);
          }
        })
        .catch(error => {
          console.log(error);
        }).finally(() => {
          this.cargandoAutocomplete=false;
          this.myControl.enable();
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
          );
        });
  }
  ngOnInit() {
    //this.consultarModeloGenerico();
    this.consultarModeloGenericoTodos();
  }

  cargandoAutocomplete = false;
  myControl = new FormControl('', [Validators.required]);
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<any[]>;
  dataRequerida = false;
  private _filter(value: string): any[] {
    this._VersionesPorCaracterizacion.data = [];
    const filterValue = value.toLowerCase();
    this._idModeloGenerico = '';
    return this.listaModeloCaracterizacion.filter(option => (option.Nombre.toLowerCase()).indexOf(filterValue) === 0);
  }
}
