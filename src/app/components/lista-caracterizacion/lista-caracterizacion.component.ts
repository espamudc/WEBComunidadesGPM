import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaracterizacionService } from 'src/app/services/caracterizacion.service';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material';
import { ModalVistapreviaCaracterizacionComponent } from "src/app/components/modal-vistaprevia-caracterizacion/modal-vistaprevia-caracterizacion.component";
import { LugaresService } from 'src/app/services/lugares.service';
@Component({
  selector: 'app-lista-caracterizacion',
  templateUrl: './lista-caracterizacion.component.html',
  styleUrls: ['./lista-caracterizacion.component.css']
})
export class ListaCaracterizacionComponent implements OnInit {

  constructor(
    private CaracterizacionService: CaracterizacionService,
    private snackBarComponent: MatSnackBar,
    private dialog: MatDialog,
    private lugaresService: LugaresService,
    private router: Router
  ) { }
  tipoUsurio='';
  ngOnInit() {
    this.tipoUsurio= localStorage.getItem('IdTipoUsuarioEncriptado');
    if(this.tipoUsurio!='MQA='){
      this.router.navigateByUrl("/inicio/inicio");
    }
    if(this.tipoUsurio==''){
      this.router.navigateByUrl("/login");
    }
  }
}
