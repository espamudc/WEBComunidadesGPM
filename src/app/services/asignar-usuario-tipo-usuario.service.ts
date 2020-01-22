import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AsignarUsuarioTipoUsuarioService {

  constructor(private http: HttpClient) { }
  
  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  _consultarAsignarUsuarioTipoUsuario(_IdUsuarioEnciptado:string)
  {
    const _body = new HttpParams();
    
    return new Promise((resolve, reject) => {
      this.http.post(url+'asignarusuariotipousuario_consultar?_idUsuarioEncriptado='+_IdUsuarioEnciptado,_body.toString(),{headers:this._header})
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
      .set('IdUsuarioEncriptado',_IdUsuarioEncriptado)
      .set('IdTipoUsuarioEncriptado',_IdUsuarioEncriptado);
      return new Promise((resolve, reject) => {
        this.http.post(url+'asignarusuariotipousuario_insertar',_body.toString(),{headers:this._header})
                  .subscribe(res=>{
                    resolve(res);
                  },(err)=>{
                    reject(err);
                  });
      });
  }
  
}
