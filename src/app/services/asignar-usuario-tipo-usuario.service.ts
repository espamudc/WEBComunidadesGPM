import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AsignarUsuarioTipoUsuarioService {

  constructor(private http: HttpClient) { }
  
  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  _consultarAsignarUsuarioTipoUsuario(_IdUsuarioEncriptado:string)
  {
    const _body = new HttpParams();
    
    return new Promise((resolve, reject) => {
      this.http.post(url+'asignarusuariotipousuario_consultar?_IdUsuarioEncriptado='+_IdUsuarioEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _insertarAsignarUsuarioTipoUsuario(
    _IdUsuarioEncriptado:string,
    _IdTipoUsuarioEncriptado:string
  ){
    const _body = new HttpParams()
      .set('Usuario.IdUsuarioEncriptado',_IdUsuarioEncriptado)
      .set('TipoUsuario.IdTipoUsuarioEncriptado',_IdTipoUsuarioEncriptado);
      return new Promise((resolve, reject) => {
        this.http.post(url+'asignarusuariotipousuario_insertar',_body.toString(),{headers:this._header})
                  .subscribe(res=>{
                    resolve(res);
                  },(err)=>{
                    reject(err);
                  });
      });
  }

  _eliminarAsignarUsuarioTipoUsuario(_IdAsignarUsuarioTipoUsuarioEncriptado){
    const _body = new HttpParams();
      // .set('_IdAsignarUsuarioTipoUsuarioEncriptado',_IdAsignarUsuarioTipoUsuarioEncriptado);
      return new Promise((resolve, reject) => {
        this.http.post(url+'asignarusuariotipousuario_eliminar?_IdAsignarUsuarioTipoUsuarioEncriptado='+_IdAsignarUsuarioTipoUsuarioEncriptado,_body.toString(),{headers:this._header})
                  .subscribe(res=>{
                    resolve(res);
                  },(err)=>{
                    reject(err);
                  });
      });
  }

  _consultarAsignarUsuarioTipoUsuario_No_responsablesporcuestionariogenericoporidentificadortipousuario(
    _idCuestionarioGenericoEncriptado,
    _identificadorTipoUsuario:any
  ){
    const _body = new HttpParams();
      return new Promise((resolve, reject) => {
        this.http.post(url+'asignarusuariotipousuario_consultarnoasignadosresponsablesporcuestionariogenericoporidentificadortipousuario?_idCuestionarioGenericoEncriptado='+_idCuestionarioGenericoEncriptado+'&_identificadorTipoUsuario='+_identificadorTipoUsuario,_body.toString(),{headers:this._header})
                  .subscribe(res=>{
                    resolve(res);
                  },(err)=>{
                    reject(err);
                  });
      });
  }
  
}
