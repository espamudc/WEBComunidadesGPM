import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PersonaModal } from 'src/app/interfaces/persona/persona-modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-detalle-persona',
  templateUrl: './modal-detalle-persona.component.html',
  styleUrls: ['./modal-detalle-persona.component.css']
})
export class ModalDetallePersonaComponent implements OnInit,AfterViewInit {

  constructor(
    public dialogRef: MatDialogRef<ModalDetallePersonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  { 
    this.formPersona  = new FormGroup({
      _idPersonaEncriptado    : new FormControl(''),
      _primerNombre           : new FormControl({ value:'', disabled: true }),
      _segundoNombre          : new FormControl({ value:'', disabled: true }),
      _primerApellido         : new FormControl({ value:'', disabled: true }),
      _segundoApellido        : new FormControl({ value:'', disabled: true }),
      _cmbTipoIdentificacion  : new FormControl({ value:'', disabled: true }),
      _numeroIdentificacion   : new FormControl({ value:'', disabled: true }),
      _cmbSexo                : new FormControl({ value:'', disabled: true }),
      _telefono               : new FormControl({ value:'', disabled: true }),
      _cmbProvincia           : new FormControl({ value:'', disabled: true }),
      _cmbCanton              : new FormControl({ value:'', disabled: true }),
      _cmbParroquia           : new FormControl({ value:'', disabled: true }),
      _direccion              : new FormControl({ value:'', disabled: true })
    }); 
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
    if (this.data._persona.SegundoNombre=='null') {
        this.data._persona.SegundoNombre="";
      }
    if(this.data._persona.Telefono=='null'){
        this.data._persona.Telefono="";
    }
    this.formPersona.get("_idPersonaEncriptado")  .setValue(this.data._persona.IdPersonaEncriptado);
    this.formPersona.get("_primerNombre")         .setValue(this.data._persona.PrimerNombre);
    this.formPersona.get("_segundoNombre")        .setValue(this.data._persona.SegundoNombre);
    this.formPersona.get("_primerApellido")       .setValue(this.data._persona.PrimerApellido);
    this.formPersona.get("_segundoApellido")      .setValue(this.data._persona.SegundoApellido);
    this.formPersona.get("_cmbTipoIdentificacion").setValue(this.data._persona.TipoIdentificacion.Descripcion);
    this.formPersona.get("_numeroIdentificacion") .setValue(this.data._persona.NumeroIdentificacion);
    this.formPersona.get("_cmbSexo")              .setValue(this.data._persona.Sexo.Descripcion);
    this.formPersona.get("_telefono")             .setValue(this.data._persona.Telefono);
    this.formPersona.get("_cmbProvincia")         .setValue(this.data._persona.Parroquia.Canton.Provincia.NombreProvincia);
    this.formPersona.get("_cmbCanton")            .setValue(this.data._persona.Parroquia.Canton.NombreCanton);
    this.formPersona.get("_cmbParroquia")         .setValue(this.data._persona.Parroquia.NombreParroquia);
    this.formPersona.get("_direccion")            .setValue(this.data._persona.Direccion);
  }
  _vacio:string="";
  ngAfterViewInit(){
  }

}
