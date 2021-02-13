import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PreguntaMatrizService {

  constructor(private http: HttpClient) { }
  
  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  _consultarOpcionUnoPreguntaMatriz(
    _IdPreguntaEncriptado
  ){
    const _body = new HttpParams()
    ;

    return new Promise((resolve, reject) => {
      this.http.post(url+'opcionunomatriz_consultarporidpregunta?_idPreguntaEncriptado='+_IdPreguntaEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _insertarOpcionUnoPreguntaMatriz(
    _idPreguntaEncriptadoEncriptado,
    _idTipoPreguntaEncriptado,
    _Descripcion
  ){
    const _body = new HttpParams()
    .set("Pregunta.IdPreguntaEncriptado",_idPreguntaEncriptadoEncriptado)
    .set("Pregunta.TipoPregunta.IdTipoPreguntaEncriptado",_idTipoPreguntaEncriptado)
    .set("Descripcion",_Descripcion)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'opcionunomatriz_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _insertarPreguntaConfigurarMatriz(
    _IdPreguntaEncriptado,
    _Descripcion
  ){
    const _body = new HttpParams()
    .set("OpcionUnoMatriz.Pregunta.IdPreguntaEncriptado",_IdPreguntaEncriptado)
    .set("OpcionDosMatriz.Descripcion",_Descripcion)
    ;

    return new Promise((resolve, reject) => {
      this.http.post(url+'configurarmatriz_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _consultarPreguntaConfigurarMatriz(
    _IdPreguntaEncriptado,
  ){
    const _body = new HttpParams()
    ;

    return new Promise((resolve, reject) => {
      this.http.get(url+'configurarmatriz_consultarporidpregunta?_idPreguntaEncriptado='+_IdPreguntaEncriptado+'&_IdAsignarEncuestado='+null)
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _eliminarPreguntaMatrizOpcionUno(
    _IdOpcionUnoMatrizEncriptado
  ){
    const _body = new HttpParams()
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'opcionunomatriz_eliminar?_idOpcionUnoMatrizEncriptado='+_IdOpcionUnoMatrizEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _eliminarPreguntaMatrizOpcionDos(
    _IdOpcionDosMatrizEncriptado
  ){
    const _body = new HttpParams()
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'opciondosmatriz_eliminar?_idOpcionDosMatrizEncriptado='+_IdOpcionDosMatrizEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

}
