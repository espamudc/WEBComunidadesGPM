import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PreguntaSeleccionService } from 'src/app/services/tipo-preguntas/pregunta-seleccion.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-pregunta-archivo',
  templateUrl: './pregunta-archivo.component.html',
  styleUrls: ['./pregunta-archivo.component.css']
})
export class PreguntaArchivoComponent implements OnInit {

  constructor(
    private snackBarComponent: MatSnackBar,
    private preguntaSeleccionService:PreguntaSeleccionService) {
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
    console.log(this.item.IdPreguntaEncriptado);
    
    this._consultarPreguntasSeleccion();
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

  Columns: string[] = ['descripcion', 'orden', 'acciones'];
  
  _listaOpcionesPreguntaSeleccion:any[]=[];
  _consultarPreguntasSeleccion(){
    this.preguntaSeleccionService._consultarOpcionPreguntaSeleccion(
      this.item.IdPreguntaEncriptado
    ).then(data=>{
      if (data['http']['codigo']=='200') {
       
        
        this._listaOpcionesPreguntaSeleccion = data['respuesta'];
      }else{

      }
    }).catch(error=>{

    }).finally(()=>{

    });
  }

  _insertarPreguntaSeleccion(){
    this.preguntaSeleccionService._insertarOpcionPreguntaSeleccion(
      this.item.IdPreguntaEncriptado,
      this.item.TipoPregunta.IdTipoPreguntaEncriptado,
      this.formPreguntaTipoSeleccion.get("_descripcion").value
    ).then(data=>{
      
      if (data['http']['codigo']=="200") {
        this.formPreguntaTipoSeleccion.reset();
        this._consultarPreguntasSeleccion();
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{
      console.log(error);
      
    }).finally(()=>{});
  }
  _eliminarPreguntasSeleccion(_item){
    // this.preguntaSeleccionService
    this.preguntaSeleccionService._eliminarOpcionPreguntaSeleccion(_item.IdOpcionPreguntaSeleccionEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._consultarPreguntasSeleccion();
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else{
          this.mensaje(data['http']['mensaje'])
        }
      }).catch(error=>{}).finally(()=>{});
  }

}
