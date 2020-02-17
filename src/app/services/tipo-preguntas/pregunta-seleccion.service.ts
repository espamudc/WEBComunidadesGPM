import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class PreguntaSeleccionService {

  constructor(private http: HttpClient) { }
  
  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  _consultarOpcionPreguntaSeleccion(
    _IdPreguntaEncriptado
    
  ){
    const _body = new HttpParams()
    ;

    return new Promise((resolve, reject) => {
      this.http.post(url+'opcionpreguntaseleccion_consultarporidpregunta?_idPreguntaEncriptado='+_IdPreguntaEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _insertarOpcionPreguntaSeleccion(
    _IdPreguntaEncriptado,
    _IdTipoPreguntaEncriptado,
    _Descripcion,
  ){
    const _body = new HttpParams()
      .set('Descripcion'          ,_Descripcion)
      .set('Pregunta.IdPreguntaEncriptado',_IdPreguntaEncriptado)
      .set('Pregunta.TipoPregunta.IdTipoPreguntaEncriptado',_IdTipoPreguntaEncriptado);

    return new Promise((resolve, reject) => {
      this.http.post(url+'opcionpreguntaseleccion_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _eliminarOpcionPreguntaSeleccion(
    _idOpcionPreguntaSeleccionEncriptado
  ){
    const _body = new HttpParams()
      ;

    return new Promise((resolve, reject) => {
      this.http.post(url+'opcionpreguntaseleccion_eliminar?_idOpcionPreguntaSeleccionEncriptado='+_idOpcionPreguntaSeleccionEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

}
