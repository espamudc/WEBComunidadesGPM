import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CuestionarioGenericoService } from 'src/app/services/cuestionario-generico.service';
import { CabeceraVersionCuestionarioService } from 'src/app/services/cabecera-version-cuestionario.service';
import { MatSnackBar } from '@angular/material';
import { LugaresService } from 'src/app/services/lugares.service';

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

  ) { 

    this.formCuestionarioGenericoPublicar = new FormGroup({
      _cmbProvincia : new FormControl('',[Validators.required]),
      _cmbCanton: new FormControl('',[Validators.required]),
      _cmbParroquia: new FormControl('',[Validators.required]),
      _cmbComunidad: new FormControl('',[Validators.required]),
      _cmbCuestionario : new FormControl('',[Validators.required]),
      _cmbCabeceraVersionCuestionario : new FormControl('',[Validators.required]),
      _cmbTecnico : new FormControl('',[Validators.required]),
      _fechaInicio: new FormControl('',[Validators.required]),
      _fechaFin : new FormControl('',[Validators.required])
    });

  }

  ngOnInit() {
    this._cargarMisCuestionariosGenericos();
    this._consultarProvincias();
  }
  //---------------------------------------------------------------------------------------
  formCuestionarioGenericoPublicar:FormGroup;
  get formCuestionarioGenericoPublicar_cmbProvincia(){
    return this.formCuestionarioGenericoPublicar.get("_cmbProvincia");
  } 
  get formCuestionarioGenericoPublicar_cmbCanton(){
    return this.formCuestionarioGenericoPublicar.get("_cmbCanton");
  } 
  get formCuestionarioGenericoPublicar_cmbParroquia(){
    return this.formCuestionarioGenericoPublicar.get("_cmbParroquia");
  }
  get formCuestionarioGenericoPublicar_cmbComunidad(){
    return this.formCuestionarioGenericoPublicar.get("_cmbComunidad");
  }
  get formCuestionarioGenericoPublicar_cmbCuestionario(){
    return this.formCuestionarioGenericoPublicar.get("_cmbCuestionario");
  }
  get formCuestionarioGenericoPublicar_cmbCabeceraVersionCuestionario(){
    return this.formCuestionarioGenericoPublicar.get("_cmbCabeceraVersionCuestionario");
  }
  get formCuestionarioGenericoPublicar_cmbTecnico(){
    return this.formCuestionarioGenericoPublicar.get("_cmbTecnico");
  }
  get formCuestionarioGenericoPublicar_fechaInicio(){
    return this.formCuestionarioGenericoPublicar.get("_fechaInicio");
  }
  get formCuestionarioGenericoPublicar_fechaFin(){
    return this.formCuestionarioGenericoPublicar.get("_fechaFin");
  }
  //----------------------------------------------------------------------------------------
  _listaCuestionariosGenericos:any[]=[];
  _listaVersionesCuestionario:any[]=[];
  Columns=['caracteristica','version','fecha_creacion','acciones'];

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
      } 
      
      console.log("cabecera:", data);
      
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
