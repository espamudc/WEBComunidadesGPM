import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LugaresService {

  constructor(private http: HttpClient) { }

  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');


  //---------------------PROVINCIAS---------------------------------------------------------
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
  _insertarProvincia(
      // _IdProvinciaEncriptado:any,
      _CodigoProvincia:any,
      _NombreProvincia:any,
      _DescripcionProvincia:any,
      _RutaLogoProvincia:any
    ){
    const _body = new HttpParams()
          // .set('IdProvinciaEncriptado'  ,_IdProvinciaEncriptado)
          .set('CodigoProvincia'        ,_CodigoProvincia)
          .set('NombreProvincia'        ,_NombreProvincia)
          .set('DescripcionProvincia'   ,_DescripcionProvincia)
          .set('RutaLogoProvincia'      ,_RutaLogoProvincia)
          // .set('EstadoProvincia'        ,_EstadoProvincia)
    ;

    return new Promise ((resolve,reject)=>{
      // console.log("servicio:",_body.toString());
      this.http.post(url+'provincia_insertar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }
  _modificarProvincia(
      _IdProvinciaEncriptado:any,
      _CodigoProvincia:any,
      _NombreProvincia:any,
      _DescripcionProvincia:any,
      _RutaLogoProvincia:any
    ){
    const _body = new HttpParams()
          .set('IdProvinciaEncriptado'  ,_IdProvinciaEncriptado)
          .set('CodigoProvincia'        ,_CodigoProvincia)
          .set('NombreProvincia'        ,_NombreProvincia)
          .set('DescripcionProvincia'   ,_DescripcionProvincia)
          .set('RutaLogoProvincia'      ,_RutaLogoProvincia)
    ;
    return new Promise ((resolve,reject)=>{
      // console.log("servicio:",_body.toString());
      this.http.post(url+'provincia_modificar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _eliminarProvincia(_IdProvinciaEncriptado:any){
    const _body = new HttpParams();
    return new Promise ((resolve,reject)=>{
      // console.log("servicio:",_body.toString());
      this.http.post(url+'provincia_eliminar?_idProvinciaEncriptado='+_IdProvinciaEncriptado, _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  //----------------------CANTONES---------------------------------------------------------
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
  _insertarCanton(
      // _IdCantonEncriptado:any,
      _CodigoCanton:any,
      _NombreCanton:any,
      _DescripcionCanton:any,
      _RutaLogoCanton:any,
      _IdProvinciaEncriptado
    ){
    const _body = new HttpParams()
          // .set('IdCantonEncriptado'  ,_IdCantonEncriptado)
          .set('Provincia.IdProvinciaEncriptado'  ,_IdProvinciaEncriptado)
          .set('CodigoCanton'        ,_CodigoCanton)
          .set('NombreCanton'        ,_NombreCanton)
          .set('DescripcionCanton'   ,_DescripcionCanton)
          .set('RutaLogoCanton'      ,_RutaLogoCanton)
          // .set('EstadoCanton'        ,_EstadoCanton)
    ;

    return new Promise ((resolve,reject)=>{
      // console.log("servicio:",_body.toString());
      this.http.post(url+'canton_insertar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }
  _modificarCanton(
      _IdCantonEncriptado,
      _CodigoCanton,
      _NombreCanton,
      _DescripcionCanton,
      _RutaLogoCanton,
      _IdProvinciaEncriptado
      ){
      const _body = new HttpParams()
        .set('IdCantonEncriptado'  ,_IdCantonEncriptado)
        .set('Provincia.IdProvinciaEncriptado'  ,_IdProvinciaEncriptado)
        .set('CodigoCanton'        ,_CodigoCanton)
        .set('NombreCanton'        ,_NombreCanton)
        .set('DescripcionCanton'   ,_DescripcionCanton)
        .set('RutaLogoCanton'      ,_RutaLogoCanton)
    ;
    return new Promise ((resolve,reject)=>{
      // console.log("servicio:",_body.toString());
      this.http.post(url+'canton_modificar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _eliminarCanton(_IdCantonEncriptado:any){
    const _body = new HttpParams();
    return new Promise ((resolve,reject)=>{
      // console.log("servicio:",_body.toString());
      this.http.post(url+'canton_eliminar?_idCantonEncriptado='+_IdCantonEncriptado, _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  //----------------------PARROQUIAS---------------------------------------------------------
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

  _insertarParroquia(
      // _IdParroquiaEncriptado:any,
      _CodigoParroquia:any,
      _NombreParroquia:any,
      _DescripcionParroquia:any,
      _RutaLogoParroquia:any,
      _IdCantonEncriptado,
      _IdProvinciaEncriptado
    ){
    const _body = new HttpParams()
          // .set('IdParroquiaEncriptado'  ,_IdParroquiaEncriptado)
          .set('Canton.IdCantonEncriptado'  ,_IdCantonEncriptado)
          .set('Canton.Provincia.IdProvinciaEncriptado'       ,_IdProvinciaEncriptado)
          .set('CodigoParroquia'        ,_CodigoParroquia)
          .set('NombreParroquia'        ,_NombreParroquia)
          .set('DescripcionParroquia'   ,_DescripcionParroquia)
          .set('RutaLogoParroquia'      ,_RutaLogoParroquia)
          // .set('EstadoParroquia'        ,_EstadoParroquia)
    ;

    return new Promise ((resolve,reject)=>{
      // console.log("servicio:",_body.toString());
      this.http.post(url+'parroquia_insertar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }
  _modificarParroquia(
      _IdParroquiaEncriptado,
      _CodigoParroquia,
      _NombreParroquia,
      _DescripcionParroquia,
      _RutaLogoParroquia,
      _IdCantonEncriptado,
      _IdProvinciaEncriptado
      ){
      const _body = new HttpParams()
        .set('IdParroquiaEncriptado'  ,_IdParroquiaEncriptado)
        .set('Canton.IdCantonEncriptado'  ,_IdCantonEncriptado)
        .set('Canton.Provincia.IdProvinciaEncriptado'       ,_IdProvinciaEncriptado)
        .set('CodigoParroquia'        ,_CodigoParroquia)
        .set('NombreParroquia'        ,_NombreParroquia)
        .set('DescripcionParroquia'   ,_DescripcionParroquia)
        .set('RutaLogoParroquia'      ,_RutaLogoParroquia)
    ;
    return new Promise ((resolve,reject)=>{
      // console.log("servicio:",_body.toString());
      this.http.post(url+'parroquia_modificar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _eliminarParroquia(_IdParroquiaEncriptado:any){
    const _body = new HttpParams();
    return new Promise ((resolve,reject)=>{
      // console.log("servicio:",_body.toString());
      this.http.post(url+'parroquia_eliminar?_idParroquiaEncriptado='+_IdParroquiaEncriptado, _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  //----------------------COMUNIDADES---------------------------------------------------------
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

  _insertarComunidad(
    // _IdComunidadEncriptado:any,
    _CodigoComunidad:any,
    _NombreComunidad:any,
    _DescripcionComunidad:any,
    _RutaLogoComunidad:any,
    _IdParroquiaEncriptado,
    _IdCantonEncriptado:any,
    _IdProvinciaEncriptado:any
  ){

    const _body = new HttpParams()
          // .set('IdComunidadEncriptado'  ,_IdComunidadEncriptado)
          .set('Parroquia.IdParroquiaEncriptado'  ,_IdParroquiaEncriptado)
          .set('Parroquia.Canton.IdCantonEncriptado'       ,_IdCantonEncriptado)
          .set('Parroquia.Canton.Provincia.IdProvinciaEncriptado'       ,_IdProvinciaEncriptado)
          .set('CodigoComunidad'        ,_CodigoComunidad)
          .set('NombreComunidad'        ,_NombreComunidad)
          .set('DescripcionComunidad'   ,_DescripcionComunidad)
          .set('RutaLogoComunidad'      ,_RutaLogoComunidad)
          // .set('EstadoComunidad'        ,_EstadoComunidad)
    ;
    return new Promise ((resolve,reject)=>{
      // console.log("servicio:",_body.toString());
      this.http.post(url+'comunidad_insertar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }

  _modificarComunidad(
      _IdComunidadEncriptado,
      _CodigoComunidad,
      _NombreComunidad,
      _DescripcionComunidad,
      _RutaLogoComunidad,
      _IdParroquiaEncriptado,
      _IdCantonEncriptado,
      _IdProvinciaEncriptado
      ){
      const _body = new HttpParams()
        .set('IdComunidadEncriptado'  ,_IdComunidadEncriptado)
        .set('Parroquia.IdParroquiaEncriptado'  ,_IdParroquiaEncriptado)
        .set('Parroquia.Canton.IdCantonEncriptado'       ,_IdCantonEncriptado)
        .set('Parroquia.Canton.Provincia.IdProvinciaEncriptado'       ,_IdProvinciaEncriptado)
        .set('CodigoComunidad'        ,_CodigoComunidad)
        .set('NombreComunidad'        ,_NombreComunidad)
        .set('DescripcionComunidad'   ,_DescripcionComunidad)
        .set('RutaLogoComunidad'      ,_RutaLogoComunidad)
    ;
    return new Promise ((resolve,reject)=>{
      // console.log("servicio:",_body.toString());
      this.http.post(url+'comunidad_modificar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _eliminarComunidad(_IdComunidadEncriptado:any){
    const _body = new HttpParams();
    return new Promise ((resolve,reject)=>{
      // console.log("servicio:",_body.toString());
      this.http.post(url+'comunidad_eliminar?_idComunidadEncriptado='+_IdComunidadEncriptado, _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  //-----------------------FILTROS ESPECIFICOS--------------------------------------------------------

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
