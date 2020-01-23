import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { MatTable } from '@angular/material';
// import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  // myForm: FormGroup;

  constructor(
    private lugaresService:LugaresService,
    private personaService: PersonaService,
    private sexoService:SexoService,
    private tipoIdentificacionService:TipoIdentificacionService,
    private dialog: MatDialog,
  ) {
  
  }



  ngOnInit() {
    this._consultarPersonas();
    this._consultarTipoIdentificacion();
    // this.consultarPersonas();
    // this.consultarTipoDocumento();
    this._consultarSexos();
    this._consultarProvincias();
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
  _telefono="";
  _direccion="";
  _numeroIdentificacion="";

  _btnAccion="Guardar";

  @ViewChild('frmPersona',{static:false}) frmPersona : Form; 
  // @ViewChild('cmbSexo',{static:false}) cmbSexo:MatSelect;

  _validarCompletos(){
    // debugger
    if (
      this._cmbSexo                !="0"     && 
      this._cmbTipoIdentificacion  !="0"     &&
      this._cmbParroquia           !="0"     &&
      this._cmbCanton              !="0"     &&
      this._cmbProvincia           !="0"     &&
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
    
    if (
      this._cmbSexo                !="0"     && 
      this._cmbTipoIdentificacion  !="0"     &&
      this._cmbParroquia           !="0"     &&
      this._cmbCanton              !="0"     &&
      this._cmbProvincia           !="0"     &&
      this._primerNombre           !=""      &&
      this._primerApellido         !=""      &&
      this._segundoApellido        !=""      &&
      this._telefono               !=""      &&
      this._direccion              !=""      &&
      this._numeroIdentificacion   !=""

    ) {
      if (this._btnAccion==="Guardar") {
        // this.frmPersona.valid = true;
        this._ingresarPersona();
      } 
      }else if (this._btnAccion==="Modificar") {
        this._modificarPersona();
      }
    }

  


  _ingresarPersona() {
      this.personaService._insertarPersona(
      this._primerNombre,
      this._segundoNombre,
      this._primerApellido,
      this._segundoApellido,
      this._numeroIdentificacion,
      this._cmbTipoIdentificacion,
      this._telefono,
      this._cmbSexo,
      this._cmbParroquia,//this.parroquia,
      this._direccion,
      'token'
      ).then(
        data => {
          if (data['http']['codigo'] == '200') {
            this._consultarPersonas();
            this._refrescarTabla();
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
  _modificarPersona() {
   
      
      this.personaService._modificarPersona(
        this._IdPersonaEncriptado,
        this._primerNombre,
        this._primerApellido,
        this._primerApellido,
        this._segundoApellido,
        this._numeroIdentificacion, 
        this._cmbTipoIdentificacion,
        this._telefono,
        this._cmbSexo,
        this._cmbParroquia,//this.parroquia,
        this._direccion,
        'token'
        ).then(
          ok => {
            console.log(ok);
            
            if (ok['http']['codigo'] != '200') {
              this._consultarPersonas();           
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
    
    this._IdPersonaEncriptado= _persona.IdPersonaEncriptado;
    this._primerNombre=_persona.PrimerNombre;
    this._segundoNombre = _persona.SegundoNombre;
    this._primerApellido = _persona.PrimerApellido;
    this._segundoApellido = _persona.SegundoApellido;
    this._numeroIdentificacion = _persona.NumeroIdentificacion;
    this._cmbTipoIdentificacion = _persona.TipoIdentificacion.IdTipoIdentificacionEncriptado;
    this._telefono = _persona.Telefono;
    this._cmbSexo = _persona.Sexo.IdSexoEncriptado;
    this._cmbParroquia = "0";
    this._direccion = _persona.Direccion;

    
    //debugger
    // this.testButton.nativeElement.value = "modificar";
    this._btnAccion="Modificar";
    this._validarCompletos();
    // this.nuevaPersona = "Modificar Persona";
   
  }

  _refrescarForm(){

    this._cmbSexo ="0";
    this._cmbTipoIdentificacion = "0";
    this._cmbParroquia="0";
    this._cmbCanton="0";
    this._cmbProvincia="0";
    this._IdPersonaEncriptado ="0";
    this._primerNombre="";
    this._segundoNombre="";
    this._primerApellido="";
    this._segundoApellido="";
    this._telefono="";
    this._direccion="";
    this._numeroIdentificacion="";

    this._btnAccion="Guardar";
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

}
