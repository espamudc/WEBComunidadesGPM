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
import { MatTabGroup, MatPaginator, MatTableDataSource, MatPaginatorIntl, MatAutocomplete, MatTable } from '@angular/material';
import { Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { map, startWith } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
@Component({
  selector: 'app-caracterizacion',
  templateUrl: './caracterizacion.component.html',
  styleUrls: ['./caracterizacion.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CaracterizacionComponent implements OnInit {

  constructor(
    private cuestionarioGenericoService: CuestionarioGenericoService,
    private cuestionarioPublicadoService: CuestionarioPublicadoService,
    private componenteCuestionarioGenericoService: ComponenteCuestionarioGenericoService,
    private CaracterizacionService: CaracterizacionService,
    private snackBarComponent: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.formCaracterizacion = new FormGroup({
      _nombre: new FormControl('', [Validators.required]),
      _descripcion: new FormControl('', [Validators.required]),
      _idModeloGenerico: new FormControl(''),
      _idCuestionarioGenerico: new FormControl(''),
    });
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTabGroup, { static: true }) tag: MatTabGroup;
  @ViewChild(MatAutocomplete, { static: false }) matAutocomplete: MatAutocomplete;
  @ViewChildren(MatTable) table !: QueryList<MatTable<string>>;
  _listaModeloGenerico = new MatTableDataSource<Element[]>();
  GuardarCaracterizacion = true;
  _listaSeccionesComponenteCuestionarioGenerico: any[] = [];
  _listaComponenteCaracterizacion: any[] = [];
  formCaracterizacion: FormGroup;
  tablaModelosGenericos = ['No', 'NOMBRE', 'ACCIONES'];
  tablaComponentesDeCuestionario = false;
  _DescripcionCaracterizacion = '';
  _NombreCuestionario = '';
  _VersionCuestionario = '';
  _ConCuestionario = false;
  element: any;
  _NombreCaracterizacion = '';
  IdCuestionarioPublicado = '';
  boolComponente = false;
  sniperComponenteCaracterizacion = false;
  sniperComponenteCuestionario = false;
  snniperCargaCaracterizacion = false;
  get formCaracterizacion_Nombre() {
    return this.formCaracterizacion.get("_nombre");
  }
  get formCaracterizacion_Descripcion() {
    return this.formCaracterizacion.get("_descripcion");
  }
  get _idModeloGenerico() {
    return this.formCaracterizacion.get('_idModeloGenerico');
  }
  get _idCuestionarioGenerico() {
    return this.formCaracterizacion.get('_idCuestionarioGenerico');
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._listaModeloGenerico.filter = filterValue.trim().toUpperCase();
  }
  caracterizacionTab(event){
    if(event.index == 0){
      this.boolComponente = false;
    }
  }
  async _consultarComponentesDeCuestionario(idModeloGenerico, _IdCuestionarioPublicado) {
    var listaTemporal = this._listaSeccionesComponenteCuestionarioGenerico;
    this._listaSeccionesComponenteCuestionarioGenerico = [];
    this.sniperComponenteCuestionario = true;
    var respuesta = await this.CaracterizacionService._consultarComponentesDeUnCuestionario(idModeloGenerico, _IdCuestionarioPublicado);
    if (respuesta['http']['codigo'] == "200") {
      this._listaSeccionesComponenteCuestionarioGenerico = [];
      this._listaSeccionesComponenteCuestionarioGenerico = respuesta['respuesta'];
    } else {
      this._listaSeccionesComponenteCuestionarioGenerico = listaTemporal;
      this.mensaje(respuesta['http']['mensaje']);
    }
    this.sniperComponenteCuestionario = false;
  }
  validarForm() {
    if (this.formCaracterizacion.valid) {
      if (this.GuardarCaracterizacion == true) {
        this.insertarModeloGenerico();
      } else {
        this.modificarModeloGenerico();
      }
    }
  }
  limpiarDatos() {
    this.formCaracterizacion.reset();
    this.formCaracterizacion.controls['_nombre'].setErrors(null);
    this.formCaracterizacion.controls['_descripcion'].setErrors(null);
    this.formCaracterizacion.setErrors({ invalid: true });
  }
  async insertarModeloGenerico() {
    this.tablaComponentesDeCuestionario = true;
    var respuesta = await this.CaracterizacionService._insertarModeloGenerico(
      this.formCaracterizacion_Nombre.value,
      this.formCaracterizacion_Descripcion.value,
    );
    if (respuesta['http']['codigo'] == "200") {
      this._listaModeloGenerico.data.push(respuesta['respuesta']);
      this._listaModeloGenerico.data = this._listaModeloGenerico.data.slice();
      this.limpiarDatos();
      this.mensaje("Ingresado correctamente", null, 'msj-success');
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
    this.tablaComponentesDeCuestionario = false;
  }
  async modificarModeloGenerico() {
    this.tablaComponentesDeCuestionario = true;
    const index = this._listaModeloGenerico.data.findIndex((inc: any) => inc.IdModeloGenericoEncriptado === this._idModeloGenerico.value);
    var respuesta = await this.CaracterizacionService._modificarModeloGenerico(
      this._idModeloGenerico.value,
      this.formCaracterizacion_Nombre.value,
      this.formCaracterizacion_Descripcion.value,
    );
    if (respuesta['http']['codigo'] == "200") {
      this._listaModeloGenerico.data[index] = respuesta['respuesta'];
      this._listaModeloGenerico.data = this._listaModeloGenerico.data.slice(0);
      this.limpiarDatos();
      this.GuardarCaracterizacion = true;
      this.mensaje("Modificado correctamente", null, 'msj-success');
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
    this.tablaComponentesDeCuestionario = false;
  }
  set_DatosParaModificar(element) {
    this.formCaracterizacion_Nombre.setValue(element.Nombre);
    this.formCaracterizacion_Descripcion.setValue(element.Descripcion);
    this._idModeloGenerico.setValue(element.IdModeloGenericoEncriptado);
    this.GuardarCaracterizacion = false;
  }
  _CancelarModificarModeloGenerico() {
    this.limpiarDatos();
    this.GuardarCaracterizacion = true;
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
  async consultarModeloGenerico(element) {
    this.snniperCargaCaracterizacion = true;
    this.element = element;
    this._NombreCuestionario = '';
    this._VersionCuestionario = '';
    this.boolComponente = true;
    this.tag.selectedIndex = 1;
    this._NombreCaracterizacion = element.Nombre;
    this._DescripcionCaracterizacion = element.Descripcion;
    this._idModeloGenerico.setValue(element.IdModeloGenericoEncriptado);
    this._listaComponenteCaracterizacion = [];
    var respuesta = await this.CaracterizacionService._consultarModeloGenerico(element.IdModeloGenericoEncriptado);
    if (respuesta['http']['codigo'] == "200") {
      this.snniperCargaCaracterizacion = false;
      if (respuesta['respuesta']['AsignarCuestionarioModelo'].length > 0) {
        this._VersionCuestionario = 'VERSIÓN ' + respuesta['respuesta']['AsignarCuestionarioModelo'][0].CuestionarioPublicado.CabeceraVersionCuestionario.Version;
        this._NombreCuestionario = respuesta['respuesta']['AsignarCuestionarioModelo'][0].CuestionarioPublicado.CuestionarioGenerico.Nombre;
        this._ConCuestionario = true;
        this.IdCuestionarioPublicado = respuesta['respuesta'].AsignarCuestionarioModelo[0].CuestionarioPublicado.IdCuestionarioPublicadoEncriptado;
        if (respuesta['respuesta']['AsignarCuestionarioModelo'][0].AsignarComponenteGenerico.length > 0) {
          respuesta['respuesta']['AsignarCuestionarioModelo'][0].AsignarComponenteGenerico.map(e=>{
            if (e.Utilizado =="1") {
              e.Utilizado = true;
            }else{
              e.Utilizado = false;
            }
            this._listaComponenteCaracterizacion.push(e);
          });
          //this._listaComponenteCaracterizacion = respuesta['respuesta']['AsignarCuestionarioModelo'][0].AsignarComponenteGenerico;
        }
        this._consultarComponentesDeCuestionario(element.IdModeloGenericoEncriptado, respuesta['respuesta'].AsignarCuestionarioModelo[0].CuestionarioPublicado.IdCuestionarioPublicadoEncriptado);
      } else {
        this._listaComponenteCaracterizacion = [];
        this._listaSeccionesComponenteCuestionarioGenerico = [];
        this._ConCuestionario = false;
      }
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
  }
  asignarCuestionario(data, element?) {
    if (data != 1) {
      data = { IdCuestionarioPublicado: this.IdCuestionarioPublicado, IdComponente: element };
    }
    let dialogRef = this.dialog.open(ModalAsignacionOrdenComponent, {
      width: '90%',
      height: '90%',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (data == 1) {
        if (result != undefined) {
          this._VersionCuestionario = 'VERSIÓN ' + result.CabeceraVersionCuestionario.Version;
          this._NombreCuestionario = result.CabeceraVersionCuestionario.AsignarResponsable.CuestionarioGenerico.Nombre;
          this.IdCuestionarioPublicado = result.IdCuestionarioPublicadoEncriptado;
          this._consultarComponentesDeCuestionario(this._idModeloGenerico.value, result.IdCuestionarioPublicadoEncriptado);
        }
      }
    }, error => {
    }, () => {
    });
  }
  async insertarAsignarComponenteGenerico(idAsignarCuestionarioModelo, idComponente) {
    var respuesta = await this.CaracterizacionService._insertarAsignarComponenteGenerico(
      idAsignarCuestionarioModelo,
      idComponente,
    );
    if (respuesta['http']['codigo'] == "200") {
      this.mensaje("Ingresado correctamente", null, 'msj-success');
      this._consultarComponentesDeCuestionario(this._idModeloGenerico.value, this.IdCuestionarioPublicado);
      this.consultarModeloGenerico(this.element);
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
  }
  async anadirComponente(_IdComponenteEncriptado) {
    var respuesta = await this.CaracterizacionService._insertarAsignarCuestionarioModelo(
      this.IdCuestionarioPublicado,
      this._idModeloGenerico.value,
      localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado'),
    );
    if (respuesta['http']['codigo'] == "200") {
      this.insertarAsignarComponenteGenerico(respuesta['respuesta'].IdAsignarCuestionarioModeloEncriptado, _IdComponenteEncriptado);
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
  }
  async _eliminarModeloGenerico(element) {
    this.tablaComponentesDeCuestionario = true;
    var respuesta = await this.CaracterizacionService._eliminarModeloGenerico(element.IdModeloGenericoEncriptado);
    if (respuesta['http']['codigo'] == "200") {
      this._listaModeloGenerico.data.splice(this._listaModeloGenerico.data.indexOf(element), 1);
      this._listaModeloGenerico = new MatTableDataSource<Element[]>(this._listaModeloGenerico.data.slice());
      this._listaModeloGenerico.paginator = this.paginator;
      this.mensaje("Eliminado correctamente", null, 'msj-success');
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
    this.tablaComponentesDeCuestionario = false;
  }
  async consultarModeloGenericoTodos() {
    this.tablaComponentesDeCuestionario = true;
    var respuesta = await this.CaracterizacionService._consultarModeloGenericoTodos();
    if (respuesta['http']['codigo'] == "200") {
      this._listaModeloGenerico.data = [];
      this._listaModeloGenerico.data = respuesta['respuesta'];
      this._listaModeloGenerico.paginator = this.paginator;
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
    this.tablaComponentesDeCuestionario = false;
  }
  async CambiarPosicion(_IdAsignarComponenteGenericoEncriptado, _Orden) {
    var respuesta = await this.CaracterizacionService._asignarComponenteGenerico_CambiarPosicion(
      _IdAsignarComponenteGenericoEncriptado,
      _Orden,
    );
    if (respuesta['http']['codigo'] == "200") {
      this.mensaje("Cambio realizado correctamente", null, 'msj-success');
      return true;
    } else {
      this.mensaje(respuesta['http']['mensaje']);
      return false;
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      if (event.container.id == '0') {
        if (event.previousIndex != event.currentIndex) {
          var ejecutado = this.CambiarPosicion(this._listaComponenteCaracterizacion[event.previousIndex].IdAsignarComponenteGenericoEncriptado, Number(event.currentIndex) + 1);
          if (!ejecutado) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
          } else {
            moveItemInArray(event.container.data, event.currentIndex, event.previousIndex);
          }
        }
      }
    } else {
      if (event.container.id == '0') {
        if(this._listaSeccionesComponenteCuestionarioGenerico[event.previousIndex].IdComponenteEncriptado!=undefined){
          this.anadirComponente(this._listaSeccionesComponenteCuestionarioGenerico[event.previousIndex].IdComponenteEncriptado);
        }else{
        }
      } else {
        if (this._listaComponenteCaracterizacion[event.previousIndex].Utilizado == true) {
          this.mensaje("No se puede eliminar porque ya esta siendo usado");
        }else{
          var ejecutado = this.eliminarAsignarComponenteGenerico(this._listaComponenteCaracterizacion[event.previousIndex].IdAsignarComponenteGenericoEncriptado);
          if (ejecutado) {
            this._consultarComponentesDeCuestionario(this._idModeloGenerico.value, this.IdCuestionarioPublicado);
          }
        }
      }
    }
  }
  async eliminarAsignarComponenteGenerico(_IdAsignarComponenteGenericoEncriptado) {
    var respuesta = await this.CaracterizacionService._eliminarAsignarComponenteGenerico(_IdAsignarComponenteGenericoEncriptado);
    if (respuesta['http']['codigo'] == "200") {
      this.mensaje("Eliminado correctamente", null, 'msj-success');
      this.consultarModeloGenerico(this.element);
      return true;
    } else {
      this.mensaje(respuesta['http']['mensaje']);
      return false;
    }
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

    this.consultarModeloGenericoTodos();
    //this._consultarTipoElemento();
    //this._consultar_cuestionarioPublicado();
  }
}
