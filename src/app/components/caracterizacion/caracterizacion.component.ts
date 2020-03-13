import { Component, OnInit } from '@angular/core';
import { CuestionarioGenericoService } from 'src/app/services/cuestionario-generico.service';
import { ComponenteCuestionarioGenericoService } from 'src/app/services/componente-cuestionario-generico.service';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
@Component({
  selector: 'app-caracterizacion',
  templateUrl: './caracterizacion.component.html',
  styleUrls: ['./caracterizacion.component.css']
})
export class CaracterizacionComponent implements OnInit {

  constructor(
    private cuestionarioGenericoService :CuestionarioGenericoService,
    private componenteCuestionarioGenericoService : ComponenteCuestionarioGenericoService,
  ) { 
    this.formCaracterizacion = new FormGroup({
      _nombre  : new FormControl('',[Validators.required]),
      _descripcion            : new FormControl('',[Validators.required]),
      _cmbCuestionario : new FormControl('',[Validators.required]),
    });
  }
  formCaracterizacion : FormGroup;
  tablaComponentes = ['componente', 'acciones'];
  tablaComponentesAccordion = ['tipoelemento','obligatorio', 'acciones'];
  _listaCuestionariosGenericos : any[]=[];
  _listaComponentesCuestionarioGenerico:any[]=[];
  _listaSeccionesComponenteCuestionarioGenerico:any[]=[];
  _listaPreguntasSeccionComponenteCuestionarioGenerico : any[]=[];
  _listaPreguntasSeccionComponenteCuestionarioGenerico2 :  any[]=[];
  
  get formCaracterizacion_Nombre(){
    return this.formCaracterizacion.get("_nombre");
  }
  get formCaracterizacion_Descripcion(){
    return this.formCaracterizacion.get("_descripcion");
  }
  get formEncajonarPregunta_cmbCuestionario(){
    return this.formCaracterizacion.get('_cmbCuestionario');
  }
 


  _cargarMisCuestionariosGenericos(){
    // console.log(localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado'));
    // this._listaCuestionariosGenericos=null;

    this.cuestionarioGenericoService._consultarCuestionarioGeneriocoPorIdAsignarUsuarioTipoUsuarioEncriptado(
      localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado')
    )
      .then(data=>{
        if (data['http']['codigo']=='200') {
          // console.log(data['respuesta']);
          // 
          this._listaCuestionariosGenericos = data['respuesta'];
          // data['respuesta'].map(item=>{
          //   console.log(item.CuestionarioGenerico);
          //   this._listaCuestionariosGenericos.push(item.CuestionarioGenerico);
          //   // this._listaCuestionariosGenericos.push(item['CuestionarioGenerico']);
          // });
          //console.log("lista",this._listaCuestionariosGenericos);
          
          // console.log(data['http']['codigo']);
          
        }
        // else if (data['http']['codigo']=='500') {
        //   this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        // }else{
        //   this.mensaje(data['http']['mensaje']);
        // }
      }).catch(error=>{

      }).finally(()=>{
        //this.MatTableCuestionariosGenericos.renderRows();
      });
  }

  _onChangeCmbCuestionariosGenericos(event?){

    this._listaComponentesCuestionarioGenerico = null;
    this._listaSeccionesComponenteCuestionarioGenerico = null;
    this._listaPreguntasSeccionComponenteCuestionarioGenerico = null;
    this._listaPreguntasSeccionComponenteCuestionarioGenerico2 = null;
    if (event.value=='0') {
      
    } else {
      this._consultarComponentesDeCuestionario(event.value);
    }
  }

 _consultarComponentesDeCuestionario(_IdCuestionarioGenericoEncriptado){
  this.componenteCuestionarioGenericoService._consultarComponentesDeCuestionario(_IdCuestionarioGenericoEncriptado)
    .then(data=>{
      if (data['http']['codigo']=='200') {
        this._listaComponentesCuestionarioGenerico= data['respuesta'];
        //console.log(this._listaComponentesCuestionarioGenerico);
      }
    }).catch(error=>{

    }).finally(()=>{

    });
  }



  ngOnInit() {
    this._cargarMisCuestionariosGenericos();
  }

}
