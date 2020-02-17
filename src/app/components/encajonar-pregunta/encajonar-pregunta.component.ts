import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CuestionarioGenericoService } from 'src/app/services/cuestionario-generico.service';
import { MatSnackBar } from '@angular/material';
import { ComponenteCuestionarioGenericoService } from 'src/app/services/componente-cuestionario-generico.service';
import { SeccionComponenteCuestionarioGenericoService } from 'src/app/services/seccion-componente-cuestionario-generico.service';
import { PreguntaSeccionComponenteCuestionarioGenericoService } from 'src/app/services/pregunta-seccion-componente-cuestionario-generico.service';

@Component({
  selector: 'app-encajonar-pregunta',
  templateUrl: './encajonar-pregunta.component.html',
  styleUrls: ['./encajonar-pregunta.component.css']
})
export class EncajonarPreguntaComponent implements OnInit {

  constructor( 
    private snackBarComponent: MatSnackBar,
    private preguntaSeccionComponenteCuestionarioGenericoService:PreguntaSeccionComponenteCuestionarioGenericoService,
    private seccionComponenteCuestionarioGenericoService:SeccionComponenteCuestionarioGenericoService,
    private componenteCuestionarioGenericoService : ComponenteCuestionarioGenericoService,
    private cuestionarioGenericoService :CuestionarioGenericoService ) { 
    
    this.formEncajonarPregunta = new FormGroup({
      _idPreguntaEncriptado : new FormControl(''),
      _idTipoPreguntaEncriptado : new FormControl('',[Validators.required]),
      _idSeccionEncriptado : new FormControl('',[Validators.required]),
      _descripcion : new FormControl('',[Validators.required]),
      _obligatorio : new FormControl('',[Validators.required]),
      _orden : new FormControl('',[Validators.required]),
      _estado : new FormControl('',[Validators.required]),

      _cmbCuestionario : new FormControl('',[Validators.required]),
      _cmbComponente : new FormControl('',[Validators.required]),
      _cmbSeccion : new FormControl('',[Validators.required]),
      _cmbPregunta : new FormControl('',[Validators.required]),
      

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


    // this.formCuestionarioGenerico.get("_cmbCuestionarioGenerico").reset();
    this.formEncajonarPregunta.get("_cmbComponente").reset();
    this.formEncajonarPregunta.get("_cmbSeccion").reset();
    this._consultarComponentesDeCuestionario(event.value);

 }
 _onChangeCmbComponentesCuestionarioGenerico(event?){

  this.formEncajonarPregunta.get("_cmbSeccion").reset();
  this._consultarSeccionesDeComponentesDeCuestionario(event.value);

 }

 _onChangeCmbSeccionComponentesCuestionarioGenerico(event?){

   this._consultarPreguntasSeccionComponenteCuestionarioGenerico(event.value);
   //this.formPreguntaSeccionComponenteCuestionarioGenerico.reset();
 }

  _listaCuestionariosGenericos : any[]=[];
  _cargarMisCuestionariosGenericos(){
    // console.log(localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado'));
    
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
  _listaPreguntasSeccionComponenteCuestionarioGenerico:any[]=[];
  _consultarPreguntasSeccionComponenteCuestionarioGenerico(idSeccionEncriptado){
    
    let id = this.formEncajonarPregunta.get("_cmbSeccion").value;
    this.preguntaSeccionComponenteCuestionarioGenericoService._consultarPreguntasSeccionComponenteCuestionarioGenerico(idSeccionEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          console.log(data);
          
          this._listaPreguntasSeccionComponenteCuestionarioGenerico= data['respuesta'];

          //this._listaPreguntasSeccionComponenteCuestionarioGenerico.sort(data=>data.Orden);

        }
      }).catch(error=>{
        console.log(error);
        
      }).finally(()=>{

      });
  }


}
