import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AsignarResponsableCuestionarioGenericoService {

  constructor(private http: HttpClient) { }
  
  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  _consultarAsignarResponsableCuestionarioGenerico(
    _IdCuestionarioGenericoEncriptado:any
  ){
    const _body = new HttpParams();
    
    return new Promise((resolve, reject) => {
      this.http.post(url+'asignarresponsable_consultarporidcuestionariogenerico?_idCuestionarioGenericoEncriptado='+_IdCuestionarioGenericoEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _insertarAsignarResponsableCuestionarioGenerico(
    _IdCuestionarioGenericoEncriptado:any,
    _IdAsignarUsuarioTipoUsuarioEncriptado:any,
    _FechaAsignacion?:any
  ){
    const _body = new HttpParams()
      .set('CuestionarioGenerico.IdCuestionarioGenericoEncriptado'          ,_IdCuestionarioGenericoEncriptado)
      .set('AsignarUsuarioTipoUsuario.IdAsignarUsuarioTipoUsuarioEncriptado',_IdAsignarUsuarioTipoUsuarioEncriptado)
      .set('FechaAsignacion',_FechaAsignacion);

    return new Promise((resolve, reject) => {
      this.http.post(url+'asignarresponsable_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _eliminarAsignarResponsableCuestionarioGenerico(
    _IdAsignarResponsableEncriptado:any,
  ){
    const _body = new HttpParams();

    return new Promise((resolve, reject) => {
      this.http.post(url+'asignarresponsable_eliminar?_idAsignarResponsableEncriptado='+_IdAsignarResponsableEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _cambiarEstadoAsignarResponsableCuestionarioGenerico(
    _IdAsignarResponsableEncriptado:any,
  ){
    const _body = new HttpParams();

    return new Promise((resolve, reject) => {
      this.http.post(url+'asignarresponsable_cambiarestado?_idAsignarResponsableEncriptado='+_IdAsignarResponsableEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

}
