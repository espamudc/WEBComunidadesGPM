import { Component, OnInit } from '@angular/core';
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
  ) { }
  ngOnInit() {
  }
}
