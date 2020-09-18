import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// Functional Components
import { MatDialog } from "@angular/material/dialog";
///----------------------------------------------------
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
// import {ErrorStateMatcher} from '@angular/material/core';
import { CuestionarioGenericoService } from 'src/app/services/cuestionario-generico.service';
import { ModalAsignarResponsableCuestionarioGenericoComponent } from '../modal-asignar-responsable-cuestionario-generico/modal-asignar-responsable-cuestionario-generico.component';
import { AsignarResponsableCuestionarioGenericoService } from 'src/app/services/asignar-responsable-cuestionario-generico.service';
//---------------------------------------
import { MatTable, MatSnackBar, getMatTooltipInvalidPositionError } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort'; 
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cuestionario-generico',
  templateUrl: './cuestionario-generico.component.html',
  styleUrls: ['./cuestionario-generico.component.css']
})
export class CuestionarioGenericoComponent implements OnInit {
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  //------------------------------------------------------------------
  get _nombre(){
    return this.formCuestionarioGenerico.get("_nombre");
  }
  get _descripcion(){
    return this.formCuestionarioGenerico.get("_descripcion");
  }

  //-------------------------------------------------------------------
  constructor(
    private cuestionarioGenericoService:CuestionarioGenericoService,
    private modalControllerAsignarResponsableCuestionarioGenerico : MatDialog,
    private asignarResponsableCuestionarioGenericoService:AsignarResponsableCuestionarioGenericoService,
    private snackBarComponent: MatSnackBar,
    private router: Router
  ) {

    this.formCuestionarioGenerico = new FormGroup({
      _IdCuestionarioGenericoEncriptado : new FormControl(''),
      _nombre     : new FormControl('',[Validators.required]),
      _descripcion: new FormControl('',[Validators.required])
    });

  }
  
  formCuestionarioGenerico:FormGroup;
  tipoUsurio='';
  ngOnInit() {

    this.tipoUsurio= localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado');
    if(this.tipoUsurio==''){
      this.router.navigateByUrl("/login");
    }
    this._cargarCuestionariosGenericos();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  mensaje(_mensaje:string,_duracion?:number,_opcion?:number,_color?:string){

    
    if (_duracion==null) {
       _duracion=3000;
    }
    if (_opcion==1) {
      _mensaje="Datos ingresados correctamente";
    }
    if (_opcion==2) {
      _mensaje="Datos modificados correctamente";
    }
    if (_opcion==3) {
      _mensaje="Datos eliminados correctamente";
    }
    if (_color==null) {
      _color ="gpm-danger";
    }
    let snackBarRef = this.snackBarComponent.open(_mensaje,null,{duration:_duracion,panelClass:['text-white',`${_color}`],data:{}});
  }

  _btnAccion="Guardar";

  _listaCuestionariosGenericos : any[]=[];
  Columns: string[] = ['nombre', 'descripcion', 'acciones'];


  _validarAccionForm(){
    if (this._btnAccion=="Guardar") {
      this._insertarCuestionarioGenerico();
    }else if (this._btnAccion=="Modificar"){
      this._modificarCuestionarioGenerico();
    }
  }

  _limpiarForm(){
    this.formCuestionarioGenerico.reset();
    // this.formCuestionarioGenerico.get("_IdCuestionarioGenericoEncriptado").setValue(" ");
    // this.formCuestionarioGenerico.get("_nombre").setValue(" ");
    // this.formCuestionarioGenerico.get("_descripcion").setValue(" ");
    this._btnAccion = "Guardar";

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatTable,{static:false}) MatTableCuestionariosGenericos :MatTable<any>;
  _cargarCuestionariosGenericos(){
    this.cuestionarioGenericoService._consultarCuestionarioGenerioco()
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaCuestionariosGenericos = data['respuesta'];
          this.dataSource.data =  this._listaCuestionariosGenericos
          console.log(data['http']['codigo']);
          
        }
      }).catch(error=>{

      }).finally(()=>{
        this.MatTableCuestionariosGenericos.renderRows();
      });
  }

  // _cargarMisCuestionariosGenericos(){
  //   // console.log(localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado'));
    
  //   this.cuestionarioGenericoService._consultarCuestionarioGeneriocoPorIdAsignarUsuarioTipoUsuarioEncriptado(
  //     localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado')
  //   )
  //     .then(data=>{
  //       if (data['http']['codigo']=='200') {
  //         // console.log(data['respuesta']);
  //         // debugger
  //         this._listaCuestionariosGenericos = data['respuesta'];
  //         // data['respuesta'].map(item=>{
  //         //   console.log(item.CuestionarioGenerico);
  //         //   this._listaCuestionariosGenericos.push(item.CuestionarioGenerico);
  //         //   // this._listaCuestionariosGenericos.push(item['CuestionarioGenerico']);
  //         // });
  //         console.log(this._listaCuestionariosGenericos);
          
  //         // console.log(data['http']['codigo']);
          
  //       }else{
  //         this.mensaje(data['http']['mensaje']);
  //       }
  //     }).catch(error=>{

  //     }).finally(()=>{
  //       this.MatTableCuestionariosGenericos.renderRows();
  //     });
  // }

  _insertarCuestionarioGenerico(){
    // console.log(this.formCuestionarioGenerico.get("_nombre").value);
    // console.log(this.formCuestionarioGenerico.get("_descripcion").value);
    
    this.cuestionarioGenericoService._insertarCuestionarioGenerioco(
      this.formCuestionarioGenerico.get("_nombre").value,
      this.formCuestionarioGenerico.get("_descripcion").value
    )
      .then(data=>{
        if (data['http']['codigo']=='200') {
          // console.log(data['respuesta']);
          this._insertarTuEresElResponsableDeEsteCuestionarioGenerico(data['respuesta'])
          // console.log(data['http']['codigo']);
          this._limpiarForm();
          // this.formCuestionarioGenerico.reset();
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else{
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error=>{

      }).finally(()=>{
        // this._cargarMisCuestionariosGenericos();
      });
  }

  _prepararCuestionarioGenerico(_item){
    this.formCuestionarioGenerico.get("_IdCuestionarioGenericoEncriptado").setValue(_item.IdCuestionarioGenericoEncriptado);
    this.formCuestionarioGenerico.get("_nombre").setValue(_item.Nombre);
    this.formCuestionarioGenerico.get("_descripcion").setValue(_item.Descripcion);
    // console.log(this.formCuestionarioGenerico.get("_IdCuestionarioGenericoEncriptado").value);

    this._btnAccion = "Modificar";
    
  }

  _modificarCuestionarioGenerico(){

    // console.log(this.formCuestionarioGenerico.get("_IdCuestionarioGenericoEncriptado").value);
    // console.log(this.formCuestionarioGenerico.get("_nombre").value);
    // console.log(this.formCuestionarioGenerico.get("_descripcion").value);
    
    this.cuestionarioGenericoService._modificarCuestionarioGenerioco(
      this.formCuestionarioGenerico.get("_IdCuestionarioGenericoEncriptado").value,
      this.formCuestionarioGenerico.get("_nombre").value,
      this.formCuestionarioGenerico.get("_descripcion").value
    )
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._cargarCuestionariosGenericos();
          // console.log(data['http']['codigo']);
          this._limpiarForm();
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else{
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error=>{

      }).finally(()=>{
        this._cargarCuestionariosGenericos();
      });
  }

  _eliminarCuestionarioGenerico(_item){

    // console.log(this.formCuestionarioGenerico.get("_IdCuestionarioGenericoEncriptado").value);
    
    this.cuestionarioGenericoService._eliminarCuestionarioGenerioco(
     _item.IdCuestionarioGenericoEncriptado
     
    )
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._cargarCuestionariosGenericos();
          // console.log(data['http']['codigo']);
          
        }else{
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error=>{

      }).finally(()=>{
        this._cargarCuestionariosGenericos();
      });
  }

  _verModalAsignarResponsableCuestionarioGenerico(_item){
    let dialogRef = this.modalControllerAsignarResponsableCuestionarioGenerico.open(ModalAsignarResponsableCuestionarioGenericoComponent, {
      width: 'auto',
      height: 'auto',
      data:  _item 
    });
    dialogRef.afterClosed().subscribe(result=>{
      // console.log(result);
      if (result) {
        
      }
    },error=>{},()=>{
      this._cargarCuestionariosGenericos();
    }); 
  }


  ///tu eres el primer responsable 

  _insertarTuEresElResponsableDeEsteCuestionarioGenerico(_itemCuestionarioGenerico:any){
    this.asignarResponsableCuestionarioGenericoService._insertarAsignarResponsableCuestionarioGenerico(
      _itemCuestionarioGenerico.IdCuestionarioGenericoEncriptado,
      localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado')
    )
      .then(data=>{
        if (data['http']['codigo']=='200') {
          // console.log("ok");
          
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else{
          console.log(data['http']);
          this.mensaje(data['http']['mensaje']);
        }
      })
      .catch(error=>{
        console.log(error);
      })
      .finally(()=>{
        this._cargarCuestionariosGenericos();
      });
  }

  //------------------------------

}
