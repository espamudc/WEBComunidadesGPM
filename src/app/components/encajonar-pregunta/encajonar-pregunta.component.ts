import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CuestionarioGenericoService } from 'src/app/services/cuestionario-generico.service';
import { MatSnackBar, MatTable } from '@angular/material';
import { ComponenteCuestionarioGenericoService } from 'src/app/services/componente-cuestionario-generico.service';
import { SeccionComponenteCuestionarioGenericoService } from 'src/app/services/seccion-componente-cuestionario-generico.service';
import { PreguntaSeccionComponenteCuestionarioGenericoService } from 'src/app/services/pregunta-seccion-componente-cuestionario-generico.service';
import { PreguntaSeleccionService } from 'src/app/services/tipo-preguntas/pregunta-seleccion.service';
import { PreguntaEncajonarService } from 'src/app/services/pregunta-encajonar.service';

@Component({
  selector: 'app-encajonar-pregunta',
  templateUrl: './encajonar-pregunta.component.html',
  styleUrls: ['./encajonar-pregunta.component.css']
})
export class EncajonarPreguntaComponent implements OnInit {
  
  constructor( 
    
    private snackBarComponent: MatSnackBar,
    private preguntaService: PreguntaSeccionComponenteCuestionarioGenericoService,
    private preguntaEncajonarService:PreguntaEncajonarService,
    private preguntaSeleccionService:PreguntaSeleccionService,
    private preguntaSeccionComponenteCuestionarioGenericoService:PreguntaSeccionComponenteCuestionarioGenericoService,
    private seccionComponenteCuestionarioGenericoService:SeccionComponenteCuestionarioGenericoService,
    private componenteCuestionarioGenericoService : ComponenteCuestionarioGenericoService,
    private cuestionarioGenericoService :CuestionarioGenericoService,
    private router: Router ) { 
    
    this.formEncajonarPregunta = new FormGroup({
      _idPreguntaEncriptado : new FormControl(''),
      _idTipoPreguntaEncriptado : new FormControl(''),
      _idSeccionEncriptado : new FormControl(''),
      _descripcion : new FormControl(''),
      _obligatorio : new FormControl(''),
      _orden : new FormControl(''),
      _estado : new FormControl(''),

      _cmbCuestionario : new FormControl('',[Validators.required]),
      _cmbComponente : new FormControl('',[Validators.required]),
      _cmbSeccion : new FormControl('',[Validators.required]),
      _cmbPregunta : new FormControl('',[Validators.required]),
      _cmbPreguntaEncajonada : new FormControl('',[Validators.required]),

    });
  }
  

  tipoUsurio='';
  ngOnInit() {
    this.tipoUsurio= localStorage.getItem('IdTipoUsuarioEncriptado');
    if(this.tipoUsurio==''){
      this.router.navigateByUrl("/login");
    }
    this._cargarMisCuestionariosGenericos();
    
  }
  
  formEncajonarPregunta: FormGroup;

  get formEncajonarPregunta_idPreguntaEncriptado(){
    return this.formEncajonarPregunta.get('_idPreguntaEncriptado');
  }
  get formEncajonarPregunta_idTipoPreguntaEncriptado(){
    return this.formEncajonarPregunta.get('_idTipoPreguntaEncriptado');
  }
  get formEncajonarPregunta_idSeccionEncriptado(){
    return this.formEncajonarPregunta.get('_idSeccionEncriptado');
  }
  get formEncajonarPregunta_descripcion(){
    return this.formEncajonarPregunta.get('_descripcion');
  }
  get formEncajonarPregunta_obligatorio(){
    return this.formEncajonarPregunta.get('_obligatorio');
  }
  get formEncajonarPregunta_orden(){
    return this.formEncajonarPregunta.get('_orden');
  }
  get formEncajonarPregunta_estado(){
    return this.formEncajonarPregunta.get('_estado');
  }
  get formEncajonarPregunta_cmbCuestionario(){
    return this.formEncajonarPregunta.get('_cmbCuestionario');
  }
  get formEncajonarPregunta_cmbComponente(){
    return this.formEncajonarPregunta.get('_cmbComponente');
  }
  get formEncajonarPregunta_cmbSeccion(){
    return this.formEncajonarPregunta.get('_cmbSeccion');
  }
  get formEncajonarPregunta_cmbPregunta(){
    return this.formEncajonarPregunta.get('_cmbPregunta');
  }
  get formEncajonarPregunta_cmbPreguntaEncajonada(){
    return this.formEncajonarPregunta.get('_cmbPreguntaEncajonada');
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

  _onChangeCmbCuestionariosGenericos(event?){

    this._listaComponentesCuestionarioGenerico = null;
    this._listaSeccionesComponenteCuestionarioGenerico = null;
    this._listaPreguntasSeccionComponenteCuestionarioGenerico = null;
    this._listaPreguntasSeccionComponenteCuestionarioGenerico2 = null;
    if (event.value=='0') {
      
    } else {
      this.formEncajonarPregunta.get("_cmbComponente").reset();
      this.formEncajonarPregunta.get("_cmbSeccion").reset();
      this.formEncajonarPregunta.get("_cmbPregunta").reset();
      this._consultarComponentesDeCuestionario(event.value);
    }
   

 }
 _onChangeCmbComponentesCuestionarioGenerico(event?){
    
  this._listaSeccionesComponenteCuestionarioGenerico = null;
  this._listaPreguntasSeccionComponenteCuestionarioGenerico = null;
  this._listaPreguntasSeccionComponenteCuestionarioGenerico2 = null;

  if (event.value=='0') {
    
  } else {
    this.formEncajonarPregunta.get("_cmbSeccion").reset();
    this._consultarSeccionesDeComponentesDeCuestionario(event.value);
  }

 }

 _onChangeCmbSeccionComponentesCuestionarioGenerico(event?){

  this._listaPreguntasSeccionComponenteCuestionarioGenerico = null;
  this._listaPreguntasSeccionComponenteCuestionarioGenerico2 = null;

  this.formEncajonarPregunta.get("_cmbPregunta").reset();

  if(event.value=='0'){

  }else{
    this._consultarPreguntasSeccionComponenteCuestionarioGenerico(event.value);
  } 
 }

 _onChangeCmbSeccionComponentesCuestionarioGenericoPorIdentificadorTipoPregunta(event?){

  this._listaPreguntasSeccionComponenteCuestionarioGenerico = null;
  this._listaPreguntasSeccionComponenteCuestionarioGenerico2 = null;

  this.formEncajonarPregunta.get("_cmbPregunta").reset();
  if(event.value=='0'){

  }else{
    this._consultarPreguntasSeccionComponenteCuestionarioGenericoPorIdentificadorTipoPregunta(event.value);
  } 
 }

 _onChangeCmbPreguntasSeccionComponenteCuestionarioGenerico(event?){
   if(event.value=='0'){

   }else{
    this._consultarOpcionesPreguntaSeleccion(event.value);
   }
   
 }

  _listaCuestionariosGenericos : any[]=[];
  _cargarMisCuestionariosGenericos(){
    

    this.cuestionarioGenericoService._consultarCuestionarioGeneriocoPorIdAsignarUsuarioTipoUsuarioEncriptado(
      localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado')
    )
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaCuestionariosGenericos = data['respuesta']; 
        }
       
      }).catch(error=>{

      }).finally(()=>{
      });
  }
  
  _listaComponentesCuestionarioGenerico:any[]=[];
  _consultarComponentesDeCuestionario(_IdCuestionarioGenericoEncriptado){
    this.componenteCuestionarioGenericoService._consultarComponentesDeCuestionario(_IdCuestionarioGenericoEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaComponentesCuestionarioGenerico= data['respuesta'];          
        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  _listaSeccionesComponenteCuestionarioGenerico:any[]=[];
  _consultarSeccionesDeComponentesDeCuestionario(_idComponenteEncriptado){
    

    this.seccionComponenteCuestionarioGenericoService._consultarSeccionDeComponentesDeCuestionarioGenerico(_idComponenteEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaSeccionesComponenteCuestionarioGenerico = data['respuesta'];
          
        }
      }).catch(error=>{
        
      }).finally(()=>{

      });
  }

  _listaPreguntasTemporal:any[]=[];
  _listaPreguntasSeccionComponenteCuestionarioGenerico:any[]=[];
  _listaPreguntasSeccionComponenteCuestionarioGenerico2:any[]=[];

  _consultarPreguntasSeccionComponenteCuestionarioGenerico(idSeccionEncriptado){
    
    let id = this.formEncajonarPregunta.get("_cmbSeccion").value;
    this.preguntaSeccionComponenteCuestionarioGenericoService._consultarPreguntasSeccionComponenteCuestionarioGenerico(idSeccionEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaPreguntasSeccionComponenteCuestionarioGenerico = [];
          this._listaPreguntasSeccionComponenteCuestionarioGenerico= data['respuesta'];
        }
      }).catch(error=>{
        
      }).finally(()=>{
        
      });
  }
  

  _consultarPreguntasSeccionComponenteCuestionarioGenericoPorIdentificadorTipoPregunta(idSeccionEncriptado){
       
      let id = this.formEncajonarPregunta.get("_cmbSeccion").value;
      this.preguntaSeccionComponenteCuestionarioGenericoService._consultarPreguntasSeleccionUnicaPorSeccion(idSeccionEncriptado)
        .then(data=>{
          if (data['http']['codigo']=='200') {
            this._listaPreguntasSeccionComponenteCuestionarioGenerico = [];
            this._listaPreguntasSeccionComponenteCuestionarioGenerico= data['respuesta'];
  
          }
        }).catch(error=>{
          
        }).finally(()=>{

        });
    }
    
  


  Columns: string[] = ['descripcion', 'orden', 'acciones'];
  Columns2: string[] = ['icono','descripcion', 'acciones'];
  _listaOpcionesPreguntaSeleccion:any[]=[];
  _consultarOpcionesPreguntaSeleccion(_IdPreguntaSeleccionEncriptado){

    this.preguntaSeleccionService._consultarOpcionPreguntaSeleccion(
      _IdPreguntaSeleccionEncriptado
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._listaOpcionesPreguntaSeleccion = data['respuesta'];
      }else{

      }
    }).catch(error=>{

    }).finally(()=>{

    });
  }

  _listaPreguntaEncajonadas:any[]=[];
  _consultarPreguntasEncajonadas(_item){

    this._pregunta_consultarpornoencajonadasporopcionpreguntaseleccion(_item.IdOpcionPreguntaSeleccionEncriptado);
    this.preguntaEncajonarService._preguntaencajonada_consultarporidopcionpreguntaseleccion(_item.IdOpcionPreguntaSeleccionEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaPreguntaEncajonadas = data['respuesta'];  
        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }
  

  _consultarPreguntasEncajonadas2(_item){
    this._pregunta_consultarpornoencajonadasporopcionpreguntaseleccion(_item.OpcionPreguntaSeleccion.IdOpcionPreguntaSeleccionEncriptado);
    this.preguntaEncajonarService._preguntaencajonada_consultarporidopcionpreguntaseleccion(_item.OpcionPreguntaSeleccion.IdOpcionPreguntaSeleccionEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaPreguntaEncajonadas = data['respuesta'];          
        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  @ViewChild('tablaPreguntasEncajonadas',{static:false}) tablaPreguntasEncajonadas : MatTable<any>;

  _insertarPreguntaEncajonada(_item){
    
    let element = this._listaPreguntaEncajonadas.find(i=>i.Pregunta.IdPreguntaEncriptado==this.formEncajonarPregunta_cmbPreguntaEncajonada.value);
    let index = this._listaPreguntaEncajonadas.indexOf(element);
    if ( index ==-1) {
      this.preguntaEncajonarService._preguntaencajonada_insertar(
        _item.IdOpcionPreguntaSeleccionEncriptado,
        this.formEncajonarPregunta_cmbPreguntaEncajonada.value
      ).then(data=>{
        if (data['http']['codigo']=='200') {
          this._consultarPreguntasEncajonadas(_item);
          this._listaPreguntaEncajonadas.push(data['respuesta']);
        } else {
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error=>{
        this.mensaje(error);
        
      }).finally(()=>{
        this.tablaPreguntasEncajonadas.renderRows();
      });
    } else {
      this.mensaje("La pregunta ya ha sido seleccionada");
    }

    
    
  }
  preparaItem="";
  _eliminarPreguntaEncajonada(_item){
    this.preparaItem=_item;
    this.preguntaEncajonarService._preguntaencajonada_eliminar(_item.IdPreguntaEncajonadaEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._consultarPreguntasEncajonadas2(_item);
         
        } else {
          
        }
      }).catch(error=>{

      }).finally(()=>{
        this.tablaPreguntasEncajonadas.renderRows();
      });
  }
  
  _pregunta_consultarpornoencajonadasporopcionpreguntaseleccion(_idOpcionPreguntaSeleccionEncriptado){
    
    this.preguntaService._pregunta_consultarpornoencajonadasporopcionpreguntaseleccion(_idOpcionPreguntaSeleccionEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {       
          this._listaPreguntasSeccionComponenteCuestionarioGenerico2 = data['respuesta'];        
        } else {
           
        }
      }).catch(error=>{
        
      }).finally(()=>{

      });
  }

}
