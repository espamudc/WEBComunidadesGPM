import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ProvinciaComponent } from '../provincia/provincia.component';
import { LugaresService } from 'src/app/services/lugares.service';
import { MatTable, MatDialog, MatSnackBar } from '@angular/material';
import { ModalLugarRepresentanteComponent } from '../modal-lugar-representante/modal-lugar-representante.component';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-canton',
  templateUrl: './canton.component.html',
  styleUrls: ['./canton.component.css'],
})
export class CantonComponent implements OnInit {
  filterProvincia: string;
  _nombreProvincia: string;
  _IdProvincia: string;
  _listaCantones: any[] = [];
  control = new FormControl();
  streets: string[] = [];
  filteredStreets: Observable<string[]>;
  _listaProvincias: any[] = []
  tablaCantones = ['codigo', 'canton', 'provincia', 'acciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private lugaresService: LugaresService,
    private modalLugarRepresentante: MatDialog,
    private snackBarComponent: MatSnackBar,
    private router: Router
  ) {
    this.formCanton = new FormGroup({
      _idCantonEncriptado: new FormControl(''),
      _idProvinciaEncriptado: new FormControl('', [Validators.required]),
      _nombre: new FormControl('', [Validators.required]),
      _codigo: new FormControl('', [Validators.required]),
      _descripcion: new FormControl(''),
      _rutaLogo: new FormControl(''),
    });
  }

  tipoUsurio='';
  ngOnInit() {

    this.tipoUsurio= localStorage.getItem('IdTipoUsuarioEncriptado');
    if(this.tipoUsurio==''){
      this.router.navigateByUrl("/login");
    }
    this._consultarCantones();
    this._consultarProvincias();
    this.filtroProvincias();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onSelectionChanged(event: MatAutocompleteSelectedEvent, nombre: any) {
    this._listaProvincias.forEach(element => {
      if (element.NombreProvincia == nombre) {
        this.formCanton_idProvinciaEncriptado.setValue(element.IdProvinciaEncriptado);
        this._IdProvincia = element.IdProvinciaEncriptado;
        this._nombreProvincia = element.NombreProvincia;
      }
    });
  }
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  formCanton: FormGroup;
  get formCanton_idCantonEncriptado() {
    return this.formCanton.get("_idCantonEncriptado");
  }
  get formCanton_idProvinciaEncriptado() {
    return this.formCanton.get("_idProvinciaEncriptado");
  }
  get formCanton_provincia() {
    return this.formCanton.get("_provincia");
  }
  get formCanton_nombre() {
    return this.formCanton.get("_nombre");
  }
  get formCanton_codigo() {
    return this.formCanton.get("_codigo");
  }
  get formCanton_descripcion() {
    return this.formCanton.get("_descripcion");
  }
  get formCanton_rutaLogo() {
    return this.formCanton.get("_rutaLogo");
  }
  tablaProvincias = ['provincia', 'acciones'];
  _validar = true;
  _idCantonEncriptado = "";
  _codigoCanton = "";
  _nombreCanton = "";
  _descripcionCanton = "";
  _rutaLogoCanton = "";
  _btnAccion = "Guardar";
  @ViewChild('frmCanton', { static: false }) frmCanton: Form;
  @ViewChild(ProvinciaComponent, { static: false }) provinciaComponent: ProvinciaComponent;
  _limpiarForm() {
    this.formCanton.reset();
    this.clearMenssageError();
    this._btnAccion = "Guardar";
  }
  _validarFormulario() {
    if (this._btnAccion === "Guardar") {
      this._ingresarCanton();
    } else if (this._btnAccion === "Modificar") {
      this._modificarCanton();
    }
  }
  
  _consultarCantones() {
    this._listaCantones = null;
    this.lugaresService._consultarCantones()
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this._listaCantones = data['respuesta'];
          this.dataSource.data = this._listaCantones;
        } else if (data['http']['codigo'] == '500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }
      })
      .catch(error => {
        this.mensaje(error);
      })
  }
  _ingresarCanton() {
    if (this.formCanton_codigo.value == null || this.formCanton_nombre.value == null) {
      this.mensaje("Ingrese el código y/o nombre del cantón");
    } else {
      this.lugaresService._insertarCanton(
        this.formCanton_codigo.value,
        this.formCanton_nombre.value,
        this.formCanton_descripcion.value,
        this.formCanton_rutaLogo.value,
        this.formCanton_idProvinciaEncriptado.value
      ).then(data => {
        if (data['http']['codigo'] == '200') {
          this._consultarCantones();
          this._consultarProvincias();
          this.formCanton.reset();
          this.clearMenssageError();
          this.formCanton_idProvinciaEncriptado.setValue(this._IdProvincia);
          this.formCanton.setErrors({ invalid: true });
          this.mensaje("Persona registrada", null, 'msj-success');
        } else if (data['http']['codigo'] == '500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        } else if (data['http']['codigo'] == '500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        } else {
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error => {
        this.mensaje(error);
      })
    }
  }
  _modificarCanton() {
    if (this.formCanton_codigo.value == null || this.formCanton_nombre.value == null) {
      this.mensaje("Ingrese el código y/o nombre del cantón");
    } else {
      this.lugaresService._modificarCanton(
        this.formCanton_idCantonEncriptado.value,
        this.formCanton_codigo.value,
        this.formCanton_nombre.value,
        this.formCanton_descripcion.value,
        this.formCanton_rutaLogo.value,
        this.formCanton_idProvinciaEncriptado.value
      ).then(data => {
        if (data['http']['codigo'] == '200') {
          this._consultarCantones();
          this._consultarProvincias();
          this.formCanton.reset();
          this.clearMenssageError();
          this._nombreProvincia = null;
          this.mensaje("Registro actualizado", null, 'msj-success');
        } else if (data['http']['codigo'] == '500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        } else {
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error => {
        this.mensaje(error);
      })
    }
  }
  _eliminarCanton(_item) {
    this.lugaresService._eliminarCanton(
      _item.IdCantonEncriptado
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        this._consultarCantones();
        this._consultarProvincias();
        this.mensaje("Registro eliminado");
      } else if (data['http']['codigo'] == '500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      } else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error => {
      this.mensaje(error);
    })
  }
  _provinciaQuitada: any = "";
  _prepararCanton(_item) {
    this.formCanton_idProvinciaEncriptado.setValue(_item.Provincia.IdProvinciaEncriptado);
    this.formCanton_idCantonEncriptado.setValue(_item.IdCantonEncriptado);
    this.formCanton_codigo.setValue(_item.CodigoCanton);
    this.formCanton_nombre.setValue(_item.NombreCanton);
    this.formCanton_descripcion.setValue(_item.DescripcionCanton);
    this.formCanton_rutaLogo.setValue(_item.RutaLogoCanton);
    this._nombreProvincia = _item.Provincia.NombreProvincia;
    this._idCantonEncriptado = _item.IdCantonEncriptado;
    this._codigoCanton = _item.CodigoCanton;
    this._nombreCanton = _item.NombreCanton;
    this._descripcionCanton = _item.DescripcionCanton;
    if (this._descripcionCanton == 'null') {
      this._descripcionCanton = "";
    }
    this._rutaLogoCanton = _item.RutaLogoCanton;
    this._btnAccion = "Modificar";
  }
  @ViewChild('MatTableProvincias', { static: false }) MatTableProvincias: MatTable<any>;
  _consultarProvincias() {
    this.lugaresService._consultarProvincias()
      .then(data => {
        if (data['http']['codigo'] == '200') {
          this._listaProvincias = data['respuesta'];
          this.streets.length = 0;
          for (let index = 0; index < this._listaProvincias.length; index++) {
            this.streets.push(this._listaProvincias[index].NombreProvincia);
          }
          this.filtroProvincias();
        } else if (data['http']['codigo'] == '500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }
      })
      .catch(error => {
        this.mensaje(error);
      })
  }
  filtroProvincias() {
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map(value => value.length >= 1 ? this._filter(value) : [])
    );
  }
  _verRepresentante(_item) {
    let dialogRef = this.modalLugarRepresentante.open(ModalLugarRepresentanteComponent, {
      width: 'auto',
      height: 'auto',
      data: { lugar_tipo: 'canton', lugar_data: _item }
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
  clearMenssageError() {
    this.formCanton.controls['_nombre'].setErrors(null);
    this.formCanton.controls['_codigo'].setErrors(null);
    this.formCanton.controls['_descripcion'].setErrors(null);
  }
}