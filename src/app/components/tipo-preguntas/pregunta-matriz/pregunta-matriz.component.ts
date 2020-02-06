import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

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

@Component({
  selector: 'app-pregunta-matriz',
  templateUrl: './pregunta-matriz.component.html',
  styleUrls: ['./pregunta-matriz.component.css']
})
export class PreguntaMatrizComponent implements OnInit {

  constructor() {
    this.formPreguntaOpcionUnoMatriz = new FormGroup({
      _idOpcionUnoMatriz : new FormControl(''),
      _idOpcionUnoMatrizEncriptado : new FormControl(''),
      _idPreguntaEncriptado : new FormControl('',[Validators.required]),
      _descripcion : new FormControl('',[Validators.required]),
    });
    this.formPreguntaOpcionDosMatriz = new FormGroup({
      _idOpcionDosMatriz : new FormControl(''),
      _idOpcionDosMatrizEncriptado : new FormControl(''),
      _idPreguntaEncriptado : new FormControl('',[Validators.required]),
      _descripcion : new FormControl('',[Validators.required]),
    });
  }

  ngOnInit() {
  }

  @Input() item :any ={};

  Columns: string[] = ['descripcion', 'orden', 'acciones'];


  formPreguntaOpcionUnoMatriz:FormGroup;
  //------------------------------------------------------------------------------
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
  //-------------------------------------------------------------------------------
  formPreguntaOpcionDosMatriz:FormGroup;
  //-------------------------------------------------------------------------------
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
  //-------------------------------------------------------------------------------
  


}
