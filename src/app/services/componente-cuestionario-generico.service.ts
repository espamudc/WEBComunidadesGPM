import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ComponenteCuestionarioGenericoService {

  constructor(private http: HttpClient) { }

  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  _consultarComponentesDeCuestionario(
    _IdCuestionarioGenerioEncriptado
  ){
    const _body = new HttpParams();
    
    return new Promise((resolve, reject) => {
      this.http.post(url+'componente_consultarporidcuestionariogenerico?_idCuestionarioGenerioEncriptado='+_IdCuestionarioGenerioEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _insertarComponenteCuestionarioGenerico( 
    _IdCuestionarioGenericoEncriptado ,
    _Descripcion,
    _Orden
  ){
    const _body = new HttpParams()
    .set("CuestionarioGenerico.IdCuestionarioGenericoEncriptado",_IdCuestionarioGenericoEncriptado)
    .set("Descripcion",_Descripcion)
    .set("Orden",_Orden)

    ;
    
    return new Promise((resolve, reject) => {
      this.http.post(url+'componente_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _modificarComponenteCuestionarioGenerico(
    _IdComponenteEncriptado, 
    _IdCuestionarioGenericoEncriptado ,
    _Descripcion,
    _Orden
  ){
    const _body = new HttpParams()
    .set("IdComponenteEncriptado",_IdComponenteEncriptado)
    .set("CuestionarioGenerico.IdCuestionarioGenericoEncriptado",_IdCuestionarioGenericoEncriptado)
    .set("Descripcion",_Descripcion)
    .set("Orden",_Orden)

    ;
    
    return new Promise((resolve, reject) => {
      this.http.post(url+'componente_modificar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _eliminarComponenteCuestionarioGenerico(
    _idComponenteEncriptado
  ){
    const _body = new HttpParams();

    return new Promise((resolve, reject) => {
      this.http.post(url+'componente_eliminar?_idComponenteEncriptado='+_idComponenteEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }





}
