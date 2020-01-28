import { Component, OnInit } from '@angular/core';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrls: ['./tipo-usuario.component.css']
})
export class TipoUsuarioComponent implements OnInit {

  constructor(
    private tipoUsuarioService:TipoUsuarioService
  ) { }

  ngOnInit() {
    this._consultarTiposUsuarios();
  }

  tablaTiposUsuarios=['descripcion','acciones'];
  _listaTiposUsuarios:any[]=[];

  _consultarTiposUsuarios(){
    this.tipoUsuarioService.consultarTiposUsuarios()
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
    
  }

}
