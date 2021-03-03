import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PreguntaMatrizService } from 'src/app/services/tipo-preguntas/pregunta-matriz.service';
import { MatSnackBar, MatTable } from '@angular/material';

export interface OpcionUnoMatriz{
  IdOpcionUnoMatriz:number;
  IdOpcionUnoMatrizEncriptado:string;
  IdPregunta:number;
  IdPreguntaEncriptado:string;
  Descripcion:string;
}
export interface OpcionDosMatriz{
  IdOpcionDosMatriz:number;
  IdOpcionDosMatrizEncriptado:string;
  Descripcion:string;
}
export interface ConfigurarMatriz{
  IdConfigurarMatriz:number;
  IdConfigurarMatrizEncriptado:string;
  IdOpcionUnoMatrizEncriptado:string;
  IdOpcionDosMatrizEncriptado:string;
}

export interface PresentarDatosMatriz{
  Observacion:string;
  leyendaSuperior:string;
  leyendaLateral:string;
}



@Component({
  selector: 'app-pregunta-matriz',
  templateUrl: './pregunta-matriz.component.html',
  styleUrls: ['./pregunta-matriz.component.css']
})
export class PreguntaMatrizComponent implements OnInit {

  ObservacionGeneral: any;
  LeyendaSuperiorGeneral: any;
  LeyendaLateralGeneral: any;
  datosMatriz: Array <PresentarDatosMatriz>=[];

  constructor(
    private snackBarComponent: MatSnackBar,
    private preguntaMatrizService:PreguntaMatrizService
  ) {
    this.formPreguntaOpcionUnoMatriz = new FormGroup({
      _idOpcionUnoMatriz : new FormControl(''),
      _idOpcionUnoMatrizEncriptado : new FormControl(''),
      _idPreguntaEncriptado : new FormControl('',[Validators.required]),
      _descripcion : new FormControl('',[Validators.required,Validators.minLength(1)]),
    });
    this.formPreguntaOpcionDosMatriz = new FormGroup({
      _idOpcionDosMatriz : new FormControl(''),
      _idOpcionDosMatrizEncriptado : new FormControl(''),
      _idPreguntaEncriptado : new FormControl('',[Validators.required]),
      _descripcion : new FormControl('',[Validators.required,Validators.minLength(1)]),
    });
  }
  idPreguntaencriptada="";
  ngOnInit() {
    this._consultarPreguntaConfigurarMatriz();
    this._consultarOpcionUnoMatriz();
    this.idPreguntaencriptada = this.item.IdPreguntaEncriptado;
    this.formPreguntaOpcionUnoMatriz.get("_idPreguntaEncriptado").setValue(this.idPreguntaencriptada);
    this.formPreguntaOpcionDosMatriz.get("_idPreguntaEncriptado").setValue(this.idPreguntaencriptada);
  }

  @Input() item :any ={};

  Columns: string[] = ['descripcion', 'acciones'];


  formPreguntaOpcionUnoMatriz:FormGroup;
  get OpcionUnoMatriz_idOpcionUnoMatriz(){
    return this.formPreguntaOpcionUnoMatriz.get("_idOpcionUnoMatriz");
  }
  get OpcionUnoMatriz_idOpcionUnoMatrizEncriptado(){
    return this.formPreguntaOpcionUnoMatriz.get("_idOpcionUnoMatrizEncriptado");
  }
  get OpcionUnoMatriz_idPreguntaEncriptado(){
    return this.formPreguntaOpcionUnoMatriz.get("_idPreguntaEncriptado");
  }
  get OpcionUnoMatriz_descripcion(){
    return this.formPreguntaOpcionUnoMatriz.get("_descripcion");
  }
  formPreguntaOpcionDosMatriz:FormGroup;
  get OpcionDosMatriz_idOpcionDosMatriz(){
    return this.formPreguntaOpcionDosMatriz.get("_idOpcionDosMatriz");
  }
  get OpcionDosMatriz_idOpcionDosMatrizEncriptado(){
    return this.formPreguntaOpcionDosMatriz.get("_idOpcionDosMatrizEncriptado");
  }
  get OpcionDosMatriz_idPreguntaEncriptado(){
    return this.formPreguntaOpcionDosMatriz.get("_idPreguntaEncriptado");
  }
  get OpcionDosMatriz_descripcion(){
    return this.formPreguntaOpcionDosMatriz.get("_descripcion");
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

  _listaOpcionUnoMatriz:any[]=[];
  _consultarOpcionUnoMatriz(){
    this.preguntaMatrizService._consultarOpcionUnoPreguntaMatriz(this.item.IdPreguntaEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaOpcionUnoMatriz=data['respuesta'];
          
        } else {
          
        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }
  _insertarOpcionUnoMatriz(){
    this.preguntaMatrizService._insertarOpcionUnoPreguntaMatriz(
      this.item.IdPreguntaEncriptado,
      this.item.TipoPregunta.IdTipoPreguntaEncriptado,
      this.formPreguntaOpcionUnoMatriz.get("_descripcion").value
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this.formPreguntaOpcionDosMatriz.reset();
        this.formPreguntaOpcionUnoMatriz.reset();
        this._consultarOpcionUnoMatriz();
        this._consultarPreguntaConfigurarMatriz();
        this.formPreguntaOpcionUnoMatriz.get("_idPreguntaEncriptado").setValue(this.idPreguntaencriptada);
        this.formPreguntaOpcionDosMatriz.get("_idPreguntaEncriptado").setValue(this.idPreguntaencriptada);
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      } else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{

    }).finally(()=>{

    });
  }

  _listaPreguntaConfigurarMatriz:any[]=[];
  _PreguntaConfigurarMatriz:any[]=[];
  _consultarPreguntaConfigurarMatriz(){
    this.preguntaMatrizService._consultarPreguntaConfigurarMatriz(this.item.IdPreguntaEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this.datosMatriz.push({Observacion: data['respuesta1'].Observacion, leyendaSuperior: data['respuesta1'].leyendaSuperior, leyendaLateral: data['respuesta1'].leyendaLateral})
          this._PreguntaConfigurarMatriz = data['respuesta1'];
          this._listaPreguntaConfigurarMatriz=data['respuesta'];
          this._vistaPreguntaConfigurarMatriz();

          this.ObservacionGeneral=this.datosMatriz[0].Observacion;
          this.LeyendaSuperiorGeneral=this.datosMatriz[0].leyendaSuperior;
          this.LeyendaLateralGeneral=this.datosMatriz[0].leyendaLateral;
        } else {
        }
      }).catch(error=>{
      }).finally(()=>{
        this._vistaPreguntaConfigurarMatriz();
      });
  }

  _insertarPreguntaConfigurarMatriz(){
      
      this.preguntaMatrizService._insertarPreguntaConfigurarMatriz(
        this.item.IdPreguntaEncriptado,
        this.formPreguntaOpcionDosMatriz.get("_descripcion").value
      ).then(data=>{
        if (data['http']['codigo']=='200') {
          this.formPreguntaOpcionDosMatriz.reset();
          this.formPreguntaOpcionUnoMatriz.reset();
          this._consultarOpcionUnoMatriz();
          this._consultarPreguntaConfigurarMatriz();
          this.formPreguntaOpcionUnoMatriz.get("_idPreguntaEncriptado").setValue(this.idPreguntaencriptada);
          this.formPreguntaOpcionDosMatriz.get("_idPreguntaEncriptado").setValue(this.idPreguntaencriptada);
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else{
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error=>{

      }).finally(()=>{
        this._vistaPreguntaConfigurarMatriz()
      });
  }

  FilaOpcionUnoMatriz: any[] = [];
  ColumnsOpcionDosMatriz: any[] = [];
  _vistaPreguntaConfigurarMatriz(){
    this._listaPreguntaConfigurarMatriz.map((element,index)=>{
      this.FilaOpcionUnoMatriz.push(element.OpcionUnoMatriz);
    });
    let unicosOpcionUno = [ ];
    
    this.FilaOpcionUnoMatriz.map((element,index)=>{
      let x= unicosOpcionUno.find(data=>data.IdOpcionUnoMatrizEncriptado===element.IdOpcionUnoMatrizEncriptado);
      if (unicosOpcionUno.indexOf( x ) == -1){
        unicosOpcionUno.push(element);
      }
    });

    this.FilaOpcionUnoMatriz = unicosOpcionUno;
    this._listaPreguntaConfigurarMatriz.map((element,index)=>{
      this.ColumnsOpcionDosMatriz.push(element.OpcionDosMatriz);
    });

    let unicosOpcionDos = [ ];

    this.ColumnsOpcionDosMatriz.map((element,index)=>{
      let x= unicosOpcionDos.find(data=>data.IdOpcionDosMatrizEncriptado===element.IdOpcionDosMatrizEncriptado);
      if (unicosOpcionDos.indexOf( x ) == -1){
        unicosOpcionDos.push(element);
      }
    });
 
    this.ColumnsOpcionDosMatriz = unicosOpcionDos;
    
  }
  _eliminarPreguntaOpcionDos(_item){
    
    this.preguntaMatrizService._eliminarPreguntaMatrizOpcionDos(_item.IdOpcionDosMatrizEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this.FilaOpcionUnoMatriz=[];
          this.ColumnsOpcionDosMatriz=[];
          this._consultarOpcionUnoMatriz();
          this._consultarPreguntaConfigurarMatriz();
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else{
          
        }
      }).catch(error=>{

      }).finally(()=>{
        
      });
  }

  _eliminarPreguntaOpcionUno(_item){
    this.preguntaMatrizService._eliminarPreguntaMatrizOpcionUno(_item.IdOpcionUnoMatrizEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this.FilaOpcionUnoMatriz=[];
          this.ColumnsOpcionDosMatriz=[];
          this._consultarOpcionUnoMatriz();
          this._consultarPreguntaConfigurarMatriz();
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else{
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error=>{

      }).finally(()=>{
        this._consultarOpcionUnoMatriz();
        this._consultarPreguntaConfigurarMatriz();
      });
  }

}
