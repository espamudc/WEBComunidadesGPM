import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  constructor(private http: HttpClient) { }

  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  _consultarPeriodos(){
    const _body = new HttpParams();

    return new Promise((resolve, reject) => {
      this.http.post(url+'periodo_consultar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }


  _insertarPeriodo(

   
    _Descripcion:string,
    _FechaInicio:string,
    _FechaFin:string
  ){
    const _body = new HttpParams()
        
          .set('Descripcion'         ,_Descripcion)
          .set('FechaInicio'        ,_FechaInicio)
          .set('FechaFin'       ,_FechaFin)
          
 
    return new Promise ((resolve,reject)=>{
      this.http.post(url+'periodo_insertar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _modificarPeriodo(
    _IdPeriodoEncriptado:string,
    _Descripcion:string,
    _FechaInicio:string,
    _FechaFin:string
  ){
    const _body = new HttpParams()
          .set('IdPeriodoEncriptado'  ,_IdPeriodoEncriptado)
          .set('Descripcion'         ,_Descripcion)
          .set('FechaInicio'        ,_FechaInicio)
          .set('FechaFin'       ,_FechaFin)

    return new Promise ((resolve,reject)=>{
      this.http.post(url+'periodo_modificar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _eliminarPeriodo(
    _IdPeriodoEncriptado:string
  ){
    const _body = new HttpParams();
  
    return new Promise ((resolve,reject)=>{
      this.http.post(url+'periodo_eliminar?_idPeriodoEncriptado='+_IdPeriodoEncriptado, _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }


}
