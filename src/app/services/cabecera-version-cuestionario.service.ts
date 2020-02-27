import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CabeceraVersionCuestionarioService {

  constructor(private http: HttpClient) { }
  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  _insertarCabeceraVersionCuestionario(
    _IdAsignarResponsableEncriptado,
    _Caracteristica,
    _Version
  ){
    const _body = new HttpParams()
    .set("AsignarResponsable.IdAsignarResponsableEncriptado",_IdAsignarResponsableEncriptado)
    .set("Caracteristica",_Caracteristica)
    .set("Version",_Version)
    ;
    
    return new Promise((resolve, reject) => {
      this.http.post(url+'cabeceraversioncuestionario_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }

  _consultarCabeceraVersionCuestionario(
    _IdCuestionarioGenericoEncriptado
  ){
    const _body = new HttpParams()
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'cabeceraversioncuestionario_consultarporidcuestionariogenerico?_idCuestionarioGenericoEncriptado='+_IdCuestionarioGenericoEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _eliminarCabeceraVersionCuestionario(_idCabeceraVersionCuestionarioEncriptado){
    const _body = new HttpParams()
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'cabeceraversioncuestionario_eliminar?_idCabeceraVersionCuestionarioEncriptado='+_idCabeceraVersionCuestionarioEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

}
