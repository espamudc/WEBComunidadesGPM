import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LugaresService {

  constructor(private http: HttpClient) { }

  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  private _header2 = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  private _header3 = new HttpHeaders().set('Content-Type', 'undefined');


  _consultarProvincias(){
    const _body = new HttpParams();

    return new Promise ((resolve,reject)=>{
      this.http.post(url+'provincia_consultar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }
  _insertarProvincia(
      _CodigoProvincia:any,
      _NombreProvincia:any,
      _DescripcionProvincia:any,
      _RutaLogoProvincia:any
    ){
    const _body = new HttpParams()
          .set('CodigoProvincia'        ,_CodigoProvincia)
          .set('NombreProvincia'        ,_NombreProvincia)
          .set('DescripcionProvincia'   ,_DescripcionProvincia)
          .set('RutaLogoProvincia'      ,_RutaLogoProvincia)
    ;

    return new Promise ((resolve,reject)=>{
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
      this.http.post(url+'provincia_eliminar?_idProvinciaEncriptado='+_IdProvinciaEncriptado, _body.toString(),{headers:this._header})
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
      this.http.post(url+'canton_consultar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }
  _insertarCanton(
      _CodigoCanton:any,
      _NombreCanton:any,
      _DescripcionCanton:any,
      _RutaLogoCanton:any,
      _IdProvinciaEncriptado
    ){
    const _body = new HttpParams()
          .set('Provincia.IdProvinciaEncriptado'  ,_IdProvinciaEncriptado)
          .set('CodigoCanton'        ,_CodigoCanton)
          .set('NombreCanton'        ,_NombreCanton)
          .set('DescripcionCanton'   ,_DescripcionCanton)
          .set('RutaLogoCanton'      ,_RutaLogoCanton)
    ;

    return new Promise ((resolve,reject)=>{
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
      this.http.post(url+'canton_eliminar?_idCantonEncriptado='+_IdCantonEncriptado, _body.toString(),{headers:this._header})
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
     
      this.http.post(url+'parroquia_consultar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }

  _insertarParroquia(
      _CodigoParroquia:any,
      _NombreParroquia:any,
      _DescripcionParroquia:any,
      _PoblacionParroquia:any,
      _SuperficieParroquia:any,
      _TemperaturaParroquia:any,
      _ClimaParroquia:any,
      _RutaLogoParroquia:any,
      _IdCantonEncriptado,
      _IdProvinciaEncriptado
    ){
    const _body = new HttpParams()
          .set('Canton.IdCantonEncriptado'  ,_IdCantonEncriptado)
          .set('Canton.Provincia.IdProvinciaEncriptado'       ,_IdProvinciaEncriptado)
          .set('CodigoParroquia'        ,_CodigoParroquia)
          .set('NombreParroquia'        ,_NombreParroquia)
          .set('DescripcionParroquia'   ,_DescripcionParroquia)
          .set('PoblacionParroquia'   ,_PoblacionParroquia)
          .set('SuperficieParroquia'   ,_SuperficieParroquia)
          .set('TemperaturaParroquia'   ,_TemperaturaParroquia)
          .set('ClimaParroquia'   ,_ClimaParroquia)
          .set('RutaLogoParroquia'      ,_RutaLogoParroquia)
    ;

    return new Promise ((resolve,reject)=>{
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
      _PoblacionParroquia,
      _SuperficieParroquia,
      _TemperaturaParroquia,
      _ClimaParroquia,
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
        .set('PoblacionParroquia'   ,_PoblacionParroquia)
        .set('SuperficieParroquia'   ,_SuperficieParroquia)
        .set('TemperaturaParroquia'   ,_TemperaturaParroquia)
        .set('ClimaParroquia'   ,_ClimaParroquia)
        .set('RutaLogoParroquia'      ,_RutaLogoParroquia)
    ;
    return new Promise ((resolve,reject)=>{
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
      this.http.post(url+'parroquia_eliminar?_idParroquiaEncriptado='+_IdParroquiaEncriptado, _body.toString(),{headers:this._header})
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
      this.http.post(url+'comunidad_consultar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _insertarComunidad(
    _CodigoComunidad:any,
    _NombreComunidad:any,
    _DescripcionComunidad:any,
    _RutaLogoComunidad:any,
    _IdParroquiaEncriptado,
    _IdCantonEncriptado:any,
    _IdProvinciaEncriptado:any
  ){
      const _bodyEE = new FormData();
          _bodyEE.append("IdParroquiaEncriptado"  ,_IdParroquiaEncriptado);
          _bodyEE.append("IdCantonEncriptado"       ,_IdCantonEncriptado);
          _bodyEE.append("IdProvinciaEncriptado"       ,_IdProvinciaEncriptado);
          _bodyEE.append("CodigoComunidad"        ,_CodigoComunidad);
          _bodyEE.append("NombreComunidad"        ,_NombreComunidad);
          _bodyEE.append("DescripcionComunidad"   ,_DescripcionComunidad);
          _bodyEE.append("file"      ,_RutaLogoComunidad);
   
    return new Promise ((resolve,reject)=>{
      this.http.post(url+'comunidad_insertar', _bodyEE)
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
    const _bodyEE = new FormData();
        _bodyEE.append('IdComunidadEncriptado'  ,_IdComunidadEncriptado)
        _bodyEE.append("IdParroquiaEncriptado"  ,_IdParroquiaEncriptado);
        _bodyEE.append("IdCantonEncriptado"       ,_IdCantonEncriptado);
        _bodyEE.append("IdProvinciaEncriptado"       ,_IdProvinciaEncriptado);
        _bodyEE.append("CodigoComunidad"        ,_CodigoComunidad);
        _bodyEE.append("NombreComunidad"        ,_NombreComunidad);
        _bodyEE.append("DescripcionComunidad"   ,_DescripcionComunidad);
        _bodyEE.append("file"      ,_RutaLogoComunidad);
    ;
    return new Promise ((resolve,reject)=>{
      this.http.post(url+'comunidad_modificar', _bodyEE)
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
      this.http.post(url+'comunidad_eliminar?_idComunidadEncriptado='+_IdComunidadEncriptado, _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }


  _consultarCantonesDe(_IdProvinciaEncriptado:any){
    const _body = new HttpParams();

    return new Promise ((resolve,reject)=>{
      this.http.post(url+'canton_consultarporidprovincia?_idProvinciaEncriptado='+_IdProvinciaEncriptado, _body.toString(),{headers:this._header})
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
      this.http.post(url+'parroquia_consultarporidcanton?_idCantonEncriptado='+_IdCantonEncriptado, _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }

  _consultarComunidadesDe(_IdParroquiaEncriptado:any){
    const _body = new HttpParams();
   
    return new Promise ((resolve,reject)=>{
      this.http.post(url+'comunidad_consultarporidparroquia?_idParroquiaEncriptado='+_IdParroquiaEncriptado, _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });

  }

  _consultarComunidadesPorVersion(
    _CodigoCuestionarioEncriptado:any,
    _CodigoVersionEncriptado:any,
  ){
    const _body = new HttpParams();

    return new Promise ((resolve,reject)=>{
      this.http.post(url+'comunidad_consultarporversion?_idCuestionarioEncriptado='+_CodigoCuestionarioEncriptado+'&_idVersionEncriptado='+_CodigoVersionEncriptado, _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

 
  _consultarRepresentanteProvincia(_IdProvinciaEncriptado:any){
    const _body = new HttpParams();

    return new Promise ((resolve,reject)=>{
      this.http.post(url+'prefecto_consultarporidprovincia?_idProvinciaEncriptado='+_IdProvinciaEncriptado, _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _modificarRepresentanteProvincia(_IdPrefectoEncriptado,_IdProvinciaEncriptado,_Representante,_FechaIngreso,_FechaSalida){
    const _body = new HttpParams()
    .set('IdPrefectoEncriptado',_IdPrefectoEncriptado)
    .set('Provincia.IdProvinciaEncriptado',_IdProvinciaEncriptado)
    .set('Provincia.IdProvinciaEncriptado',_IdProvinciaEncriptado)
    .set('Representante',_Representante)
    .set('FechaIngreso',_FechaIngreso)
    .set('FechaSalida',_FechaSalida)
    ;
    return new Promise ((resolve,reject)=>{
      this.http.post(url+'prefecto_modificar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }


  _insertarRepresentanteProvincia(
    _IdProvinciaEncriptado:any,
    _Representante:any,
    _FechaIngreso:any,
    _FechaSalida:any
  ){

    const _body = new HttpParams()
      .set('Provincia.IdProvinciaEncriptado'  ,_IdProvinciaEncriptado)
      .set('Representante'  ,_Representante)
      .set('FechaIngreso'  ,_FechaIngreso)
      .set('FechaSalida'  ,_FechaSalida)
    ;

    return new Promise ((resolve,reject)=>{
      this.http.post(url+'prefecto_insertar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _eliminarRepresentanteProvincia(
    _IdRepresentante:any
  ){
    const _body = new HttpParams();
    return new Promise ((resolve,reject)=>{
          this.http.post(url+'prefecto_eliminar?_idPrefectoEncriptado='+_IdRepresentante, _body.toString(),{headers:this._header})
                    .subscribe(res=>{
                      resolve(res);
                    },(err)=>{
                      reject(err);
                    });
    });
  }


  _insertarRepresentanteCanton(
    _IdCantonEncriptado:any,
    _Representante:any,
    _FechaIngreso:any,
    _FechaSalida:any
  ){
    const _body = new HttpParams()
      .set('Canton.IdCantonEncriptado'  ,_IdCantonEncriptado)
      .set('Representante'  ,_Representante)
      .set('FechaIngreso'  ,_FechaIngreso)
      .set('FechaSalida'  ,_FechaSalida)
    ;

    return new Promise ((resolve,reject)=>{
      this.http.post(url+'alcalde_insertar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _modificarRepresentanteCanton(
    _IdAlcaldeEncriptado:any,
    _IdCantonEncriptado:any,
    _Representante:any,
    _FechaIngreso:any,
    _FechaSalida:any
  ){
    const _body = new HttpParams()
      .set('IdAlcaldeEncriptado'  ,_IdAlcaldeEncriptado)
      .set('Canton.IdCantonEncriptado'  ,_IdCantonEncriptado)
      .set('Representante'  ,_Representante)
      .set('FechaIngreso'  ,_FechaIngreso)
      .set('FechaSalida'  ,_FechaSalida)
    ;

    return new Promise ((resolve,reject)=>{
      this.http.post(url+'alcalde_modificar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }


  _consultarRepresentanteCanton(_IdCantonEncriptado:any){
    const _body = new HttpParams();

    return new Promise ((resolve,reject)=>{
      this.http.post(url+'alcalde_consultarporidcanton?_idCantonEncriptado='+_IdCantonEncriptado, _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _eliminarRepresentanteCanton(_IdRepresentante:any){
    const _body = new HttpParams();

    return new Promise ((resolve,reject)=>{
          this.http.post(url+'alcalde_eliminar?_idAlcaldeEncriptado='+_IdRepresentante, _body.toString(),{headers:this._header})
                    .subscribe(res=>{
                      resolve(res);
                    },(err)=>{
                      reject(err);
                    });
    });
  }


  _insertarRepresentanteParroquia(
    _IdParroquiaEncriptado:any,
    _Representante:any,
    _FechaIngreso:any,
    _FechaSalida:any
  ){
    const _body = new HttpParams()
      .set('Parroquia.IdParroquiaEncriptado'  ,_IdParroquiaEncriptado)
      .set('Representante'  ,_Representante)
      .set('FechaIngreso'  ,_FechaIngreso)
      .set('FechaSalida'  ,_FechaSalida)
    ;

    return new Promise ((resolve,reject)=>{
      this.http.post(url+'presidentejuntaparroquial_insertar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _modificarRepresentanteParroquia(
    _IdPresidenteJuntaParroquialEncriptado:any,
    _IdParroquiaEncriptado:any,
    _Representante:any,
    _FechaIngreso:any,
    _FechaSalida:any
  ){
    const _body = new HttpParams()
      .set('IdPresidenteJuntaParroquialEncriptado',_IdPresidenteJuntaParroquialEncriptado)
      .set('Parroquia.IdParroquiaEncriptado'  ,_IdParroquiaEncriptado)
      .set('Representante'  ,_Representante)
      .set('FechaIngreso'  ,_FechaIngreso)
      .set('FechaSalida'  ,_FechaSalida)
    ;

    return new Promise ((resolve,reject)=>{
      this.http.post(url+'presidentejuntaparroquial_modificar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _consultarRepresentanteParroquia(_IdParroquiaEncriptado:any){
    const _body = new HttpParams();

    return new Promise ((resolve,reject)=>{
      this.http.post(url+'presidentejuntaparroquial_consultarporidparroquia?_idParroquiaEncriptado='+_IdParroquiaEncriptado, _body.toString(),{headers:this._header})
          .subscribe(res=>{
            resolve(res);
          },(err)=>{
            reject(err);
          });
    });
  }
  _eliminarRepresentanteParroquia(_IdRepresentante:any){
    const _body = new HttpParams();

    return new Promise ((resolve,reject)=>{
          this.http.post(url+'presidentejuntaparroquial_eliminar?_idPresidenteJuntaParroquialEncriptado='+_IdRepresentante, _body.toString(),{headers:this._header})
              .subscribe(res=>{
                resolve(res);
              },(err)=>{
                reject(err);
              });
    });
  }


  _insertarRepresentanteComunidad(
    _IdComunidadEncriptado:any,
    _Representante:any,
    _FechaIngreso:any,
    _FechaSalida:any
  ){
    const _body = new HttpParams()
      .set('Comunidad.IdComunidadEncriptado'  ,_IdComunidadEncriptado)
      .set('Representante'  ,_Representante)
      .set('FechaIngreso'  ,_FechaIngreso)
      .set('FechaSalida'  ,_FechaSalida)
    ;

    return new Promise ((resolve,reject)=>{
      this.http.post(url+'lidercomunitario_insertar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _consultarRepresentanteComunidad(_IdComunidadEncriptado:any){
    const _body = new HttpParams();

    return new Promise ((resolve,reject)=>{
      this.http.post(url+'lidercomunitario_consultarporidcomunidad?_idComunidadEncriptado='+_IdComunidadEncriptado, _body.toString(),{headers:this._header})
          .subscribe(res=>{
            resolve(res);
          },(err)=>{
            reject(err);
          });
    });
  }
  _eliminarRepresentanteComunidad(_IdRepresentante:any){
    const _body = new HttpParams();

    return new Promise ((resolve,reject)=>{
          this.http.post(url+'lidercomunitario_eliminar?_idLiderComunitarioEncriptado='+_IdRepresentante, _body.toString(),{headers:this._header})
              .subscribe(res=>{
                resolve(res);
              },(err)=>{
                reject(err);
              });
    });
  }

}
