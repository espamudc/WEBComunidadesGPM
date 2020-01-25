import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PanelAdministracionService } from 'src/app/services/panel-administracion.service';
import { PersonaService } from 'src/app/services/persona.service';
// import { Provincia } from 'src/app/interfaces/provincia/provincia';
import sweetalert from 'sweetalert';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.css']
})
export class ProvinciaComponent implements OnInit {

  myForm: FormGroup;
  @ViewChild('testButton', { static: false }) testButton: ElementRef;

  constructor(
    private panelAdministracionService: PanelAdministracionService,
    private personaService: PersonaService
  ) {
    this.myForm = new FormGroup({
      _provincia: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
   
  }

  get _provincia() {
    return this.myForm.get('_provincia');
  }

  tablaProvincias = ['provincia', 'acciones'];
  
}