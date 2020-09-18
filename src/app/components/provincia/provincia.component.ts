import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { LugaresService } from 'src/app/services/lugares.service';
import { MatTable, MatDialog, MatSnackBar, MatButton } from '@angular/material';
import { ModalLugarRepresentanteComponent } from '../modal-lugar-representante/modal-lugar-representante.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.css']
})
export class ProvinciaComponent implements OnInit {
  @ViewChild('testButton', { static: false }) testButton: ElementRef;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private lugaresService:LugaresService,
    private modalLugarRepresentante:MatDialog,
    private snackBarComponent:MatSnackBar,
    private router: Router
  ) {
    this.formProvincia = new FormGroup({
      _idProvinciaEncriptado  : new FormControl(''),
      _codigo                 : new FormControl('',[Validators.required]),
      _nombre                 : new FormControl('',[Validators.required]),
      _descripcion            : new FormControl(''),
      _rutaLogoProvincia      : new FormControl(''),
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  tipoUsurio='';
  ngOnInit() {

    this.tipoUsurio= localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado');
    if(this.tipoUsurio==''){
      this.router.navigateByUrl("/login");
    }
   this._consultarProvincias();
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
  }
  //-----------------------------------------------------------------------------------------
  formProvincia : FormGroup;
  get formProvincia_idProvinciaEncriptado(){
    return this.formProvincia.get("_idProvinciaEncriptado");
  }
  get formProvincia_codigo(){
    return this.formProvincia.get("_codigo");
  }
  get formProvincia_nombre(){
    return this.formProvincia.get("_nombre");
  }
  get formProvincia_rutaLogoProvincia(){
    return this.formProvincia.get("_rutaLogoProvincia");
  }
  get formProvincia_descripcion(){
    return this.formProvincia.get("_descripcion");
  }
  //-----------------------------------------------------------------------------------------
  mensaje(_mensaje: string, _duracion?: number, _color?: string) {
    if (_duracion == null) {
      _duracion = 3000;
    }
    if (_color == null) {
      _color = "gpm-danger";
    }
    let snackBarRef = this.snackBarComponent.open(_mensaje, null, { duration: _duracion, panelClass: [`${_color}`], verticalPosition: 'bottom', horizontalPosition: 'end' });
  }
  _validarFormProvincia(){
    if (this._btnAccion==="Guardar") {
      this._ingresarProvincia2();
    }else if (this._btnAccion==="Modificar") {
      this._modificarProvincia2();
    } 
  }
  clearMenssageError() {
    this.formProvincia.controls['_codigo'].setErrors(null);
    this.formProvincia.controls['_nombre'].setErrors(null);
    this.formProvincia.controls['_descripcion'].setErrors(null);
  }
  _ingresarProvincia2(){
    if (
        this.formProvincia_descripcion.value == null || 
        this.formProvincia_descripcion.value == 'null' 
      ) {
          this.formProvincia_descripcion.setValue('');
        }
    if (
        this.formProvincia_rutaLogoProvincia.value == null || 
        this.formProvincia_rutaLogoProvincia.value == 'null' 
      ) {
        this.formProvincia_rutaLogoProvincia.setValue('');
      }
      this.lugaresService._insertarProvincia(
        this.formProvincia_codigo.value,
        this.formProvincia_nombre.value,
        this.formProvincia_descripcion.value,
        this.formProvincia_rutaLogoProvincia.value,
      ).then(data=>{
        if (data['http']['codigo']=='200') {
          this._consultarProvincias();
          this.formProvincia.reset();
          this.clearMenssageError();
          this.formProvincia.setErrors({ invalid: true });
          this.mensaje("Provincia registrada", null, 'msj-success');
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else{
          this.mensaje(data['http']['mensaje']);
        }
        }).catch(error=>{
          this.mensaje(error);
     });
  }
  _modificarProvincia2(){
    if (
      this.formProvincia_descripcion.value == null || 
      this.formProvincia_descripcion.value == 'null' 
    ) {
      this.formProvincia_descripcion.setValue('');
    }
    if (
      this.formProvincia_rutaLogoProvincia.value == null || 
      this.formProvincia_rutaLogoProvincia.value == 'null' 
    ) {
      this.formProvincia_rutaLogoProvincia.setValue('');
    }
    this.lugaresService._modificarProvincia(
      this.formProvincia_idProvinciaEncriptado.value,
      this.formProvincia_codigo.value,
      this.formProvincia_nombre.value,
      this.formProvincia_descripcion.value,
      this.formProvincia_rutaLogoProvincia.value
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarProvincias();
        this.formProvincia.reset();
        this._btnAccion ="Modificar";
        this.clearMenssageError();
        this.formProvincia.setErrors({ invalid: true });
        this.mensaje("Registro modificado", null, 'msj-success');
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        this.mensaje(data['http']['mensaje']);
      }
      }).catch(error=>{
       this.mensaje(error);
    });
  }
  //-----------------------------------------------------------------------------------------
  _validar=true;
  tablaProvincias = ['codigo','provincia', 'acciones'];
  _idProvinciaEncriptado="";
  _codigoProvincia="";
  _nombreProvincia="";
  _descripcionProvincia="";
  _rutaLogoProvincia="";
  _btnAccion="Guardar";
  @ViewChild('frmProvincia',{static:false}) frmProvincia:Form;
  @ViewChild(MatTable,{static:false})  MatTableProvincias : MatTable<any>;
  _listaProvincias:any[]=[];
  _consultarProvincias(){
    this.lugaresService._consultarProvincias()
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaProvincias=data['respuesta'];
          this.dataSource.data = this._listaProvincias
        }
      })
      .catch(error=>{
        this.mensaje(error);
      })
  }
  _eliminarProvincia(_item:any){
    this.lugaresService._eliminarProvincia(
      _item.IdProvinciaEncriptado
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarProvincias();
        this.formProvincia.reset();
        this.clearMenssageError();
        this.formProvincia.setErrors({ invalid: true });
        this.mensaje("Registro Eliminado", null, 'msj-success');
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{
      this.mensaje(error);
    });
  }
  _prepararProvincia(_item:any){
    this.formProvincia_idProvinciaEncriptado.setValue(_item.IdProvinciaEncriptado);
    this.formProvincia_codigo               .setValue(_item.CodigoProvincia);
    this.formProvincia_nombre               .setValue(_item.NombreProvincia);
    this.formProvincia_descripcion          .setValue(_item.DescripcionProvincia);
    this.formProvincia_rutaLogoProvincia    .setValue(_item.RutaLogoProvincia);
    if (this._descripcionProvincia=='null') {
      this._descripcionProvincia="";
    }
    this._rutaLogoProvincia     =_item.RutaLogoProvincia;
    this._btnAccion = "Modificar";
  }
   _verRepresentante(_item:any){
    let dialogRef = this.modalLugarRepresentante.open(ModalLugarRepresentanteComponent, {
      width: 'auto',
      height: 'auto',
      data: { lugar_tipo: 'provincia', lugar_data: _item }
    });
  } 
  _refreshForm(){
    this.formProvincia.reset();
    this._btnAccion='Guardar';
    this.clearMenssageError();
    this.formProvincia.setErrors({ invalid: true });
  }
}