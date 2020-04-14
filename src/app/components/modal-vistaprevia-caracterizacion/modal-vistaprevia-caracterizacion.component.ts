import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { CaracterizacionService } from 'src/app/services/caracterizacion.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-vistaprevia-caracterizacion',
  templateUrl: './modal-vistaprevia-caracterizacion.component.html',
  styleUrls: ['./modal-vistaprevia-caracterizacion.component.css']
})
export class ModalVistapreviaCaracterizacionComponent implements OnInit {

  constructor(
    private CaracterizacionService: CaracterizacionService,
    private dialogRef: MatDialogRef<ModalVistapreviaCaracterizacionComponent>,
    private snackBarComponent: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  tituloEncabezado = '';
  descripcionEncabezado = '';
  listaComponentes: any[] = [];
  provincia='';
  canton='';
  parroquia='';
  nComunidades='';
  mostrarDataCaracterizacionVistaPrevia = false;
  mostrarDataCaracterizacionVistaPreviaLugar = false;
  version = '';
  Publicado='';
  FechaPublicacion='';
  Periodo='';
  datosCargados = false;
  CargandoVistaPrevia = false;
  save() {
    this.dialogRef.close(1);
  }

  close() {
    this.dialogRef.close(0);
  }
  listaComponentes1:any[]=[];
  ngOnInit() {
    if(this.data.Nombre != undefined){
      this.tituloEncabezado = this.data.Nombre;
      this.descripcionEncabezado = this.data.Descripcion;
      this.listaComponentes = this.data.AsignarCuestionarioModelo;
    }else{
      this.tituloEncabezado = this.data.data.ModeloGenerico.Nombre;
      this.descripcionEncabezado = this.data.data.ModeloGenerico.Descripcion;
      this.provincia = this.data.Lugar.Parroquia.Canton.Provincia.NombreProvincia;
      this.canton = this.data.Lugar.Parroquia.Canton.NombreCanton;
      this.parroquia = this.data.Lugar.Parroquia.NombreParroquia;
      // this.nComunidades = this.data.NumeroComunidades;
      this.nComunidades = this.data.Lugar.Representante;
      this.mostrarDataCaracterizacionVistaPreviaLugar = true;
      this.listaComponentes1 = this.data.data.AsignarComponenteGenerico;
      console.log(this.data.data.AsignarComponenteGenerico)
    }
    // this.CargandoVistaPrevia=true;
    // this.datosCargados=false;
    // if (this.data.Encabezado.NombreCaracterizacion != undefined) {
    //   this.tituloEncabezado = 'CARACTERIZACIÓN ' + this.data.Encabezado.NombreCaracterizacion;
    //   this.descripcionEncabezado = this.data.Encabezado.Descripcion;
    //   this.listaComponentes = this.data.Encabezado.ListaComponentes;
    //   this.mostrarDataCaracterizacionVistaPrevia=true;
    // } else {
    //   console.log(this.data.Encabezado);
    //   this.tituloEncabezado = 'CARACTERIZACIÓN ' + this.data.Encabezado.data.NombreModeloGenerico;
    //   this.descripcionEncabezado = this.data.Encabezado.data.DescripcionModeloGenerico;
    //   this.provincia = this.data.Encabezado.Lugar.Provincia;
    //   this.canton = this.data.Encabezado.Lugar.Canton;
    //   this.parroquia = this.data.Encabezado.Lugar.Parroquia;
    //   this.nComunidades= this.data.Encabezado.NumeroComunidades;
    //   this.version = 'VERSIÓN '+this.data.Encabezado.data.Version;
    //   this.Publicado = this.data.Encabezado.data.Publicado;
    //   this.FechaPublicacion = this.data.Encabezado.data.FechaPublicacion;
    //   this.Periodo = this.data.Encabezado.data.Periodo;
    //   this.listaComponentes = this.data.Encabezado.data._ListaComponentes;
    //   this.mostrarDataCaracterizacionVistaPreviaLugar=true;
    // }
    // this.CargandoVistaPrevia=false;
    // this.datosCargados=true;
  }

}
