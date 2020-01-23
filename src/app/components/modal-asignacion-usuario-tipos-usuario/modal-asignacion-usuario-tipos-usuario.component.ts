import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TipoUsuario } from 'src/app/interfaces/tipo-usuario/tipo-usuario';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';
import { AsignarUsuarioTipoUsuarioService } from 'src/app/services/asignar-usuario-tipo-usuario.service';
// import { element } from 'protractor';

@Component({
  selector: 'app-modal-asignacion-usuario-tipos-usuario',
  templateUrl: './modal-asignacion-usuario-tipos-usuario.component.html',
  styleUrls: ['./modal-asignacion-usuario-tipos-usuario.component.css']
})
export class ModalAsignacionUsuarioTiposUsuarioComponent implements OnInit {

  constructor(
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
    // this.testSelect.nativeElement.value="0";
    // this._consultarTiposUsuarios().then(data=>{
    //   this._consultarTiposUsuariosUsados();
    // }).finally(()=>{
      
    // });
  
  }
// ----------------------------------------------------------------------------------------------
  // _ordenar(){
  //   this._listaTiposUsuarios.sort();
  //   this._listaAsignarUsuarioTipoUsuario.sort();
  // }
  _listaTiposUsuarios:any[]=[];

  _listaAsignarUsuarioTipoUsuario:any[]=[];
  _consultarTiposUsuariosAsignados(){
    console.log("_consultarTiposUsuariosUsados");
     this.asignarUsuarioTipoUsuarioService._consultarAsignarUsuarioTipoUsuario(this.data._usuario.IdUsuarioEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaAsignarUsuarioTipoUsuario=data['respuesta'];

        }else{
          console.log(data['http']);
        }
      })
      .catch(error=>{
        console.log(error);
      });
  }
  _consultarTiposUsuariosNoAsignados(){
    this.tipoUsuariosService._consultarTiposUsuariosNoAsignados(this.data._usuario.IdUsuarioEncriptado)
        .then(data=>{
          if (data['http']['codigo']=="200") {
            // debugger
            this._listaTiposUsuarios = data['respuesta'];
          }else{
            console.log(data['http']);
          }
        })
        .catch(error=>{
          console.log(error);
        });
  }
  _asignarTipoUsuario(){
    console.log(this.testSelect.nativeElement.value);
    this.asignarUsuarioTipoUsuarioService._insertarAsignarUsuarioTipoUsuario(
      this.data._usuario.IdUsuarioEncriptado,
      this.testSelect.nativeElement.value
    ).then(data=>{
      if (data['http']['codigo']=='200') {
        this._consultarTiposUsuariosNoAsignados();
        this._consultarTiposUsuariosAsignados();
        this.testSelect.nativeElement.value="0";
      }else{
        console.log(data['http']);
      }
    }).catch(error=>{

    });

  }

  _eliminarTipoUsuarioDeLista(_item:any){
    this.asignarUsuarioTipoUsuarioService._eliminarAsignarUsuarioTipoUsuario(_item.IdAsignarUsuarioTipoUsuarioEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._consultarTiposUsuariosNoAsignados();
          this._consultarTiposUsuariosAsignados();
          this.testSelect.nativeElement.value="0";
        }else{
          console.log(data['http']);
        }
      })
      .catch(error=>{
        console.log(error);
      });
  }

  onCangeSelectTipoU(event:any){
    console.log(event.target.value); 
  }
  
}
