import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CuestionarioGenericoService } from 'src/app/services/cuestionario-generico.service';
import { CabeceraVersionCuestionarioService } from 'src/app/services/cabecera-version-cuestionario.service';
import { LugaresService } from 'src/app/services/lugares.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { AsignarUsuarioTipoUsuarioService } from "src/app/services/asignar-usuario-tipo-usuario.service";
import { CuestionarioPublicadoService } from "src/app/services/cuestionario-publicado.service";
import { AsignarEncuestadoService } from 'src/app/services/asignar-encuestado.service';
import { MatTable, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cuestionario-generico-publicar',
  templateUrl: './cuestionario-generico-publicar.component.html',
  styleUrls: ['./cuestionario-generico-publicar.component.css']
})

export class CuestionarioGenericoPublicarComponent implements OnInit {
  tablaCuestionarios = ['periodo', 'fecha_publicacion', 'cuestionario', 'cuestionario_version', 'acciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
 @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private cuestionarioGenericoService :CuestionarioGenericoService,
    private cabeceraVersionCuestionarioService:CabeceraVersionCuestionarioService,

    private snackBarComponent:MatSnackBar,

    private lugaresService:LugaresService,
    private periodoService : PeriodoService,
    private asignarUsuarioTipoUsuarioService: AsignarUsuarioTipoUsuarioService,
    private cuestionarioPublicadoService : CuestionarioPublicadoService,
    private asignarEncuestadoService : AsignarEncuestadoService,
    private datePipe: DatePipe,
    private router: Router
  ) {

    this.formCuestionarioGenericoPublicar = new FormGroup({
      _idCuestionarioPublicadoEncriptado : new FormControl(''),
      _cmbCuestionario : new FormControl('',[Validators.required]),
      _cmbCabeceraVersionCuestionario : new FormControl('',[Validators.required]),
      _cmbPeriodo : new FormControl('',[Validators.required])
    });

    this.formAsignarEncuestado = new FormGroup({
      _idAsignarEncuestadoEncriptado : new FormControl(''),
      _idCuestionarioPublicadoEncriptado : new FormControl('',[Validators.required]),
      _nombreCuestionarioGenenico : new FormControl('',[Validators.required]),
      _versionCuestionarioGenenico : new FormControl('',[Validators.required]),

      _cmbProvincia : new FormControl('',[Validators.required]),
      _cmbCanton: new FormControl('',[Validators.required]),
      _cmbParroquia: new FormControl('',[Validators.required]),
      _cmbComunidad: new FormControl('',[Validators.required]),
      _cmbTecnico : new FormControl('',[Validators.required]),
      _idAsignarUsuarioTipoUsuarioEncriptado: new FormControl('',[Validators.required]),
      _obligatorio : new FormControl('',[Validators.required]),
      _fechaInicio : new FormControl('',[Validators.required]),
      _fechaFin : new FormControl('',[Validators.required]),
      _estado : new FormControl('')
    });

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

    this.formAsignarEncuestado_obligatorio.setValue(true);

    this._cargarMisCuestionariosGenericos();
    this._consultarProvincias();
    this._consultarPeriodos();
    this._consultarTecnicos();
    this._consultar_cuestionarioPublicado();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
   
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formCuestionarioGenericoPublicar:FormGroup;

  get formCuestionarioGenericoPublicar_cmbCuestionario(){
    return this.formCuestionarioGenericoPublicar.get("_cmbCuestionario");
  }
  get formCuestionarioGenericoPublicar_cmbCabeceraVersionCuestionario(){
    return this.formCuestionarioGenericoPublicar.get("_cmbCabeceraVersionCuestionario");
  }
  get formCuestionarioGenericoPublicar_cmbPeriodo(){
    return this.formCuestionarioGenericoPublicar.get("_cmbPeriodo");
  }
  formAsignarEncuestado:FormGroup;
  get formAsignarEncuestado_idAsignarEncuestadoEncriptado(){
    return this.formAsignarEncuestado.get("_idAsignarEncuestadoEncriptado");
  }
  get formAsignarEncuestado_idCuestionarioPublicadoEncriptado(){
    return this.formAsignarEncuestado.get("_idCuestionarioPublicadoEncriptado");
  }
  get formAsignarEncuestado_idAsignarUsuarioTipoUsuarioEncriptado(){
    return this.formAsignarEncuestado.get("_idAsignarUsuarioTipoUsuarioEncriptado");
  }
  get formAsignarEncuestado_cmbProvincia(){
    return this.formAsignarEncuestado.get("_cmbProvincia");
  }
  get formAsignarEncuestado_cmbCanton(){
    return this.formAsignarEncuestado.get("_cmbCanton");
  }
  get formAsignarEncuestado_cmbParroquia(){
    return this.formAsignarEncuestado.get("_cmbParroquia");
  }
  get formAsignarEncuestado_cmbComunidad(){
    return this.formAsignarEncuestado.get("_cmbComunidad");
  }
  get formAsignarEncuestado_cmbTecnico(){
    return this.formAsignarEncuestado.get("_cmbTecnico");
  }
  get formAsignarEncuestado_fechaInicio(){
    return this.formAsignarEncuestado.get("_fechaInicio");
  }
  get formAsignarEncuestado_fechaFin(){
    return this.formAsignarEncuestado.get("_fechaFin");
  }
  get formAsignarEncuestado_obligatorio(){
    return this.formAsignarEncuestado.get("_obligatorio");
  }

  get formAsignarEncuestado_nombreCuestionarioGenenico(){
    return this.formAsignarEncuestado.get("_nombreCuestionarioGenenico");
  }
  get formAsignarEncuestado_versionCuestionarioGenenico(){
    return this.formAsignarEncuestado.get("_versionCuestionarioGenenico");
  }
  _verAsignarEncuestado :boolean = false;
  _listaCuestionariosGenericos:any[]=[];
  _listaVersionesCuestionario:any[]=[];
  _listaPeriodos:any[]=[];
  _listaTecnicos:any[]=[];
  _listaCuestionariosPublicados:any[]=[];

  _listaAsignarEncuestados:any[]=[];
  idEncuestadoEncriptado= "";

  Columns=['periodo','fecha_publicacion','cuestionario','cuestionario_version','acciones'];
  ColumnsAsignarEncuestado=['tecnico','fecha_inicio','fecha_fin','comunidad','cuestionario','cuestionario_version','acciones'];

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

  _onChangeCmbCuestionariosGenericos(event){
    if (event.value==0) {

    } else {

    }
    this._consultarCabeceraVersionCuestionario(event.value);

  }
  _onExpandPanelPeriodo(){
    this._consultarPeriodos();
  }
  _onExpandPanelCuestionario(){
    this._cargarMisCuestionariosGenericos();
    this._consultarTecnicos();
  }
  _onExpandPanelUbicacion(){
    this._consultarProvincias();
  }
  _onExpandPanelTecnico(){
    this._consultarTecnicos();
  }
  _onExpandPanelAsignarEncuestado(){
    
  }
  _ocultarPanelAsignarEncuestado(){

    this._verAsignarEncuestado=false;
  }
  _validarForm(){
    this._insertar_cuestionarioPublicado();
  }
  _validarFormAsignarEncuestado(){
    if(this.guardar == true){
      this._insertarAsignarEncuestado();
    }else{
        this._editarAsignarEncuestado();
        this.guardar = true;
    }
  }

  _limpiarForm()
  {
    this.formCuestionarioGenericoPublicar.reset();
  }

  _consultar_cuestionarioPublicado(){
    this.cuestionarioPublicadoService._consultar_cuestionarioPublicado()
      .then(data=>{
        if (data['http']['codigo']=="200") {
          
          this._listaCuestionariosPublicados = data['respuesta'];
  
          this.dataSource.data =  this._listaCuestionariosPublicados

        } else {

        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }
  _consultar_cuestionarioPublicadoporidasignarusuariotipousuario(){
    const id = localStorage.getItem("IdAsignarUsuarioTipoUsuarioEncriptado");

    this.cuestionarioPublicadoService._consultar_cuestionarioPublicadoporidasignarusuariotipousuario(id)
      .then(data=>{
        if (data['http']['codigo']=="200") {
          this._listaCuestionariosPublicados=[];
          this._listaCuestionariosPublicados=data['respuesta'];
          this.dataSource.data = this._listaCuestionariosPublicados
        } else {

        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }
  _cargarMisCuestionariosGenericos(){

    this.cuestionarioGenericoService._consultarCuestionarioGeneriocoPorIdAsignarUsuarioTipoUsuarioEncriptado(
      localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado')
    )
      .then(data=>{
        if (data['http']['codigo']=='200') {
          
          this._listaCuestionariosGenericos=[];
          this._listaCuestionariosGenericos = data['respuesta'];


        }

      }).catch(error=>{

      }).finally(()=>{

      });
  }
  _consultarCabeceraVersionCuestionario(_idCuestionarioEncriptado){

    this.cabeceraVersionCuestionarioService._consultarCabeceraVersionCuestionario(_idCuestionarioEncriptado)
    .then(data=>{
      if (data['http']['codigo']=='200') {
        this._listaVersionesCuestionario=data['respuesta'];

      }

    }).catch(error=>{

    }).finally(()=>{

    });
  }
  _consultarPeriodos(){
    this.periodoService._consultarPeriodos()
      .then(data=>{
        if (data['http']['codigo']=="500") {

        } else if (data['http']['codigo']=="200") {
          this._listaPeriodos= [];
          this._listaPeriodos= data['respuesta'];
        }else{

        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }
  _consultarTecnicos(){
    this.asignarUsuarioTipoUsuarioService._consultarporidentificadortipousuario(2)
      .then(data=>{
        if (data['http']['codigo']=='500') {

        } else if(data['http']['codigo']=='200') {
          this._listaTecnicos=[];
          this._listaTecnicos= data['respuesta'];
        }else{

        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  _insertar_cuestionarioPublicado(){
    let _idAsignarUsuarioTipoUsuario = localStorage.getItem("IdAsignarUsuarioTipoUsuarioEncriptado");

    this.cuestionarioPublicadoService._insertar_cuestionarioPublicado(
      _idAsignarUsuarioTipoUsuario,
      this.formCuestionarioGenericoPublicar_cmbCabeceraVersionCuestionario.value,
      this.formCuestionarioGenericoPublicar_cmbPeriodo.value
    ).then(data=>{

      if (data['http']['codigo']=='500') {
        this.mensaje('Error en servidor, intente más tarde');
      }
      else if (data['http']['codigo']=='200') {
        this._consultar_cuestionarioPublicadoporidasignarusuariotipousuario();
        this._limpiarForm();
      } else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{

    }).finally(()=>{

    });
  }

  _eliminar_cuestionarioPublicado(_item){
    this.cuestionarioPublicadoService._eliminar_cuestionarioPublicado(_item.IdCuestionarioPublicadoEncriptado)
      .then(data=>{
        this._consultar_cuestionarioPublicadoporidasignarusuariotipousuario();
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  _deshabilitar_cuestionarioPublicado(_item){
    if(_item.Estado==true){
      this._verAsignarEncuestado=false;
    }
    this.cuestionarioPublicadoService._deshabilitar_cuestionarioPublicado(_item.IdCuestionarioPublicadoEncriptado)
      .then(data=>{
        this._consultar_cuestionarioPublicadoporidasignarusuariotipousuario();
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  _deshabilitar_cuestionarioFinalizado(_item){
    
    this.cuestionarioPublicadoService._deshabilitar_cuestionarioFinalizado(_item.IdAsignarEncuestadoEncriptado)
      .then(data=>{
        this._consultar_poridcuestionariopublicado(_item.CuestionarioPublicado.IdCuestionarioPublicadoEncriptado);
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  _prepararCuestionarioPublicado(_item){
    this.guardar = true;
    this.formAsignarEncuestado_idAsignarUsuarioTipoUsuarioEncriptado.setValue(localStorage.getItem("IdAsignarUsuarioTipoUsuarioEncriptado"));
    this.formAsignarEncuestado_idCuestionarioPublicadoEncriptado.setValue(_item.IdCuestionarioPublicadoEncriptado);
    this.formAsignarEncuestado_versionCuestionarioGenenico.setValue(_item.CabeceraVersionCuestionario.Version+" ("+_item.CabeceraVersionCuestionario.FechaCreacion +")");
    this.formAsignarEncuestado_versionCuestionarioGenenico.disable();
    this.formAsignarEncuestado_nombreCuestionarioGenenico.setValue(_item.CabeceraVersionCuestionario.AsignarResponsable.CuestionarioGenerico.Nombre);   
    this.formAsignarEncuestado_nombreCuestionarioGenenico.disable();
    this.formAsignarEncuestado_fechaInicio.setValue(this.datePipe.transform(_item.Periodo.FechaInicio, 'yyyy-MM-dd'));
    this.formAsignarEncuestado_fechaFin.setValue(this.datePipe.transform(_item.Periodo.FechaFin, 'yyyy-MM-dd'));
    this._verAsignarEncuestado=true;
    this.formAsignarEncuestado_cmbProvincia.setValue("");
    this.formAsignarEncuestado_cmbCanton.setValue("");
    this.formAsignarEncuestado_cmbParroquia.setValue("");
    this.formAsignarEncuestado_cmbComunidad.setValue("");
    this.formAsignarEncuestado_cmbTecnico.setValue("");
    this.formAsignarEncuestado_obligatorio.setValue("True");
    this._consultar_poridcuestionariopublicado(_item.IdCuestionarioPublicadoEncriptado);

  }

  _prepararEncuestador(_item: any) {
    this.guardar = false;
    this.idEncuestadoEncriptado = _item.IdAsignarEncuestadoEncriptado;  
    
    this._listaProvincias=[];
    this._consultarProvincias();
    this._listaCantones=[];
    this._cantonesDeUnaProvincia(_item.Comunidad.Parroquia.Canton.Provincia.IdProvinciaEncriptado);
    this._listaParroquias=[];
    this._parroquiasDeUnCanton(_item.Comunidad.Parroquia.Canton.IdCantonEncriptado);
    this._listaComunidades=[];
    this._comunidadesDeUnaParroquia(_item.Comunidad.Parroquia.IdParroquiaEncriptado);
    this._listaTecnicos=[];
    this._consultarTecnicos();
    this.formAsignarEncuestado_cmbProvincia.setValue(_item.Comunidad.Parroquia.Canton.Provincia.IdProvinciaEncriptado);
    this.formAsignarEncuestado_cmbCanton.setValue(_item.Comunidad.Parroquia.Canton.IdCantonEncriptado);
    this.formAsignarEncuestado_cmbParroquia.setValue(_item.Comunidad.Parroquia.IdParroquiaEncriptado);
    this.formAsignarEncuestado_cmbComunidad.setValue([_item.Comunidad.IdComunidadEncriptado]);
    this.formAsignarEncuestado_cmbTecnico.setValue(_item.AsignarUsuarioTipoUsuarioTecnico.IdAsignarUsuarioTipoUsuarioEncriptado);
    this.formAsignarEncuestado_fechaInicio.setValue(this.datePipe.transform(_item.FechaInicio, 'yyyy-MM-dd'));
    this.formAsignarEncuestado_fechaFin.setValue(this.datePipe.transform(_item.FechaFin, 'yyyy-MM-dd'));
    this.formAsignarEncuestado_obligatorio.setValue(_item.Obligatorio);

  }
  guardar = true;
  _insertarAsignarEncuestado(){

    this.formAsignarEncuestado_cmbComunidad.value.forEach(element => {

      this.asignarEncuestadoService._insertarAsignarEncuestado(
        this.formAsignarEncuestado_idCuestionarioPublicadoEncriptado.value,
        element,
        this.formAsignarEncuestado_cmbTecnico.value,
        localStorage.getItem("IdAsignarUsuarioTipoUsuarioEncriptado"),
        this.formAsignarEncuestado_obligatorio.value,
        this.formAsignarEncuestado_fechaInicio.value,
        this.formAsignarEncuestado_fechaFin.value
      ).then(data=>{
        if (data['http']['codigo']=='500') {
  
        } else if(data['http']['codigo']=='200'){
          
          this._consultar_poridcuestionariopublicado(this.formAsignarEncuestado_idCuestionarioPublicadoEncriptado.value);
          this.formAsignarEncuestado_cmbProvincia.setValue("");
          this.formAsignarEncuestado_cmbCanton.setValue("");
          this.formAsignarEncuestado_cmbParroquia.setValue("");
          this.formAsignarEncuestado_cmbComunidad.setValue("");
          this.formAsignarEncuestado_cmbTecnico.setValue("");
          this.formAsignarEncuestado_obligatorio.setValue("True");
  
        } else {
  
        }
      }).catch(error=>{
  
      }).finally(()=>{
      });

    })
    
    

  }

  _editarAsignarEncuestado(){

    this.asignarEncuestadoService._editarAsignarEncuestado(
      this.idEncuestadoEncriptado,
      this.formAsignarEncuestado_idCuestionarioPublicadoEncriptado.value,
      this.formAsignarEncuestado_cmbComunidad.value,
      this.formAsignarEncuestado_cmbTecnico.value,
      localStorage.getItem("IdAsignarUsuarioTipoUsuarioEncriptado"),
      this.formAsignarEncuestado_obligatorio.value,
      this.formAsignarEncuestado_fechaInicio.value,
      this.formAsignarEncuestado_fechaFin.value
    ).then(data=>{
      if (data['http']['codigo']=='500') {

      } else if(data['http']['codigo']=='200'){
        
        this._consultar_poridcuestionariopublicado(this.formAsignarEncuestado_idCuestionarioPublicadoEncriptado.value);
        this.formAsignarEncuestado_cmbProvincia.setValue("");
        this.formAsignarEncuestado_cmbCanton.setValue("");
        this.formAsignarEncuestado_cmbParroquia.setValue("");
        this.formAsignarEncuestado_cmbComunidad.setValue("");
        this.formAsignarEncuestado_cmbTecnico.setValue("");
        this.formAsignarEncuestado_obligatorio.setValue("True");
      } else {

      }
    }).catch(error=>{

    }).finally(()=>{

    });

    

  }

  _consultar_poridcuestionariopublicado(_idCuestionarioGenericoEncriptado){
    
    this.asignarEncuestadoService._consultar_poridcuestionariopublicado(_idCuestionarioGenericoEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='500') {

        } else if(data['http']['codigo']=='200') {
          this._listaAsignarEncuestados = data['respuesta'];
        }else{

        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  _eliminarAsignarEncuestado(_item){

    this.asignarEncuestadoService._eliminarAsignarEncuestado(_item.IdAsignarEncuestadoEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='500') {

        } else if(data['http']['codigo']=='200'){
          this._consultar_poridcuestionariopublicado(_item.CuestionarioPublicado.IdCuestionarioPublicadoEncriptado);
        } else {

        }
      }).catch(error=>{

      }).finally(()=>{

      });

  }

  _listaProvincias:any[]=[];
  _consultarProvincias() {
    this.lugaresService._consultarProvincias()
      .then(
        data => {
          if (data['http']['codigo']=='200') {
            this._listaProvincias = data['respuesta'];
          }else{

          }
        }
      )
      .catch(
        err => {
        }
      )
  }
  _listaCantones:any[]=[];
  _cantonesDeUnaProvincia(event){
    var id = event;
    if (id!="0") {
      this.lugaresService._consultarCantonesDe(id)
        .then(data=>{
          if (data['http']['codigo']=='200') {
            this._listaCantones = data['respuesta'];
          }else{
          }
        }).catch(error=>{
        }).finally(()=>{
        });
    }
  }
  _listaParroquias:any[]=[];
  _parroquiasDeUnCanton(event){
    var id = event;
    if (id!="0") {
      this.lugaresService._consultarParroquiasDe(id)
        .then(data=>{
          if (data['http']['codigo']=='200') {
            this._listaParroquias = data['respuesta'];
          }else{

          }
        }).catch(error=>{
        }).finally(()=>{
        });
    }
  }
  _listaComunidades:any[]=[];
  _comunidadesDeUnaParroquia(event){


    var id = event;

    if (id!="0") {
      this.lugaresService._consultarComunidadesDe(id)
        .then(data=>{
          if (data['http']['codigo']=='200') {
            this._listaComunidades = data['respuesta'];

          }else{

          }
        }).catch(error=>{
        }).finally(()=>{
        });
    }

  }



}
