import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LugaresService {

  constructor(private http: HttpClient) { }

  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  _insertarProvincia(_provencia:any){
    const _body = new HttpParams()
          .set('IdProvinciaEncriptado'  ,_provencia.IdProvinciaEncriptado)
          .set('CodigoProvincia'        ,_provencia.CodigoProvincia)
          .set('NombreProvincia'        ,_provencia.NombreProvincia)
          .set('DescripcionProvincia'   ,_provencia.DescripcionProvincia)
          .set('RutaLogoProvincia'      ,_provencia.RutaLogoProvincia)
          .set('EstadoProvincia'        ,_provencia.EstadoProvincia)
    ;

    return new Promise ((resolve,reject)=>{
      // console.log("servicio:",_body.toString());
      this.http.post(url+'provincia_consultar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }
  //------------------------------------------------------------------------------
  _consultarProvincias(){
    const _body = new HttpParams();

    return new Promise ((resolve,reject)=>{
      // console.log("servicio:",_body.toString());
      this.http.post(url+'provincia_consultar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }
  _consultarCantones(){
    const _body = new HttpParams();

    return new Promise ((resolve,reject)=>{
      // console.log("servicio:",_body.toString());
      this.http.post(url+'canton_consultar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }
  _consultarParroquias(){
    const _body = new HttpParams();

    return new Promise ((resolve,reject)=>{
      // console.log("servicio:",_body.toString());
      this.http.post(url+'parroquia_consultar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }
  _consultarComunidades(){
    const _body = new HttpParams();

    return new Promise ((resolve,reject)=>{
      // console.log("servicio:",_body.toString());
      this.http.post(url+'comunidad_consultar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }
  //-------------------------------------------------------------------------------

  _consultarCantonesDe(_IdProvinciaEncriptado:any){
    const _body = new HttpParams();

    return new Promise ((resolve,reject)=>{
      // console.log("servicio:",_body.toString());
      this.http.post(url+'canton_consultar?_IdProvinciaEncriptado='+_IdProvinciaEncriptado, _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }
  _consultarParroquiasDe(_IdCantonEncriptado:any){
    const _body = new HttpParams();

    return new Promise ((resolve,reject)=>{
      // console.log("servicio:",_body.toString());
      this.http.post(url+'parroquia_consultar?_IdCantonEncriptado='+_IdCantonEncriptado, _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }
  _consultarComunidadesDe(_IdParroquiaEncriptado:any){
    const _body = new HttpParams();
    console.log("--->",_IdParroquiaEncriptado);
    // 
    return new Promise ((resolve,reject)=>{
      // console.log("servicio:",_body.toString());
      this.http.post(url+'comunidad_consultar?_IdParroquiaEncriptado='+_IdParroquiaEncriptado, _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }

  



}
