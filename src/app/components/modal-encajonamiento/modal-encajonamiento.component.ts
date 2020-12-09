import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatTable } from '@angular/material';
import { PreguntaSeccionComponenteCuestionarioGenericoService } from 'src/app/services/pregunta-seccion-componente-cuestionario-generico.service';
import { PreguntaEncajonarService } from 'src/app/services/pregunta-encajonar.service';
import { PreguntaSeleccionService } from 'src/app/services/tipo-preguntas/pregunta-seleccion.service';
import { EstructuraCuestionarioGenericoComponent} from '../estructura-cuestionario-generico/estructura-cuestionario-generico.component';

@Component({
  selector: 'app-modal-encajonamiento',
  templateUrl: './modal-encajonamiento.component.html',
  styleUrls: ['./modal-encajonamiento.component.css']
})
export class ModalEncajonamientoComponent implements OnInit {
  @ViewChild(EstructuraCuestionarioGenericoComponent,{ static: false }) hijo: EstructuraCuestionarioGenericoComponent;
  constructor(
    private snackBarComponent: MatSnackBar,
    private preguntaService: PreguntaSeccionComponenteCuestionarioGenericoService,
    private preguntaSeleccionService:PreguntaSeleccionService,
    private preguntaEncajonarService:PreguntaEncajonarService,
 
    public dialogRef: MatDialogRef<ModalEncajonamientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { this.formEncajonarPregunta = new FormGroup({
    _idPreguntaEncriptado : new FormControl(''),
    _idTipoPreguntaEncriptado : new FormControl(''),
    _idSeccionEncriptado : new FormControl(''),
    _descripcion : new FormControl(''),
    _obligatorio : new FormControl(''),
    _orden : new FormControl(''),
    _estado : new FormControl(''),

    _cmbCuestionario : new FormControl('',[Validators.required]),
    _cmbComponente : new FormControl('',[Validators.required]),
    _cmbSeccion : new FormControl('',[Validators.required]),
    _cmbPregunta : new FormControl('',[Validators.required]),
    _cmbPreguntaEncajonada : new FormControl('',[Validators.required]),

  });}
  preguntaseleccion:any = [];
  ngOnInit() {
    this.preguntaseleccion = this.data._seleccion;
    this._pregunta_consultarpornoencajonadasporopcionpreguntaseleccion(this.data._seleccion.IdOpcionPreguntaSeleccionEncriptado);
    this._consultarPreguntasEncajonadas(this.data._seleccion);
    
  }

  Columns: string[] = ['OP', 'Descripcion', 'Acciones'];

  formEncajonarPregunta: FormGroup;

  get formEncajonarPregunta_cmbPreguntaEncajonada(){
    return this.formEncajonarPregunta.get('_cmbPreguntaEncajonada');
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

  _listaPreguntasSeccionComponenteCuestionarioGenerico2:any[]=[];
  _pregunta_consultarpornoencajonadasporopcionpreguntaseleccion(_idOpcionPreguntaSeleccionEncriptado){
    this.preguntaService._pregunta_consultarpornoencajonadasporopcionpreguntaseleccion(_idOpcionPreguntaSeleccionEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
                    
          this._listaPreguntasSeccionComponenteCuestionarioGenerico2 = data['respuesta'];        
        } else {
           
        }
      }).catch(error=>{
        console.log(error);
        
      }).finally(()=>{

      });
  }

  _onChangeCmbEncajonar(event?){
    //this._listaPreguntasSeccionComponenteCuestionarioGenerico2 = null;
    if (event.value=='0') {
      
    } else {
      this._insertarPreguntaEncajonada(this.preguntaseleccion);
      //console.log("ENCAJONADA",this.preguntaseleccion.Pregunta.Seccion.IdSeccionEncriptado);
      //this.hijo._MetodSeccionComponentesCuestionarioGenerico(this.preguntaseleccion.Pregunta.Seccion.IdSeccionEncriptado);
      

       
    }
   

 }

 _listaPreguntaEncajonadas:any[]=[];
 _consultarPreguntasEncajonadas(_item){
   this._pregunta_consultarpornoencajonadasporopcionpreguntaseleccion(_item.IdOpcionPreguntaSeleccionEncriptado);
   this.preguntaEncajonarService._preguntaencajonada_consultarporidopcionpreguntaseleccion(_item.IdOpcionPreguntaSeleccionEncriptado)
     .then(data=>{
       if (data['http']['codigo']=='200') {
         this._listaPreguntaEncajonadas = data['respuesta'];         
       }
     }).catch(error=>{

     }).finally(()=>{

     });
 }

 _consultarPreguntasEncajonadas2(_item){
  this._pregunta_consultarpornoencajonadasporopcionpreguntaseleccion(_item.OpcionPreguntaSeleccion.IdOpcionPreguntaSeleccionEncriptado);
  this.preguntaEncajonarService._preguntaencajonada_consultarporidopcionpreguntaseleccion(_item.OpcionPreguntaSeleccion.IdOpcionPreguntaSeleccionEncriptado)
    .then(data=>{
      if (data['http']['codigo']=='200') {
        this._listaPreguntaEncajonadas = data['respuesta'];        
      }
    }).catch(error=>{

    }).finally(()=>{

    });
}

 _listaOpcionesPreguntaSeleccion:any[]=[];
 _consultarPreguntasSeleccion(element?){
   if(element.Pregunta.TipoPregunta.Identificador == 2){
      this.preguntaSeleccionService._consultarOpcionPreguntaSeleccion(
        element.Pregunta.IdPreguntaEncriptado
      ).then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaOpcionesPreguntaSeleccion = data['respuesta'];
        }else{

        }
      }).catch(error=>{

      }).finally(()=>{

      });
   }else{
    this._listaOpcionesPreguntaSeleccion = [];
   }
 }

 _insertarPreguntaEncajonada(_item){
    
  //let element = this._listaPreguntaEncajonadas.find(i=>i.Pregunta.IdPreguntaEncriptado==this.formEncajonarPregunta_cmbPreguntaEncajonada.value);
  //let index = this._listaPreguntaEncajonadas.indexOf(element);
 
  if (this._listaPreguntaEncajonadas.length==0) {
    this.preguntaEncajonarService._preguntaencajonada_insertar(
      _item.IdOpcionPreguntaSeleccionEncriptado,
      this.formEncajonarPregunta_cmbPreguntaEncajonada.value
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarPreguntasEncajonadas(_item);
        
        this._listaPreguntaEncajonadas.push(data['respuesta']);
        
      } else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{
      console.log(error);
      this.mensaje(error);
      
    }).finally(()=>{
      this.preguntaService.refresh$.emit();
      
    });
  } else {
    this.mensaje("La pregunta ya ha sido encajonada");
  }
  
}

preparaItem="";
eliminarEncajonamiento(_item){
  this.preparaItem=_item;
  this.preguntaEncajonarService._preguntaencajonada_eliminar(_item.IdPreguntaEncajonadaEncriptado)
    .then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarPreguntasEncajonadas2(_item);
        
      } else {
        
      }
    }).catch(error=>{

    }).finally(()=>{
      this.preguntaService.refresh$.emit();
    });
    
}

}
