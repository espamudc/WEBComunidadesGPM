import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TipoUsuario } from 'src/app/interfaces/tipo-usuario/tipo-usuario';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';
import { AsignarUsuarioTipoUsuarioService } from 'src/app/services/asignar-usuario-tipo-usuario.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-modal-asignacion-usuario-tipos-usuario',
  templateUrl: './modal-asignacion-usuario-tipos-usuario.component.html',
  styleUrls: ['./modal-asignacion-usuario-tipos-usuario.component.css']
})
export class ModalAsignacionUsuarioTiposUsuarioComponent implements OnInit {

  constructor(private snackBarComponent: MatSnackBar,
    private tipoUsuariosService:TipoUsuarioService,
    private asignarUsuarioTipoUsuarioService:AsignarUsuarioTipoUsuarioService,
    private usuarioService: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  @ViewChild('testSelect', { static: false }) testSelect: ElementRef={'nativeElement':{'value':'0'}};

  botonEliminar = false;
  idUsuario = this.data.idUsuario;
  tipoUsuario = '0';
  tipoUsuarios: TipoUsuario[] = [];
  idTipoUsuario: string;
  descripcion: string;



  arrayIndexesTipoUsuario: string[] = [];
  ngOnInit() {
    this._consultarTiposUsuariosNoAsignados();
    this._consultarTiposUsuariosAsignados();
  
  }

  _listaTiposUsuarios:any[]=[];
  _listaAsignarUsuarioTipoUsuario:any[]=[];
  _consultarTiposUsuariosAsignados(){
     this.asignarUsuarioTipoUsuarioService._consultarAsignarUsuarioTipoUsuario(this.data._usuario.IdUsuarioEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaAsignarUsuarioTipoUsuario=data['respuesta'];

        }else{
        }
      })
      .catch(error=>{
      });
  }
  _consultarTiposUsuariosNoAsignados(){
    this.tipoUsuariosService._consultarTiposUsuariosNoAsignados(this.data._usuario.IdUsuarioEncriptado)
        .then(data=>{
          if (data['http']['codigo']=="200") {
            this._listaTiposUsuarios = data['respuesta'];
          }else{
          }
        })
        .catch(error=>{
        });
  }
  _asignarTipoUsuario(){
    if(this.testSelect.nativeElement.value!=0){
      this.asignarUsuarioTipoUsuarioService._insertarAsignarUsuarioTipoUsuario(
        this.data._usuario.IdUsuarioEncriptado,
        this.testSelect.nativeElement.value
      ).then(data=>{
        if (data['http']['codigo']=='200') {
          this._consultarTiposUsuariosNoAsignados();
          this._consultarTiposUsuariosAsignados();
          this.testSelect.nativeElement.value="0";
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else{
        }
      }).catch(error=>{
  
      });
    }
    

  }

  _eliminarTipoUsuarioDeLista(_item:any){
    this.asignarUsuarioTipoUsuarioService._eliminarAsignarUsuarioTipoUsuario(_item.IdAsignarUsuarioTipoUsuarioEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._consultarTiposUsuariosNoAsignados();
          this._consultarTiposUsuariosAsignados();
          this.testSelect.nativeElement.value="0";
        }else if (data['http']['codigo']=='500') {
          this.mensaje("A ocurrido un error inesperado, intente más tarde.")
        }else{
        }
      })
      .catch(error=>{
      });
  }

  onCangeSelectTipoU(event:any){
  }
  
  mensaje(_mensaje:string,_duracion?:number,_opcion?:number,_color?:string){

    
    if (_duracion==null) {
       _duracion=3000;
    }
    if (_opcion==1) {
      _mensaje="Datos ingresados correctamente";
    }
    if (_opcion==2) {
      _mensaje="Datos modificados correctamente";
    }
    if (_opcion==3) {
      _mensaje="Datos eliminados correctamente";
    }
    if (_color==null) {
      _color ="gpm-danger";
    }
    let snackBarRef = this.snackBarComponent.open(_mensaje,null,{duration:_duracion,panelClass:['text-white',`${_color}`],data:{}});
  }

}
