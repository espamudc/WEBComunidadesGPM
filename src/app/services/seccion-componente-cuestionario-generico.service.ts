import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SeccionComponenteCuestionarioGenericoService {

  constructor(private http: HttpClient) { }

  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  _consultarSeccionDeComponentesDeCuestionarioGenerico(
    _idComponenteEncriptado
  ){
    const _body = new HttpParams();
    
    return new Promise((resolve, reject) => {
      this.http.post(url+'seccion_consultarporidcomponente?_idComponenteEncriptado='+_idComponenteEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _insertarSeccionDeComponenteDeCuestionarioGenerico(
    _IdComponenteEncriptado,
    _Descripcion,
    _Orden
  ){

    const _body = new HttpParams()
    .set("Componente.IdComponenteEncriptado",_IdComponenteEncriptado)
    .set("Descripcion",_Descripcion)
    .set("Orden",_Orden)
    ;

    return new Promise((resolve, reject) => {
      this.http.post(url+'seccion_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }

  _eliminarSeccionDeComponenteDeCuestionarioGenerico(
    _idSeccionEncriptado
  ){
    const _body = new HttpParams();

    return new Promise((resolve, reject) => {
      this.http.post(url+'Seccion_eliminar?_idSeccionEncriptado='+_idSeccionEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }

  _modificarSeccionDeComponenteDeCuestionarioGenerico(
    _IdSeccionEncriptado,
    _IdComponenteEncriptado,
    _Descripcion,
    _Orden
  ){
    const _body = new HttpParams()
    .set("IdSeccionEncriptado",_IdSeccionEncriptado)
    .set("Componente.IdComponenteEncriptado",_IdComponenteEncriptado)
    .set("Descripcion",_Descripcion)
    .set("Orden",_Orden)
    ;

    return new Promise((resolve, reject) => {
      this.http.post(url+'seccion_modificar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }

  

}
