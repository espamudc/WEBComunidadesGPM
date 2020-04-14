import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators, Form, FormBuilder } from '@angular/forms';
import { CaracterizacionService } from 'src/app/services/caracterizacion.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from "@angular/material/dialog";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { GaleriaComponent } from 'src/app/components/galeria/galeria.component';
// import {Folder, path, knownFolders} from "tns-core-modules/file-system";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal-llenar-informacion',
  templateUrl: './modal-llenar-informacion.component.html',
  styleUrls: ['./modal-llenar-informacion.component.css']
})
export class ModalLlenarInformacionComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;
  constructor(
    private http: HttpClient,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ModalLlenarInformacionComponent>,
    private CaracterizacionService: CaracterizacionService,
    private snackBarComponent: MatSnackBar,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
  }
  fileData: File = null;
  fileDataGuardado: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  mostrarAgregarImagen = true;
  mostrarBotonEliminar = false;
  accionesEjecutada = false;
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    if (this.fileData != undefined) {
      this.preview();
      this.mostrarAgregarImagen = false;
      this.mostrarBotonEliminar = true;
    }
  }
  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
    //console.log(reader)
  }
  eliminarImagen() {
    this.fileData = null;
    this.previewUrl = null;
    this.fileUploadProgress = null;
    this.uploadedFilePath = null;
    this.firstFormGroup.controls['firstCtrl'].setValue('');
    this.mostrarBotonEliminar = false;
    this.mostrarAgregarImagen = true;
    //this.firstFormGroup.value.firstCtrl ='';
  }
  close() {
    this.dialogRef.close(this.accionesEjecutada);
  }
  inputDescripcion(event?: string) {
    var data = event;
    this.secondFormGroup.controls['secondCtrl'].setValue(data);
    this.dataTextArea = this.secondFormGroup.controls['secondCtrl'].value;
  }
  mensaje(_mensaje: string, _duracion?: number, _opcion?: number, _color?: string) {
    if (_duracion == null) {
      _duracion = 3000;
    }
    if (_opcion == 1) {
      _mensaje = "Datos ingresados correctamente";
    }
    if (_opcion == 2) {
      _mensaje = "Datos modificados correctamente";
    }
    if (_opcion == 3) {
      _mensaje = "Datos eliminados correctamente";
    }
    if (_color == null) {
      _color = "gpm-danger";
    }
    let snackBarRef = this.snackBarComponent.open(_mensaje, null, { duration: _duracion, panelClass: ['text-white', `${_color}`], data: {} });
  }
  guardarDescripcion() {
    var ejecutado = false;
    this.CaracterizacionService._contenidodetallecomponente_insertar(
      this.data.CabeceraCaracterizacion.IdCabeceraCaracterizacionEncriptar,
      this.dataTextArea,
      this.data.data.IdDescripcionComponenteEncriptado,
      localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado')
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        this.accionesEjecutada = true;
        ejecutado = true;
      } else if (data['http']['codigo'] == '500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      } else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      if (ejecutado != false) {
        this.dialogRef.close(this.accionesEjecutada);
      }
    });
  }
  mostrarTipoDatoMapa = false;
  dataTextArea = '';
  idContenidoDetalleComponenteCaracterizacion ='';
  eliminarDescripcion(){
    var ejecutado = false;
    this.CaracterizacionService._contenidodetallecomponente_eliminar(
      this.idContenidoDetalleComponenteCaracterizacion,
    ).then(data => {
      if (data['http']['codigo'] == '200') {
        ejecutado = true;
        this.accionesEjecutada = true;
      } else if (data['http']['codigo'] == '500') {
        this.mensaje("A ocurrido un error inesperado, intente más tarde.")
      } else {
        this.mensaje(data['http']['mensaje']);
      }
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      if (ejecutado != false) {
        this.dialogRef.close(this.accionesEjecutada);
      }
    });
  }
  actualizarDescripcion(){
    if(this.dataTextArea != ''){
      var ejecutado = false;
      this.CaracterizacionService._contenidodetallecomponente_modificar(
        this.idContenidoDetalleComponenteCaracterizacion,
        this.dataTextArea,
        this.data.data.IdDescripcionComponenteEncriptado,
      ).then(data => {
        if (data['http']['codigo'] == '200') {
          ejecutado = true;
          this.accionesEjecutada = true;
        } else if (data['http']['codigo'] == '500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        } else {
          this.mensaje(data['http']['mensaje']);
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        if (ejecutado != false) {
          this.dialogRef.close(this.accionesEjecutada);
        }
      });
    }else{
      this.eliminarDescripcion();
    }
  }
  verGaleria(){
    let dialogRef = this.dialog.open(GaleriaComponent, {
      width: '80%',
      height: '80%',
    });
    dialogRef.afterClosed().subscribe(result => {
    }, error => {
    }, () => {
    });
  }
  ngOnInit() {
    if (this.data.data.AsignarDescripcionComponenteTipoElemento.TipoElemento.Identificador == 1) {
      this.mostrarTipoDatoMapa = true;
      if (this.data.data.AsignarDescripcionComponenteTipoElemento.Obligatorio) {
        this.firstFormGroup = this._formBuilder.group({
          firstCtrl: ['', Validators.required]
        });
      } else {
        this.firstFormGroup = this._formBuilder.group({
          firstCtrl: ['']
        });
      }
      if (this.data.data.Obligatorio) {
        this.secondFormGroup = this._formBuilder.group({
          secondCtrl: ['', Validators.required]
        });
      } else {
        this.secondFormGroup = this._formBuilder.group({
          secondCtrl: ['']
        });
      }
    } else {
      if (this.data.data.AsignarDescripcionComponenteTipoElemento.Obligatorio) {
        this.firstFormGroup = this._formBuilder.group({
          firstCtrl: ['', Validators.required]
        });
      } else {
        this.firstFormGroup = this._formBuilder.group({
          firstCtrl: ['']
        });
      }
      if (this.data.data.Obligatorio) {
        this.secondFormGroup = this._formBuilder.group({
          secondCtrl: ['', Validators.required]
        });
      } else {
        this.secondFormGroup = this._formBuilder.group({
          secondCtrl: ['']
        });
      }
    }
    if(this.data.data.ContenidoDetalleComponente.length != 0){
      var registroContenido = '';
      this.idContenidoDetalleComponenteCaracterizacion = this.data.data.ContenidoDetalleComponente[0].IdContenidoDetalleComponenteCaracterizacionEncriptado;
      this.data.data.ContenidoDetalleComponente.map(Descripcion => {
        registroContenido += Descripcion.Contenido;
      })
      this.secondFormGroup.controls['secondCtrl'].setValue(registroContenido);
      this.dataTextArea = registroContenido;
    }
  }

}
