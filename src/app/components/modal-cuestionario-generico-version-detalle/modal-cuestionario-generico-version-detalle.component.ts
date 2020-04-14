import { Component, OnInit, Inject } from '@angular/core';
import { CuestionarioGenericoService } from 'src/app/services/cuestionario-generico.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-cuestionario-generico-version-detalle',
  templateUrl: './modal-cuestionario-generico-version-detalle.component.html',
  styleUrls: ['./modal-cuestionario-generico-version-detalle.component.css']
})
export class ModalCuestionarioGenericoVersionDetalleComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public _modalData: any,
    private cuestionarioGenericoService :CuestionarioGenericoService,
  ) { }

  ngOnInit() {
    this._cuestionariogenerico_consultarporidconcomponenteconseccionconpregunta(this._modalData.AsignarResponsable.CuestionarioGenerico.IdCuestionarioGenericoEncriptado);
  }

  _cargarCuestionarioGenerico:any={};
  _cuestionariogenerico_consultarporidconcomponenteconseccionconpregunta(_IdCuestionarioGenericoEncriptado){
    this._cargarCuestionarioGenerico = {};
    this.cuestionarioGenericoService._cuestionariogenerico_consultarporidconcomponenteconseccionconpregunta(_IdCuestionarioGenericoEncriptado)
      .then(data=>{

        if (data['http']['codigo']=='200') {

          this._cargarCuestionarioGenerico = data['respuesta'];
          console.log("componentes de una version",data['respuesta']);

        } else {

        }
      }).catch(error=>{

      }).finally(()=>{

      });
  }

}
