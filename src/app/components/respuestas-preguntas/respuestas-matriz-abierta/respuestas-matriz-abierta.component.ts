import { Component, OnInit, Input } from '@angular/core';
import { PreguntaSeleccionService } from 'src/app/services/tipo-preguntas/pregunta-seleccion.service';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-respuestas-matriz-abierta',
  templateUrl: './respuestas-matriz-abierta.component.html',
  styleUrls: ['./respuestas-matriz-abierta.component.css']
})
export class RespuestasMatrizAbiertaComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private snackBarComponent: MatSnackBar,
    private preguntaSeleccionService:PreguntaSeleccionService) {
   }
  @Input() item : any={};

  ngOnInit() {
    this._consultarPreguntasSeleccion();
    this.estructurarRespuesta();
  }
  respuestas:any[];
  Columns: string[] = ['Respuestas'];
  estructurarRespuesta(){
    this.respuestas=[];
    this.item['ListaRespuestas'].map(items => {
      this.respuestas.push(items['DescripcionRespuestaAbierta'].split(','));
    });
  }
  _listaOpcionesPreguntaSeleccion:any[]=[];
  async _consultarPreguntasSeleccion(){
    var respuesta = await this.preguntaSeleccionService._consultarOpcionPreguntaSeleccion(
      this.item.IdPreguntaEncriptado
    );
    if (respuesta['http']['codigo']=='200') {
      this._listaOpcionesPreguntaSeleccion = respuesta['respuesta'];
    }else{
    }
  }
}
