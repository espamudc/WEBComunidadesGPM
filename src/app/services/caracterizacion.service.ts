import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class CaracterizacionService {

  constructor(private http: HttpClient) { }
  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  _insertarModeloGenerico(_Nombre,_Descripcion){
    const _body = new HttpParams()
    .set("Nombre",_Nombre)
    .set("Descripcion",_Descripcion)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'ModeloGenerico_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _modificarModeloGenerico(idModeloGenerico,_Nombre,_Descripcion){
    const _body = new HttpParams()
    .set("Nombre",_Nombre)
    .set("IdModeloGenericoEncriptado",idModeloGenerico)
    .set("Descripcion",_Descripcion)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'ModeloGenerico_modificar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _ConsultarPreguntasPorCuestionarioPublicadoComponente(_IdCuestionarioPublicado,_IdComponente){
    const _body = new HttpParams()
    .set("IdCuestionarioPublicado",_IdCuestionarioPublicado)
    .set("AsignarComponenteGenerico[0].IdComponente",_IdComponente)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'ConsultarPreguntasPorCuestionarioPublicadoComponente',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _eliminarModeloGenerico(_IdModeloGenerico){
    const _body = new HttpParams()
    .set("IdModeloGenericoEncriptado",_IdModeloGenerico)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'ModeloGenerico_eliminar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }


  _consultarModeloGenerico(_idModeloGenerico){
    const _body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.post(url+'ModeloGenerico_consultar?_idModeloGenerico='+_idModeloGenerico,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _consultarModeloGenericoTodos(){
    const _body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.post(url+'ModeloGenerico_consultarTodos',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _consultarComponentesDeUnCuestionario(_IdModeloGenerico,_IdCuestionarioPublicado){
    const _body = new HttpParams()
    .set("IdModeloGenerico",_IdModeloGenerico)
    .set("IdCuestionarioPublicado",_IdCuestionarioPublicado)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'ComponenteDeUnModelo_consultar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _insertarAsignarCuestionarioModelo(_IdCuestionarioPublicado,_IdModeloGenerico,_IdAsignarUsuarioTipoUsuario){
    const _body = new HttpParams()
    .set("IdCuestionarioPublicado",_IdCuestionarioPublicado)
    .set("IdModeloGenerico",_IdModeloGenerico)
    .set("IdAsignarUsuarioTipoUsuario",_IdAsignarUsuarioTipoUsuario)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'AsignarCuestionarioModelo_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _insertarAsignarComponenteGenerico(_IdAsignarCuestionarioModelo,_IdComponente){
    const _body = new HttpParams()
    .set("IdAsignarCuestionarioModelo",_IdAsignarCuestionarioModelo)
    .set("IdComponente",_IdComponente)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'AsignarComponenteGenerico_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _asignarComponenteGenerico_CambiarPosicion(_IdAsignarComponenteGenericoEncriptado,_Orden){
    const _body = new HttpParams()
    .set("IdAsignarComponenteGenericoEncriptado",_IdAsignarComponenteGenericoEncriptado)
    .set("Orden",_Orden)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'AsignarComponenteGenerico_CambiarPosicion',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _eliminarAsignarComponenteGenerico(_IdAsignarComponenteGenericoEncriptado){
    const _body = new HttpParams()
    .set("IdAsignarComponenteGenericoEncriptado",_IdAsignarComponenteGenericoEncriptado)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'AsignarComponenteGenerico_eliminar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _consultarTipoElemento(){
    const _body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.post(url+'TipoElemento_consultar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _insertarDescripcionComponente(_IdAsignarComponenteGenerico,_Obligatorio,_Orden){
    const _body = new HttpParams()
    .set("IdAsignarComponenteGenerico",_IdAsignarComponenteGenerico)
    .set("Obligatorio",_Obligatorio)
    .set("Orden",_Orden)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'descripcionComponente_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _insertarAsignarDescripcionComponenteTipoElemento(_IdDescripcionComponente,_IdTipoElemento,_Orden,_Obligatorio){
    const _body = new HttpParams()
    .set("IdDescripcionComponente",_IdDescripcionComponente)
    .set("IdTipoElemento",_IdTipoElemento)
    .set("Orden",_Orden)
    .set("Obligatorio",_Obligatorio)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'asignarDescripcionComponenteTipoElemento_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _eliminarAsignarDescripcionComponenteTipoElemento(_IdAsignarDescripcionComponenteTipoElemento){
    const _body = new HttpParams()
    .set("IdAsignarDescripcionComponenteTipoElementoEncriptado",_IdAsignarDescripcionComponenteTipoElemento)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'asignarDescripcionComponenteTipoElemento_eliminar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _eliminarDescripcionComponente(_IdDescripcionComponente){
    const _body = new HttpParams()
    .set("IdDescripcionComponenteEncriptado",_IdDescripcionComponente)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'descripcionComponente_eliminar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _insertarAsignarModeloGenericoParroquia(_IdModeloPublicado,_IdParroquia){
    const _body = new HttpParams()
    .set("IdModeloPublicado",_IdModeloPublicado)
    .set("IdParroquia",_IdParroquia)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'asignarModeloGenericoParroquia_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _insertarAsignaResponsableModeloPublicado(_IdAsignarUsuarioTipoUsuarioEncriptado,_IdModeloPublicadoEncriptado,_FechaInicio,_FechaFin,_IdParroquial){
    const _body = new HttpParams()
    .set("AsignarUsuarioTipoUsuario.IdAsignarUsuarioTipoUsuarioEncriptado",_IdAsignarUsuarioTipoUsuarioEncriptado)
    .set("ModeloPublicado.IdModeloPublicadoEncriptado",_IdModeloPublicadoEncriptado)
    .set("FechaInicio",_FechaInicio)
    .set("FechaFin",_FechaFin)
    .set("Parroquia.IdParroquiaEncriptado",_IdParroquial)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'asignarresponsablemodelopublicado_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _cabeceracaracterizacion_consultarporidasignarresponsablemodelopublicado(_idAsignarResponsableModeloPublicadoEncriptado:any){
    const _body = new HttpParams();
    return new Promise ((resolve,reject)=>{
      this.http.post(url+'cabeceracaracterizacion_consultarporidasignarresponsablemodelopublicado?_idAsignarResponsableModeloPublicadoEncriptado='+_idAsignarResponsableModeloPublicadoEncriptado, _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _cabeceracaracterizacion_insertar(_IdAsignarResponsableModeloPublicadoEncriptado,){
    const _body = new HttpParams()
    .set("AsignarResponsableModeloPublicado.IdAsignarResponsableModeloPublicadoEncriptado",_IdAsignarResponsableModeloPublicadoEncriptado)
    ;
    return new Promise ((resolve,reject)=>{
      this.http.post(url+'cabeceracaracterizacion_insertar', _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  asignarresponsablemodelopublicado_consultarporidmodelopublicado(_IdModeloPublicadoEncriptado:any){
    const _body = new HttpParams();
    return new Promise ((resolve,reject)=>{
      this.http.post(url+'asignarresponsablemodelopublicado_consultarporidmodelopublicado?_idModeloPublicadoEncriptado='+_IdModeloPublicadoEncriptado, _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  asignarresponsablemodelopublicado_consultarporparroquia(_idParroquia:any){
    const _body = new HttpParams();
    return new Promise ((resolve,reject)=>{
      this.http.post(url+'asignarresponsablemodelopublicado_consultarporparroquia?_idParroquia='+_idParroquia, _body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }


  asignarresponsablemodelopublicado_eliminar(_idAsignarResponsableModeloPublicadoEncriptado){
    const _body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.post(url+'asignarresponsablemodelopublicado_eliminar?_idAsignarResponsableModeloPublicadoEncriptado='+_idAsignarResponsableModeloPublicadoEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _insertarCabeceraVersionModelo(_IdModeloGenerico,_IdAsignarUsuarioTipoUsuario,_Caracteristica,_Version){
    const _body = new HttpParams()
    .set("IdModeloGenerico",_IdModeloGenerico)
    .set("AsignarUsuarioTipoUsuario.IdAsignarUsuarioTipoUsuarioEncriptado",_IdAsignarUsuarioTipoUsuario)
    .set("Caracteristica",_Caracteristica)
    .set("Version",_Version)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'cabeceraVersionModelo_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _insertarVersionamientoModelo(_IdCabeceraVersionModelo,_IdDescripcionComponenteTipoElemento,_Estado,){
    const _body = new HttpParams()
    .set("IdCabeceraVersionModelo",_IdCabeceraVersionModelo)
    .set("IdDescripcionComponenteTipoElemento",_IdDescripcionComponenteTipoElemento)
    .set("Estado",_Estado)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'versionamientoModelo_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _consultarCabeceraVersion(_IdModeloGenerico){
    const _body = new HttpParams()
    .set("IdModeloGenerico",_IdModeloGenerico)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'cabeceraVersionModelo_consultar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _consultarVersionPorPublicar(_IdModeloGenerico){
    const _body = new HttpParams()
    .set("IdModeloGenerico",_IdModeloGenerico)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'cabeceraVersionModeloParaPublicar_consultar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _consultarCabeceraVersionBody(_IdCabeceraVersionModeloEncriptado){
    const _body = new HttpParams()
    .set("IdCabeceraVersionModeloEncriptado",_IdCabeceraVersionModeloEncriptado)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'cabeceraVersionModeloPorVersion_consultar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  cabeceraVersionModeloBodyConInformacion_consultar(_IdCabeceraVersionModeloEncriptado){
    const _body = new HttpParams()
    .set("IdCabeceraVersionModeloEncriptado",_IdCabeceraVersionModeloEncriptado)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'cabeceraVersionModeloBodyConInformacion_consultar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }



  _HabilitarModeloPublicado(_IdModeloPublicadoEncriptado){
    const _body = new HttpParams()
    .set("IdModeloPublicadoEncriptado",_IdModeloPublicadoEncriptado)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'HabilitarModeloPublicado',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _DesHabilitarModeloPublicad(_IdModeloPublicadoEncriptado){
    const _body = new HttpParams()
    .set("IdModeloPublicadoEncriptado",_IdModeloPublicadoEncriptado)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'DesHabilitarModeloPublicado',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _HabilitarAsignarResponsableModeloPublicado(_IdAsignarResponsableModeloPublicadoEncriptado){
    const _body = new HttpParams()
    .set("IdAsignarResponsableModeloPublicadoEncriptado",_IdAsignarResponsableModeloPublicadoEncriptado)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'HabilitarAsignarResponsableModeloPublicado',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _DesHabilitarAsignarResponsableModeloPublicado(_IdAsignarResponsableModeloPublicadoEncriptado){
    const _body = new HttpParams()
    .set("IdAsignarResponsableModeloPublicadoEncriptado",_IdAsignarResponsableModeloPublicadoEncriptado)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'DesHabilitarAsignarResponsableModeloPublicado',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _consultarVersioneSinPublicarDeUnModeloGenerico(_IdModeloGenerico){
    const _body = new HttpParams()
    .set("IdModeloGenerico",_IdModeloGenerico)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'ConsultarVersioneSinPublicarDeUnModeloGenerico',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _consultarParroquiaDeUnaVersionesCaracterizacionPublicadas(_IdModeloPublicadoEncriptado){
    const _body = new HttpParams()
    .set("ModeloPublicado.IdModeloPublicadoEncriptado",_IdModeloPublicadoEncriptado)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'ConsultarParroquiaDeUnaVersionesCaracterizacionPublicadas',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }


  _consultarModelosGenericosConVersioneSinPublicar(){
    const _body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.post(url+'ConsultarModeloGenericoParaPublicar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _consultarVersionesCaracterizacionPublicadas(){
    const _body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.post(url+'modeloPublicado_consultar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _consultarVersionesCaracterizacionPublicadasActivas(_idModeloGenericoEncriptada){
    const _body = new HttpParams()
    .set("IdModeloGenericoEncriptado",_idModeloGenericoEncriptada)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'modeloPublicadoActivo_consultar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  ModeloGenericoConVersionesActivas_Consultar(){
    const _body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.post(url+'ModeloGenericoConVersionesActivas_Consultar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _eliminarVersionamientoModelo(_IdVersionamientoModeloEncriptado){
    const _body = new HttpParams()
    .set("IdVersionamientoModeloEncriptado",_IdVersionamientoModeloEncriptado)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'versionamientoModelo_eliminar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _eliminarModeloPublicado(_IdModeloPublicado){
    const _body = new HttpParams()
    .set("IdModeloPublicadoEncriptado",_IdModeloPublicado)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'modeloPublicado_eliminar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _eliminarAsignarModeloPublicadoParroquia(_IdAsignarModeloPublicadoParroquia){
    const _body = new HttpParams()
    .set("IdAsignarModeloGenericoParroquiaEncriptado",_IdAsignarModeloPublicadoParroquia)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'asignarModeloGenericoParroquia_eliminar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }


  _eliminarCabeceraVersionamientoModelo(_IdCabeceraVersionamientoModeloEncriptado){
    const _body = new HttpParams()
    .set("IdCabeceraVersionModeloEncriptado",_IdCabeceraVersionamientoModeloEncriptado)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'cabeceraVersionModelo_eliminar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _insertarPublicarVersionamientoModelo(_IdCabeceraVersionModelo,_IdPeriodo,_IdAsignarUsuarioTipoUsuario){
    const _body = new HttpParams()
    .set("IdCabeceraVersionModelo",_IdCabeceraVersionModelo)
    .set("IdPeriodo",_IdPeriodo)
    .set("IdAsignarUsuarioTipoUsuario",_IdAsignarUsuarioTipoUsuario)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'modeloPublicado_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _contenidodetallecomponente_insertar(_IdCabeceraCaracterizacionEncriptar,_Contenido,_IdDescripcionComponenteEncriptado,_IdAsignarUsuarioTipoUsuarioEncriptado){
    const _body = new HttpParams()
    .set("CabeceraCaracterizacion.IdCabeceraCaracterizacionEncriptar",_IdCabeceraCaracterizacionEncriptar)
    .set("Contenido",_Contenido)
    .set("DescripcionComponente.IdDescripcionComponenteEncriptado",_IdDescripcionComponenteEncriptado)
    .set("AsignarUsuarioTipoUsuarioAutor.IdAsignarUsuarioTipoUsuarioEncriptado",_IdAsignarUsuarioTipoUsuarioEncriptado)
    .set("AsignarUsuarioTipoUsuarioDecision.IdAsignarUsuarioTipoUsuarioEncriptado",_IdAsignarUsuarioTipoUsuarioEncriptado)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'contenidodetallecomponente_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _contenidodetallecomponente_modificar(_IdContenidoDetalleComponenteCaracterizacionEncriptado,_Contenido,_IdDescripcionComponenteEncriptado){
    const _body = new HttpParams()
    .set("IdContenidoDetalleComponenteCaracterizacionEncriptado",_IdContenidoDetalleComponenteCaracterizacionEncriptado)
    .set("Contenido",_Contenido)
    .set("DescripcionComponente.IdDescripcionComponenteEncriptado",_IdDescripcionComponenteEncriptado)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'contenidodetallecomponente_modificar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _contenidodetallecomponente_eliminar(_idContenidoDetalleComponenteEncriptado){
    const _body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.post(url+'contenidodetallecomponente_eliminar?_idContenidoDetalleComponenteEncriptado='+_idContenidoDetalleComponenteEncriptado,_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  obtenerCarpeta(){
    const _body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.post(url+'obtenerCarpeta',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

  _insertarConfigurarComponente(_IdAsignacionTU,_IdAsignarComponenteGenerico,_Contenido,_Imagen){
    const _body = new HttpParams()
    .set("IdAsignacionTU",_IdAsignacionTU)
    .set("IdAsignarComponenteGenerico",_IdAsignarComponenteGenerico)
    .set("Contenido",_Contenido)
    .set("Imagen",_Imagen)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'configurarComponente_insertar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _consultarConfigurarComponentePorComponente(_IdAsignarComponenteGenerico){
    const _body = new HttpParams()
    .set("IdAsignarComponenteGenerico",_IdAsignarComponenteGenerico)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'consultarConfigurarComponentePorComponente',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  _consultarCuestionariosPublicado(_IdCuestionarioPublicado){
    const _body = new HttpParams()
    .set("IdCuestionarioPublicadoEncriptado",_IdCuestionarioPublicado)
    ;
    return new Promise((resolve, reject) => {
      this.http.post(url+'CuestionarioFinalizado_consultar',_body.toString(),{headers:this._header})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
}
