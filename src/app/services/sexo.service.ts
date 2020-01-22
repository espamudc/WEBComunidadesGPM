import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class SexoService {
    constructor(private http: HttpClient) {}

    private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  
    consultarSexos(_token:string=''){
        //debugger
        const _body = new HttpParams().set('Token',_token);
        
        return new Promise((resolve, reject) => {
        this.http.post(url+'sexo_consultar',_body.toString(),{headers:this._header})
                    .subscribe(res=>{
                    resolve(res);
                    },(err)=>{
                    reject(err);
                    });
        });

    }
}