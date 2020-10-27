import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { LugaresService } from 'src/app/services/lugares.service';
import { CantonComponent } from '../canton/canton.component';
import { MatTable, MatDialog, MatSnackBar } from '@angular/material';
import { ModalLugarRepresentanteComponent } from '../modal-lugar-representante/modal-lugar-representante.component';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { identifierModuleUrl } from '@angular/compiler';
@Component({
  selector: 'app-parroquia',
  templateUrl: './parroquia.component.html',
  styleUrls: ['./parroquia.component.css']
})
export class ParroquiaComponent implements OnInit {
  formParroquia: FormGroup;
  filterCanton: string;
  filteredCanton: Observable<string[]>;
  control = new FormControl();
  cantones: string[] = [];
  _listaCantones:any[]=[];
  _listaParroquias:any[]=[];
  _nombreProvincia:string;
  _nombreCanton:string;
  _idCantonEncriptado:string;
  _idProvinciaEncriptado:string;
  tablaParroquias = ['codigo','parroquia', 'canton', 'acciones'];
  _btnAccion="Guardar";
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private lugaresService:LugaresService,
    private modalLugarRepresentante:MatDialog,
    private snackBarComponent:MatSnackBar,
    private router: Router
  ) {
    this.formParroquia = new FormGroup({
      _descripcionParroquia: new FormControl(''),
      _poblacionParroquia: new FormControl(''),
      _superficieParroquia: new FormControl(''),
      _temperaturaParroquia: new FormControl(''),
      _climaParroquia: new FormControl(''),
      _idParroquia:new FormControl(''),
      _nombreParroquia: new FormControl('', [Validators.required]),
      _codigoParroquia: new FormControl('', [Validators.required]),
      _rutaLogoParroquia:new FormControl(''),
      
    });
  }

  tipoUsurio='';
  ngOnInit() {

    this.tipoUsurio= localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado');
    if(this.tipoUsurio==''){
      this.router.navigateByUrl("/login");
    }
    this._consultarParroquias();
    this._consultarCantones();
    this.filtroCantones();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  filtroCantones() {
    this.filteredCanton = this.control.valueChanges.pipe(
      startWith(''),
      map(value => value.length >= 1 ? this._filter(value) : [])
    );
  }
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.cantones.filter(canton => this._normalizeValue(canton).includes(filterValue));
  }
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  onSelectionChanged(event: MatAutocompleteSelectedEvent, nombre: any) {
    this._listaCantones.forEach(element => {
      if (element.NombreCanton == nombre) {
          this._nombreProvincia=element.Provincia.NombreProvincia;
          this._nombreCanton=element.NombreCanton;
          this._idCantonEncriptado=element.IdCantonEncriptado;
          this._idProvinciaEncriptado=element.Provincia.IdProvinciaEncriptado;
      }
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
 _validarFormulario(){
        if (this._btnAccion==="Guardar") {
          this._ingresarParroquia();
        }else if (this._btnAccion==="Modificar") {
          this._modificarParroquia();
        }
  }
  _consultarParroquias(){
    this._listaParroquias = null;
    this.lugaresService._consultarParroquias()
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaParroquias=data['respuesta'];
          this.dataSource.data = this._listaParroquias;
        }
      })
      .catch(error=>{
        this.mensaje(error);
      })
  }
  clearMenssageError(){
  this.formParroquia.controls['_nombreParroquia'].setErrors(null);
  this.formParroquia.controls['_codigoParroquia'].setErrors(null);
  this.formParroquia.controls['_descripcionParroquia'].setErrors(null);
  this.formParroquia.controls['_poblacionParroquia'].setErrors(null);
  this.formParroquia.controls['_superficieParroquia'].setErrors(null);
  this.formParroquia.controls['_temperaturaParroquia'].setErrors(null);
  this.formParroquia.controls['_climaParroquia'].setErrors(null);
 }
  _ingresarParroquia(){
    this.lugaresService._insertarParroquia(
      this.formParroquia.value._codigoParroquia,
      this.formParroquia.value._nombreParroquia,
      this.formParroquia.value._descripcionParroquia,
      this.formParroquia.value._poblacionParroquia,
      this.formParroquia.value._superficieParroquia,
      this.formParroquia.value._temperaturaParroquia,
      this.formParroquia.value._climaParroquia,
      this.formParroquia.value._rutaLogoParroquia,
      this._idCantonEncriptado,
      this._idProvinciaEncriptado,
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarParroquias();
        this.formParroquia.reset();
        this.clearMenssageError();
        this.formParroquia.setErrors({ invalid: true });
        this.mensaje("Parroquia registrada", null, 'msj-success');
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        this.mensaje(data['http']['mensaje']);
      }
    })
  }
  _modificarParroquia(){
    if(this.formParroquia.value._descripcionParroquia=="null"){
      this.formParroquia.get('_descripcionParroquia').setValue("");
    }
    this.lugaresService._modificarParroquia(
      this.formParroquia.value._idParroquia,
      this.formParroquia.value._codigoParroquia,
      this.formParroquia.value._nombreParroquia,
      this.formParroquia.value._descripcionParroquia,
      this.formParroquia.value._poblacionParroquia,
      this.formParroquia.value._superficieParroquia,
      this.formParroquia.value._temperaturaParroquia,
      this.formParroquia.value._climaParroquia,
      this.formParroquia.value._rutaLogoParroquia,
      this._idCantonEncriptado,
      this._idProvinciaEncriptado      
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarParroquias();
        this.formParroquia.reset();
        this._btnAccion = "Guardar";
        this.clearMenssageError();
        this.formParroquia.setErrors({ invalid: true });
        this._idProvinciaEncriptado="";
        this._nombreProvincia="";
        this._idCantonEncriptado="";
        this._nombreCanton="";
        this.mensaje("Registro actualizado", null, 'msj-success');
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        console.log(data['http']);
        this.mensaje(data['http']['mensaje']);
      }
    })
  }
  _eliminarParroquia(_item){
    this.lugaresService._eliminarParroquia(
      _item.IdParroquiaEncriptado
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarParroquias();
        this.mensaje("Registro eliminado", null, 'msj-success');
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        this.mensaje(data['http']['mensaje']);
      }
    })
  }
  _prepararParroquia(_item){
  
    this._idProvinciaEncriptado = _item.Canton.Provincia.IdProvinciaEncriptado;
    this._nombreProvincia       = _item.Canton.Provincia.NombreProvincia;
    this._idCantonEncriptado = _item.Canton.IdCantonEncriptado;
    this._nombreCanton       = _item.Canton.NombreCanton;
    this.formParroquia.get('_idParroquia').setValue(_item.IdParroquiaEncriptado);
    this.formParroquia.get('_nombreParroquia').setValue(_item.NombreParroquia);
    this.formParroquia.get('_codigoParroquia').setValue(_item.CodigoParroquia);

    if(_item.DescripcionParroquia=="null"){
      this.formParroquia.get('_descripcionParroquia').setValue(null);
    }else{
      this.formParroquia.get('_descripcionParroquia').setValue(_item.DescripcionParroquia);
    }

    if(_item.PoblacionParroquia=="null"){
      this.formParroquia.get('_poblacionParroquia').setValue(null);
    }else{
      this.formParroquia.get('_poblacionParroquia').setValue(_item.PoblacionParroquia);
    }

    if(_item.SuperficieParroquia=="null"){
      this.formParroquia.get('_superficieParroquia').setValue(null);
    }else{
      this.formParroquia.get('_superficieParroquia').setValue(_item.SuperficieParroquia);
    }
    
    if(_item.TemperaturaParroquia=="null"){
      this.formParroquia.get('_temperaturaParroquia').setValue(null);
    }else{
      this.formParroquia.get('_temperaturaParroquia').setValue(_item.TemperaturaParroquia);
    }

    if(_item.ClimaParroquia=="null"){
      this.formParroquia.get('_climaParroquia').setValue(null);
    }else{
      this.formParroquia.get('_climaParroquia').setValue(_item.ClimaParroquia);
    }
    
  
    this.formParroquia.get('_rutaLogoParroquia').setValue(_item.RutaLogoParroquia);
    this._btnAccion = "Modificar";
  }
  _consultarCantones(){
    this.lugaresService._consultarCantones()
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaCantones=data['respuesta'];
          this.cantones.length = 0;
          for (let index = 0; index < this._listaCantones.length; index++) {
            this.cantones.push(this._listaCantones[index].NombreCanton);
          }
          this.filtroCantones();
        }else{
         this.mensaje(data['http']);
        }
      })
      .catch(error=>{
        this.mensaje(error);
      })
  }
  _verRepresentante(_item){
    let dialogRef = this.modalLugarRepresentante.open(ModalLugarRepresentanteComponent, {
      width: 'auto',
      height: 'auto',
      data: { lugar_tipo: 'parroquia', lugar_data: _item }
    });
  }
  _limpiarForm(){
    this.formParroquia.reset();
    this._btnAccion = "Guardar";
    this.clearMenssageError();
    this.formParroquia.setErrors({ invalid: true });
    this._idProvinciaEncriptado="";
    this._nombreProvincia="";
    this._idCantonEncriptado="";
    this._nombreCanton="";
  }
}


