import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CuestionarioPublicadoService {

  constructor(private http: HttpClient) { }

  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  _insertar_cuestionarioPublicado(
    _IdAsignarUsuarioTipoUsuarioEncriptado,
    _IdCabeceraVersionCuestionarioEncriptado,
    _IdPeriodoEncriptado
  ){
    const _body = new HttpParams()
      .set("AsignarUsuarioTipoUsuario.IdAsignarUsuarioTipoUsuarioEncriptado",_IdAsignarUsuarioTipoUsuarioEncriptado)
      .set("CabeceraVersionCuestionario.IdCabeceraVersionCuestionarioEncriptado",_IdCabeceraVersionCuestionarioEncriptado)
      .set("Periodo.IdPeriodoEncriptado",_IdPeriodoEncriptado)
    ;

    return new Promise((resolve, reject) => {
      this.http.post(url+'cuestionariopublicado_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }

  _eliminar_cuestionarioPublicado(
    _idCuestionarioPublicadoEncriptado
  ){
    const _body = new HttpParams()
     ;

    return new Promise((resolve, reject) => {
      this.http.post(url+'cuestionariopublicado_eliminar?_idCuestionarioPublicadoEncriptado='+_idCuestionarioPublicadoEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }

  _consultar_cuestionarioPublicadoporidasignarusuariotipousuario(_idAsignarUsuarioTipoUsuarioEncriptado){
    
    const _body = new HttpParams();
    
    return new Promise((resolve, reject) => {
      this.http.post(url+'cuestionariopublicado_consultarporidasignarusuariotipousuario?_idAsignarUsuarioTipoUsuarioEncriptado='+_idAsignarUsuarioTipoUsuarioEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }

  _consultar_cuestionarioPublicado(){
    const _body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.post(url+'cuestionariopublicado_consultar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  

}
