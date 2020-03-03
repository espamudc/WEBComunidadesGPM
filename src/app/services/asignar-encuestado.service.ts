import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AsignarEncuestadoService {

  constructor(private http: HttpClient) { }
  
  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  _insertarAsignarEncuestado(
    _idCuestionarioPublicadoEncriptado,
    _idComunidadEncriptado,
    _idAsignarUsuarioTipoUsuarioTecnicoEncriptado,
    _idAsignarUsuarioTipoUsuarioEncriptado,
    _obligatorio,
    _fechaInicio,
    _fechaFin
  ){
    const _body = new HttpParams()
      .set("CuestionarioPublicado.IdCuestionarioPublicadoEncriptado",_idCuestionarioPublicadoEncriptado)
      .set("Comunidad.IdComunidadEncriptado",_idComunidadEncriptado)
      .set("AsignarUsuarioTipoUsuarioTecnico.IdAsignarUsuarioTipoUsuarioEncriptado",_idAsignarUsuarioTipoUsuarioTecnicoEncriptado)
      .set("AsignarUsuarioTipoUsuario.IdAsignarUsuarioTipoUsuarioEncriptado",_idAsignarUsuarioTipoUsuarioEncriptado)
      .set("Obligatorio",_obligatorio)
      .set("FechaInicio",_fechaInicio)
      .set("FechaFin",_fechaFin)
    ;

    return new Promise((resolve, reject) => {
      this.http.post(url+'asignarencuestado_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }

  _consultar_poridcuestionariopublicado(
    _idCuestionarioGenericoEncriptado
  ){
    const _body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.post(url+'asignarencuestado_consultarporidcuestionariopublicado?_idCuestionarioPublicadoEncriptado='+_idCuestionarioGenericoEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _eliminarAsignarEncuestado(_idAsignarEncuestadoEncriptado){
    const _body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.post(url+'asignarencuestado_eliminar?_idAsignarEncuestadoEncriptado='+_idAsignarEncuestadoEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

}
