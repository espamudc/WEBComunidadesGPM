import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatTable } from '@angular/material';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';
import { AsignarUsuarioTipoUsuarioService } from 'src/app/services/asignar-usuario-tipo-usuario.service';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AsignarResponsableCuestionarioGenericoService } from 'src/app/services/asignar-responsable-cuestionario-generico.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-modal-asignar-responsable-cuestionario-generico',
  templateUrl: './modal-asignar-responsable-cuestionario-generico.component.html',
  styleUrls: ['./modal-asignar-responsable-cuestionario-generico.component.css']
})
export class ModalAsignarResponsableCuestionarioGenericoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBarComponent: MatSnackBar,
    private tipoUsuarioService:TipoUsuarioService,
    private asignarUsuarioTipoUsuarioService:AsignarUsuarioTipoUsuarioService,
    private asignarResponsableCuestionarioGenericoService:AsignarResponsableCuestionarioGenericoService
  ) {

    this.formAsignarResponsableCuestionarioGenerico = new FormGroup({
      _cmbTipoUsuario : new FormControl(''),
      _cmbAsignarUsuarioTipoUsuario : new FormControl('',[Validators.required])
    });

   }
   formAsignarResponsableCuestionarioGenerico:FormGroup;

   get _cmbTipoUsuario(){
     return this.formAsignarResponsableCuestionarioGenerico.get("_cmbTipoUsuario");
   }
   get _cmbAsignarUsuarioTipoUsuario(){
     return this.formAsignarResponsableCuestionarioGenerico.get("_cmbAsignarUsuarioTipoUsuario");
   }

  ngOnInit() {
    this._consultarTiposUsuarios();
    this._consultarAsignados();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  _listaTiposUsuarios:any[]=[];
  _listaUsuariosAsignados:any[]=[];
  _listaUsuariosNoAsignados:any[]=[];
  _btnAccion="Guardar";

  @ViewChild(MatTable,{static:false}) MatTableAsignarResponsables : MatTable<any>;

  Columns: string[] = ['nombre','apellido','numeroidentificacion' ,'usuario', 'acciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  _validarAccionForm(){
    if (this._btnAccion=="Guardar") {
      this._insertarAsignarResponsableCuestionarioGenerico();
    }else if (this._btnAccion=="Modificar"){

    }
  }


  _consultarTiposUsuarios(){
    var tipo;
    this.tipoUsuarioService._consultarTiposUsuarios()
      .then(data=>{
        if (data['http']['codigo']=='200') {
          data['respuesta'].map(item=>{
            if (item.Identificador==1) {
              tipo=item;
            }
          });
          this._listaTiposUsuarios.push(tipo);
        }else{
        }
      })
      .catch(error=>{
      })
      .finally(()=>{
      });
  }

  _consultarNoAsinados(event?){

    this.asignarUsuarioTipoUsuarioService._consultarAsignarUsuarioTipoUsuario_No_responsablesporcuestionariogenericoporidentificadortipousuario(
      this.data.IdCuestionarioGenericoEncriptado,
      this.formAsignarResponsableCuestionarioGenerico.get("_cmbTipoUsuario").value
    )
      .then(data=>{
        if (data['http']['codigo']=='200') {

          this._listaUsuariosNoAsignados = data['respuesta'];
        }else{
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  _consultarAsignados(){

    this.asignarResponsableCuestionarioGenericoService._consultarAsignarResponsableCuestionarioGenerico(
      this.data.IdCuestionarioGenericoEncriptado
    )
      .then(data=>{
        if (data['http']['codigo']=='200') {

          this._listaUsuariosAsignados = data['respuesta'];
          this.dataSource.data = this._listaUsuariosAsignados
          this.MatTableAsignarResponsables.renderRows();
        }else{
        }
      })
      .catch(error=>{
      })
      .finally(()=>{
      });
  }

  _insertarAsignarResponsableCuestionarioGenerico(){
    this.asignarResponsableCuestionarioGenericoService._insertarAsignarResponsableCuestionarioGenerico(
      this.data.IdCuestionarioGenericoEncriptado,
      this.formAsignarResponsableCuestionarioGenerico.get('_cmbAsignarUsuarioTipoUsuario').value,
      ''
    )
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._consultarAsignados();
          this._consultarNoAsinados();
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else{
          this.mensaje(data['http']['mensaje']);
        }
      })
      .catch(error=>{
      })
      .finally(()=>{
      });
  }

  _eliminarAsignarResponsableCuestionarioGenerico (_item){
    this.asignarResponsableCuestionarioGenericoService._eliminarAsignarResponsableCuestionarioGenerico(
      _item.IdAsignarResponsableEncriptado
    )
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._consultarAsignados();
          this._consultarNoAsinados();
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else{
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  _cambiarEstadoAsignarResponsableCuestionarioGenerico(item){
    this.asignarResponsableCuestionarioGenericoService._cambiarEstadoAsignarResponsableCuestionarioGenerico(
      item.IdAsignarResponsableEncriptado
    )
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._consultarAsignados();
        }else{
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }

}
