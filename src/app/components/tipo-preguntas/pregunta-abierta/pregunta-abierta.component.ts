import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSnackBar, MatTable } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PreguntaAbiertaService } from 'src/app/services/tipo-preguntas/pregunta-abierta.service';

@Component({
  selector: 'app-pregunta-abierta',
  templateUrl: './pregunta-abierta.component.html',
  styleUrls: ['./pregunta-abierta.component.css']
})
export class PreguntaAbiertaComponent implements OnInit {

  @Input() item : any={};
  @Input() oculto : any=0;

  constructor(private snackBarComponent: MatSnackBar,
    private preguntaAbiertaService : PreguntaAbiertaService) {

      this.formPreguntaTipoAbierta = new FormGroup({
      _idPreguntaAbiertaEncriptado  : new FormControl(''),
      _idPreguntaEncriptado         : new FormControl('',[Validators.required]),
      _cmbTipoDato                  : new FormControl('',[Validators.required]),
      _especificaRango              : new FormControl('',[Validators.required]),
      _valorMinimo                : new FormControl(null),
      _valorMaximo                  : new FormControl(null),
      _identificador                : new FormControl('')
    });

  }

  ngOnInit() {
    this.formPreguntaTipoAbierta.get("_idPreguntaEncriptado").setValue(this.item.IdPreguntaEncriptado);
    this._consultarOpcionesPreguntasAbiertas();
    this._consultarPreguntaAbiertaTipoDatos();
  }
  Columns: string[] = [ 'tipo_dato','minimo', 'maximo' ,'acciones'];
  formPreguntaTipoAbierta:FormGroup;



  get PREGUNTAABIERTA_idPreguntaAbiertaEncriptado(){
    return this.formPreguntaTipoAbierta.get("_idPreguntaAbiertaEncriptado");
  }
  get PREGUNTAABIERTA_idPreguntaEncriptado(){
    return this.formPreguntaTipoAbierta.get("_idPreguntaEncriptado");
  }
  get PREGUNTAABIERTA_cmbTipoDato(){
    return this.formPreguntaTipoAbierta.get("_cmbTipoDato");
  }
  get PREGUNTAABIERTA_cmbTipoDatoIdentificador(){
    return this.formPreguntaTipoAbierta.get("_identificador");
  }

  get PREGUNTAABIERTA_especificaRango(){
    return this.formPreguntaTipoAbierta.get("_especificaRango");
  }
  get PREGUNTAABIERTA_valorMinimo(){
    return this.formPreguntaTipoAbierta.get("_valorMinimo");
  }
  get PREGUNTAABIERTA_valorMaximo(){
    return this.formPreguntaTipoAbierta.get("_valorMaximo");
  }

  _checkBoxEspecificarRango=true;

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

  _listaPreguntaAbiertaTipoDatos:any[]=[];
  _consultarPreguntaAbiertaTipoDatos(){
    this.preguntaAbiertaService._consultarPreguntaAbiertaTipoDatos()
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaPreguntaAbiertaTipoDatos= data['respuesta'];
        }else{

        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  _identificador = 0;
  _onChangeCmb_PREGUNTAABIERTA_cmbTipoDato(event?){
    let obj = (this._listaPreguntaAbiertaTipoDatos.find(item=>item.IdTipoDatoEncriptado==event.value)).Identificador;
    this._identificador = obj;
  }

  _minimo="";
  _maximo="";
  _input_required=false;
  _requeridos(event){
    this.PREGUNTAABIERTA_valorMinimo.reset();
    this.PREGUNTAABIERTA_valorMaximo.reset();
    console.log(event.checked);
    this._input_required=event.cheked;
    

  }
  // _lsita_listaOpcionesPreguntasAbiertas
  @ViewChild(MatTable,{static:false}) tablaOpcionesPreguntaAbierta : MatTable<any>;
  _listaOpcionesPreguntasAbiertas:any[]=[];
  _consultarOpcionesPreguntasAbiertas(){
    this.preguntaAbiertaService._consultarOpcionesPreguntasAbiertas(this.item.IdPreguntaEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          console.log("lista de Opciones",data['respuesta']);
          this._listaOpcionesPreguntasAbiertas.push(data['respuesta']);
          this._listaOpcionesPreguntasAbiertas.map((item,index)=>{
            console.log("item",item.TipoDato.Descripcion );

          });
          
          // this._listaOpcionesPreguntasAbiertas.push(data['respuesta']);
          // console.log("sfasdasd",this._listaOpcionesPreguntasAbiertas);

        }
      }).catch(error=>{

      }).finally(()=>{
        this.tablaOpcionesPreguntaAbierta.renderRows();
      });
  }
  _eliminarOpcionPreguntasAbiertas(element){
    this.preguntaAbiertaService._eliminarOpcionPreguntaAbierta(element.IdPreguntaEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._consultarOpcionesPreguntasAbiertas();
          //this._listaOpcionesPreguntasAbiertas = data['respuesta'];
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else{
          this.mensaje(data['http']['mesaje']);
        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }

   _min ="";
   _max="";
  _validarFormPreguntasAbiertas(){
    if (this._checkBoxEspecificarRango==true) {
      

      let obj = (this._listaPreguntaAbiertaTipoDatos.find(item=>item.IdTipoDatoEncriptado== this.formPreguntaTipoAbierta.get("_cmbTipoDato").value)).Identificador;
      //this._identificador = obj;
     
      if (obj==2) {
        try {
          let _minimo = new Date(this.PREGUNTAABIERTA_valorMinimo.value).toJSON().slice().replace('T', ' ').replace('Z','');
          let _maximo = new Date(this.PREGUNTAABIERTA_valorMaximo.value).toJSON().slice().replace('T', ' ').replace('Z','');
        
          this._min = _minimo;
          this._max =_maximo;
        } catch (error) {
          
        }
      }else{
        this._min = this.PREGUNTAABIERTA_valorMinimo.value;
        this._max = this.PREGUNTAABIERTA_valorMaximo.value;
      }

      if (this.formPreguntaTipoAbierta.get("_valorMaximo").value < this.formPreguntaTipoAbierta.get("_valorMinimo").value) {
        this.mensaje("Ingrese un rango correcto");
      } else if (this.formPreguntaTipoAbierta.get("_valorMaximo").value >= this.formPreguntaTipoAbierta.get("_valorMinimo").value) {
        this._insertarOpcionPreguntasAbiertas();
      }    
    } else {
      this._insertarOpcionPreguntasAbiertas();
    }
  }

  _insertarOpcionPreguntasAbiertas(){

      console.log("get miniom",this.formPreguntaTipoAbierta.get("_valorMaximo").value);
      console.log("get max",this.formPreguntaTipoAbierta.get("_valorMinimo").value);
      console.log("valor minimo",this.PREGUNTAABIERTA_valorMinimo.value);
      this.preguntaAbiertaService._insertarOpcionPreguntaAbierta(
            this.item.IdPreguntaEncriptado,
            this.item.TipoPregunta.IdTipoPreguntaEncriptado,
            this.formPreguntaTipoAbierta.get("_cmbTipoDato").value,
            this.formPreguntaTipoAbierta.get("_especificaRango").value,
            this._min,
            this._max
          ).then(data=>{
            if (data['http']['codigo']=='200') {
              this._consultarOpcionesPreguntasAbiertas();
            }else if (data['http']['codigo']=='500') {
              this.mensaje("A ocurrido un error inesperado, intente más tarde.")
            }else{
              this.mensaje(data['http']['mensaje']);
            }
          }).catch(error=>{
            console.log(error);

          }).finally(()=>{

          });
     
  }
}

