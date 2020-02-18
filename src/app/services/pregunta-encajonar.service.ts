import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PreguntaEncajonarService {

  constructor(private http: HttpClient) { }

//----------------------------------------------------------------------------------------------

  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  _preguntaencajonada_consultarporidopcionpreguntaseleccion(_idOpcionPregunta)
  {
    const _body = new HttpParams();
    //debugger
   
    return new Promise((resolve, reject) => {
      this.http.post(url+'preguntaencajonada_consultarporidopcionpreguntaseleccion?_idOpcionPreguntaSeleccionEncriptado='+_idOpcionPregunta,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  
  _preguntaencajonada_insertar(
    _IdOpcionPreguntaSeleccionEncriptado,
    _IdPreguntaEncriptadoHijo
  ){
    const _body = new HttpParams()
      .set("OpcionPreguntaSeleccion.IdOpcionPreguntaSeleccionEncriptado",_IdOpcionPreguntaSeleccionEncriptado)
      .set("Pregunta.IdPreguntaEncriptado",_IdPreguntaEncriptadoHijo)
    ;
    //debugger
   
    return new Promise((resolve, reject) => {
      this.http.post(url+'preguntaencajonada_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _preguntaencajonada_eliminar(_idPreguntaEncajonadaEncriptado){
    const _body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.post(url+'preguntaencajonada_eliminar?_idPreguntaEncajonadaEncriptado='+_idPreguntaEncajonadaEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

}
