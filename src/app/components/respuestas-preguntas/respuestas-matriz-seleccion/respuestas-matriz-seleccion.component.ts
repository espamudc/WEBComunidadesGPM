import { Component,AfterViewInit, OnInit, Input, ViewChild ,ViewChildren,ElementRef} from '@angular/core';
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
export class RespuestasMatrizSeleccionComponent implements OnInit,AfterViewInit{

  op:any;
  ObservacionGeneral: any;
  LeyendaSuperiorGeneral: any;
  LeyendaLateralGeneral: any;
  datosMatriz: Array <PresentarDatosMatriz>=[];
  constructor(
    private snackBarComponent: MatSnackBar,
    private preguntaMatrizService:PreguntaMatrizService,
    private element: ElementRef
  ) {
  }
  idPreguntaencriptada="";
  listaRespuesta : any[]=[];
  ngAfterViewInit(){
  }
  ngOnInit() {
    this._consultarPreguntaConfigurarMatriz();
    this.idPreguntaencriptada = this.item.IdPreguntaEncriptado;
    this.listaRespuesta= this.item['ListaRespuestas'];
  }
  getElemtn(id:string,value:any){
    if(document.getElementById(id)!=null){
      (<HTMLInputElement>document.getElementById(id)).innerText =value;
    }
  }
  private delay(ms: number)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  loadingMatriz = false;
  async asignarRespuesta(){
    this.loadingMatriz = true;
    for (let index = 0; index < this.item['ListaRespuestas'].length; index++) {
      await this.delay(2000);
      this.getElemtn(this.item['ListaRespuestas'][index]['DescripcionRespuestaAbierta'],this.item['ListaRespuestas'][index]['VecesRepetidas']);
    }
    this.loadingMatriz = false;
  }
  @Input() item :any ={};
  Columns: string[] = ['descripcion', 'acciones'];


  _listaPreguntaConfigurarMatriz:any[]=[];
  _PreguntaConfigurarMatriz:any[]=[];
  async _consultarPreguntaConfigurarMatriz()
  {
    var respuesta = await this.preguntaMatrizService._consultarPreguntaConfigurarMatriz(this.item.IdPreguntaEncriptado);
    if (respuesta['http']['codigo']=='200') {
      this.datosMatriz.push({Observacion: respuesta['respuesta1'].Observacion, leyendaSuperior: respuesta['respuesta1'].leyendaSuperior, leyendaLateral: respuesta['respuesta1'].leyendaLateral})
      this._PreguntaConfigurarMatriz = respuesta['respuesta1'];
      this.op =this._PreguntaConfigurarMatriz['campo_observacion'];
      this._listaPreguntaConfigurarMatriz=respuesta['respuesta'];
      this._vistaPreguntaConfigurarMatriz();
      this.ObservacionGeneral=this.datosMatriz[0].Observacion;
      this.LeyendaSuperiorGeneral=this.datosMatriz[0].leyendaSuperior;
      this.LeyendaLateralGeneral=this.datosMatriz[0].leyendaLateral;
    } else {
    }
    //this._vistaPreguntaConfigurarMatriz();
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
    this.asignarRespuesta();
    // if(document.getElementById('Flora,Alto')!=null){
    //   document.getElementById('Flora,Alto').value="2";
    // }
  }



}
