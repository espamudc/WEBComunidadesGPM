import { Injectable, Component, QueryList, OnInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { CuestionarioGenericoService } from 'src/app/services/cuestionario-generico.service';
import { CaracterizacionService } from 'src/app/services/caracterizacion.service';
import { ComponenteCuestionarioGenericoService } from 'src/app/services/componente-cuestionario-generico.service';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from "@angular/material/dialog";
import { ModalAsignacionOrdenComponent } from "src/app/components/modal-asignacion-orden/modal-asignacion-orden.component";
import { ModalVistapreviaCaracterizacionComponent } from "src/app/components/modal-vistaprevia-caracterizacion/modal-vistaprevia-caracterizacion.component";
import { CuestionarioPublicadoService } from "src/app/services/cuestionario-publicado.service";
import { MatPaginator, MatTableDataSource, MatPaginatorIntl, MatAutocomplete, MatTable } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-caracterizacion',
  templateUrl: './caracterizacion.component.html',
  styleUrls: ['./caracterizacion.component.css']
})
export class CaracterizacionComponent implements OnInit {

  constructor(
    private cuestionarioGenericoService: CuestionarioGenericoService,
    private cuestionarioPublicadoService: CuestionarioPublicadoService,
    private componenteCuestionarioGenericoService: ComponenteCuestionarioGenericoService,
    private CaracterizacionService: CaracterizacionService,
    private snackBarComponent: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.formCaracterizacion = new FormGroup({
      _nombre: new FormControl('', [Validators.required]),
      _descripcion: new FormControl('', [Validators.required]),
      _cmbCuestionario: new FormControl(''),
      _cmbModeloGenerico: new FormControl(''),
      _idModeloGenerico: new FormControl(''),
      _tieneCuestionario: new FormControl(''),
      _idCuestionarioGenerico: new FormControl(''),
    });
    // this.formComponentesExpansion = new FormGroup({
    //   _orden: new FormControl('', [Validators.required]),
    //   _checkDescripcion: new FormControl('', [Validators.required]),
    //   _checkElemento: new FormControl('', [Validators.required])
    // });
  }
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  @ViewChild(MatAutocomplete, { static: false }) matAutocomplete: MatAutocomplete;
  @ViewChildren(MatTable) table !: QueryList<MatTable<string>>;
  _listaComponentesCuestionarioGenerico = new MatTableDataSource<Element[]>();
  toppings = new FormControl();
  seleccion = new FormControl();
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  toppingList: any[] = [];
  cargandoAutocomplete = false;
  formCaracterizacion: FormGroup;
  //formComponentesExpansion: FormGroup;
  Orden = '1';
  TipoElemento = '0';
  _checkDescripcion = false;
  _checkElemento = false;
  _idDescripcionComponente = '';

  tablaComponentes = ['componente', 'acciones'];
  tablaComponentesAccordion = ['DescripcionObligatoria', 'TipoElementoObligatoria', 'acciones'];
  _listaCuestionariosGenericos: any[] = [];
  //_listaComponentesCuestionarioGenerico: any[] = [];
  _listaSeccionesComponenteCuestionarioGenerico: any[] = [];
  _listaPreguntasSeccionComponenteCuestionarioGenerico: any[] = [];
  _listaPreguntasSeccionComponenteCuestionarioGenerico2: any[] = [];
  _listaTipoElemento: any[] = [];
  _listaModeloGenerico: any[] = [];
  btnGuardarModeloGenerico = false;
  btnVistaPrevia = true;
  vaciarCmbModeloGenerico = true;
  _dataModeloPorId: any[] = [];
  _listaComponentesPorModeloGenerico: any[] = [];
  ListaComponentesCaracterizacion = false;
  tablaComponentesDeCuestionario = false;
  get formCaracterizacion_Nombre() {
    return this.formCaracterizacion.get("_nombre");
  }
  get _tieneCuestionario() {
    return this.formCaracterizacion.get("_tieneCuestionario");
  }
  get formCaracterizacion_Descripcion() {
    return this.formCaracterizacion.get("_descripcion");
  }
  get form_cmbCuestionario() {
    return this.formCaracterizacion.get('_cmbCuestionario');
  }
  get form_cmbModeloGenerico() {
    return this.formCaracterizacion.get('_cmbModeloGenerico');
  }
  get _idModeloGenerico() {
    return this.formCaracterizacion.get('_idModeloGenerico');
  }
  get _idCuestionarioGenerico() {
    return this.formCaracterizacion.get('_idCuestionarioGenerico');
  }
  get formComponentesExpansion_Orden() {
    return this.formCaracterizacion.get("_orden");
  }
  get formComponentesExpansion_CheckDescripcion() {
    return this.formCaracterizacion.get("_checkDescripcion");
  }
  get formComponentesExpansion_CheckElemento() {
    return this.formCaracterizacion.get("_checkElemento");
  }
  PermitirEliminarModeloGenerico = false;
  typesOfShoes: any[] = [];
  listaSeleccionadaTipoDatoGuardar: any[] = [];
  mostrar() {
    var ListaSeleccionadaTipoDatos: any;
    this.ListaUltimaSeleccionada = [];
    this.listaSeleccionadaTipoDatoGuardar = [];
    //this.typesOfShoes = [];
    this.toppings.value.map(
      TipoElemento => {
        this.listaSeleccionadaTipoDatoGuardar.push(this._listaTipoElemento.find(p => p.IdTipoElementoEncriptado == TipoElemento));
      })
    this.typesOfShoes = this.listaSeleccionadaTipoDatoGuardar;
    //console.log(this.ListaUltimaSeleccionada);
    //console.log(document.getElementById("cmb"));
    //this.retornarDataSeleccionado();
    //console.log(this.selectedOptions);
  }
  ListaUltimaSeleccionada: any[] = [];
  _lista_tipo_elemento: any[] = [];
  retornarDataSeleccionado() {
    var Informacion: any;
    this._lista_tipo_elemento = [];
    this.ListaUltimaSeleccionada.map(
      data => {
        Informacion = {
          IdTipoElemento: data._value,
          Descripcion: this._listaTipoElemento.find(p => p.IdTipoElementoEncriptado == data._value).Descripcion,
          Obligatorio: data._selected,
        }
        this._lista_tipo_elemento.push(Informacion);
      })
    //console.log(this._lista_tipo_elemento);
  }
  datas(datashow?) {

    this.ListaUltimaSeleccionada = datashow.options._results;
    //console.log(this.ListaUltimaSeleccionada);
    this.retornarDataSeleccionado();
  }
  vaciarPanelExpansion() {
    this.Orden = '1';
    this.TipoElemento = '0';
    this._checkDescripcion = false;
    this._checkElemento = false;
  }
  _cargarMisCuestionariosGenericos() {
    this.cuestionarioGenericoService._consultarCuestionarioGeneriocoPorIdAsignarUsuarioTipoUsuarioEncriptado(
      localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado')
    )
      .then(data => {
        if (data['http']['codigo'] == '200') {
          //console.log("_listaCuestionariosGenerico:", data['respuesta']);
          this._listaCuestionariosGenericos = data['respuesta'];
        }
      }).catch(error => {

      }).finally(() => {

      });
  }
  _onChangeCmbCuestionariosGenericos(event?) {
    this._listaComponentesCuestionarioGenerico.data = [];
    this._listaSeccionesComponenteCuestionarioGenerico = null;
    this._listaPreguntasSeccionComponenteCuestionarioGenerico = null;
    this._listaPreguntasSeccionComponenteCuestionarioGenerico2 = null;
    if (event.value == '0') {
    } else {
      this._idCuestionarioGenerico.setValue(event.value);
      //console.log(event.value);
      //this._cuestionariogenerico_consultarporidconcomponenteconseccionconpregunta();
      this._consultarComponentesDeCuestionario();
    }
  }
  _consultarComponentesDeCuestionario() {
    this._listaComponentesCuestionarioGenerico.data = [];
    this.tablaComponentesDeCuestionario = true;
    var id = this.IdCuestionarioPublicado;
    this.CaracterizacionService._consultarComponentesDeUnCuestionario(this._idModeloGenerico.value, this.IdCuestionarioPublicado,
    )
      .then(data => {
        if (data['http']['codigo'] == '200') {
          //console.log(data['respuesta']);
          this._listaComponentesCuestionarioGenerico.data = data['respuesta'];
        }
      }).catch(error => {

      }).finally(() => {
        this.tablaComponentesDeCuestionario = false;
        this.IdCuestionarioPublicado = id;
        this._listaComponentesCuestionarioGenerico.paginator = this.paginator;
        this.CargarLabel();
      });
  }
  CargarLabel() {
    this.paginator._intl.itemsPerPageLabel = 'Registro Por Páginas';
    this.paginator._intl.firstPageLabel = 'Inicio';
    this.paginator._intl.lastPageLabel = 'Ultimo';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
  }
  guardarAsignarDescripcionTipoElemento(IdAsignarComponenteGenericoEncriptado) {
    var ejecutado = false;
    let theTableIWant = this.table.find(option => option['_elementRef'].nativeElement.id == IdAsignarComponenteGenericoEncriptado);
    // this.table.find(option => option['_elementRef'].nativeElement.id == "MwAwADQAMQA=").dataSource=[];
    // console.log(theTableIWant.dataSource)
    this.CaracterizacionService._insertarAsignarDescripcionComponenteTipoElemento(
      this._idDescripcionComponente,
      this.TipoElemento,
      this.Orden,
      this._checkElemento
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        this.table.find(option => option['_elementRef'].nativeElement.id == IdAsignarComponenteGenericoEncriptado).dataSource = [];
        this.table.find(option => option['_elementRef'].nativeElement.id == IdAsignarComponenteGenericoEncriptado).dataSource = data['respuesta'];
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
        this.cargandoPantallaPrincipal = false;
        this.vaciarPanelExpansion();
      }
      // this.consultarModeloGenerico();
      // //this._setCuestionarios();
      // this.ListaComponentesCaracterizacion = false;
    });
  }
  tablaDescripcion = false;
  guardarDescripcionComponente(element?) {
    if (this.Orden == '' || !this.Orden || this.Orden <= '0' || this.TipoElemento == '0') {
      //console.log("error");
    } else {
      this.cargandoPantallaPrincipal = true;
      this.CaracterizacionService._insertarDescripcionComponente(
        element.IdAsignarComponenteGenericoEncriptado,
        this._checkDescripcion,
        this.Orden
      ).then(data => {
        if (data['http']['codigo'] == '200') {
          //console.log(data['respuesta'])
          this._idDescripcionComponente = data['respuesta'].IdDescripcionComponenteEncriptado;
        } else if (data['http']['codigo'] == '500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        } else {
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        // this._listaComponentesPorModeloGenerico = [];
        this.guardarAsignarDescripcionTipoElemento(element.IdAsignarComponenteGenericoEncriptado);
        if(this.cargandoPantallaPrincipal ==true){
          this.cargandoPantallaPrincipal = false;
        }
      });
    }
  }
  eliminarAsignarDescripcionComponenteTipoElemento(element?, IdAsignarComponenteGenericoEncriptado?) {
    var idDescripcionComponente = '';
    this.CaracterizacionService._eliminarAsignarDescripcionComponenteTipoElemento(
      element.AsignarDescripcionComponenteTipoElemento.IdAsignarDescripcionComponenteTipoElementoEncriptado,
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        idDescripcionComponente = element.IdDescripcionComponenteEncriptado;
        //console.log(data['respuesta']);
      } else if (data['http']['codigo'] == '500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      } else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      if (idDescripcionComponente != '') {
        this.eliminarDescripcionComponente(element, IdAsignarComponenteGenericoEncriptado);
      }
    });
  }
  eliminarDescripcionComponente(data?, IdAsignarComponenteGenericoEncriptado?) {
    var ejecutado = false;
    var cantidad = 0;
    this.CaracterizacionService._eliminarDescripcionComponente(
      data.IdDescripcionComponenteEncriptado,
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        ejecutado = true;
        cantidad = data['respuesta'].length;
        this.table.find(option => option['_elementRef'].nativeElement.id == IdAsignarComponenteGenericoEncriptado).dataSource = [];
        this.table.find(option => option['_elementRef'].nativeElement.id == IdAsignarComponenteGenericoEncriptado).dataSource = data['respuesta'];
      } else if (data['http']['codigo'] == '500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      } else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      if(ejecutado!=false){
        if(cantidad==0){
          this.consultarModeloGenerico(this.form_cmbModeloGenerico.value)
        }
      }
      //this.consultarModeloGenericoPorId(this._idModeloGenerico.value);
      //this.consultarModeloGenerico();
      //this.consultarModeloGenerico();
      //this._setCuestionarios();
    });
  }
  eliminarItemComponenteGenerico(element?, index?, IdAsignarComponenteGenericoEncriptado?) {
    this.eliminarAsignarDescripcionComponenteTipoElemento(element, IdAsignarComponenteGenericoEncriptado);
  }
  validarForm() {
    if (this.formCaracterizacion.valid) {
      this.insertarModeloGenerico();
    }
  }
  insertarModeloGenerico() {
    this.cargandoPantallaPrincipal = true;
    var ejecutado = false;
    this.CaracterizacionService._insertarModeloGenerico(
      this.formCaracterizacion_Nombre.value,
      this.formCaracterizacion_Descripcion.value,
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        this._listaModeloGenerico.push(data['respuesta']);
        ejecutado = true;
        this.formCaracterizacion.reset();
        this.form_cmbModeloGenerico.setValue(data['respuesta'].IdModeloGenericoEncriptado);
        this._idModeloGenerico.setValue(data['respuesta'].IdModeloGenericoEncriptado);
        this.formCaracterizacion_Nombre.setValue(data['respuesta'].Nombre);
        this.formCaracterizacion_Descripcion.setValue(data['respuesta'].Descripcion);
        this.formCaracterizacion_Nombre.disable();
        this.formCaracterizacion_Descripcion.disable();
        this.btnGuardarModeloGenerico = true;
        this.vaciarCmbModeloGenerico = false;
        this.form_cmbCuestionario.enable();
        this.btnVistaPrevia = false;
      } else if (data['http']['codigo'] == '500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      } else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      if (ejecutado == true) {
        this.PermitirEliminarModeloGenerico = true;
        if(!this.myControl.enabled){
          this.myControl.enable();
        }
        if(this.cargandoPantallaPrincipal == true){
          this.cargandoPantallaPrincipal = false;
        }
        //this.consultarModeloGenerico();
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
  cargandoModeloGenerico = false;
  _listaModeloGenerico1 = [];
  consultarModeloGenerico(idModeloGenerico) {
    this._listaModeloGenerico1 = [];
    this._listaComponentesPorModeloGenerico = [];
    //this._listaModeloGenerico = [];
    //this.cargandoModeloGenerico = true;
    this.CaracterizacionService._consultarModeloGenerico(idModeloGenerico)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          //this._listaModeloGenerico = data['respuesta'];
          this._listaModeloGenerico1 = data['respuesta'];
        } else {
          console.log(data['http']);
        }
      })
      .catch(error => {
        console.log(error);
      }).finally(() => {
        this._setCuestionarios();
        // if (this._idModeloGenerico.value != "") {
        //   this.ListaComponentesCaracterizacion = true;
        //   this._setCuestionarios();
        // }
        //this.cargandoModeloGenerico = false;
      });
  }
  // consultarModeloGenericoPorId(_IdModeloGenericoEncriptado) {
  //   this.CaracterizacionService._consultarModeloGenerico()
  //     .then(data => {
  //       if (data['http']['codigo'] == '200') {
  //         var DataNueva = data['respuesta'].find(p => p.IdModeloGenericoEncriptado == _IdModeloGenericoEncriptado);
  //         var index = 0;
  //         for (let clave of this._listaModeloGenerico) {
  //           if (clave.IdModeloGenericoEncriptado == _IdModeloGenericoEncriptado) {
  //             this._listaModeloGenerico[index] = DataNueva;
  //             this._setComponentesDeUnModeloGenerico(this._listaModeloGenerico[index]);
  //             break
  //           }
  //           index = index + 1;
  //         }
  //       } else {
  //         console.log(data['http']);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     }).finally(() => {
  //       this._setCuestionarios();
  //       //this._consultarComponentesDeCuestionario();
  //     });
  // }
  eliminarAsignarComponenteGenerico(element?) {
    this.cargandoPantallaPrincipal = true;
    var ejecutado = false;
    this.CaracterizacionService._eliminarAsignarComponenteGenerico(element.IdAsignarComponenteGenericoEncriptado
    )
      .then(data => {
        if (data['http']['codigo'] == '200') {
          //console.log(data['respuesta']);
          ejecutado = true;
        }
      }).catch(error => {

      }).finally(() => {
        if (ejecutado != false) {
          this.consultarModeloGenerico(this.form_cmbModeloGenerico.value);
        }
        //this.consultarModeloGenerico();
        //this._idCuestionarioGenerico.setValue('');
        //this.consultarModeloGenericoPorId(this._idModeloGenerico.value);
        //this._consultarComponentesDeCuestionario();
      });
  }
  vaciarComboModeloGenerico() {
    try {
      this.PermitirEliminarModeloGenerico = false;
      this.btnVistaPrevia = true;
      this.btnGuardarModeloGenerico = false;
      this.formCaracterizacion.reset();
      this.formCaracterizacion.enable();
      this.vaciarCmbModeloGenerico = true;
      this._listaComponentesCuestionarioGenerico.data = [];
      this._listaComponentesPorModeloGenerico = [];
      if (this.myControl.disabled != false) {
        this.myControl.disable();
      }
      this.myControl.setValue('');
      this.boolComponente = false;
    } catch (err) {

    }
  }
  cargandoPantallaPrincipal = false;
  _onChangeCmbModeloGenerico(event?) {
    if (event.value != 0) {
      this.cargandoPantallaPrincipal = true;
      this._idCuestionarioGenerico.setValue('');
      this.vaciarCmbModeloGenerico = false;
      this._listaComponentesPorModeloGenerico = [];
      this._listaComponentesCuestionarioGenerico.data = [];
      this._setModeloGenerico(event.value);
      this.consultarModeloGenerico(event.value);
      //this._setCuestionarios();
      // this._idModeloGenerico.setValue(event.value);
      // this.consultarModeloGenerico();
      this.btnGuardarModeloGenerico = true;
      this.btnVistaPrevia = false;
    } else {
      this._NombreCaracterizacion = '';
      this._idModeloGenerico.setValue('');
      this.vaciarComboModeloGenerico();
      this.boolComponente = false;
    }
  }
  _NombreCaracterizacion = '';
  _setModeloGenerico(_IdModeloGenericoEncriptado) {
    var Datos = this._listaModeloGenerico.find(p => p.IdModeloGenericoEncriptado == _IdModeloGenericoEncriptado);
    this._idModeloGenerico.setValue(Datos.IdModeloGenericoEncriptado)
    this.formCaracterizacion_Nombre.setValue(Datos.Nombre);
    this.formCaracterizacion_Descripcion.setValue(Datos.Descripcion);
    this.formCaracterizacion_Nombre.disable();
    this.formCaracterizacion_Descripcion.disable();
    this._NombreCaracterizacion = Datos.Nombre;
    //console.log(Datos);
    if (Datos.ModeloGenericoVersionadoUtilizado == "0") {
      this.PermitirEliminarModeloGenerico = true;
    } else {
      this.PermitirEliminarModeloGenerico = false;
    }
  }
  _eliminarModeloGenerico() {
    this.cargandoPantallaPrincipal = true;
    var ejecutado = false;
    this.CaracterizacionService._eliminarModeloGenerico(this._idModeloGenerico.value)
      .then(data => {
        if (data['http']['codigo'] == '200') {
          ejecutado = true;
        }
      }).catch(error => {

      }).finally(() => {
        if (ejecutado != false) {
          this._idModeloGenerico.setValue('');
          this.consultarModeloGenericoTodos();
          this.vaciarComboModeloGenerico();
          //this.consultarModeloGenerico();
          this._NombreCaracterizacion = '';
          this.boolComponente = false;
        }
      });
  }
  vistaPrevia() {
    var Datos = this._listaModeloGenerico.find(p => p.IdModeloGenericoEncriptado == this._idModeloGenerico.value);
    var datosEncabezados =
    {
      NombreCaracterizacion: this.formCaracterizacion_Nombre.value,
      Descripcion: this.formCaracterizacion_Descripcion.value,
      ListaComponentes: this._listaComponentesPorModeloGenerico
    }
    //console.log(datosEncabezados);
    let dialogRef = this.dialog.open(ModalVistapreviaCaracterizacionComponent, {
      width: '80%',
      height: '80%',
      data: Datos,
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(result)
    }, error => {

    }, () => {
    });
  }
  _setComponentesDeUnModeloGenerico(elemento) {
    //var Datos = this._listaModeloGenerico.find(p => p.IdModeloGenericoEncriptado == this._idModeloGenerico.value);
    //datos para mostrar en las persianas
    this._listaComponentesPorModeloGenerico = [];
    this._listaComponentesCuestionarioGenerico.data = [];
    var Id_CuestionarioGenerico = '';
    var NombreCuestionarioGenerico = '';
    var DescripcionCuestionarioGenerico = '';
    var IdAsignarComponenteGenerico = '';
    var OrdenAsignarComponenteGenerico = '';
    var IdComponente = '';
    var DescripcionComponente = '';
    var AsignarComponenteGenericoUtilizado = '';
    var detalle: any;
    var listaDescripcionComponenteGenerico: any;
    if (elemento.AsignarCuestionarioModelo.length > 0) {
      elemento.AsignarCuestionarioModelo[0].CuestionarioGenerico.map(
        CuestionarioGenerico => {
          Id_CuestionarioGenerico = CuestionarioGenerico.IdCuestionarioGenericoEncriptado;
          NombreCuestionarioGenerico = CuestionarioGenerico.Nombre;
          DescripcionCuestionarioGenerico = CuestionarioGenerico.Descripcion;
          CuestionarioGenerico.AsignarComponenteGenerico.map(
            AsignarComponenteGenerico => {
              //console.log(AsignarComponenteGenerico);
              IdAsignarComponenteGenerico = AsignarComponenteGenerico.IdAsignarComponenteGenericoEncriptado;
              OrdenAsignarComponenteGenerico = AsignarComponenteGenerico.Orden;
              IdComponente = AsignarComponenteGenerico.Componente.IdComponenteEncriptado;
              DescripcionComponente = AsignarComponenteGenerico.Componente.Descripcion;
              AsignarComponenteGenericoUtilizado = AsignarComponenteGenerico.Utilizado;
              detalle = {
                _Id_CuestionarioGenerico: Id_CuestionarioGenerico,
                _NombreCuestionarioGenerico: NombreCuestionarioGenerico,
                _DescripcionCuestionarioGenerico: DescripcionCuestionarioGenerico,
                _IdAsignarComponenteGenerico: IdAsignarComponenteGenerico,
                _OrdenAsignarComponenteGenerico: OrdenAsignarComponenteGenerico,
                _IdComponente: IdComponente,
                _DescripcionComponente: DescripcionComponente,
                _AsignarComponenteGenericoUtilizado: AsignarComponenteGenericoUtilizado,
                _lista: [],
              },
                AsignarComponenteGenerico.DescripcionComponente.map(
                  DescripcionComponente => {
                    listaDescripcionComponenteGenerico = {
                      _IdDescripconComponente: DescripcionComponente.IdDescripcionComponenteEncriptado,
                      _DescripcionObligatoria: DescripcionComponente.Obligatorio,
                      _UtilizadoDescripcionComponente: DescripcionComponente.Utilizado,
                      _IdAsignarDescripcionComponenteTipoElemento: DescripcionComponente.AsignarDescripcionComponenteTipoElemento.IdAsignarDescripcionComponenteTipoElementoEncriptado,
                      _AsignarDescripcionComponenteTipoElementoObligatorio: DescripcionComponente.AsignarDescripcionComponenteTipoElemento.Obligatorio,
                      _UtilizadoAsignarDescripcionComponenteTipoElemento: DescripcionComponente.AsignarDescripcionComponenteTipoElemento.Utilizado,
                      _TipoElemento: DescripcionComponente.AsignarDescripcionComponenteTipoElemento.TipoElemento.Descripcion,
                    }
                    detalle._lista.push(listaDescripcionComponenteGenerico);
                  }
                )
              this._listaComponentesPorModeloGenerico.push(detalle);
            }
          )
        }
      )
      //console.log(this._listaComponentesPorModeloGenerico);
    } else {
      console.log("igual a cero");
    }
    this._consultarComponentesDeCuestionario();
  }
  _setCuestionarios() {
    //var Datos = this._listaModeloGenerico1.find(p => p.IdModeloGenericoEncriptado == this._idModeloGenerico.value);
    var Datos = this._listaModeloGenerico1;
    this._listaComponentesPorModeloGenerico = [];
    if (Datos != undefined) {
      this._listaComponentesPorModeloGenerico = Datos['AsignarCuestionarioModelo'];
      if (this._listaComponentesPorModeloGenerico.length > 0) {
        //this._listaComponentesPorModeloGenerico = [];
        this._NombreCaracterizacion = Datos['Nombre'];
        this.boolComponente = true;
        let index = this._listaCuestionariosGenericos.find(state => state.IdCuestionarioPublicadoEncriptado === this._listaComponentesPorModeloGenerico[0].IdCuestionarioPublicado);
        this.myControl.setValue(index.IdCuestionarioPublicadoEncriptado)
        this.myControl.disable();
        this.IdCuestionarioPublicado = index.IdCuestionarioPublicadoEncriptado;
        this._consultarComponentesDeCuestionario();
        // console.log(this.tables.find((el: ElementRef) => el.nativeElement.id === "index1"))

      } else {
        this._NombreCaracterizacion = '';
        this.boolComponente = false;
        if (this.myControl.enabled == false) {
          this.myControl.setValue('');
          this.myControl.enable();
        }
      }
    }
    if (this.ListaComponentesCaracterizacion == true) {
      this.ListaComponentesCaracterizacion = false;
    }
    if(this.cargandoPantallaPrincipal == true){
      this.cargandoPantallaPrincipal = false
    }
  }
  AsignarCuestionarioModelo(element) {
    let dialogRef = this.dialog.open(ModalAsignacionOrdenComponent, {
      width: '30%',
      height: 'auto',
      data:
      {
        AsignarCuestionarioModelo: element,
        IdModeloGenerico: this._idModeloGenerico.value,
        AsignacionTipoUsuario: localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado'),
        IdCuestionarioPublicado: this.IdCuestionarioPublicado
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this._idModeloGenerico.setValue(result.value._idModeloGenerico);
      if (result.value._aceptarBoton != 0) {
        this.cargandoPantallaPrincipal = true;
        if (this.form_cmbCuestionario.disabled == false) {
          this.form_cmbCuestionario.disable();
        }
        this.consultarModeloGenerico(this._idModeloGenerico.value);
      }
    }, error => {
    }, () => {
    });

  }
  _consultarTipoElemento() {
    this.CaracterizacionService._consultarTipoElemento()
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this._listaTipoElemento = [];
          this._listaTipoElemento = data['respuesta'];
          this.toppingList = data['respuesta'];
          //console.log( data['respuesta']);
        } else {
          console.log(data['http']);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  _cuestionariogenerico_consultarporidconcomponenteconseccionconpregunta() {
    //console.log("id version cues ", this.form_cmbCuestionario.value);
    this.cuestionarioGenericoService._cuestionariogenerico_consultarporidconcomponenteconseccionconpregunta(this.form_cmbCuestionario.value)
      .then(data => {

        if (data['http']['codigo'] == '200') {
          //console.log("componentes de una version", data['respuesta']);

        } else {

        }
      }).catch(error => {

      }).finally(() => {

      });
  }
  _consultar_cuestionarioPublicado() {
    this.myControl.disable();
    this._listaCuestionariosGenericos = [];
    this.cargandoAutocomplete = true;
    this.cuestionarioPublicadoService._consultar_cuestionarioPublicado()
      .then(data => {
        if (data['http']['codigo'] == "200") {
          this._listaCuestionariosGenericos = data['respuesta'];
          //console.log(data['respuesta'])
        } else {

        }
      }).catch(error => {
      }).finally(() => {
        this.cargandoAutocomplete = false;
        this.myControl.enable();
        // setTimeout(() => {
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
        // });
      });
  }
  IdCuestionarioPublicado = '';
  displayFn(IdCuestionarioPublicadoEncriptado) {
    if (!IdCuestionarioPublicadoEncriptado) {
      this.IdCuestionarioPublicado = '';
      this._listaComponentesCuestionarioGenerico.data = [];
      return '';
    }
    let index = this._listaCuestionariosGenericos.find(state => state.IdCuestionarioPublicadoEncriptado === IdCuestionarioPublicadoEncriptado);
    this.IdCuestionarioPublicado = index.IdCuestionarioPublicadoEncriptado;
    this._consultarComponentesDeCuestionario();
    return index.CabeceraVersionCuestionario.AsignarResponsable.CuestionarioGenerico.Nombre + " VERSION " + index.CabeceraVersionCuestionario.Version;
  }
  boolComponente = false;
  consultarModeloGenericoTodos() {
    this._listaModeloGenerico = [];
    this.cargandoModeloGenerico = true;
    this.CaracterizacionService._consultarModeloGenericoTodos()
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this._listaModeloGenerico = data['respuesta'];
        } else {
          console.log(data['http']);
        }
      })
      .catch(error => {
        console.log(error);
      }).finally(() => {
        if(this.cargandoPantallaPrincipal == true){
          this.cargandoPantallaPrincipal = false;
        }
        this.cargandoModeloGenerico = false;
      });
  }

  ngOnInit() {
    this.consultarModeloGenericoTodos();
    // this.consultarModeloGenerico();
    this._consultarTipoElemento();
    this._consultar_cuestionarioPublicado();
  }
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<any[]>;
  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    this.IdCuestionarioPublicado = '';
    this._listaComponentesCuestionarioGenerico.data = [];
    return this._listaCuestionariosGenericos.filter(option => (option.CabeceraVersionCuestionario.AsignarResponsable.CuestionarioGenerico.Nombre.toLowerCase()).indexOf(filterValue) === 0);
  }
}
