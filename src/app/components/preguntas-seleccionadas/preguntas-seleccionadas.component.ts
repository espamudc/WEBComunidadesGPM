import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuestionarioGenericoService } from 'src/app/services/cuestionario-generico.service';
import { CabeceraVersionCuestionarioService } from 'src/app/services/cabecera-version-cuestionario.service';
import { PreguntaSeccionComponenteCuestionarioGenericoService } from 'src/app/services/pregunta-seccion-componente-cuestionario-generico.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-preguntas-seleccionadas',
  templateUrl: './preguntas-seleccionadas.component.html',
  styleUrls: ['./preguntas-seleccionadas.component.css']
})
export class PreguntasSeleccionadasComponent implements OnInit {
  constructor(
    private cuestionarioGenericoService :CuestionarioGenericoService,
    private cabeceraVersionCuestionarioService:CabeceraVersionCuestionarioService,
    private preguntasCuestionarioGenericoService:PreguntaSeccionComponenteCuestionarioGenericoService,
    private snackBarComponent:MatSnackBar,
    private router: Router
  ) { 
    this.formCuestionarioGenericoVersion = new FormGroup({
    _cmbCuestionario : new FormControl('',[Validators.required]),
    _idCabeceraVersionCuestionario : new FormControl(''),
    _idAsignarResponsableEncriptado : new FormControl('',[Validators.required]),
    _caracteristica : new FormControl(''),
    _version : new FormControl('',[Validators.min(1)]),
    _fechaCreacion : new FormControl(''),
    _estado : new FormControl('')
  }); }
  tipoUsurio='';
  ngOnInit() {
    this.tipoUsurio= localStorage.getItem('IdTipoUsuarioEncriptado');
    if(this.tipoUsurio!='MQA='){
      this.router.navigateByUrl("/inicio/inicio");
    }
    if(this.tipoUsurio==''){
      this.router.navigateByUrl("/login");
    }
    this._cargarMisCuestionariosGenericos();
  }
  formCuestionarioGenericoVersion:FormGroup;
  get formCuestionarioGenericoVersion_cmbCuestionario(){
    return this.formCuestionarioGenericoVersion.get("_cmbCuestionario");
  }
  get formCuestionarioGenericoVersion_caracteristica(){
    return this.formCuestionarioGenericoVersion.get("_caracteristica");
  }
  get formCuestionarioGenericoVersion_version(){
    return this.formCuestionarioGenericoVersion.get("_version");
  }
  get formCuestionarioGenericoVersion_idAsignarResponsableEncriptado(){
    return this.formCuestionarioGenericoVersion.get("_idAsignarResponsableEncriptado");
  }
  _listaCuestionariosGenericos:any[]=[];
  _listaVersionesCuestionario:any[]=[];
  Columns=['descripcion','tipo','acciones'];
  _cargarMisCuestionariosGenericos(){
    this.cuestionarioGenericoService._consultarCuestionarioGeneriocoPorIdAsignarUsuarioTipoUsuarioEncriptado(
      localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado')
    )
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaCuestionariosGenericos=[];
          this._listaCuestionariosGenericos = data['respuesta'];
        }
      })
  }
  _onChangeCmbCuestionariosGenericos(event){
    if (event.value==0) {
    } else {
      const obj=  this._listaCuestionariosGenericos.find(data=>data.CuestionarioGenerico.IdCuestionarioGenericoEncriptado===event.value);
      const index = this._listaCuestionariosGenericos.indexOf(obj);
      this.formCuestionarioGenericoVersion_idAsignarResponsableEncriptado.setValue(obj.IdAsignarResponsableEncriptado);
    }
    this._consultarPreguntasCuestionario(event.value);
  }
  _consultarPreguntasCuestionario(_idCuestionarioEncriptado){
    this.preguntasCuestionarioGenericoService._consultarPreguntasCuestionario(_idCuestionarioEncriptado)
    .then(data=>{
      if (data['http']['codigo']=='200') {
        this._listaVersionesCuestionario=data['respuesta'];
      }
    })
  }
  _seleccionarPreguntas(_item){
    this.preguntasCuestionarioGenericoService._seleccionarPreguntas(_item.IdPreguntaEncriptado)
      .then(data=>{
        this._consultarPreguntasCuestionario(_item.Seccion.Componente.CuestionarioGenerico.IdCuestionarioGenericoEncriptado);
      }).catch(error=>{
      })
  }

}
