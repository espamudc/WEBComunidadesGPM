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
      this.nComunidades = this.data.Lugar.Representante;
      this.mostrarDataCaracterizacionVistaPreviaLugar = true;
      this.listaComponentes1 = this.data.data.AsignarComponenteGenerico;
    }
    
  }

}
