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
    this.formLugares = new FormGroup({
      _cmbProvincia: new FormControl('', [Validators.required]),
      _cmbCanton: new FormControl('', [Validators.required]),
      _cmbParroquia: new FormControl('', [Validators.required]),
      _cmbComunidad: new FormControl(''),
      _nComunidad: new FormControl('', [Validators.required]),
    });
  }
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  @ViewChild('paginator1', { static: false }) paginator1: MatPaginator;
  _listaVersionesPublicadas = new MatTableDataSource<Element[]>();
  _ListaAsignarModeloGenericoParroquias = new MatTableDataSource<Element[]>();
  CargandoTablaModeloPublicadosVerisonados = false;
  CargandoExpansionPanel = false;
  CargandoTablaAsignarParroquiaModelo = false;
  CargandoExpansionPanelHeader = false;
  formPublicarVersion: FormGroup;
  formLugares: FormGroup;
  _verAsignarParroquia: boolean = false;
  get formLugares_NComunidad() {
    return this.formLugares.get("_nComunidad");
  }
  get formLugares_cmbProvincia() {
    return this.formLugares.get("_cmbProvincia");
  }
  get formLugares_cmbCanton() {
    return this.formLugares.get("_cmbCanton");
  }
  get formLugares_cmbParroquia() {
    return this.formLugares.get("_cmbParroquia");
  }
  get formLugares_cmbComunidad() {
    return this.formLugares.get("_cmbComunidad");
  }

  get formCaracterizacionPublicar_cmbCaracterizacion() {
    return this.formPublicarVersion.get("_formCmbCaracterizacion");
  }
  get form_cmbCabeceraVersionCaracterizacion() {
    return this.formPublicarVersion.get("_formCmbVersiones");
  }
  get formCaracterizacion_cmbPeriodo() {
    return this.formPublicarVersion.get("_formCmbPeriodo");
  }
  _listaPeriodos: any[] = [];
  listaModeloCaracterizacion: any[] = [];
  _listaVersiones: any[] = [];
  _VersionesDeUnaCaracterizacion: any[] = [];
  //_listaVersionesPublicadas: any[] = [];
  _ListaVersionDeCaracterizacion: any[] = [];
  _listaParroquiasDeUnaVersion: any[] = [];
  Caracterizacion = '';
  Version = '';
  Periodo = '';
  autoComplete = false;
  loadingVersiones = false;
  sniperPeriodo = false;
  _consultarPeriodos() {
    this.sniperPeriodo = true;
    this.periodoService._consultarPeriodos()
      .then(data => {
        if (data['http']['codigo'] == "500") {

        } else if (data['http']['codigo'] == "200") {
          this._listaPeriodos = [];
          this._listaPeriodos = data['respuesta'];
        } else {

        }
      }).catch(error => {

      }).finally(() => {
        this.sniperPeriodo = false;
        this.formCaracterizacion_cmbPeriodo.setValue("0");
      });
  }
  _onExpandPanelPeriodo() {
    //this._consultarPeriodos();
  }
  cmbPeriodo = '0';
  cmbVersion: string;
  periodoObligatorio = false;
  _validarForm() {
    if (this.cmbPeriodo != '0' && this.cmbVersion != '0') {
      var ejecutado = false;
      this.CaracterizacionService._insertarPublicarVersionamientoModelo(
        this.cmbVersion,
        this.cmbPeriodo,
        localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado')
      ).then(data => {
        if (data['http']['codigo'] == '200') {
          ejecutado = true;
        } else if (data['http']['codigo'] == '500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        } else {
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        if (ejecutado != false) {
          setTimeout(() => {
            this._consultarVersionesCaracterizacionPublicadas();
          });
          setTimeout(() => {
            this.myControl.setValue('');
            this.versionsSinPublicarDeUnModeloGenerico = [];
            this._consultarModelosGenericosConVersioneSinPublicar();
          });
        }
      });
    }
  }
  idModeloPublicado = '';
  informacionModeloGenericoPublicado: any[] = [];
  estadoVersionPublicada = true;
  _prepararModeloGenericoPublicado(element?) {
    var ejecutado = false;
    this.CaracterizacionService._consultarCabeceraVersionBody(element.IdCabeceraVersionModeloEncriptado)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          ejecutado = true;
          element = data['respuesta'][0];
        } else {
          console.log(data['http']);
        }
      })
      .catch(error => {
        console.log(error);
      }).finally(() => {
        if(ejecutado!=false){
          let dialogRef = this.dialog.open(ModalAsignarRepresentanteModeloPublicadoComponent, {
            width: '80%',
            height: '80%',
            data: element,
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result == true) {
              this._consultarVersionesCaracterizacionPublicadas();
            }
          }, error => {
          }, () => {
          });
        }
      });
  }
  actualPaginator: MatPaginator;
  //LUGARES
  _listaProvincias: any[] = [];
  _consultarProvincias() {
    this.lugaresService._consultarProvincias()
      .then(
        data => {
          if (data['http']['codigo'] == '200') {
            this._listaProvincias = data['respuesta'];
          } else {
            console.log(data);
          }
        }
      )
      .catch(
        err => {
          console.log(err);
        }
      )
  }
  _listaCantones: any[] = [];
  _cantonesDeUnaProvincia(event) {
    this.formLugares_cmbCanton.reset();
    this.formLugares_cmbParroquia.reset();
    this.formLugares_cmbComunidad.reset();
    this.formLugares_NComunidad.reset();
    var id = event;
    if (id != "0") {
      this.lugaresService._consultarCantonesDe(id)
        .then(data => {
          if (data['http']['codigo'] == '200') {
            this._listaCantones = data['respuesta'];
          } else {
            console.log(data);
          }
        }).catch(error => {
          console.log(error);
        }).finally(() => {
          //this._validarCompletos();
        });
    }
  }
  _listaParroquias: any[] = [];
  _parroquiasDeUnCanton(event) {
    this.formLugares_cmbParroquia.reset();
    this.formLugares_cmbComunidad.reset();
    this.formLugares_NComunidad.reset();
    var id = event;
    if (id != "0") {
      this.lugaresService._consultarParroquiasDe(id)
        .then(data => {
          if (data['http']['codigo'] == '200') {
            this._listaParroquias = data['respuesta'];
          } else {
            console.log(data);
          }
        }).catch(error => {
          console.log(error);
        }).finally(() => {
          //this._validarCompletos();
        });
    }
  }
  _listaComunidades: any[] = [];
  _comunidadesDeUnaParroquia(event) {
    this.formLugares_NComunidad.reset();
    var id = event;
    if (id != "0") {
      this.lugaresService._consultarComunidadesDe(id)
        .then(data => {
          if (data['http']['codigo'] == '200') {
            this._listaComunidades = data['respuesta'];
            //console.log("data:", data['respuesta']);
          } else {
            console.log(data);
          }
        }).catch(error => {
          console.log(error);
        }).finally(() => {
          this.formLugares_NComunidad.setValue(this._listaComunidades.length);
          //this._validarCompletos();
        });
    }
  }
  _insertarAsignarParroquiaVersionCaracterizacion() {
    this.insertarAsignarModeloGenericoParroquia();
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
  consultarModeloGenerico() {
    this.listaModeloCaracterizacion = [];
    // this.CaracterizacionService._consultarModeloGenerico()
    //   .then(data => {
    //     if (data['http']['codigo'] == '200') {
    //       this.listaModeloCaracterizacion = data['respuesta'].filter(p1 => p1.NumeroVersionesSinPublicar != 0);
    //     } else {
    //       console.log(data['http']);
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   }).finally(() => {
    //     this._consultarCabeceraVersion();
    //   });
  }
  _consultarVersiones() {
    this._listaVersiones = [];
    this._VersionesDeUnaCaracterizacion = [];
    this.CaracterizacionService._consultarCabeceraVersion('1')
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this._listaVersiones = data['respuesta'];
          //console.log(data['respuesta']);
        } else {
          console.log(data['http']);
        }
      })
      .catch(error => {
        console.log(error);
      }).finally(() => {
        if (this.formCaracterizacionPublicar_cmbCaracterizacion.value != 0) {
          this._listaVersiones.map(
            Versiones => {
              if (Versiones.IdModeloGenerico == this.formCaracterizacionPublicar_cmbCaracterizacion.value) {
                if (Versiones.ModeloPublicado == null) {
                  this._VersionesDeUnaCaracterizacion.push(Versiones);
                } else if (Versiones.ModeloPublicado.Estado != true) {
                  this._VersionesDeUnaCaracterizacion.push(Versiones);
                }
              }
            })
          if (this._VersionesDeUnaCaracterizacion.length > 0) {
            this.form_cmbCabeceraVersionCaracterizacion.setValue("0");
            this.form_cmbCabeceraVersionCaracterizacion.enable();
          } else {
            this.form_cmbCabeceraVersionCaracterizacion.disable();
            this.form_cmbCabeceraVersionCaracterizacion.reset();
          }
        }
        //this._listaVersionesPublicadas = this._listaVersiones.filter(version => version.ModeloPublicado != null && version.ModeloPublicado.Estado == true);
      });
  }
  _consultarCabeceraVersion() {
    this.CargandoTablaModeloPublicadosVerisonados = true;
    this._listaVersiones = [];
    this._VersionesDeUnaCaracterizacion = [];
    this._listaVersionesPublicadas.data = [];
    this.CaracterizacionService._consultarCabeceraVersion('1')
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this._listaVersiones = data['respuesta'];
          //console.log(data['respuesta']);
        } else {
          console.log(data['http']);
        }
      })
      .catch(error => {
        console.log(error);
      }).finally(() => {
        if (this.formCaracterizacionPublicar_cmbCaracterizacion.value != 0) {
          this._listaVersiones.map(
            Versiones => {
              if (Versiones.IdModeloGenerico == this.formCaracterizacionPublicar_cmbCaracterizacion.value) {
                if (Versiones.ModeloPublicado == null) {
                  this._VersionesDeUnaCaracterizacion.push(Versiones);
                } else if (Versiones.ModeloPublicado.Estado != true) {
                  this._VersionesDeUnaCaracterizacion.push(Versiones);
                }
              }
            })
          if (this._VersionesDeUnaCaracterizacion.length > 0) {
            this.form_cmbCabeceraVersionCaracterizacion.setValue("0");
            this.form_cmbCabeceraVersionCaracterizacion.enable();
          } else {
            this.form_cmbCabeceraVersionCaracterizacion.disable();
            this.form_cmbCabeceraVersionCaracterizacion.reset();
          }
        }
        this._listaVersionesPublicadas.data = this._listaVersiones.filter(version => version.ModeloPublicado != null && version.ModeloPublicado.Estado == true);
        this._listaVersionesPublicadas.paginator = this.paginator;
        //this.paginator._intl.itemsPerPageLabel = 'Registro Por Páginas';
        //this.CargarLabel();
        this.CargandoTablaModeloPublicadosVerisonados = false;
      });
  }
  CargarLabel() {
    this.paginator._intl.itemsPerPageLabel = 'Registro Por Páginas';
    this.paginator._intl.firstPageLabel = 'Inicio';
    this.paginator._intl.lastPageLabel = 'Ultimo';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._listaVersionesPublicadas.filterPredicate = function(data: any, filterValue: string) {
      return data.filterValue /** replace this with the column name you want to filter */
        .trim()
        .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;
    };
  }
  _eliminarPublicacionVersionModelo(element?) {
    var ejecutado = false;
    this.CaracterizacionService._eliminarModeloPublicado(
      element.ModeloPublicado.IdModeloPublicadoEncriptado,
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        ejecutado = true;
      } else if (data['http']['codigo'] == '500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      } else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      if (this._verAsignarParroquia == true) {
        this._verAsignarParroquia = false;
      }
      if (ejecutado != false) {
        setTimeout(() => {
          this._consultarVersionesCaracterizacionPublicadas();
        });
        setTimeout(() => {
          this.myControl.setValue('');
          this.versionsSinPublicarDeUnModeloGenerico = [];
          this._consultarModelosGenericosConVersioneSinPublicar();
        });
      }
    });
  }
  _eliminarModeloVersionPublicadoParroquia(element?) {
    var ejecutado = false;
    this.CaracterizacionService._eliminarAsignarModeloPublicadoParroquia(
      element.IdAsignarModeloGenericoParroquiaEncriptado,
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        ejecutado = true;
        //console.log(data['respuesta']);
      } else if (data['http']['codigo'] == '500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      } else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      if (ejecutado != false) {
        setTimeout(() => {
          this._ListaAsignarModeloGenericoParroquias.paginator = null;
          this.paginator1 = null;
          this._consultarVersionesCaracterizacionPublicadas();
        });
        setTimeout(() => {
          this._consultarParroquiaDeUnaVersionesCaracterizacionPublicadas(this.idModeloPublicado);
        });
      }
    });
  }
  _onChangeCmbCaracterizacion(event?) {
    //this._consultarCabeceraVersion();
    this._consultarVersiones();
    // this._VersionesDeUnaCaracterizacion=[];
    // var Versiones:any[];
    // this.CaracterizacionService._consultarCabeceraVersion()
    //   .then(data => {
    //     if (data['http']['codigo'] == '200') {
    //       Versiones = data['respuesta'];
    //     } else {
    //       console.log(data['http']);
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   }).finally(() => {
    //     console.log(Versiones);
    //   });
  }
  vistaPrevia(element?) {
    //console.log(element)
    //console.log(this.informacionModeloGenericoPublicado)
    var DataMostrar: any;
    var Comunidades: any;

    this.lugaresService._consultarComunidadesDe(element.IdParroquia)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          Comunidades = data['respuesta'];
        } else {
          console.log(data);
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        let dialogRef = this.dialog.open(ModalVistapreviaCaracterizacionComponent, {
          width: '80%',
          height: '80%',
          data:
          {
            data: this.informacionModeloGenericoPublicado,
            Lugar: element,
            NumeroComunidades: Comunidades.length,
          }
        });
        dialogRef.afterClosed().subscribe(result => {
        }, error => {
        }, () => {
        });
      });
  }
  insertarAsignarModeloGenericoParroquia() {
    var Estado = false;
    this.CaracterizacionService._insertarAsignarModeloGenericoParroquia(
      this.idModeloPublicado,
      this.formLugares_cmbParroquia.value,
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        Estado = true;
      } else if (data['http']['codigo'] == '500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      } else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      if (Estado != false) {
        setTimeout(() => {
          this._consultarVersionesCaracterizacionPublicadas();
        });
        setTimeout(() => {
          this._consultarParroquiaDeUnaVersionesCaracterizacionPublicadas(this.idModeloPublicado);
        });
      }
    });
  }
  listaModeloGenericoConVersiones: any[] = [];
  _consultarModelosGenericosConVersioneSinPublicar() {
    this.autoComplete = true;
    this.listaModeloGenericoConVersiones = [];
    this.CaracterizacionService._consultarModelosGenericosConVersioneSinPublicar()
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this.listaModeloGenericoConVersiones = data['respuesta'];
          // console.log(data['respuesta'])
        } else {
          console.log(data['http']);
        }
      })
      .catch(error => {
        console.log(error);
      }).finally(() => {
        this.autoComplete = false;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      });
  }
  _consultarVersionesCaracterizacionPublicadas() {
    this._listaVersionesPublicadas.data = [];
    this.CargandoTablaModeloPublicadosVerisonados = true;
    this.CaracterizacionService._consultarVersionesCaracterizacionPublicadas()
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this._listaVersionesPublicadas.data = data['respuesta'];
          console.log(data['respuesta'])
        } else {
          console.log(data['http']);
        }
      })
      .catch(error => {
        console.log(error);
      }).finally(() => {
        this.CargandoTablaModeloPublicadosVerisonados = false;
        this._listaVersionesPublicadas.paginator = this.paginator;
        // if(this.paginator._intl.itemsPerPageLabel!="Registro Por Páginas"){
        //   //this.CargarLabel();
        // }
      });
  }
  versionsSinPublicarDeUnModeloGenerico: any[] = [];
  _consultarVersioneSinPublicarDeUnModeloGenerico(id_ModeloGenerico) {
    this.cmbVersion = '';
    this.loadingVersiones = true;
    this.versionsSinPublicarDeUnModeloGenerico = [];
    this.CaracterizacionService._consultarVersioneSinPublicarDeUnModeloGenerico(id_ModeloGenerico)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this.versionsSinPublicarDeUnModeloGenerico = data['respuesta'];
        } else {
          console.log(data['http']);
        }
      })
      .catch(error => {
        console.log(error);
      }).finally(() => {
        this.cmbVersion = '0';
        this.loadingVersiones = false;
      });
  }
  // _HabilitarModeloGenericoParroquia(_IdAsignarModeloGenericoParroquiaEncriptado) {
  //   var ejecutado = false;
  //   this.CaracterizacionService._HabilitarModeloGenericoParroquia(_IdAsignarModeloGenericoParroquiaEncriptado.IdAsignarModeloGenericoParroquiaEncriptado)
  //     .then(data => {
  //       if (data['http']['codigo'] == '200') {
  //         ejecutado = true;
  //       } else {
  //         console.log(data['http']);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     }).finally(() => {
  //       if (ejecutado != false) {
  //         setTimeout(() => {
  //           this._ListaAsignarModeloGenericoParroquias.paginator = null;
  //           this.paginator1 = null;
  //           this._consultarVersionesCaracterizacionPublicadas();
  //         });
  //         setTimeout(() => {
  //           this._consultarParroquiaDeUnaVersionesCaracterizacionPublicadas(this.idModeloPublicado);
  //         });
  //       }
  //     });
  // }
  // _DesHabilitarModeloGenericoParroquia(_IdAsignarModeloGenericoParroquiaEncriptado) {
  //   var ejecutado = false;
  //   this.CaracterizacionService._DesHabilitarModeloGenericoParroquia(_IdAsignarModeloGenericoParroquiaEncriptado.IdAsignarModeloGenericoParroquiaEncriptado)
  //     .then(data => {
  //       if (data['http']['codigo'] == '200') {
  //         ejecutado = true;
  //       } else {
  //         console.log(data['http']);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     }).finally(() => {
  //       if (ejecutado != false) {
  //         setTimeout(() => {
  //           this._ListaAsignarModeloGenericoParroquias.paginator = null;
  //           this.paginator1 = null;
  //           this._consultarVersionesCaracterizacionPublicadas();
  //         });
  //         setTimeout(() => {
  //           this._consultarParroquiaDeUnaVersionesCaracterizacionPublicadas(this.idModeloPublicado);
  //         });
  //       }
  //     });
  // }
  _HabilitarModeloPublicado(_IdModeloPublicadoEncriptado) {
    var ejecutado = false;
    this.CaracterizacionService._HabilitarModeloPublicado(_IdModeloPublicadoEncriptado.ModeloPublicado.IdModeloPublicadoEncriptado)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          ejecutado = true;
        } else {
          console.log(data['http']);
        }
      })
      .catch(error => {
        console.log(error);
      }).finally(() => {
        if (ejecutado != false) {
          if (this._verAsignarParroquia == true) {
            this._verAsignarParroquia = false;
          }
          setTimeout(() => {
            this._consultarVersionesCaracterizacionPublicadas();
          });
        }
      });
  }
  _DesHabilitarModeloPublicad(_IdModeloPublicadoEncriptado) {
    var ejecutado = false;
    this.CaracterizacionService._DesHabilitarModeloPublicad(_IdModeloPublicadoEncriptado.ModeloPublicado.IdModeloPublicadoEncriptado)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          ejecutado = true;
        } else {
          console.log(data['http']);
        }
      })
      .catch(error => {
        console.log(error);
      }).finally(() => {
        if (ejecutado != false) {
          if (this._verAsignarParroquia == true) {
            this._verAsignarParroquia = false;
          }
          setTimeout(() => {
            this._consultarVersionesCaracterizacionPublicadas();
          });
        }
      });
  }
  asignarResponsable(element?) {
    let dialogRef = this.dialog.open(ModalAsignarRepresentanteModeloPublicadoComponent, {
      width: '80%',
      height: '80%',
      data:
      {
        Lugar: element,
        Data: this.informacionModeloGenericoPublicado
      },
    });
    dialogRef.afterClosed().subscribe(result => {
    }, error => {
    }, () => {
    });
  }
  IdCabeceraVersionModeloEncriptado = '';
  listaAsignarParroquia: any[] = [];
  MatAccordionParroquia = false;
  _consultarParroquiaDeUnaVersionesCaracterizacionPublicadas(idModeloPublicado) {
    this.CargandoTablaAsignarParroquiaModelo = true;
    if (this._verAsignarParroquia == true) {
      if (this.CargandoExpansionPanelHeader == false) {
        this.CargandoExpansionPanelHeader = true;
      }
    } else {
      this.MatAccordionParroquia = true;
    }
    this.listaAsignarParroquia = [];
    this._ListaAsignarModeloGenericoParroquias.data = [];
    this.CaracterizacionService._consultarParroquiaDeUnaVersionesCaracterizacionPublicadas(idModeloPublicado)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this.listaAsignarParroquia = data['respuesta'];
        } else {
          console.log(data['http']);
        }
      })
      .catch(error => {
        console.log(error);
      }).finally(() => {
        if (this._verAsignarParroquia == true) {
          if (this.CargandoExpansionPanelHeader == true) {
            this.CargandoExpansionPanelHeader = false;
          }
        } else {
          this.MatAccordionParroquia = false;
        }
        this.CargandoTablaAsignarParroquiaModelo = false;
        //if(this.listaAsignarParroquia['ModeloPublicado'].AsignarModeloGenericoParroquia!=[]){
        //console.log("con datos");
        console.log("hola")
        setTimeout(() => {
          this._listaVersionesPublicadas.paginator = null;
          this.paginator = null;
          this._ListaAsignarModeloGenericoParroquias.data = this.listaAsignarParroquia['ModeloPublicado'].AsignarModeloGenericoParroquia;
          this._ListaAsignarModeloGenericoParroquias.paginator = this.paginator1;
        });
        //}
      });
  }
  displayFn(IdModeloGenerico) {
    if (!IdModeloGenerico) {
      return '';
    }
    let index = this.listaModeloGenericoConVersiones.find(state => state.IdModeloGenerico === IdModeloGenerico);
    this.IdCabeceraVersionModeloEncriptado = index.IdCabeceraVersionModeloEncriptado;
    this._consultarVersioneSinPublicarDeUnModeloGenerico(index.IdModeloGenerico);
    return index.ModeloGenerico.Nombre;
  }

  tipoUsurio='';
  ngOnInit() {

    this.tipoUsurio= localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado');
    if(this.tipoUsurio==''){
      this.router.navigateByUrl("/login");
    }
    this._consultarModelosGenericosConVersioneSinPublicar();
    this._consultarPeriodos();
    this._consultarVersionesCaracterizacionPublicadas();
    this._consultarProvincias();
  }
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<any[]>;
  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    this.versionsSinPublicarDeUnModeloGenerico = [];
    this.cmbVersion = '0';
    return this.listaModeloGenericoConVersiones.filter(option => (option.ModeloGenerico.Nombre.toLowerCase()).indexOf(filterValue) === 0);
  }
  private _filterTable(value: string): any[] {
    return this._listaVersionesPublicadas.data.filter(option => (option['ModeloGenerico'].Nombre.toLowerCase()).indexOf(value) === 0);
  }
}
