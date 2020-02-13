import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PreguntaAbiertaService {

  constructor(private http: HttpClient) { }
  
  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  _consultarPreguntaAbiertaTipoDatos(){
    const _body = new HttpParams()
    ;

    return new Promise((resolve, reject) => {
      this.http.post(url+'tipodato_consultar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _consultarOpcionesPreguntasAbiertas(
    _idPreguntaEncriptado
  ){
    const _body = new HttpParams()
    ;

    return new Promise((resolve, reject) => {//preguntaabierta_consultarporidpregunta
      this.http.post(url+'preguntaabierta_consultarporidpregunta?_idPreguntaEncriptado='+_idPreguntaEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _insertarOpcionPreguntaAbierta(
    // _idPreguntaAbiertaEncriptado,
    _idPreguntaEncriptadoEncriptado,
    _idTipoPreguntaEncriptado,
    _idTipoDatoEncriptado,
    _especificaRango,
    _valorMinimo?,
    _valorMaximo?
  ){
    const _body = new HttpParams()
    .set("Pregunta.IdPreguntaEncriptado",_idPreguntaEncriptadoEncriptado)
    .set("Pregunta.TipoPregunta.IdTipoPreguntaEncriptado",_idTipoPreguntaEncriptado)
    .set("TipoDato.IdTipoDatoEncriptado",_idTipoDatoEncriptado)
    .set("EspecificaRango",_especificaRango)
    .set("ValorMinimo",_valorMinimo)
    .set("ValorMaximo",_valorMaximo)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'preguntaabierta_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _eliminarOpcionPreguntaAbierta(
    _idPreguntaEncriptado
  ){
    const _body = new HttpParams()
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'opcionpreguntaseleccion_consultarporidpregunta?_idPreguntaEncriptado='+_idPreguntaEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

}
