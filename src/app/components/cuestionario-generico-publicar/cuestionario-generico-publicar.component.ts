import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CuestionarioGenericoService } from 'src/app/services/cuestionario-generico.service';
import { CabeceraVersionCuestionarioService } from 'src/app/services/cabecera-version-cuestionario.service';
import { MatSnackBar } from '@angular/material';
import { LugaresService } from 'src/app/services/lugares.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { AsignarUsuarioTipoUsuarioService } from "src/app/services/asignar-usuario-tipo-usuario.service";
import { CuestionarioPublicadoService } from "src/app/services/cuestionario-publicado.service";
import { AsignarEncuestadoService } from 'src/app/services/asignar-encuestado.service';

@Component({
  selector: 'app-cuestionario-generico-publicar',
  templateUrl: './cuestionario-generico-publicar.component.html',
  styleUrls: ['./cuestionario-generico-publicar.component.css']
})
export class CuestionarioGenericoPublicarComponent implements OnInit {

  constructor(
    private cuestionarioGenericoService :CuestionarioGenericoService,
    private cabeceraVersionCuestionarioService:CabeceraVersionCuestionarioService,

    private snackBarComponent:MatSnackBar,

    private lugaresService:LugaresService,
    private periodoService : PeriodoService,
    private asignarUsuarioTipoUsuarioService: AsignarUsuarioTipoUsuarioService,
    private cuestionarioPublicadoService : CuestionarioPublicadoService,
    private asignarEncuestadoService : AsignarEncuestadoService
  ) {

    this.formCuestionarioGenericoPublicar = new FormGroup({
      _idCuestionarioPublicadoEncriptado : new FormControl(''),
      // _cmbProvincia : new FormControl('',[Validators.required]),
      // _cmbCanton: new FormControl('',[Validators.required]),
      // _cmbParroquia: new FormControl('',[Validators.required]),
      // _cmbComunidad: new FormControl('',[Validators.required]),
      _cmbCuestionario : new FormControl('',[Validators.required]),
      _cmbCabeceraVersionCuestionario : new FormControl('',[Validators.required]),
      // _fechaInicio: new FormControl(''),
      // _fechaFin : new FormControl(''),
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
      // _idAsignarUsuarioTipoUsuarioTecnico: new FormControl('',[Validators.required]),
      _idAsignarUsuarioTipoUsuarioEncriptado: new FormControl('',[Validators.required]),
      _obligatorio : new FormControl('',[Validators.required]),
      _fechaInicio : new FormControl('',[Validators.required]),
      _fechaFin : new FormControl('',[Validators.required]),
      _estado : new FormControl('')
    });

  }

  ngOnInit() {

    this.formAsignarEncuestado_obligatorio.setValue(true);

    this._cargarMisCuestionariosGenericos();
    this._consultarProvincias();
    this._consultarPeriodos();
    this._consultarTecnicos();
    this._consultar_cuestionarioPublicado();
    // this._consultar_cuestionarioPublicadoporidasignarusuariotipousuario();
  }
  //---------------------------------------------------------------------------------------
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
  //----------------------------------------------------------------------------------------
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
  //----------------------------------------------------------------------------------------
  _verAsignarEncuestado :boolean = false;
  _listaCuestionariosGenericos:any[]=[];
  _listaVersionesCuestionario:any[]=[];
  _listaPeriodos:any[]=[];
  _listaTecnicos:any[]=[];
  _listaCuestionariosPublicados:any[]=[];
  _listaAsignarEncuestados:any[]=[];

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

  //------------------------------------------------
  _onChangeCmbCuestionariosGenericos(event){
    // this._consultarComponentesDeCuestionario(event.value);
    if (event.value==0) {

    } else {

      // const obj=  this._listaCuestionariosGenericos.find(data=>data.CuestionarioGenerico.IdCuestionarioGenericoEncriptado===event.value);
      // const index = this._listaCuestionariosGenericos.indexOf(obj);

      // this.formCuestionarioGenericoDetalle_idAsignarResponsableEncriptado.setValue(obj.IdAsignarResponsableEncriptado);
      // console.log("idAsignarResponsable:",this.formCuestionarioGenericoDetalle_idAsignarResponsableEncriptado.value);

    }
    this._consultarCabeceraVersionCuestionario(event.value);

  }
  _onExpandPanelPeriodo(){
    console.log("_onExpandPanelPeriodo");
    this._consultarPeriodos();
  }
  _onExpandPanelCuestionario(){
    console.log("_onExpandPanelCuestionario");
    this._cargarMisCuestionariosGenericos();
    this._consultarTecnicos();
  }
  _onExpandPanelUbicacion(){
    console.log("_onExpandPanelUbicacion");
    this._consultarProvincias();
  }
  _onExpandPanelTecnico(){
    this._consultarTecnicos();
  }
  _onExpandPanelAsignarEncuestado(){
    // if (this._verAsignarEncuestado == true) {
    //   this._verAsignarEncuestado=false;
    // } else {
    //   this._verAsignarEncuestado=true;
    // }
  }
  _ocultarPanelAsignarEncuestado(){
    console.log("OCULTAR");

    this._verAsignarEncuestado=false;
  }
  _validarForm(){
    this._insertar_cuestionarioPublicado();
  }
  _validarFormAsignarEncuestado(){
    this._insertarAsignarEncuestado();
  }

  //------------------------------------------------
  _consultar_cuestionarioPublicado(){
    this.cuestionarioPublicadoService._consultar_cuestionarioPublicado()
      .then(data=>{
        if (data['http']['codigo']=="200") {
          this._listaCuestionariosPublicados=[];
          this._listaCuestionariosPublicados=data['respuesta'];
          console.log("_listaCuestionariosPublicados:",this._listaCuestionariosPublicados);

        } else {

        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }
  _consultar_cuestionarioPublicadoporidasignarusuariotipousuario(){
    const id = localStorage.getItem("IdAsignarUsuarioTipoUsuarioEncriptado");
    console.log("IdAsignarUsuarioTipoUsuarioEncriptado",id);

    this.cuestionarioPublicadoService._consultar_cuestionarioPublicadoporidasignarusuariotipousuario(id)
      .then(data=>{
        if (data['http']['codigo']=="200") {
          this._listaCuestionariosPublicados=[];
          this._listaCuestionariosPublicados=data['respuesta'];
          console.log("_listaCuestionariosPublicados:",this._listaCuestionariosPublicados);

        } else {

        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }
  _cargarMisCuestionariosGenericos(){
    // console.log(localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado'));
    // this._listaCuestionariosGenericos=null;

    this.cuestionarioGenericoService._consultarCuestionarioGeneriocoPorIdAsignarUsuarioTipoUsuarioEncriptado(
      localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado')
    )
      .then(data=>{
        if (data['http']['codigo']=='200') {
          // console.log(data['respuesta']);
          //
          this._listaCuestionariosGenericos=[];
          this._listaCuestionariosGenericos = data['respuesta'];
          console.log("mis cuestionarios",this._listaCuestionariosGenericos);


          console.log("lista",this._listaCuestionariosGenericos);



        }

      }).catch(error=>{

      }).finally(()=>{

        //this.MatTableCuestionariosGenericos.renderRows();
      });
  }
  _consultarCabeceraVersionCuestionario(_idCuestionarioEncriptado){

    this.cabeceraVersionCuestionarioService._consultarCabeceraVersionCuestionario(_idCuestionarioEncriptado)
    .then(data=>{
      if (data['http']['codigo']=='200') {
        this._listaVersionesCuestionario=data['respuesta'];
        console.log("lista de versiones ",this._listaVersionesCuestionario);

      }

      console.log("cabecera:", data);

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
          console.log("periodos:",this._listaPeriodos);

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
          console.log("lista de tecnicos",this._listaTecnicos);

        }else{

        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  _insertar_cuestionarioPublicado(){
    let _idAsignarUsuarioTipoUsuario = localStorage.getItem("IdAsignarUsuarioTipoUsuarioEncriptado");

    console.log(
            "_idAsignarUsuarioTipoUsuario",_idAsignarUsuarioTipoUsuario,
            "this.formCuestionarioGenericoPublicar_cmbCabeceraVersionCuestionario.value",this.formCuestionarioGenericoPublicar_cmbCabeceraVersionCuestionario.value,
            "this.formCuestionarioGenericoPublicar_cmbPeriodo.value",this.formCuestionarioGenericoPublicar_cmbPeriodo.value
            );


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
      } else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{

    }).finally(()=>{

    });
  }

  _eliminar_cuestionarioPublicado(_item){
    console.log("_item eliminar",_item.IdCuestionarioPublicadoEncriptado);
    this.cuestionarioPublicadoService._eliminar_cuestionarioPublicado(_item.IdCuestionarioPublicadoEncriptado)
      .then(data=>{
        this._consultar_cuestionarioPublicadoporidasignarusuariotipousuario();
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  _prepararCuestionarioPublicado(_item){
    console.log("_verCuestionarioPublicado",_item);
    //this.cuestionarioPublicadoService._eliminar_cuestionarioPublicado()
    this.formAsignarEncuestado_idAsignarUsuarioTipoUsuarioEncriptado.setValue(localStorage.getItem("IdAsignarUsuarioTipoUsuarioEncriptado"));
    this.formAsignarEncuestado_idCuestionarioPublicadoEncriptado.setValue(_item.IdCuestionarioPublicadoEncriptado);
    this.formAsignarEncuestado_versionCuestionarioGenenico.setValue(_item.CabeceraVersionCuestionario.Version+" ("+_item.CabeceraVersionCuestionario.FechaCreacion +")");
    this.formAsignarEncuestado_nombreCuestionarioGenenico.setValue(_item.CabeceraVersionCuestionario.AsignarResponsable.CuestionarioGenerico.Nombre);
    this._verAsignarEncuestado=true;

    this._consultar_poridcuestionariopublicado(_item.IdCuestionarioPublicadoEncriptado);

  }

  _insertarAsignarEncuestado(){
    console.log(
      "formAsignarEncuestado_idCuestionarioPublicadoEncriptado",this.formAsignarEncuestado_idCuestionarioPublicadoEncriptado.value,
      "formAsignarEncuestado_cmbComunidad",this.formAsignarEncuestado_cmbComunidad.value,
      "formAsignarEncuestado_cmbTecnico",this.formAsignarEncuestado_cmbTecnico.value,
      "localStorage",localStorage.getItem("IdAsignarUsuarioTipoUsuarioEncriptado"),
      "formAsignarEncuestado_obligatorio",this.formAsignarEncuestado_obligatorio.value,
      "formAsignarEncuestado_fechaInicio",this.formAsignarEncuestado_fechaInicio.value +" 0:00:00",
      "formAsignarEncuestado_fechaFin",this.formAsignarEncuestado_fechaFin.value +" 0:00:00"
    );

    this.asignarEncuestadoService._insertarAsignarEncuestado(
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
        console.log("_listaAsignarEncuestados",this._listaAsignarEncuestados);

      });
  }

  _eliminarAsignarEncuestado(_item){
    console.log("_eliminarAsignarEncuestado",_item.IdAsignarEncuestadoEncriptado);

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

  //LUGARES
  _listaProvincias:any[]=[];
  _consultarProvincias() {
    this.lugaresService._consultarProvincias()
      .then(
        data => {
          if (data['http']['codigo']=='200') {
            this._listaProvincias = data['respuesta'];
          }else{
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
  _listaCantones:any[]=[];
  _cantonesDeUnaProvincia(event){
    //

    // this.ComboCantones.nativeElement.value="0";
    // this.ComboParroquias.nativeElement.value="0";

    var id = event;
    console.log(id);
    if (id!="0") {
      this.lugaresService._consultarCantonesDe(id)
        .then(data=>{
          if (data['http']['codigo']=='200') {
            this._listaCantones = data['respuesta'];
          }else{
            console.log(data);
          }
        }).catch(error=>{
          console.log(error);
        }).finally(()=>{
          //this._validarCompletos();
        });
    }
  }
  _listaParroquias:any[]=[];
  _parroquiasDeUnCanton(event){

    //this.ComboParroquias.nativeElement.value="0";

    var id = event;
    console.log(id);
    if (id!="0") {
      this.lugaresService._consultarParroquiasDe(id)
        .then(data=>{
          if (data['http']['codigo']=='200') {
            this._listaParroquias = data['respuesta'];
          }else{
            console.log(data);

          }
        }).catch(error=>{
          console.log(error);
        }).finally(()=>{
          //this._validarCompletos();
        });
    }
  }
  _listaComunidades:any[]=[];
  _comunidadesDeUnaParroquia(event){


    var id = event;
    console.log("id",id);
    console.log(id);

    if (id!="0") {
      this.lugaresService._consultarComunidadesDe(id)
        .then(data=>{
          if (data['http']['codigo']=='200') {
            this._listaComunidades = data['respuesta'];
            console.log("data:",data['respuesta']);

          }else{

            console.log(data);
          }
        }).catch(error=>{
          console.log(error);
        }).finally(()=>{
          //this._validarCompletos();
        });
    }
    console.log("lista",this._listaComunidades);

  }
  //FIN LUGARES



}
