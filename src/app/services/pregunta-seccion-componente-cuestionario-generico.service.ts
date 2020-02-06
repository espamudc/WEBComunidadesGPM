import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PreguntaSeccionComponenteCuestionarioGenericoService {

  constructor(private http: HttpClient) { }

  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  _consultarPreguntasSeccionComponenteCuestionarioGenerico(_idSeccionEncriptado){
    const _body = new HttpParams();
    //debugger
   
    return new Promise((resolve, reject) => {
      this.http.post(url+'pregunta_consultaridseccion?_idSeccionEncriptado='+_idSeccionEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _insertarPreguntasSeccionComponenteCuestionarioGenerico(
      _IdTipoPreguntaEncriptado,
      _IdSeccionEncriptado,
      _Descripcion,
      _Orden,
      _Obligatorio,
    ){
    const _body = new HttpParams()
    .set("TipoPregunta.IdTipoPreguntaEncriptado",_IdTipoPreguntaEncriptado)
    .set("Seccion.IdSeccionEncriptado",_IdSeccionEncriptado)
    .set("Descripcion",_Descripcion)
    .set("Obligatorio",_Obligatorio)
    .set("Orden",_Orden)
    ;
    
    return new Promise((resolve, reject) => {
      this.http.post(url+'pregunta_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _modificarPreguntasSeccionComponenteCuestionarioGenerico(
      _IdPreguntaEncriptado,
      _IdTipoPreguntaEncriptado,
      _IdSeccionEncriptado,
      _Descripcion,
      _Orden,
      _Obligatorio,
    ){
    const _body = new HttpParams()
      .set("IdPreguntaEncriptado",_IdPreguntaEncriptado)
      .set("TipoPregunta.IdTipoPreguntaEncriptado",_IdTipoPreguntaEncriptado)
      .set("Seccion.IdSeccionEncriptado",_IdSeccionEncriptado)
      .set("Descripcion",_Descripcion)
      .set("Obligatorio",_Obligatorio)
      .set("Orden",_Orden)
    ;
    
    return new Promise((resolve, reject) => {
      this.http.post(url+'pregunta_modificar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _eliminarPreguntasSeccionComponenteCuestionarioGenerico(
    _IdPreguntaEncriptado
    ){
    const _body = new HttpParams();
    
    return new Promise((resolve, reject) => {
      this.http.post(url+'pregunta_eliminar?_idPreguntaEncriptado='+_IdPreguntaEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }


}
