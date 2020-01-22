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
  listaTipoUsuario = this.data.listaTipoUsuario;
  idTipoUsuario: string;
  descripcion: string;

  agregarTipoUsuarioALista(tipoUsuario) {
    this.idTipoUsuario = tipoUsuario.target.value;
    this.descripcion = tipoUsuario.target.selectedOptions[0].label;
    if (tipoUsuario.target.value != 0) {
      this.testSelect.nativeElement.disabled = true;
      this.botonEliminar = true;
    }
  }

  asignarTipoUsuario() {
    this.usuarioService.asignacionTipoUsuario(
      this.idUsuario,
      this.tipoUsuario,
      localStorage.getItem('miCuenta.postToken'))
      .then(
        ok => {
          if (ok['respuesta'] == true) {
            this.tipoUsuario = '0';
            this.listaTipoUsuario.push({
              IdTipoUsuario: this.idTipoUsuario,
              Descripcion: this.descripcion
            })
            this.testSelect.nativeElement.disabled = false;
            this.botonEliminar = false;
            this.consultarAsignacionTipoUsuario();
          };
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      )
  }

  eliminarTipoUsuarioDeLista(tipoUsuario) {
    const index = this.listaTipoUsuario.indexOf(tipoUsuario);
    if (index >= 0) {
      this.listaTipoUsuario.splice(index, 1);
    }
    this.eliminarAsignacionTipoUsuario(tipoUsuario);
  }

  eliminarAsignacionTipoUsuario(tipoUsuario) {
    this.usuarioService.eliminarAsignacionTipoUsuario(
      tipoUsuario.IdAsignacionTu,
      localStorage.getItem('miCuenta.deleteToken'))
      .then(
        ok => {
          this.consultarAsignacionTipoUsuario();
        },
      )
      .catch(
        err => {
          console.log(err);
        }
      )
  }

  consultarTipoUsuario() {
    this.usuarioService.consultarTipoUsuario(localStorage.getItem('miCuenta.getToken'))
      .then(
        ok => {
          this.tipoUsuarios = [];
          ok['respuesta'].map(
            item => {
              if (!this.arrayIndexesTipoUsuario.includes(item.Identificacion)) {
                this.tipoUsuarios.push({
                  IdTipoUsuario: item.IdTipoUsuario,
                  Descripcion: item.Descripcion
                });
              }
            }
          )
        }
      )
      .catch(
        error => {
          console.log(error)
        }
      )
  }

  consultarAsignacionTipoUsuario() {
    this.usuarioService.consultarAsignacionTipoUsuario(
      this.idUsuario,
      localStorage.getItem('miCuenta.getToken')
    )
      .then(
        ok => {
          this.arrayIndexesTipoUsuario = [];
          this.listaTipoUsuario = [];
          this.listaTipoUsuario = ok['respuesta'];
          ok['respuesta'].map(
            item => {
              this.arrayIndexesTipoUsuario.push(item.Identificacion);
            }
          )
          this.consultarTipoUsuario();
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      )
  }

  arrayIndexesTipoUsuario: string[] = [];
  ngOnInit() {
    // this.testSelect.nativeElement.value="0";
    this._consultarTiposUsuarios();
    this._consultarTiposUsuariosUsados();
    // this.consultarTipoUsuario();
    // this.listaTipoUsuario.map(
    //   item => {
    //     this.arrayIndexesTipoUsuario.push(item.Identificacion);
    //   }
    // )
  }
//----------------------------------------------------------------------------------------------
  _listaTiposUsuarios:any[]=[];
  _consultarTiposUsuarios(){
    console.log("_consultarTiposUsuarios");
     this.tipoUsuariosService.consultarTiposUsuarios()
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaTiposUsuarios = data['respuesta'];
        }else{
          console.log(data['http']);          
        }
      })
      .catch(error=>{
        console.log(error);   
      });
  }

  _listaAsignarUsuarioTipoUsuario:any[]=[];
  _consultarTiposUsuariosUsados(){
    console.log("_consultarTiposUsuariosUsados");
     this.asignarUsuarioTipoUsuarioService._consultarAsignarUsuarioTipoUsuario(this.data._usuario.IdUsuarioEncriptado)
      .then(data=>{
        if (data['http']['codigo']=='200') {
          data['respuesta'].map(element => {
            this._listaAsignarUsuarioTipoUsuario.push(element['TipoUsuario']);
          });

        }else{
          console.log(data['http']);
        }
      })
      .catch(error=>{
        console.log(error);
      });
  }

  _validarTiposUsados(){
    this._listaAsignarUsuarioTipoUsuario.map((item,index)=>{
      var obj= this._listaTiposUsuarios.find(dato=>dato.IdTipoUsuarioEncriptado===item.IdTipoUsuarioEncriptado);
      if (this._listaTiposUsuarios.includes(obj)) {
        var indexOf = this._listaTiposUsuarios.indexOf(obj);
        this._listaTiposUsuarios.splice(indexOf,1);
      }
    });
    console.log(this._listaTiposUsuarios);
  }
  _tipoUsuario:any="0";
  _asignarTipoUsuario(){
    console.log(this.testSelect.nativeElement.value);
  }
  onCangeSelectTipoU(event:any){
    console.log(event.target.value);
    
  }

  _eliminarTipoUsuarioDeLista(_tipo:any){

  }

  // _borrarTipoUsuario(_item){
  //   console.log(_item);
  //   // this._listaTiposUsuarios.find(dato=>dato.IdTipoUsuarioEnciptado==_item.IdTipoUsuarioEnciptado)
  //   console.log("indexof",this._listaTiposUsuarios.indexOf(dato => dato.IdTipoUsuarioEncriptado == _item.IdTipoUsuarioEncriptado));
  //   // debugger
  //   // this._listaTiposUsuarios.splice(this._listaTiposUsuarios.indexOf(dato => dato.IdTipoUsuarioEnciptado === _item.IdTipoUsuarioEnciptado), 1);
  // }

}
