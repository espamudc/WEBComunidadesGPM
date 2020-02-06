import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pregunta-seleccion',
  templateUrl: './pregunta-seleccion.component.html',
  styleUrls: ['./pregunta-seleccion.component.css']
})
export class PreguntaSeleccionComponent implements OnInit {

  constructor() {
    this.formPreguntaTipoSeleccion = new FormGroup({
      _idPreguntaEncriptado: new FormControl(''),
      _idOpcionPreguntaSeleccion: new FormControl(''),
      _descripcion : new FormControl('',[Validators.required]),
    });
   }

   formPreguntaTipoSeleccion :FormGroup;

   get pregunta_seleccion_idPreguntaEncriptado(){
    return this.formPreguntaTipoSeleccion.get("_idPreguntaEncriptado");
  }
  get pregunta_seleccion_idOpcionPreguntaSeleccion(){
    return this.formPreguntaTipoSeleccion.get("_idOpcionPreguntaSeleccion");
  }
  get pregunta_seleccion_descripcion(){
    return this.formPreguntaTipoSeleccion.get("_descripcion");
  }

  @Input() item : any={};

  ngOnInit() {
  }
  Columns: string[] = ['descripcion', 'orden', 'acciones'];
  

}
