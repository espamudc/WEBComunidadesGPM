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

  constructor(private snackBarComponent: MatSnackBar,
    private preguntaAbiertaService : PreguntaAbiertaService) {

      this.formPreguntaTipoAbierta = new FormGroup({
      _idPreguntaAbiertaEncriptado  : new FormControl(''),
      _idPreguntaEncriptado         : new FormControl('',[Validators.required]),
      _cmbTipoDato                  : new FormControl('',[Validators.required]),
      _especificaRango              : new FormControl('',[Validators.required]),
      _valorMinimimo                : new FormControl(''),
      _nose                         : new FormControl(''),
      _valorMaximo                  : new FormControl(''),
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

  get nose(){
    return this.formPreguntaTipoAbierta.get("_nose");
  }

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
  get PREGUNTAABIERTA_valorMinimimo(){
    return this.formPreguntaTipoAbierta.get("_valorMinimimo");
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
    // this.PREGUNTAABIERTA_valorMinimimo.reset();
    // this.PREGUNTAABIERTA_valorMaximo.reset();
    console.log(event.checked);
    this._input_required=event.cheked;
    // if (event.cheked==false) {
    //   let v = new Validators;
    //   // this.PREGUNTAABIERTA_valorMinimimo.clearAsyncValidators();
    //   // this.PREGUNTAABIERTA_valorMaximo.clearAsyncValidators();

    //   this.formPreguntaTipoAbierta.get("_valorMinimimo").clearAsyncValidators();
    //   this.formPreguntaTipoAbierta.get("_valorMinimimo").updateValueAndValidity({onlySelf:true});
    //   this.formPreguntaTipoAbierta.get("_valorMaximo").clearAsyncValidators();
    //   this.formPreguntaTipoAbierta.get("_valorMaximo").updateValueAndValidity({onlySelf:true});
    // }else if(event.cheked==true){
    //   this.formPreguntaTipoAbierta.get("_valorMinimimo").setValidators(Validators.required);
    //   this.formPreguntaTipoAbierta.get("_valorMinimimo").updateValueAndValidity({onlySelf:true});
    //   this.formPreguntaTipoAbierta.get("_valorMaximo").setValidators(Validators.required);
    //   this.formPreguntaTipoAbierta.get("_valorMaximo").updateValueAndValidity({onlySelf:true});
    // }

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
        }else{
          this.mensaje(data['http']['mesaje']);
        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  _insertarOpcionPreguntasAbiertas(){

    console.log((( this.nose.value)));
    console.log( this.formPreguntaTipoAbierta.get("_nose").value);
    this.PREGUNTAABIERTA_valorMinimimo.value;
    console.log(this.formPreguntaTipoAbierta.get("_valorMinimo").value);
    // console.log(this.formPreguntaTipoAbierta.get("_valorMaximo").value);
    
    // let obj = (this._listaPreguntaAbiertaTipoDatos.find(item=>item.IdTipoDatoEncriptado== this.formPreguntaTipoAbierta.get("_cmbTipoDato").value)).Identificador;
    // //this._identificador = obj;
    // let _min ="";
    // let _max="";
    // if (obj==2) {
    //   try {
    //     let _minimo = new Date(this.PREGUNTAABIERTA_valorMinimimo.value).toJSON().slice().replace('T', ' ').replace('Z','');
    //     let _maximo = new Date(this.PREGUNTAABIERTA_valorMaximo.value).toJSON().slice().replace('T', ' ').replace('Z','');
       
    //     _min = _minimo;
    //     _max =_maximo;
    //   } catch (error) {
        
    //   }

    // } else {
    //  // console.log(( this.PREGUNTAABIERTA_valorMinimimo.value));
    //   //console.log(this.formPreguntaTipoAbierta.get("_valorMinimimo").value);

    //   const v = this.formPreguntaTipoAbierta.get("_valorMaximo").value;
    //   console.log("v",v);
      
    //   // _min=this.formPreguntaTipoAbierta.get("_valorMinimo").value;
    //   // _max=this.formPreguntaTipoAbierta.get("_valorMaximo").value;
    // }
    // debugger
    // console.log("minimo",_min,"maximo",_max);
    // console.log(this._checkBoxEspecificarRango);
    // console.log("nose",this.formPreguntaTipoAbierta.get("nose").value);
    
    // if (this._checkBoxEspecificarRango==true) {
    //   //debugger
    //   if (_min == null || _max == null) {
    //     //console.log(_min+"hola");
        
    //     this.mensaje("Ingrese el maximo y minimo");
    //   } else {
    //     // this.preguntaAbiertaService._insertarOpcionPreguntaAbierta(
    //     //     this.item.IdPreguntaEncriptado,
    //     //     this.item.TipoPregunta.IdTipoPreguntaEncriptado,
    //     //     this.formPreguntaTipoAbierta.get("_cmbTipoDato").value,
    //     //     this.formPreguntaTipoAbierta.get("_especificaRango").value,
    //     //     _min,
    //     //     _max
    //     //   ).then(data=>{
    //     //     if (data['http']['codigo']=='200') {
    //     //       this._consultarOpcionesPreguntasAbiertas();
    //     //     }else{
    //     //       this.mensaje(data['http']['mensaje']);
    //     //     }
    //     //   }).catch(error=>{
    //     //     console.log(error);

    //     //   }).finally(()=>{

    //     //   });
    //   }
    // } else {
    //   // this.preguntaAbiertaService._insertarOpcionPreguntaAbierta(
    //   //     this.item.IdPreguntaEncriptado,
    //   //     this.item.TipoPregunta.IdTipoPreguntaEncriptado,
    //   //     this.formPreguntaTipoAbierta.get("_cmbTipoDato").value,
    //   //     this.formPreguntaTipoAbierta.get("_especificaRango").value,
    //   //     _min,
    //   //     _max
    //   //   ).then(data=>{
    //   //     if (data['http']['codigo']=='200') {
    //   //       this._consultarOpcionesPreguntasAbiertas();
    //   //     }else{
    //   //       this.mensaje(data['http']['mensaje']);
    //   //     }
    //   //   }).catch(error=>{
    //   //     console.log(error);

    //   //   }).finally(()=>{

    //   // });
    // }

  }



}
