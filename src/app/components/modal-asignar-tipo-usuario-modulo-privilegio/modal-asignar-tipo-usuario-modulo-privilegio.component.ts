import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-asignar-tipo-usuario-modulo-privilegio',
  templateUrl: './modal-asignar-tipo-usuario-modulo-privilegio.component.html',
  styleUrls: ['./modal-asignar-tipo-usuario-modulo-privilegio.component.css']
})
export class ModalAsignarTipoUsuarioModuloPrivilegioComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

}
