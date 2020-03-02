import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl, Form } from '@angular/forms';
import sweetalert from "sweetalert";

// Services
import { PersonaService } from "../../services/persona.service";

// Interfaces


// Functional Components
import { MatDialog } from "@angular/material/dialog";

// Components
import { ModalDetallePersonaComponent } from "src/app/components/modal-detalle-persona/modal-detalle-persona.component";
import { SexoService } from 'src/app/services/sexo.service';
import { TipoIdentificacionService } from 'src/app/services/tipo-identificacion.service';
import { LugaresService } from 'src/app/services/lugares.service';
import { MatTable, MatSnackBar, MatSnackBarConfig } from '@angular/material';
// import { MessageBoxComponent } from 'src/app/message-box/message-box.component';
// import { MessageBoxComponent } from 'src/app/message-box/message-box.component';
// import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit,AfterViewInit {

  // myForm: FormGroup;

  constructor(
    private lugaresService:LugaresService,
    private personaService: PersonaService,
    private sexoService:SexoService,
    private tipoIdentificacionService:TipoIdentificacionService,
    private dialog: MatDialog,
    // private messagebox : MessageBoxComponent,
    private snackBarComponent: MatSnackBar,
  ) 
  {
    this.formPersona  = new FormGroup({
      _idPersonaEncriptado    : new FormControl(''),
      _primerNombre           : new FormControl('',[Validators.required]),
      _segundoNombre          : new FormControl('',[Validators.required]),
      _primerApellido         : new FormControl('',[Validators.required]),
      _segundoApellido        : new FormControl('',[Validators.required]),
      _cmbTipoIdentificacion  : new FormControl('',[Validators.required]),
      _numeroIdentificacion   : new FormControl('',[Validators.required]),
      _cmbSexo                : new FormControl('',[Validators.required]),
      _telefono               : new FormControl(''),
      _cmbProvincia           : new FormControl('',[Validators.required]),
      _cmbCanton              : new FormControl('',[Validators.required]),
      _cmbParroquia           : new FormControl('',[Validators.required]),
      _direccion              : new FormControl('',[Validators.required])
    });
    //this.formPersona.setControl('_primerNombre',new FormControl('',[Validators.required]));
    
  }

  formPersona: FormGroup;
  get formPersona_idPersonaEncriptado(){
    return this.formPersona.get("_idPersonaEncriptado");
  }
  get formPersona_primerNombre(){
    return this.formPersona.get("_primerNombre");
  }
  get formPersona_segundoNombre(){
    return this.formPersona.get("_segundoNombre");
  }
  get formPersona_primerApellido(){
    return this.formPersona.get("_primerApellido");
  }
  get formPersona_segundoApellido(){
    return this.formPersona.get("_segundoApellido");
  }
  get formPersona_cmbTipoIdentificacion(){
    return this.formPersona.get("_cmbTipoIdentificacion");
  }
  get formPersona_numeroIdentificacion(){
    return this.formPersona.get("_numeroIdentificacion");
  }
  get formPersona_cmbSexo(){
    return this.formPersona.get("_cmbSexo");
  }
  get formPersona_telefono(){
    return this.formPersona.get("_telefono");
  }
  get formPersona_cmbProvincia(){
    return this.formPersona.get("_cmbProvincia");
  }
  get formPersona_cmbCanton(){
    return this.formPersona.get("_cmbCanton");
  }
  get formPersona_cmbParroquia(){
    return this.formPersona.get("_cmbParroquia");
  }

  get formPersona_direccion(){
    return this.formPersona.get("_direccion");
  }

  ngOnInit() {
    this._consultarPersonas();
    this._consultarTipoIdentificacion();
    // this.consultarPersonas();
    // this.consultarTipoDocumento();
    this._consultarSexos();
    this._consultarProvincias();
  }

  ngAfterViewInit(){
    
  }

  

  //-------------------------------------------------------------------------------------------
   __cadena:string 
  _validarSoloNumeros(event){
    console.log("ddddd");
    // this.__cadena = this._telefono;
    // this.__cadena.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
    // this._telefono= this.__cadena;
    // event.target.value = this._telefono;
    console.log(this._telefono);
    
    // this._telefono = event.target.value.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
  }
  //-------------------------------------------------------------------------------------------
  tablaPersonas = ['Nombres','Apellidos','TipoIdentidicacion','Identificacion','Acciones'];
  _validar = true;


  _listaSexos:any[]=[];
  _listaPersonas:any[]=[];
  _listaTipoIdentificacion : any[]=[];
  
  _cmbSexo :any="0";
  _cmbTipoIdentificacion :any = "0";
  _cmbParroquia="0";
  _cmbCanton="0";
  _cmbProvincia="0";
  _IdPersonaEncriptado : any="0";
  _primerNombre="";
  _segundoNombre="";
  _primerApellido="";
  _segundoApellido="";
  _telefono:string="";
  _direccion="";
  _numeroIdentificacion="";

  _btnAccion="Guardar";

  @ViewChild('frmPersona',{static:false}) frmPersona : Form; 

  @ViewChild('ComboProvincias',{static:false}) ComboProvincias:ElementRef;
  @ViewChild('ComboCantones',{static:false}) ComboCantones:ElementRef;
  @ViewChild('ComboParroquias',{static:false}) ComboParroquias:ElementRef;
  // @ViewChild('cmbSexo',{static:false}) cmbSexo:MatSelect;

  _validarCompletos(){
    // debugger
    if (
      this._cmbSexo                !="0"     && 
      this._cmbTipoIdentificacion  !="0"     &&
      // this._cmbParroquia           !="0"     &&
      // this._cmbCanton              !="0"     &&
      // this._cmbProvincia           !="0"     &&
      this.ComboParroquias.nativeElement.value !="0"  &&
      this.ComboCantones.nativeElement.value !="0"    &&
      this.ComboProvincias.nativeElement.value !="0"  &&
      this._primerNombre           !=""      &&
      this._primerApellido         !=""      &&
      this._segundoApellido        !=""      &&
      this._telefono               !=""      &&
      this._direccion              !=""      &&
      this._numeroIdentificacion   !=""

    ) {
      this._validar=false;
    }else{
      this._validar=true;
    }
  }

  
  _validarForm(){
    console.log(this._btnAccion);
    
    
    if (
      this._cmbSexo                !="0"     && 
      this._cmbTipoIdentificacion  !="0"     &&
      // this._cmbParroquia           !="0"     &&
      // this._cmbCanton              !="0"     &&
      // this._cmbProvincia           !="0"     &&
      this.ComboParroquias.nativeElement.value !="0"  &&
      this.ComboCantones.nativeElement.value !="0"    &&
      this.ComboProvincias.nativeElement.value !="0"  &&
      this._primerNombre           !=""      &&
      this._primerApellido         !=""      &&
      this._segundoApellido        !=""      &&
      this._telefono               !=""      &&
      this._direccion              !=""      &&
      this._numeroIdentificacion   !=""

    ) {
      if (this._btnAccion==="Guardar") {
        // this.frmPersona.valid = true;
        // this._ingresarPersona();
        this._ingresarPersona2();
      } 
      else if (this._btnAccion==="Modificar") {
        // debugger
        this._modificarPersona2();
      }
    }
      
      
  }

  _validarForm2(){
    if (this._btnAccion==="Guardar") {
      // this.frmPersona.valid = true;
      // this._ingresarPersona();
      this._ingresarPersona2();
    } 
    else if (this._btnAccion==="Modificar") {
      // debugger
      this._modificarPersona2();
    }
  }

  _ingresarPersona2() {

    const separador =" ";
    const limite =1;

    this.personaService._insertarPersona(
    this.formPersona_primerNombre.value,
    this.formPersona_segundoNombre.value,
    this.formPersona_primerApellido.value,
    this.formPersona_segundoApellido.value,
    this.formPersona_numeroIdentificacion.value,
    this.formPersona_cmbTipoIdentificacion.value,
    this.formPersona_telefono.value,
    this.formPersona_cmbSexo.value,
    // this._cmbParroquia,//this.parroquia,
    this.formPersona_cmbParroquia.value,
    this.formPersona_direccion.value,
    'token'
    ).then(
      data => {
        if (data['http']['codigo'] == '200') {
          this._consultarPersonas();
          this._refrescarTabla();
          this._refrescarForm();
        } else {
          this.mensaje(data['http']['mensaje']);
        }
      },
    )
    .catch(
      err => {
        console.log(err);
        this.mensaje(err);
      }
    );

  }
  _modificarPersona2() {
      
      this.personaService._modificarPersona(
        this.formPersona_idPersonaEncriptado.value,
        this.formPersona_primerNombre.value,
        this.formPersona_segundoNombre.value,
        this.formPersona_primerApellido.value,
        this.formPersona_segundoApellido.value,
        this.formPersona_numeroIdentificacion.value,
        this.formPersona_cmbTipoIdentificacion.value,
        this.formPersona_telefono.value,
        this.formPersona_cmbSexo.value,
        // this._cmbParroquia,//this.parroquia,
        this.formPersona_cmbParroquia.value,
        this.formPersona_direccion.value,
        'token'
        ).then(
          ok => {
            console.log(ok);
            
            if (ok['http']['codigo'] == '200') {
              this._consultarPersonas(); 
              this._refrescarForm();
                      
            } else {
              // ok['http']['mensaje'];
              this.mensaje(ok['http']['mensaje']);
            }
          },
        )
        .catch(
          err => {
            console.log(err);
            this.mensaje(err);
          }
        )
    // }
  }
  _ingresarPersona() {

      if(this._telefono=='null'){
        this._telefono='';
      }
      if(this._segundoNombre=='null'){
        this._segundoNombre = "";
      }

      const separador =" ";
      const limite =1;

      this.personaService._insertarPersona(
      this._primerNombre,
      this._segundoNombre,
      this._primerApellido.split(separador,limite)[0],
      this._segundoApellido.split(separador,limite)[0],
      this._numeroIdentificacion,
      this._cmbTipoIdentificacion,
      this._telefono,
      this._cmbSexo,
      // this._cmbParroquia,//this.parroquia,
      this.ComboParroquias.nativeElement.value,
      this._direccion,
      'token'
      ).then(
        data => {
          if (data['http']['codigo'] == '200') {
            this._consultarPersonas();
            this._refrescarTabla();
            this._refrescarForm();
          } else if (data['http']['codigo']=='500') {
            this.mensaje("A ocurrido un error inesperado, intente más tarde.")
          }else {
            this.mensaje(data['http']['mensaje']);
          }
        },
      )
      .catch(
        err => {
          console.log(err);
          this.mensaje(err);
        }
      );

  }
  _modificarPersona() {
   
    if(this._telefono=='null'){
      this._telefono='';
    }
    if(this._segundoNombre=='null'){
      this._segundoNombre = "";
    }

    const separador =" ";
    const limite =1;
      
      this.personaService._modificarPersona(
        this._IdPersonaEncriptado,
        this._primerNombre,
        this._segundoNombre,
        this._primerApellido.split(separador,limite)[0],
        this._segundoApellido.split(separador,limite)[0],
        this._numeroIdentificacion, 
        this._cmbTipoIdentificacion,
        this._telefono,
        this._cmbSexo,
        // this._cmbParroquia,//this.parroquia,
        this.ComboParroquias.nativeElement.value,
        this._direccion,
        'token'
        ).then(
          ok => {
            console.log(ok);
            
            if (ok['http']['codigo'] == '200') {
              this._consultarPersonas(); 
              this._refrescarForm();
                      
            } else {
              // ok['http']['mensaje'];
              this.mensaje(ok['http']['mensaje']);
            }
          },
        )
        .catch(
          err => {
            console.log(err);
            this.mensaje(err);
          }
        )
    // }
  }
  _consultarPersonas(){
    this._listaPersonas=null;
    this.personaService._consultarPersonas('token')
        .then(data=>{
          console.log(data);
          if (data['http']['codigo']=='200') {
            // debugger
            this._listaPersonas = data['respuesta'];
          }
        }).catch(error=>{
          console.log(error);
        });
  }
  _eliminarPersona(_persona:any){
    console.log("persona",_persona);
    console.log("listapersona despues",this._listaPersonas);
    this.personaService._eliminarPersona(_persona.IdPersonaEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {

          //var obj= this._listaPersonas.find(dato=>dato.IdPersonaEncriptado===_persona.IdPersonaEncriptado);
          var indexOf = this._listaPersonas.indexOf(_persona);
          this._listaPersonas.splice(indexOf,1);
         
          this._refrescarTabla();
          // this.table.dataSource = this._listaPersonas;
          // this.table.renderRows()
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else{
          this.mensaje(data['http']['mensaje'])
          console.log(data);
        }
      })
      .catch(error=>{
        this.mensaje(error);
      });
  }
  _consultarSexos(){
    // this.cmbSexos.interfaceOptions
    console.log();
    
    this.sexoService.consultarSexos()
        .then(data=>{
          if (data['http']['codigo']=='200') {
            this._listaSexos = data['respuesta'];
          }
          console.log(data);
        })
        .catch(error=>{
          console.log(error);
          
        });
  }

  _consultarTipoIdentificacion(){
    this.tipoIdentificacionService.consultarTiposIdentificacion()
    .then(data=>{
      if (data['http']['codigo']=='200') {
        this._listaTipoIdentificacion = data['respuesta'];
      }
    })
    .catch(error=>{

    });
  }

  _verPersona(_persona: any) {
    let dialogRef = this.dialog.open(ModalDetallePersonaComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        _persona : _persona
      }
    });
  }

  //@ViewChild('cmbTipoidentificacion',{static:false}) cmbTipoidentificacion:ElementRef;
  _prepararPersona(_persona:any){
    
    this._IdPersonaEncriptado= _persona.IdPersonaEncriptado;
    this._primerNombre=_persona.PrimerNombre;
    this._segundoNombre = _persona.SegundoNombre;
    this._primerApellido = _persona.PrimerApellido;
    this._segundoApellido = _persona.SegundoApellido;
    this._numeroIdentificacion = _persona.NumeroIdentificacion;
    this._cmbTipoIdentificacion = _persona.TipoIdentificacion.IdTipoIdentificacionEncriptado;
    this._telefono = _persona.Telefono;
    this._cmbSexo = _persona.Sexo.IdSexoEncriptado;
    // this._cmbParroquia  = _persona.Parroquia.IdParroquiaEncriptado;
    // this._cmbCanton     = _persona.Parroquia.Canton.IdCantonEncriptado;
    // this._cmbProvincia  = _persona.Parroquia.Canton.Provincia.IdProvinciaEncriptado;
    this._direccion = _persona.Direccion;

    if(this._telefono=='null'){
      this._telefono='';
    }
    if(this._segundoNombre=='null'){
      this._segundoNombre = "";
    }

    this.lugaresService._consultarProvincias();

    this._cantonesDeUnaProvincia(_persona.Parroquia.Canton.Provincia.IdProvinciaEncriptado);
    this._parroquiasDeUnCanton(_persona.Parroquia.Canton.IdCantonEncriptado);  
    // var obj = this._listaProvincias.find(item=>item.IdProvinciaEncriptado==_persona.Parroquia.Canton.Provincia.IdProvinciaEncriptado);
    this.ComboProvincias.nativeElement.value  = _persona.Parroquia.Canton.Provincia.IdProvinciaEncriptado;
    this.ComboCantones.nativeElement.value    = _persona.Parroquia.Canton.IdCantonEncriptado;
    this.ComboParroquias.nativeElement.value  = _persona.Parroquia.IdParroquiaEncriptado;
    // console.log(obj);
    
    //debugger
    // this.testButton.nativeElement.value = "modificar";
    this._btnAccion="Modificar";
    this._validarCompletos();
    // this.nuevaPersona = "Modificar Persona";
   

    this.formPersona.get("_idPersonaEncriptado")  .setValue(_persona.IdPersonaEncriptado);
    this.formPersona.get("_primerNombre")         .setValue(_persona.PrimerNombre);
    this.formPersona.get("_segundoNombre")        .setValue(_persona.SegundoNombre);
    this.formPersona.get("_primerApellido")       .setValue(_persona.PrimerApellido);
    this.formPersona.get("_segundoApellido")      .setValue(_persona.SegundoApellido);
    this.formPersona.get("_cmbTipoIdentificacion").setValue(_persona.TipoIdentificacion.IdTipoIdentificacionEncriptado);
    this.formPersona.get("_numeroIdentificacion") .setValue(_persona.NumeroIdentificacion);
    this.formPersona.get("_cmbSexo")              .setValue(_persona.Sexo.IdSexoEncriptado);
    this.formPersona.get("_telefono")             .setValue(_persona.Telefono);
    this.formPersona.get("_cmbProvincia")         .setValue(_persona.Parroquia.Canton.Provincia.IdProvinciaEncriptado);
    this.formPersona.get("_cmbCanton")            .setValue(_persona.Parroquia.Canton.IdCantonEncriptado);
    this.formPersona.get("_cmbParroquia")         .setValue(_persona.Parroquia.IdParroquiaEncriptado);
    this.formPersona.get("_direccion")            .setValue(_persona.Direccion);


  }

  _refrescarForm(){

    this._cmbSexo ="0";
    this._cmbTipoIdentificacion = "0";

    this._cmbParroquia="0";
    this._cmbCanton="0";
    this._cmbProvincia="0";

    this.ComboParroquias.nativeElement.value="0";
    this.ComboCantones.nativeElement.value="0";
    this.ComboProvincias.nativeElement.value="0";

    this._IdPersonaEncriptado ="0";
    this._primerNombre="";
    this._segundoNombre="";
    this._primerApellido="";
    this._segundoApellido="";
    this._telefono="";
    this._direccion="";
    this._numeroIdentificacion="";

    this._btnAccion="Guardar";
    this._validar=true;

    this.formPersona.reset();

  }

  @ViewChild(MatTable,{static:false}) MatTablaPersonas: MatTable<any>;
  _refrescarTabla(){
    this.MatTablaPersonas.renderRows();
  }

  onChangeSelectTipoSexo(IdEncriptadoSexo){
    console.log(IdEncriptadoSexo);
  }

  _listaProvincias:any[]=[];
  _consultarProvincias() {
    this.lugaresService._consultarProvincias()
      .then(
        data => {
          if (data['http']['codigo']=='200') {
            this._listaProvincias = data['respuesta'];
          }else{
            console.log(data);
            
          }
        }
      )
      .catch(
        err => {
          console.log(err);
        }
      )
  }
  _listaCantones:any[]=[];
  _cantonesDeUnaProvincia(event){
    // 
    
    this.ComboCantones.nativeElement.value="0";
    this.ComboParroquias.nativeElement.value="0";

    var id = event;
    console.log(id);
    if (id!="0") {
      this.lugaresService._consultarCantonesDe(id)
        .then(data=>{
          if (data['http']['codigo']=='200') {
            this._listaCantones = data['respuesta'];
          }else{
            console.log(data);
          }
        }).catch(error=>{
          console.log(error);
        }).finally(()=>{
          this._validarCompletos();
        });
    }
  }
  _listaParroquias:any[]=[];
  _parroquiasDeUnCanton(event){
    
    this.ComboParroquias.nativeElement.value="0";

    var id = event;
    console.log(id);
    if (id!="0") {
      this.lugaresService._consultarParroquiasDe(id)
        .then(data=>{
          if (data['http']['codigo']=='200') {
            this._listaParroquias = data['respuesta'];
          }else{
            console.log(data);
            
          }
        }).catch(error=>{
          console.log(error);
        }).finally(()=>{
          this._validarCompletos();
        });
    }
  }
  comunidad:any="0";
  _listaComunidades:any[]=[];
  _comunidadesDeUnaParroquia(event){
    
    
    var id = event;
    console.log("id",id);
    console.log(id);
    
    if (id!="0") {
      this.lugaresService._consultarComunidadesDe(id)
        .then(data=>{
          if (data['http']['codigo']=='200') {
            this._listaComunidades = data['respuesta'];
            console.log("data:",data['respuesta']);
            
          }else{
            
            console.log(data);
          }
        }).catch(error=>{
          console.log(error);
        }).finally(()=>{
          this._validarCompletos();
        });
    }
    console.log("lista",this._listaComunidades);
    
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

}
