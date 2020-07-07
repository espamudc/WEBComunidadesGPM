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
      this.http.post(url+'pregunta_consultarporidseccion?_idSeccionEncriptado='+_idSeccionEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  
  _consultarPreguntasSeleccionUnicaPorSeccion(_idSeccionEncriptado){
    const _body = new HttpParams();   
    return new Promise((resolve, reject) => {
      this.http.post(url+'pregunta_consultarseleccionunicaporidseccion?_idSeccionEncriptado='+_idSeccionEncriptado,_body.toString(),{headers:this._header})
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

  _subirPreguntaSeccionComponenteCuestionarioGenerico(
    _IdPreguntaEncriptado,
  ){
  const _body = new HttpParams()
    .set("IdPreguntaEncriptado",_IdPreguntaEncriptado)
  ;
  
  return new Promise((resolve, reject) => {
    this.http.post(url+'subir_pregunta',_body.toString(),{headers:this._header})
              .subscribe(res=>{
                resolve(res);
              },(err)=>{
                reject(err);
              });
  });
}

_subirComponenteCuestionarioGenerico(
  _IdComponenteEncriptado,
){
const _body = new HttpParams()
  .set("IdComponenteEncriptado",_IdComponenteEncriptado)
;

return new Promise((resolve, reject) => {
  this.http.post(url+'subir_componente',_body.toString(),{headers:this._header})
            .subscribe(res=>{
              resolve(res);
            },(err)=>{
              reject(err);
            });
});
}

_subirSeccionCuestionarioGenerico(
  _IdSeccionEncriptado,
){
const _body = new HttpParams()
  .set("IdSeccionEncriptado",_IdSeccionEncriptado)
;

return new Promise((resolve, reject) => {
  this.http.post(url+'subir_seccion',_body.toString(),{headers:this._header})
            .subscribe(res=>{
              resolve(res);
            },(err)=>{
              reject(err);
            });
});
}

_bajarSeccionCuestionarioGenerico(
  _IdSeccionEncriptado,
){
const _body = new HttpParams()
  .set("IdSeccionEncriptado",_IdSeccionEncriptado)
;

return new Promise((resolve, reject) => {
  this.http.post(url+'bajar_seccion',_body.toString(),{headers:this._header})
            .subscribe(res=>{
              resolve(res);
            },(err)=>{
              reject(err);
            });
});
}

_bajarComponenteCuestionarioGenerico(
  _IdComponenteEncriptado,
){
const _body = new HttpParams()
  .set("IdComponenteEncriptado",_IdComponenteEncriptado)
;

return new Promise((resolve, reject) => {
  this.http.post(url+'bajar_componente',_body.toString(),{headers:this._header})
            .subscribe(res=>{
              resolve(res);
            },(err)=>{
              reject(err);
            });
});
}

_bajarPreguntaSeccionComponenteCuestionarioGenerico(
  _IdPreguntaEncriptado,
){
const _body = new HttpParams()
  .set("IdPreguntaEncriptado",_IdPreguntaEncriptado)
;

return new Promise((resolve, reject) => {
  this.http.post(url+'bajar_pregunta',_body.toString(),{headers:this._header})
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

  _pregunta_consultarpornoencajonadasporopcionpreguntaseleccion(_idOpcionPreguntaSeleccionEncriptado){
    const _body = new HttpParams();
    
    return new Promise((resolve, reject) => {
      this.http.post(url+'pregunta_consultarpornoencajonadasporopcionpreguntaseleccion?_idOpcionPreguntaSeleccionEncriptado='+_idOpcionPreguntaSeleccionEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }

}
