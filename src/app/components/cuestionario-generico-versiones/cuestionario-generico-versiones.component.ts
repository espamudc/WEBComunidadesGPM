import { Component, OnInit } from '@angular/core';
import { CuestionarioGenericoService } from 'src/app/services/cuestionario-generico.service';
import { CabeceraVersionCuestionarioService } from 'src/app/services/cabecera-version-cuestionario.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalCuestionarioGenericoVersionDetalleComponent } from '../modal-cuestionario-generico-version-detalle/modal-cuestionario-generico-version-detalle.component';

@Component({
  selector: 'app-cuestionario-generico-versiones',
  templateUrl: './cuestionario-generico-versiones.component.html',
  styleUrls: ['./cuestionario-generico-versiones.component.css']
})
export class CuestionarioGenericoVersionesComponent implements OnInit {

  constructor(
    private cuestionarioGenericoService :CuestionarioGenericoService,
    private cabeceraVersionCuestionarioService:CabeceraVersionCuestionarioService,

    private snackBarComponent:MatSnackBar,
    private cuestionario_generico_detalle_modalController:MatDialog,
  ) {

    this.formCuestionarioGenericoVersion = new FormGroup({
      _cmbCuestionario : new FormControl('',[Validators.required]),
      _idCabeceraVersionCuestionario : new FormControl(''),
      _idAsignarResponsableEncriptado : new FormControl('',[Validators.required]),
      _caracteristica : new FormControl(''),
      _version : new FormControl('',[Validators.min(1)]),
      _fechaCreacion : new FormControl(''),
      _estado : new FormControl('')
    });

  }

  ngOnInit() {
    this._cargarMisCuestionariosGenericos();
  }
  //---------------------------------------------------------------------------------------
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
  //----------------------------------------------------------------------------------------
  _listaCuestionariosGenericos:any[]=[];
  _listaVersionesCuestionario:any[]=[];
  Columns=['caracteristica','version','fecha_creacion','acciones'];

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

  _onChangeCmbCuestionariosGenericos(event){
    // this._consultarComponentesDeCuestionario(event.value);
    if (event.value==0) {

    } else {

      const obj=  this._listaCuestionariosGenericos.find(data=>data.CuestionarioGenerico.IdCuestionarioGenericoEncriptado===event.value);
      const index = this._listaCuestionariosGenericos.indexOf(obj);

      this.formCuestionarioGenericoVersion_idAsignarResponsableEncriptado.setValue(obj.IdAsignarResponsableEncriptado);
      //console.log("idAsignarResponsable:",this.formCuestionarioGenericoVersion_idAsignarResponsableEncriptado.value);

    }
    this._consultarCabeceraVersionCuestionario(event.value);

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
          this._listaCuestionariosGenericos=[];
          this._listaCuestionariosGenericos = data['respuesta'];
          console.log("mis cuestionarios",this._listaCuestionariosGenericos);


          //console.log("lista",this._listaCuestionariosGenericos);


          
        }

      }).catch(error=>{

      }).finally(()=>{

        //this.MatTableCuestionariosGenericos.renderRows();
      });
  }

  _consultarCabeceraVersionCuestionario(_idCuestionarioEncriptado){

    this.cabeceraVersionCuestionarioService._consultarCabeceraVersionCuestionario(_idCuestionarioEncriptado)
    .then(data=>{
      if (data['http']['codigo']=='200') {
        this._listaVersionesCuestionario=data['respuesta'];
      }

      //console.log("cabecera:", data);

    }).catch(error=>{

    }).finally(()=>{

    });
  }

  _insertarCabeceraVersionCuestionario(){
    this.cabeceraVersionCuestionarioService._insertarCabeceraVersionCuestionario(
      this.formCuestionarioGenericoVersion_idAsignarResponsableEncriptado.value,
      this.formCuestionarioGenericoVersion_caracteristica.value,
      this.formCuestionarioGenericoVersion_version.value
    ).then(data=>{
      if (data['http']['codigo']=="500") {
        this.mensaje(data['http']['mensaje']);
      } else if(data['http']['codigo']=="200") {
        this._consultarCabeceraVersionCuestionario(this.formCuestionarioGenericoVersion_cmbCuestionario.value);
        // this.mensaje("Cuestionario versionado correctamente");
      }else{
        this.mensaje(data['http']['mensaje'],3000,0,'primary');
      }
    }).catch(error=>{

    }).finally(()=>{})
  }

  _eliminarCabeceraVersionCuestionario(_item){
    //console.log(_item);

    this.cabeceraVersionCuestionarioService._eliminarCabeceraVersionCuestionario(_item.IdCabeceraVersionCuestionarioEncriptado)
      .then(data=>{
        this._consultarCabeceraVersionCuestionario(_item.AsignarResponsable.CuestionarioGenerico.IdCuestionarioGenericoEncriptado)
      }).catch(error=>{

      }).finally(()=>{

      });
  }

  _verModalDetalle(_item){
    this.cuestionario_generico_detalle_modalController.open(ModalCuestionarioGenericoVersionDetalleComponent,{
      width:'auto',
      height:'50%',
      data: _item
    });
  }

  _validarForm(){

    this._insertarCabeceraVersionCuestionario();
  }

}
