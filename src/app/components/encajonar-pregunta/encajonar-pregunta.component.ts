import { Component, OnInit, ViewChild } from '@angular/core';
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
    private cuestionarioGenericoService :CuestionarioGenericoService ) { 
    
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

  ngOnInit() {
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
       // this.formCuestionarioGenerico.get("_cmbCuestionarioGenerico").reset();
      this.formEncajonarPregunta.get("_cmbComponente").reset();
      this.formEncajonarPregunta.get("_cmbSeccion").reset();
      this.formEncajonarPregunta.get("_cmbPregunta").reset();
      this._consultarComponentesDeCuestionario(event.value);
    }
   

 }
 _onChangeCmbComponentesCuestionarioGenerico(event?){
    
  // this._listaComponentesCuestionarioGenerico = null;
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

  // this._listaComponentesCuestionarioGenerico = null;
  // this._listaSeccionesComponenteCuestionarioGenerico = null;
  this._listaPreguntasSeccionComponenteCuestionarioGenerico = null;
  this._listaPreguntasSeccionComponenteCuestionarioGenerico2 = null;

  this.formEncajonarPregunta.get("_cmbPregunta").reset();
  // this._listaPreguntasSeccionComponenteCuestionarioGenerico = null;
  // this._listaPreguntasSeccionComponenteCuestionarioGenerico2 = null;

  if(event.value=='0'){

  }else{
    this._consultarPreguntasSeccionComponenteCuestionarioGenerico(event.value);
  } 
   //this.formPreguntaSeccionComponenteCuestionarioGenerico.reset();
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
   console.log(event.value);
   if(event.value=='0'){

   }else{
    this._consultarOpcionesPreguntaSeleccion(event.value);
   }
   
 }

  _listaCuestionariosGenericos : any[]=[];
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
          this._listaCuestionariosGenericos = data['respuesta'];
          // data['respuesta'].map(item=>{
          //   console.log(item.CuestionarioGenerico);
          //   this._listaCuestionariosGenericos.push(item.CuestionarioGenerico);
          //   // this._listaCuestionariosGenericos.push(item['CuestionarioGenerico']);
          // });
          console.log("lista",this._listaCuestionariosGenericos);
          
          // console.log(data['http']['codigo']);
          
        }
        // else if (data['http']['codigo']=='500') {
        //   this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        // }else{
        //   this.mensaje(data['http']['mensaje']);
        // }
      }).catch(error=>{

      }).finally(()=>{
        //this.MatTableCuestionariosGenericos.renderRows();
      });
  }
  
  _listaComponentesCuestionarioGenerico:any[]=[];
  _consultarComponentesDeCuestionario(_IdCuestionarioGenericoEncriptado){
    this.componenteCuestionarioGenericoService._consultarComponentesDeCuestionario(_IdCuestionarioGenericoEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaComponentesCuestionarioGenerico= data['respuesta'];
          console.log(this._listaComponentesCuestionarioGenerico);
          
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
          // console.log(this._listaSeccionesComponenteCuestionarioGenerico);
          
        }
      }).catch(error=>{
        console.log("error",error);
        
      }).finally(()=>{

      });
  }

  _listaPreguntasTemporal:any[]=[];
  _listaPreguntasSeccionComponenteCuestionarioGenerico:any[]=[];
  _listaPreguntasSeccionComponenteCuestionarioGenerico2:any[]=[];

  _consultarPreguntasSeccionComponenteCuestionarioGenerico(idSeccionEncriptado){
    
  //  this._listaPreguntasSeccionComponenteCuestionarioGenerico2 = null;

    let id = this.formEncajonarPregunta.get("_cmbSeccion").value;
    this.preguntaSeccionComponenteCuestionarioGenericoService._consultarPreguntasSeccionComponenteCuestionarioGenerico(idSeccionEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          console.log(data['respuesta']);          
          this._listaPreguntasSeccionComponenteCuestionarioGenerico = [];
          this._listaPreguntasSeccionComponenteCuestionarioGenerico= data['respuesta'];
          //this._listaPreguntasSeccionComponenteCuestionarioGenerico2 = data['respuesta'];
          //this._listaPreguntasSeccionComponenteCuestionarioGenerico.sort(data=>data.Orden);

        }
      }).catch(error=>{
        console.log(error);
        
      }).finally(()=>{
        //comenté estas líneas porque se cargaban las preguntas de otros cuestionarios,
        // cuando ya habías cambiado de cuestionario 
        // for (let index = 0; index < this._listaPreguntasSeccionComponenteCuestionarioGenerico.length; index++) {
        //   const element = this._listaPreguntasSeccionComponenteCuestionarioGenerico[index];
         //  if (element.TipoPregunta.Identificador===2) {
         //    console.log(element);
         //    let obj = this._listaPreguntasTemporal.find(it=>it.IdPreguntaEncriptado === element.IdPreguntaEncriptado);
          //   let ind = this._listaPreguntasTemporal.indexOf(obj);
          //   if (ind == -1) {
          //     this._listaPreguntasTemporal.push(element);
          //   }
            //// let obj = this._listaPreguntasTemporal.find(data=>data.)
            //// this._listaPreguntasTemporal.push(element);
          // }
         //}
      //  this._listaPreguntasSeccionComponenteCuestionarioGenerico = this._listaPreguntasTemporal;
      });
  }
  

  _consultarPreguntasSeccionComponenteCuestionarioGenericoPorIdentificadorTipoPregunta(idSeccionEncriptado){
       
      let id = this.formEncajonarPregunta.get("_cmbSeccion").value;
      this.preguntaSeccionComponenteCuestionarioGenericoService._consultarPreguntasSeleccionUnicaPorSeccion(idSeccionEncriptado)
        .then(data=>{
          if (data['http']['codigo']=='200') {
            console.log(data['respuesta']);          
            this._listaPreguntasSeccionComponenteCuestionarioGenerico = [];
            this._listaPreguntasSeccionComponenteCuestionarioGenerico= data['respuesta'];
  
          }
        }).catch(error=>{
          console.log(error);
          
        }).finally(()=>{

        });
    }
    
  


  Columns: string[] = ['descripcion', 'orden', 'acciones'];
  Columns2: string[] = ['icono','descripcion', 'acciones'];
  _listaOpcionesPreguntaSeleccion:any[]=[];
  _consultarOpcionesPreguntaSeleccion(_IdPreguntaSeleccionEncriptado){
    // const element = this._listaPreguntasSeccionComponenteCuestionarioGenerico2.find(item=>item.IdPreguntaEncriptado==_IdPreguntaSeleccionEncriptado);
    // const index = this._listaPreguntasSeccionComponenteCuestionarioGenerico2.indexOf(element);
    
    // this._listaPreguntasSeccionComponenteCuestionarioGenerico2.splice(index,1);

    this.preguntaSeleccionService._consultarOpcionPreguntaSeleccion(
      _IdPreguntaSeleccionEncriptado
    ).then(data=>{
      console.log(data)
      if (data['http']['codigo']=='200') {
        this._listaOpcionesPreguntaSeleccion = data['respuesta'];
      }else{

      }
    }).catch(error=>{

    }).finally(()=>{

    });
  }

  //--------------------------------------------------------
  _listaPreguntaEncajonadas:any[]=[];
  _consultarPreguntasEncajonadas(_item){
    console.log("opcion",_item);
    this._pregunta_consultarpornoencajonadasporopcionpreguntaseleccion(_item.IdOpcionPreguntaSeleccionEncriptado);
    this.preguntaEncajonarService._preguntaencajonada_consultarporidopcionpreguntaseleccion(_item.IdOpcionPreguntaSeleccionEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaPreguntaEncajonadas = data['respuesta'];
          console.log("_listaPreguntaEncajonadas",this._listaPreguntaEncajonadas);
          
        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }
//---------------------------------------------------------------
  @ViewChild('tablaPreguntasEncajonadas',{static:false}) tablaPreguntasEncajonadas : MatTable<any>;

  _insertarPreguntaEncajonada(_item){
    
    let element = this._listaPreguntaEncajonadas.find(i=>i.Pregunta.IdPreguntaEncriptado==this.formEncajonarPregunta_cmbPreguntaEncajonada.value);
    let index = this._listaPreguntaEncajonadas.indexOf(element);
    if ( index ==-1) {
      console.log(this.formEncajonarPregunta_cmbPreguntaEncajonada.value);
      this.preguntaEncajonarService._preguntaencajonada_insertar(
        _item.IdOpcionPreguntaSeleccionEncriptado,
        this.formEncajonarPregunta_cmbPreguntaEncajonada.value
      ).then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaPreguntaEncajonadas.push(data['respuesta']);
        } else {
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error=>{
        console.log(error);
        this.mensaje(error);
        
      }).finally(()=>{
        this.tablaPreguntasEncajonadas.renderRows();
      });
    } else {
      this.mensaje("la pregunta ya ha sido seleccionada");
    }

    
  }
  _eliminarPreguntaEncajonada(_item){
    console.log(_item.IdPreguntaEncajonadaEncriptado);
    
    this.preguntaEncajonarService._preguntaencajonada_eliminar(_item.IdPreguntaEncajonadaEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          let element = this._listaPreguntaEncajonadas.find(i=>i.IdPreguntaEncajonadaEncriptado==_item.IdPreguntaEncajonadaEncriptado);
          let index = this._listaPreguntaEncajonadas.indexOf(element);
          this._listaPreguntaEncajonadas.splice(index,1);
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
          
          console.log(" combopregunta2 --->",data['respuesta']);
          
          this._listaPreguntasSeccionComponenteCuestionarioGenerico2 = data['respuesta'];        
        } else {
          console.log(data['http']['mensaje']);
           
        }
      }).catch(error=>{
        console.log(error);
        
      }).finally(()=>{

      });
  }

}
