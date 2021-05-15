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
  selector: 'app-respuestas-matriz-seleccion',
  templateUrl: './respuestas-matriz-seleccion.component.html',
  styleUrls: ['./respuestas-matriz-seleccion.component.css']
})
export class RespuestasMatrizSeleccionComponent implements OnInit {

  op:any;
  ObservacionGeneral: any;
  LeyendaSuperiorGeneral: any;
  LeyendaLateralGeneral: any;
  datosMatriz: Array <PresentarDatosMatriz>=[];
  constructor(
    private snackBarComponent: MatSnackBar,
    private preguntaMatrizService:PreguntaMatrizService
  ) {
  }
  idPreguntaencriptada="";

  ngOnInit() {
    this._consultarPreguntaConfigurarMatriz();
    this.idPreguntaencriptada = this.item.IdPreguntaEncriptado;
  }

  @Input() item :any ={};
  Columns: string[] = ['descripcion', 'acciones'];


  _listaPreguntaConfigurarMatriz:any[]=[];
  _PreguntaConfigurarMatriz:any[]=[];
  _consultarPreguntaConfigurarMatriz(){
    this.preguntaMatrizService._consultarPreguntaConfigurarMatriz(this.item.IdPreguntaEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this.datosMatriz.push({Observacion: data['respuesta1'].Observacion, leyendaSuperior: data['respuesta1'].leyendaSuperior, leyendaLateral: data['respuesta1'].leyendaLateral})
          this._PreguntaConfigurarMatriz = data['respuesta1'];
          this.op =this._PreguntaConfigurarMatriz['campo_observacion'];
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



}
