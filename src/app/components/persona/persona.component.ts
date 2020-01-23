import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
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
import { MatTable } from '@angular/material';
import { LugaresService } from 'src/app/services/lugares.service';
// import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  myForm: FormGroup;
  @ViewChild('testButton', { static: false }) testButton: ElementRef;

  constructor(
    private lugaresService:LugaresService,
    private personaService: PersonaService,
    private sexoService:SexoService,
    private tipoIdentificacionService:TipoIdentificacionService,
    private dialog: MatDialog,
  ) {
    this.myForm = new FormGroup({
      _nombres: new FormControl('', [Validators.required]),
      _apellidos: new FormControl('', [Validators.required]),
      _numeroDocumento: new FormControl('', [Validators.required]),
      _telefono1: new FormControl('', [Validators.required]),
      _direccion: new FormControl('', [Validators.required]),
    });
  }

  tituloAlerta: string = '';
  tipoDocumento = "0";
  tipoTelefono1 = "0";
  tipoTelefono2 = "0";
  provincia = "0";
  canton = "0";
  parroquia = "0";

  inputNombres = true;
  inputApellidos = true;
  inputCedula = true;
  selectTipoDocumento = true;
  selectTipoTelefono1 = true;
  selectTipoTelefono2 = true;
  selectProvincia = true;
  selectCanton = true;
  selectParroquia = true;

  correo: string;
  nuevaPersona = 'Nueva Persona';
  contacto = 'Contacto ';
  direccion = 'Direccion';

  idPersona: string;
  botonInsertar = "insertar";

  filterPersona = '';

  
  validarSelects(
    tipoDocumento: string,
   
    // tipoTelefono2: string,
    provincia: string,
    canton: string,
    parroquia: string,
  ) {

    if (provincia == "0") {
      this.selectProvincia = false;
    }
    if (canton == "0") {
      this.selectCanton = false;
    }
    if (parroquia == "0") {
      this.selectParroquia = false;
    }
  }

  validarNombres(validarDosNombres) {
    var arrayNombres = this.myForm.get('_nombres').value.split(' ');
    if (arrayNombres.length == 1) {
      this.inputNombres = false;
    } else if (arrayNombres.length >= 2) {
      if (arrayNombres[0].length > 0 && arrayNombres[1].length > 0) {
        validarDosNombres.primerCampo = arrayNombres[0];
        validarDosNombres.segundoCampo = arrayNombres[1];
        validarDosNombres.valido = true;
        return validarDosNombres;
      } else {
        this.inputNombres = false;
      }
    }
  }

  validarApellidos(validarDosApellidos) {
    var arrayApellidos = this.myForm.get('_apellidos').value.split(' ');
    if (arrayApellidos.length == 1) {
      this.inputApellidos = false;
    } else if (arrayApellidos.length >= 2) {
      if (arrayApellidos[0].length > 0 && arrayApellidos[1].length > 0) {
        validarDosApellidos.primerCampo = arrayApellidos[0];
        validarDosApellidos.segundoCampo = arrayApellidos[1];
        validarDosApellidos.valido = true;
        return validarDosApellidos;
      } else {
        this.inputApellidos = false;
      }
    }
  }

  validarFormulario() {
    // console.log(this.myForm.value);
    
    this.validarSelects(
      this._cmbtipoIdentificacion,
      // this.tipoTelefono2, 
      this.provincia,
      this.canton, this.parroquia,
    )
    if (this.myForm.valid) {
      if (this.testButton.nativeElement.value == 'insertar') {
        //this._ingresarPersona();
        if (
          this.selectTipoDocumento && 
           this.selectProvincia &&
          this.selectCanton && this.selectParroquia
        ) {
          // this.crearPersona();
          this._ingresarPersona();
          
        }
      } else if (this.testButton.nativeElement.value == 'modificar') {
        if (
          this.selectTipoDocumento && 
          this.selectProvincia &&
          this.selectCanton && 
          this.selectParroquia
        ) {
          //
          // this.actualizarPersona('modificar', this.personaModal);
          this._modificarPersona();
          this.testButton.nativeElement.value = 'insertar';
        }
      }
    } else {
      console.log("Algo Salio Mal");
    }
  }

  onChangeSelectTipoDocumento(value) {
    if (value != "0") {
      this.selectTipoDocumento = true;
    }
  }


 
  onChangeInputNombres() {
    this.inputNombres = true;
  }

  onChangeInputApellidos() {
    this.inputApellidos = true;
  }

  onChangeInputCedula() {
    this.inputCedula = true;
  }

  
  limpiarSelects() {
    this.tipoDocumento = '0',
      this.tipoTelefono1 = '0';
    this.tipoTelefono2 = '0';
    this.provincia = '0';
    this.canton = '0';
    this.parroquia = '0';
    this.correo = '';
  }

  get _nombres() {
    return this.myForm.get('_nombres');
  }

  get _apellidos() {
    return this.myForm.get('_apellidos');
  }

  get _tipoDocumento() {
    return this.myForm.get('_tipoDocumento');
  }

  get _numeroDocumento() {
    return this.myForm.get('_numeroDocumento');
  }

  get _telefono1() {
    return this.myForm.get('_telefono1');
  }

  get _tipoTelefono1() {
    return this.myForm.get('_tipoTelefono1');
  }

  get _telefono2() {
    return this.myForm.get('_telefono2')
  }

  get _tipoTelefono2() {
    return this.myForm.get('_tipoTelefono2')
  }

  get _direccion() {
    return this.myForm.get('_direccion')
  }


  ngOnInit() {
    this._consultarPersonas();
    this._consultarTipoIdentificacion();
    // this.consultarPersonas();
    // this.consultarTipoDocumento();
    this._consultarSexos();
    this._consultarProvincias();
  }

  tablaPersonas = ['nombres', 'apellidos', 'documento', 'numeroDocumento', 'acciones'];


  //-------------------------------------------------------------------------------------------
  
  _cmbSexo :any="0";
  _listaSexos:any[]=[];
  _listaPersonas:any[]=[];
  _listaTipoIdentificacion : any[]=[];
  _cmbtipoIdentificacion :any = "0";
  inputDireccion = true;
  _IdPersonaEncriptado : any="0";
  _refrescar = false;
  // @ViewChild('cmbSexo',{static:false}) cmbSexo:MatSelect;

  _ingresarPersona() {
    var validarNombress = {
      primerCampo: '',
      segundoCampo: '',
      valido: Boolean
    }
    var validarApellidos = {
      primerCampo: '',
      segundoCampo: '',
      valido: Boolean
    }
    var dosNombres = this.validarNombres(validarNombress);
    var dosApellidos = this.validarApellidos(validarApellidos);
    if (dosNombres.valido == true && dosApellidos.valido == true) {
      
      this.personaService._insertarPersona(
        dosNombres.primerCampo,
        dosNombres.segundoCampo,
        dosApellidos.primerCampo,
        dosApellidos.segundoCampo,
        this.myForm.get('_numeroDocumento').value,
        // this.myForm.get('_numeroDocumento').value,
        this._cmbtipoIdentificacion,
        this.myForm.get('_telefono1').value,
        this._cmbSexo,
        this.parroquia,//this.parroquia,
        this.myForm.get('_direccion').value,
        'token'
        ).then(
          data => {
            if (data['http']['codigo'] != '200') {
              this.inputCedula = false;
              this._consultarPersonas();
              // this._listaPersonas.push(data['respuesta']);
              // this.table.dataSource = this._listaPersonas;
              // this.table.renderRows()
            } else {
              
            }
          },
        )
        .catch(
          err => {
            console.log(err);
          }
        );
        
    }
  }
  _modificarPersona() {
    var validarNombress = {
      primerCampo: '',
      segundoCampo: '',
      valido: Boolean
    }
    var validarApellidos = {
      primerCampo: '',
      segundoCampo: '',
      valido: Boolean
    }
    var dosNombres = this.validarNombres(validarNombress);
    var dosApellidos = this.validarApellidos(validarApellidos);
    if (dosNombres.valido == true && dosApellidos.valido == true) {
      
      this.personaService._modificarPersona(
        this._IdPersonaEncriptado,
        dosNombres.primerCampo,
        dosNombres.segundoCampo,
        dosApellidos.primerCampo,
        dosApellidos.segundoCampo,
        this.myForm.get('_numeroDocumento').value,
        // this.myForm.get('_numeroDocumento').value,
        this._cmbtipoIdentificacion,
        this.myForm.get('_telefono1').value,
        this._cmbSexo,
        '1',//this.parroquia,
        this.myForm.get('_direccion').value,
        'token'
        ).then(
          ok => {
            console.log(ok);
            
            if (ok['http']['codigo'] != '200') {
              this.inputCedula = false;
              console.log(ok['http']['mensaje']);
              
            } else {
              ok['http']['mensaje'];
            }
          },
        )
        .catch(
          err => {
            console.log(err);
          }
        )
    }
  }
  _consultarPersonas(){
    this.personaService._consultarPersonas('token')
        .then(data=>{
          console.log(data);
          if (data['http']['codigo']=='200') {
            // 
            this._listaPersonas = data['respuesta'];
          }
        }).catch(error=>{
          console.log(error);
        });
  }
  // @ViewChild("tablaPersonas",{static:false}) tablaPersona : MatTable<any>;
  // @ViewChild(MatTable,{static:false}) table: MatTable<any>;
  // @ViewChild('tablaPersonas',{static:false}) myTable: MatTable<any>;
  _eliminarPersona(_persona:any){
    console.log("persona",_persona);
    console.log("listapersona despues",this._listaPersonas);
    this.personaService._eliminarPersona(_persona.IdPersonaEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {

          //var obj= this._listaPersonas.find(dato=>dato.IdPersonaEncriptado===_persona.IdPersonaEncriptado);
          var indexOf = this._listaPersonas.indexOf(_persona);
          this._listaPersonas.splice(indexOf,1);
      
          // this.table.dataSource = this._listaPersonas;
          // this.table.renderRows()
        }else{
          console.log(data);
        }
      })
      .catch(error=>{

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
      width: '500px',
      height: '450px',
      data: {
        _persona : _persona
      }
    });
  }

  //@ViewChild('cmbTipoidentificacion',{static:false}) cmbTipoidentificacion:ElementRef;
  _prepararPersona(_persona:any){
    
    
    const nombres   = _persona.PrimerNombre +' '+ _persona.SegundoNombre;
    const apellidos = _persona.PrimerApellido +' '+ _persona.SegundoApellido;
    this.myForm.get('_nombres').setValue(nombres);
    this.myForm.get('_apellidos').setValue(apellidos);
    this.myForm.get('_numeroDocumento').setValue(_persona.NumeroIdentificacion);
    this.myForm.get('_telefono1').setValue(_persona.Telefono);
    this.myForm.get('_direccion').setValue(_persona.Direccion);

    this._cmbtipoIdentificacion = _persona.TipoIdentificacion.IdTipoIdentificacionEncriptado;
    this._cmbSexo = _persona.Sexo.IdSexoEncriptado;
    this._IdPersonaEncriptado = _persona.IdPersonaEncriptado;
    this.testButton.nativeElement.value = "modificar";
    this.nuevaPersona = "Modificar Persona";
    this._refrescar = true;
  }

  _refrescarForm(){
    this._IdPersonaEncriptado = "0";
    this.myForm.reset();
    this._cmbSexo= "0";
    this._cmbtipoIdentificacion ="0";
    this.limpiarSelects();
    this._refrescar = false;
    
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
        });
    }
  }
  _listaParroquias:any[]=[];
  _parroquiasDeUnCanton(event){
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
        });
    }
    console.log("lista",this._listaComunidades);
    
  }

}
