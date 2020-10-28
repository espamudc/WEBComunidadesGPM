import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators, Form } from '@angular/forms';
import { CaracterizacionService } from 'src/app/services/caracterizacion.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CuestionarioPublicadoService } from "src/app/services/cuestionario-publicado.service";
import { MatTabGroup, MatPaginator, MatTableDataSource } from '@angular/material';
import { DomSanitizer } from "@angular/platform-browser";
import { CKEditorModule } from 'ng2-ckeditor';
import { PreguntaSeleccionService } from 'src/app/services/tipo-preguntas/pregunta-seleccion.service';
export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: 'app-modal-asignacion-orden',
  templateUrl: './modal-asignacion-orden.component.html',
  styleUrls: ['./modal-asignacion-orden.component.css']
})
export class ModalAsignacionOrdenComponent implements OnInit {
  form: FormGroup;
  formGroup: FormGroup;
  constructor(
    private CaracterizacionService: CaracterizacionService,
    private dialogRef: MatDialogRef<ModalAsignacionOrdenComponent>,
    private cuestionarioPublicadoService: CuestionarioPublicadoService,
    private preguntaSeleccionService:PreguntaSeleccionService,
    private snackBarComponent: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitized: DomSanitizer,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      selectPregunta: [],
      tipoPregunta: ['']
    });
    this.formGroup = fb.group({
     Mapa: ['', Validators.requiredTrue]
   });
  }
  name = 'ng2-ckeditor';
  ckeConfig: any;
  ckeConfigMatriz: any;
  mycontent: string = '';
  mycontentMatriz: string = '';
  Componente = '';
  log: string = '';
  @ViewChild(CKEditorModule, { static: false }) myckeditor: CKEditorModule;
  _listaPregunta: any[] = [];
  _listaColumnaMatrizAbierta: any[]=[];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  _listaCuestionarioPublicados = new MatTableDataSource<Element[]>();
  dataSource: any[] = [];
  tablaCuestionarioPublicado = ['No', 'NOMBRE', 'VERSION', 'FECHA PUBLICACION', 'INICIO', 'FIN'];
  mostrarCuestionarios = false;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.trim() == '') {
      this._listaCuestionarioPublicados.data = this.dataSource;
    }
    else if (filterValue != '') {
      this._listaCuestionarioPublicados.data = this.dataSource.filter(e =>
        e.CabeceraVersionCuestionario.AsignarResponsable.CuestionarioGenerico.Nombre.trim().toLowerCase().includes(filterValue.trim().toLowerCase())
      );
    }
    // this._listaCuestionarioPublicados.filter = filterValue.trim();
  }
  mensaje(_mensaje: string, _duracion?: number, _color?: string) {
    if (_duracion == null) {
      _duracion = 3000;
    }
    if (_color == null) {
      _color = "gpm-danger";
    }
    let snackBarRef = this.snackBarComponent.open(_mensaje, null, { duration: _duracion, panelClass: [`${_color}`], verticalPosition: 'bottom', horizontalPosition: 'end' });
  }
  asignarCuestionario(element) {
    this.dialogRef.close(element);
  }
  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  setPregunta(item) {
    this._listaColumnaMatrizAbierta=[];
    this.matriz = false;
    this.form.controls['tipoPregunta'].setValue(item.Pregunta.TipoPregunta.Descripcion)
    if (item.Pregunta.TipoPregunta.Identificador == 4) {
      this.matriz = true;
    }if (item.Pregunta.TipoPregunta.Identificador == 6) {
      this.matriz = true;
      this._consultarPreguntasSeleccion(item.Pregunta.IdPreguntaEncriptado)
    }else{
      this.mycontentMatriz = "";
    }
  }
  _consultarPreguntasSeleccion(idPreguntaEncriptado:string){
    this.preguntaSeleccionService._consultarOpcionPreguntaSeleccion(
      idPreguntaEncriptado
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._listaColumnaMatrizAbierta = data['respuesta'];
      }else{
      }
    }).catch(error=>{
    }).finally(()=>{
    });
  }
  vistaPrevia = '';
  matriz = false;
  anidarPregunta() {
    if (this.form.controls['selectPregunta'].value != 0) {
      let pregunta = this._listaPregunta.find(e => e.IdVersionamientoPreguntaEncriptado == this.form.controls['selectPregunta'].value);
      if (pregunta.Pregunta.TipoPregunta.Identificador == 2 || pregunta.Pregunta.TipoPregunta.Identificador == 1) {
        if (this.mycontent.trim() == "") {
          this.mycontent = "<p><textarea cols='20' rows='3' name=" + pregunta.IdVersionamientoPreguntaEncriptado + ">" + pregunta.Pregunta.Descripcion + "</textarea></p>";
        } else {
          this.mycontent = this.mycontent.substring(0, this.mycontent.length - 5) + " &nbsp <textarea cols='20' rows='3' name=" + pregunta.IdVersionamientoPreguntaEncriptado + ">" + pregunta.Pregunta.Descripcion + "</textarea></p>";
        }
      } else if (pregunta.Pregunta.TipoPregunta.Identificador == 3) {
        let dato = '';
        dato = "<ul><li><textarea cols='20' rows='3' name=" + pregunta.IdVersionamientoPreguntaEncriptado + ">" + pregunta.Pregunta.Descripcion + "</textarea></li></ul>";
        this.mycontent = this.mycontent.substring(0, this.mycontent.length - 5) + dato + "</p>";
      }else if (pregunta.Pregunta.TipoPregunta.Identificador == 4 || pregunta.Pregunta.TipoPregunta.Identificador == 6) {
        if (this.mycontentMatriz.trim() == "") {
          this.mensaje("Ingrese el contenido de la matriz");
        }else{
          var parser = new DOMParser();
	        var doc = parser.parseFromString(this.mycontentMatriz, 'text/html');
          if (this.mycontent.trim() == "") {
            this.mycontent = "<p><textarea cols='20' rows='3' name=" + pregunta.IdVersionamientoPreguntaEncriptado + ">" + doc.body.getElementsByTagName("p")[0].innerText + "</textarea></p>";
          } else {
            this.mycontent = this.mycontent.substring(0, this.mycontent.length - 5) + "<textarea cols='20' rows='3' name=" + pregunta.IdVersionamientoPreguntaEncriptado + ">" + doc.body.getElementsByTagName("p")[0].innerText + "</textarea>";
          }
          this.mycontentMatriz = "";
        }
      }
    } else {
      this.mensaje("Seleccione una pregunta")
    }
  }
  tablaCuestionariosPublicados = false;
  async _consultar_cuestionarioPublicado() {
    this.tablaCuestionariosPublicados = true;
    var respuesta = await this.cuestionarioPublicadoService._consultar_cuestionarioPublicado();
    if (respuesta['http']['codigo'] == "200") {
      this._listaCuestionarioPublicados.data = [];
      this._listaCuestionarioPublicados.data = respuesta['respuesta'];
      this.dataSource = respuesta['respuesta'];
      this._listaCuestionarioPublicados.paginator = this.paginator;
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
    this.tablaCuestionariosPublicados = false;
  }
  comboPregunta = false;
  async _ConsultarPreguntasPorCuestionarioPublicadoComponente() {
    this.comboPregunta = true;
    var respuesta = await this.CaracterizacionService._ConsultarPreguntasPorCuestionarioPublicadoComponente(this.data.IdCuestionarioPublicado, this.data.IdComponente.Componente.IdComponenteEncriptado);
    if (respuesta['http']['codigo'] == "200") {
      this.form.controls['selectPregunta'].setValue("0");
      this._listaPregunta = [];
      this._listaPregunta = respuesta['respuesta'];
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
    this.comboPregunta = false;
  }
  onChange($event: any): void {
    // console.log($event);
  }
  onPaste($event: any): void {
    // console.log("onPaste");
  }
  async _insertarConfigurarComponente() {
    console.log(this.formGroup.controls['Mapa'].value)
    let imagen = 0;
    if (this.formGroup.controls['Mapa'].value) {
      imagen = 1;
    }else{
      imagen = 0;
    }
    this.mensaje("Guardando ...",0, 'msj-info');
    var respuesta = await this.CaracterizacionService._insertarConfigurarComponente(localStorage.getItem('IdAsignarUsuarioTipoUsuarioEncriptado'), this.data.IdComponente.IdAsignarComponenteGenericoEncriptado, this.mycontent,imagen);
    if (respuesta['http']['codigo'] == "200") {
      this.snackBarComponent.dismiss();
      this.mensaje("Ingresado correctamente",null, 'msj-success');
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
  }
  async _consultarConfigurarComponentePorComponente() {
    var respuesta = await this.CaracterizacionService._consultarConfigurarComponentePorComponente(this.data.IdComponente.IdAsignarComponenteGenericoEncriptado);
    if (respuesta['http']['codigo'] == "200") {
      if (respuesta['respuesta'] != null) {
        this.mycontent = respuesta['respuesta'].Contenido;
        if (respuesta['respuesta'].Imagen == 1) {
          this.formGroup.controls['Mapa'].setValue(true);
        }else{
          this.formGroup.controls['Mapa'].setValue(false);
        }
      }
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
  }
  moduloCaracterizacion = true;
  _listaModeloGenerico = new MatTableDataSource<Element[]>();
  tablaComponentesDeCuestionario = false;
  tablaModelosGenericos = ['No', 'NOMBRE','ACCION'];
  async consultarModeloGenericoTodos() {
    this.tablaComponentesDeCuestionario = true;
    var respuesta = await this.CaracterizacionService._consultarModeloGenericoTodos();
    if (respuesta['http']['codigo'] == "200") {
      this._listaModeloGenerico.data = [];
      this._listaModeloGenerico.data = respuesta['respuesta'];
      this._listaModeloGenerico.paginator = this.paginator;
    } else {
      this.mensaje(respuesta['http']['mensaje']);
    }
    this.tablaComponentesDeCuestionario = false;
  }
  applyFilterCaracterizacion(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._listaModeloGenerico.filter = filterValue.trim().toUpperCase();
  }
  seleccionarCaracterizacion(element){
    this.dialogRef.close(element);
  }
  ngOnInit() {
    if (this.data == 1) {
      this.moduloCaracterizacion = true;
      this.mostrarCuestionarios = true;
      this._consultar_cuestionarioPublicado();
    }else if(this.data == 2){
      this.moduloCaracterizacion = false;
      this.consultarModeloGenericoTodos();
    }else {
      this.moduloCaracterizacion = true;
      this._consultarConfigurarComponentePorComponente();
      this.Componente = this.data.IdComponente.Componente.Descripcion;
      this.ckeConfig = {
        allowedContent: false,
        forcePasteAsPlainText: true,
        // removePlugins: 'horizontalrule',
        removeButtons: 'Link,Unlink,Button,TextField,Save,NewPage,Templates,Form,Checkbox,Radio,Find,Select,ImageButton,HiddenField,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,PageBreak,Iframe,ShowBlocks,Table,Image,Source,Maximize,Anchor,SpecialChar,PasteFromWord,Scayt,Undo,Redo,Strike,Indent,Outdent,Blockquote'
      };
      this.ckeConfigMatriz={
        allowedContent: false,
        width:"100%",
        height:"70px",
        forcePasteAsPlainText: true,
        // removePlugins: 'horizontalrule',
        removeButtons: 'Link,Unlink,TextField,Save,NewPage,Templates,Form,Checkbox,Radio,Find,Select,ImageButton,HiddenField,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,PageBreak,Iframe,ShowBlocks,Table,Image,Source,Maximize,Anchor,SpecialChar,PasteFromWord,Scayt,Undo,Redo,Strike,Indent,Outdent,Blockquote'
      }
      this._ConsultarPreguntasPorCuestionarioPublicadoComponente();
    }
  }

}
