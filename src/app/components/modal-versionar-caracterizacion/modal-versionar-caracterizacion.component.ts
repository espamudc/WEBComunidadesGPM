import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { CaracterizacionService } from 'src/app/services/caracterizacion.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CKEditorModule } from 'ng2-ckeditor';
@Component({
  selector: 'app-modal-versionar-caracterizacion',
  templateUrl: './modal-versionar-caracterizacion.component.html',
  styleUrls: ['./modal-versionar-caracterizacion.component.css']
})
export class ModalVersionarCaracterizacionComponent implements OnInit {

  constructor(
    private CaracterizacionService: CaracterizacionService,
    private dialogRef: MatDialogRef<ModalVersionarCaracterizacionComponent>,
    private snackBarComponent: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
   }
   accionesEjecutada = false;
   close() {
     this.dialogRef.close(this.accionesEjecutada);
   }

  tituloEncabezado = '';
  version = '';
  contenidoVersion:any[]=[];
  mensaje(_mensaje: string, _duracion?: number, _color?: string) {
    if (_duracion == null) {
      _duracion = 3000;
    }
    if (_color == null) {
      _color = "gpm-danger";
    }
    let snackBarRef = this.snackBarComponent.open(_mensaje, null, { duration: _duracion, panelClass: [`${_color}`], verticalPosition: 'bottom', horizontalPosition: 'end' });
  }

  async _consultarVersionCaracterizacion() {
    var respuesta = await this.CaracterizacionService._consultarCabeceraVersionBody(this.data.IdCabeceraVersionModeloEncriptado);
    if (respuesta['http']['codigo'] == "200") {
      this.contenidoVersion = respuesta['respuesta'].AsignarCuestionarioModelo;
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
  }
  onChange($event: any): void {
  }
  onPaste($event: any): void {
  }
  ckeConfig: any;
  name = 'ng2-ckeditor';
  mycontent: string = '';
  ngOnInit() {
    this.tituloEncabezado = this.data.caracterizacion;
    this.version = 'VERSIÓN ' + this.data.Version;
    this._consultarVersionCaracterizacion();
    this.ckeConfig = {
      readOnly: true,
      allowedContent: false,
      forcePasteAsPlainText: true,
      removeButtons: 'Link,Unlink,Button,TextField,Save,NewPage,Templates,Form,Checkbox,Radio,Find,Select,ImageButton,HiddenField,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,PageBreak,Iframe,ShowBlocks,Table,Image,Source,Maximize,Anchor,SpecialChar,PasteFromWord,Scayt,Undo,Redo,Strike,Indent,Outdent,Blockquote'
    };
  }

}
