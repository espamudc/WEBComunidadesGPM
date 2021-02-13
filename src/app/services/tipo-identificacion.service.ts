import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";
@Injectable({
    providedIn: 'root'
  })

export class TipoIdentificacionService {

    constructor(private http: HttpClient) { }

    private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    consultarTiposIdentificacion(_token:string=''){
        const _body = new HttpParams().set('Token',_token);
        
        return new Promise((resolve, reject) => {
          this.http.post(url+'tipoidentificacion_consultar',_body.toString(),{headers:this._header})
                    .subscribe(res=>{
                      resolve(res);
                    },(err)=>{
                      reject(err);
                    });
        });
    
    }    

}  