import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CuestionarioGenericoService {

  constructor(private http: HttpClient) { }

  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  _consultarCuestionarioGenerioco(){
    const _body = new HttpParams();
    
    return new Promise((resolve, reject) => {
      this.http.post(url+'cuestionariogenerico_consultar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _consultarCuestionarioGeneriocoPorIdAsignarUsuarioTipoUsuarioEncriptado(
    _IdAsignarUsuarioTipoUsuarioEncriptado:any
  ){
    const _body = new HttpParams();
    
    return new Promise((resolve, reject) => {
      this.http.post(url+'asignarresponsable_consultarporidasignarusuariotipousuario?_idAsignarUsuarioTipoUsuarioEncriptado='+_IdAsignarUsuarioTipoUsuarioEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _insertarCuestionarioGenerioco(_Nombre:any,_Descripcion:any){
    const _body = new HttpParams()
      .set('Nombre'     ,_Nombre)
      .set('Descripcion',_Descripcion)
    ;
    
    return new Promise((resolve, reject) => {
      this.http.post(url+'cuestionariogenerico_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _modificarCuestionarioGenerioco(_IdCuestionarioGenericoEncriptado:any,_Nombre:any,_Descripcion:any){
    const _body = new HttpParams()
      .set('IdCuestionarioGenericoEncriptado'     ,_IdCuestionarioGenericoEncriptado)
      .set('Nombre'     ,_Nombre)
      .set('Descripcion',_Descripcion)
    ;
    
    return new Promise((resolve, reject) => {
      this.http.post(url+'cuestionariogenerico_modificar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _eliminarCuestionarioGenerioco(_IdCuestionarioGenericoEncriptado:any){
    const _body = new HttpParams()
      
    ;
    
    return new Promise((resolve, reject) => {
      this.http.post(url+'cuestionariogenerico_eliminar?_idCuestionarioGenericoEncriptado='+_IdCuestionarioGenericoEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _cuestionariogenerico_consultarporidconcomponenteconseccionconpregunta(IdCuestionarioGenericoEncriptado)
  {
    
    const _body = new HttpParams()
     ;
     return new Promise((resolve, reject) => {
      this.http.post(url+'cuestionariogenerico_consultarporidconcomponenteconseccionconpreguntas?_idCuestionarioGenericoEncriptado='+IdCuestionarioGenericoEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _cuestionariogenerico_consultarporidconcomponenteconseccionconpreguntaRandom(IdCuestionarioGenericoEncriptado)
  {
    
    const _body = new HttpParams()
     ;
     return new Promise((resolve, reject) => {
      this.http.post(url+'cuestionariogenerico_consultarporidconcomponenteconseccionconpreguntasRandom?_idCuestionarioGenericoEncriptado='+IdCuestionarioGenericoEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _cuestionariogenerico_consultarporpreguntaRandom(IdCuestionarioGenericoEncriptado, IdVersionEncriptado, IdComunidadEncriptado)
  {
    
    const _body = new HttpParams()
     ;
     return new Promise((resolve, reject) => {
      this.http.post(url+'cuestionariogenerico_consultarporpreguntasRandom?_idCuestionarioGenericoEncriptado='+IdCuestionarioGenericoEncriptado+'&_idVersionEncriptado='+IdVersionEncriptado+'&_idComunidadEncriptado='+IdComunidadEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _cuestionariogenerico_consultarporversion(IdCuestionarioGenericoEncriptado, IdCabeceraVersionCuestionarioEncriptado)
  {
    
    const _body = new HttpParams()
          ;
    
     return new Promise((resolve, reject) => {
      this.http.post(url+'cuestionariogenerico_consultarporversion?_idCuestionarioGenericoEncriptado='+IdCuestionarioGenericoEncriptado+'&IdCabeceraVersionCuestionarioEncriptado='+IdCabeceraVersionCuestionarioEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

}
