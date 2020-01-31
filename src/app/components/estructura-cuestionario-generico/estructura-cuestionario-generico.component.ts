import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import { MatSnackBar, MatTable, MatTableDataSource, MatDialog } from '@angular/material';
import { CuestionarioGenericoService } from 'src/app/services/cuestionario-generico.service';
import { ComponenteCuestionarioGenericoService } from 'src/app/services/componente-cuestionario-generico.service';

@Component({
  selector: 'app-estructura-cuestionario-generico',
  templateUrl: './estructura-cuestionario-generico.component.html',
  styleUrls: ['./estructura-cuestionario-generico.component.css']
})
export class EstructuraCuestionarioGenericoComponent implements OnInit {

  constructor(
    private snackBarComponent: MatSnackBar,
    private cuestionarioGenericoService:CuestionarioGenericoService,
    private componenteCuestionarioGenericoService:ComponenteCuestionarioGenericoService
  ) {

    this.formComponenteCuestionarioGenerico = new FormGroup({
      _idComponenteEncriptado : new FormControl(''),
      _idCuestionarioGenericoEncriptado : new FormControl('',[Validators.required]),
      _descripcion : new FormControl('',[Validators.required]),
      _orden : new FormControl('',[Validators.required])
    });

   }

  formComponenteCuestionarioGenerico:FormGroup;
  formSeccionComponenteCuestionarioGenerico:FormGroup;
  formPreguntaSeccionComponenteCuestionarioGenerico:FormGroup;

  //---------------formComponenteCuestionarioGenerico----------------------------------------------
  get _idComponenteEncriptado(){
    return this.formComponenteCuestionarioGenerico.get("_idComponenteEncriptado");
  }
  get _idCuestionarioGenericoEncriptado(){
    return this.formComponenteCuestionarioGenerico.get("_idCuestionarioGenericoEncriptado");
  }
  get _descripcion(){
    return this.formComponenteCuestionarioGenerico.get("_descripcion");
  }
  get _orden(){
    return this.formComponenteCuestionarioGenerico.get("_orden");
  }
  //---------------formSeccionComponenteCuestionarioGenerico----------------------------------------------
  //---------------formPreguntaSeccionComponenteCuestionarioGenerico----------------------------------------------
  //-------------------------------------------------------------

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

  ngOnInit() {
    this._cargarMisCuestionariosGenericos();
  }

  _listaCuestionariosGenericos:any[]=[];
  _cargarMisCuestionariosGenericos(){
    // console.log(localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado'));
    
    this.cuestionarioGenericoService._consultarCuestionarioGeneriocoPorIdAsignarUsuarioTipoUsuarioEncriptado(
      localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado')
    )
      .then(data=>{
        if (data['http']['codigo']=='200') {
          // console.log(data['respuesta']);
          // debugger
          this._listaCuestionariosGenericos = data['respuesta'];
          // data['respuesta'].map(item=>{
          //   console.log(item.CuestionarioGenerico);
          //   this._listaCuestionariosGenericos.push(item.CuestionarioGenerico);
          //   // this._listaCuestionariosGenericos.push(item['CuestionarioGenerico']);
          // });
          console.log(this._listaCuestionariosGenericos);
          
          // console.log(data['http']['codigo']);
          
        }else{
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error=>{

      }).finally(()=>{
        //this.MatTableCuestionariosGenericos.renderRows();
      });
  }

  _onChangeCmbCuestionariosGenericos(event?){
    console.log(event.value);
    this._consultarComponentesDeCuestionario(event.value);
  }
  _onChangeCmbComponentesCuestionarioGenerico(event?){

  }

  _listaComponentesCuestionarioGenerico:any[]=[];
  _consultarComponentesDeCuestionario(_IdCuestionarioGenericoEncriptado){
    this.componenteCuestionarioGenericoService._consultarComponentesDeCuestionario(_IdCuestionarioGenericoEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaComponentesCuestionarioGenerico= data['respuesta'];
          console.log(this._listaComponentesCuestionarioGenerico);
          
        }else{
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  _listaSeccionesComponenteCuestionarioGenerico:any[]=[];
  _consultarSeccionesDeComponenteDeCuestionario(_IdComponente){

  }
  

}
