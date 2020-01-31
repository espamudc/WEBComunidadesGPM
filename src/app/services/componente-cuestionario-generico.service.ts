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

}
