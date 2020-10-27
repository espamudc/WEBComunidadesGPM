import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, Form, } from '@angular/forms';
import { Parroquia } from 'src/app/interfaces/parroquia/parroquia';
import { Comunidad } from 'src/app/interfaces/comunidad/comunidad';
import { PanelAdministracionService } from 'src/app/services/panel-administracion.service';
import { PersonaService } from 'src/app/services/persona.service';
import sweetalert from 'sweetalert';
import { ParroquiaComponent } from '../parroquia/parroquia.component';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { LugaresService } from 'src/app/services/lugares.service';
import { MatTable, MatDialog, MatSnackBar } from '@angular/material';
import { ModalLugarRepresentanteComponent } from '../modal-lugar-representante/modal-lugar-representante.component';
import { ModalVerImagenComponent } from '../modal-ver-imagen/modal-ver-imagen.component';
import { toBase64String } from '@angular/compiler-cli/node_modules/source-map/lib/base64';
import { encode } from 'punycode';
import { utf8Encode } from '@angular/compiler/src/util';


@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.css']
})
export class ComunidadComponent implements OnInit {

  filterParroquia: string;
  filteredParroquia: Observable<string[]>;
  control = new FormControl();
  parroquias: string[] = [];
  imgFile:File;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
 
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    private lugaresService:LugaresService,
    private modalLugarRepresentante:MatDialog,
    private modalVerImagen:MatDialog,
    private snackBarComponent:MatSnackBar,
    private router: Router
  ) {
    
  }

  tipoUsurio='';
  ngOnInit() {

    this.tipoUsurio= localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado');
    if(this.tipoUsurio==''){
      this.router.navigateByUrl("/login");
    }
    this._consultarParroquias();
    this._consultarComunidades();
    this.filtroParroquias();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filtroParroquias() {
    this.filteredParroquia = this.control.valueChanges.pipe(
      startWith(''),
      map(value => value.length >= 1 ? this._filter(value) : [])
    );
  }
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.parroquias.filter(parroquia => this._normalizeValue(parroquia).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent, nombre: any) {
    this._listaParroquias.forEach(element => {
      if (element.NombreParroquia == nombre) {
          this._nombreProvincia=element.Canton.Provincia.NombreProvincia;
          this._nombreCanton=element.Canton.NombreCanton;
          this._nombreParroquia=element.NombreParroquia;
          this._idCantonEncriptado=element.Canton.IdCantonEncriptado;
          this._idProvinciaEncriptado=element.Canton.Provincia.IdProvinciaEncriptado;
          this._idParroquiaEncriptado=element.IdParroquiaEncriptado;
      }
    });
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

  tablaComunidades = ['codigo','comunidad', 'parroquia','canton', 'acciones'];
  tablaParroquias = ['parroquia', 'acciones'];

  _idParroquiaEncriptado=""; _nombreParroquia=""; _listaParroquias:any[]=[];  _idCantonEncriptado=""; _nombreCanton="";  _idProvinciaEncriptado=""; _nombreProvincia="";// la Canton que se escoje

  _validar=true;
  _idComunidadEncriptado="";
  _codigoComunidad="";
  _nombreComunidad="";
  _descripcionComunidad="";
  _rutaLogoComunidad: File;

  _btnAccion="Guardar";

  @ViewChild('frmComunidad',{static:false}) frmComunidad:Form;
  @ViewChild(ParroquiaComponent,{static:false}) CantonComponent: ParroquiaComponent;

  _limpiarForm(){
    //----------Provincia--------------
    this._idProvinciaEncriptado ="";
    this._nombreProvincia ="";
    //----------Canton-----------------
    this._idCantonEncriptado = "";
    this._nombreCanton       = "";
    //----------Parroquia--------------
    this._idParroquiaEncriptado="";
    this._nombreParroquia ="";
    //---------------------------------
    this._idComunidadEncriptado="";
    this._codigoComunidad="";
    this._nombreComunidad="";
    this._descripcionComunidad="";
    this._rutaLogoComunidad=null;
    this.filterParroquia="";
    this.imageToUpload=null;
    this._btnAccion = "Guardar";
    this._validar = true;
  }

  _validarCompletos(event){
    if (event.target.value==="") {
      event.target.classList.add("is-invalid");
    }else{
      event.target.classList.remove("is-invalid");
    }

    if (
      this._codigoComunidad      !="" &&
      this._nombreComunidad      !="" &&
      this._nombreCanton   !=""
      // this._descripcionComunidad !="" &&
      // this._rutaLogoComunidad    !=""
    ) {
      this._validar=false;
    }else{
      this._validar=true;
    }

  }

  _validarBoton(){
    
    if (
      this._codigoComunidad      !="" &&
      this._nombreComunidad      !="" &&
      this._nombreParroquia      !="" &&
      this._nombreCanton         !="" &&
      this._nombreProvincia      !=""
      // this._descripcionComunidad !="" &&
      // this._rutaLogoComunidad    !=""
    ) {
      this._validar=false;
    }else{
      this._validar=true;
    }
  }

  _validarFormulario(){
    if (
      this._codigoComunidad      !="" &&
      this._nombreComunidad
      // this._descripcionComunidad !="" &&
      // this._rutaLogoComunidad    !=""
    ) {
      if (this._validar===false) {
        if (this._btnAccion==="Guardar") {
          this._ingresarComunidad();
        }else if (this._btnAccion==="Modificar") {
          this._modificarComunidad();
        }
      }

    }
  }


  _listaComunidades:any[]=[];
  _consultarComunidades(){
    //this.native_codigoComunidad.nativeElement.value;
    this.lugaresService._consultarComunidades()
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaComunidades=data['respuesta'];
          this.dataSource.data = this._listaComunidades;

        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else{
          console.log(data['http']);
        }
      })
      .catch(error=>{
        console.log(error);
      }).finally(()=>{

      });
  }

  onChange(event) {
    let file = event.srcElement.files;
    let postData = {field1:"field1", field2:"field2"}; // Put your form data variable. This is only example.
    console.log(event.base)
    this.postWithFile(event.baseUrl + "add-update",postData,file).then(result => {
        console.log(result);
    });
  }

  postWithFile (url: string, postData: any, files: File[]) {

    let headers = new Headers();
    let formData:FormData = new FormData();
    formData.append('files', files[0], files[0].name);
    // For multiple files
    // for (let i = 0; i < files.length; i++) {
    //     formData.append(`files[]`, files[i], files[i].name);
    // }

    if(postData !=="" && postData !== undefined && postData !==null){
      for (var property in postData) {
          if (postData.hasOwnProperty(property)) {
              formData.append(property, postData[property]);
          }
      }
    }
    var returnReponse = new Promise((resolve, reject) => {
      
    });
    return returnReponse;
  }

  uploadFile(event) {
    debugger
   this.imgFile = (event.target as HTMLInputElement).files[0];
   
  }
  imageToUpload:any;
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        this.imageToUpload = event.target.files[0];
   }
}
  _ingresarComunidad(){

    this.lugaresService._insertarComunidad(
      this._codigoComunidad,
      this._nombreComunidad,
      this._descripcionComunidad,
      this.imageToUpload,
      this._idParroquiaEncriptado,
      this._idCantonEncriptado,
      this._idProvinciaEncriptado,
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarComunidades();
        this._consultarParroquias();
        this._limpiarForm();
        
        this._validar=true;
        this._validarBoton();
        // this._validarFormulario();
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        console.log(data['http']);
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{

    }).finally(()=>{

    });
  }


  _modificarComunidad(){
      this.lugaresService._modificarComunidad(
      this._idComunidadEncriptado,
      this._codigoComunidad,
      this._nombreComunidad,
      this._descripcionComunidad,
      this.imageToUpload,
      this._idParroquiaEncriptado,
      this._idCantonEncriptado,
      this._idProvinciaEncriptado
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarComunidades();
        this._consultarParroquias();
        this._limpiarForm();
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        console.log(data['http']);
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{

    }).finally(()=>{

    });
  }

  _eliminarComunidad(_item){
    this.lugaresService._eliminarComunidad(
      _item.IdComunidadEncriptado
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarComunidades();
        this._consultarParroquias();
      }else if (data['http']['codigo']=='500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      }else{
        console.log(data['http']);
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error=>{

    }).finally(()=>{

    });
  }

  _ParroquiaQuitada:any="";
  _prepararComunidad(_item){
    //------------------Provincia--------------------------------------
    this._idProvinciaEncriptado = _item.Parroquia.Canton.Provincia.IdProvinciaEncriptado;
    this._nombreProvincia       = _item.Parroquia.Canton.Provincia.NombreProvincia;
     //------------------Canton----------------------------------------
    this._idCantonEncriptado = _item.Parroquia.Canton.IdCantonEncriptado;
    this._nombreCanton       = _item.Parroquia.Canton.NombreCanton;
    //------------------Parroquia----------------------------------------
    this._idParroquiaEncriptado = _item.Parroquia.IdParroquiaEncriptado;
    this._nombreParroquia       = _item.Parroquia.NombreParroquia;
    //---------------------------------------------------------
    this._idComunidadEncriptado =_item.IdComunidadEncriptado;
    this._codigoComunidad       =_item.CodigoComunidad;
    this._nombreComunidad       =_item.NombreComunidad;
    this._descripcionComunidad  =_item.DescripcionComunidad;
    if (this._descripcionComunidad=='null') {
      this._descripcionComunidad="";
    }
    this._rutaLogoComunidad     =_item.RutaLogoComunidad;
    this._btnAccion = "Modificar";
    this._validarBoton();
  }

  @ViewChild('MatTableParroquias',{static:false}) MatTableParroquias :MatTable<any>;
  _prepararParroquia(_item){
  
  //------------------Provincia--------------------------------------
    this._idProvinciaEncriptado = _item.Canton.Provincia.IdProvinciaEncriptado;
    this._nombreProvincia       = _item.Canton.Provincia.NombreProvincia;
     //------------------Canton----------------------------------------
    this._idCantonEncriptado    = _item.Canton.IdCantonEncriptado;
    this._nombreCanton       = _item.Canton.NombreCanton;
    //------------------Parroquia----------------------------------------
    this._idParroquiaEncriptado = _item.IdParroquiaEncriptado;
    this._nombreParroquia       = _item.NombreParroquia;
    //---------------------------------------------------------
  

    if (this._ParroquiaQuitada!="") {
      // this._consultarParroquias();
      this._listaParroquias.push(this._ParroquiaQuitada);

    }
    
    var obj = this._listaParroquias.find(dato=>dato.IdParroquiaEncriptado==_item.IdParroquiaEncriptado);
    console.log(obj);
    
    var index = this._listaParroquias.indexOf(obj);
    console.log(index);
    
    this._listaParroquias.splice(index,1);
    this._ParroquiaQuitada = _item;

    this.MatTableParroquias.dataSource = this._listaParroquias;
    // this._listaParroquias.sort();
    this.MatTableParroquias.renderRows();

  }

  _consultarParroquias(){
    //this.native_codigoParroquia.nativeElement.value;
    this.lugaresService._consultarParroquias()
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaParroquias=data['respuesta'];
          this.parroquias.length = 0;
          for (let index = 0; index < this._listaParroquias.length; index++) {
            this.parroquias.push(this._listaParroquias[index].NombreParroquia);
          }
          this.filtroParroquias();
        }else{
          console.log(data['http']);
        }
      })
      .catch(error=>{
        console.log(error);
      }).finally(()=>{
        // this._listaParroquias.sort();
      });
  }

  

  _verRepresentante(_item){
    let dialogRef = this.modalLugarRepresentante.open(ModalLugarRepresentanteComponent, {
      width: 'auto',
      height: 'auto',
      data: { lugar_tipo: 'comunidad', lugar_data: _item }
    });
    dialogRef.afterClosed().subscribe(result=>{
      // console.log(result);
      if (result) {
        
      }
    },error=>{

    },()=>{
      this._consultarComunidades();
    }); 
  }

  _verImagen(_item){
    let dialogRef = this.modalVerImagen.open(ModalVerImagenComponent, {
      width: 'auto',
      height: 'auto',
      data: { imagen: _item }
    });
    dialogRef.afterClosed().subscribe(result=>{
      // console.log(result);
      if (result) {
        
      }
    },error=>{

    },()=>{
      this._consultarComunidades();
    }); 
  }

}
