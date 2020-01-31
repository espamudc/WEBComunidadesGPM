import { Component, OnInit } from '@angular/core';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';
import { ModalAsignarTipoUsuarioModuloPrivilegioComponent } from '../modal-asignar-tipo-usuario-modulo-privilegio/modal-asignar-tipo-usuario-modulo-privilegio.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrls: ['./tipo-usuario.component.css']
})
export class TipoUsuarioComponent implements OnInit {

  constructor(
    private tipoUsuarioService:TipoUsuarioService,
    private modalAsignarTipoUsuarioModuloPrivilegio:MatDialog
  ) { }

  ngOnInit() {
    this._consultarTiposUsuarios();
  }

  tablaTiposUsuarios=['descripcion','acciones'];
  tablaAsignarTipoUsuarioModuloPrivilegio=['modulos','privilegios','acciones'];
  _listaTiposUsuarios:any[]=[];

  _consultarTiposUsuarios(){
    this.tipoUsuarioService._consultarTiposUsuarios()
      .then(data=>{
        if (data['http']['codigo']=='200') {
          this._listaTiposUsuarios = data['respuesta'];
          console.log(this._listaTiposUsuarios);
        }else{
          console.log(data['http']);
        }
      })
      .catch(error=>{
        console.log(error);
      })
      .finally(()=>{

      });
  }

  _verAsignarModuloPrivilegio(_item){
    let dialogRef = this.modalAsignarTipoUsuarioModuloPrivilegio.open(ModalAsignarTipoUsuarioModuloPrivilegioComponent, {
      width: '900px',
      height: '500px',
      data: { _item }
    });
    dialogRef.afterClosed().subscribe(result=>{
      // console.log(result);
      if (result) {
        
      }
    }); 
  }

  _verTipoUsuario(_item){
    console.log(_item);
    
  }

}
