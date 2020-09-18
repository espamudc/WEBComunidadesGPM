import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-panel-administracion',
  templateUrl: './panel-administracion.component.html',
  styleUrls: ['./panel-administracion.component.css']
})
export class PanelAdministracionComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  tipoUsurio='';
  ngOnInit() {
    this.tipoUsurio= localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado');
    if(this.tipoUsurio!='MQAwADYAOAA='){
      this.router.navigateByUrl("/inicio/inicio");
    }

    if(this.tipoUsurio==''){
      this.router.navigateByUrl("/login");
    }
  }

}
