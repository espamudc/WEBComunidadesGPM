import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { url } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  _validarCorreo(correo:string, token:string)
  {    
    const body = new HttpParams()
    .set('Correo', correo)
    .set('Token', token);

     return new Promise((resolve, reject) => {
          this.http.post(url+'ValidarCorreo',body.toString(),
            { 
              headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded')}
            )
            .subscribe(res => {
                resolve(res);
            }, (err) => {
              reject(err);
          });
      });
  }

  _login(correo:string, clave:string, token:string)
  {
    const body = new HttpParams()
    .set('Correo', correo)
    .set('Clave', clave)
    .set('Token',token);

     return new Promise((resolve, reject) => {
          this.http.post(url+'Login',body.toString(),
            { 
              headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded')}
            )
            .subscribe(res => {
                resolve(res);
            }, (err) => {
              reject(err);
          });
      });
  }

  _login2(correo:string, clave:string, idTipoUsuario, token:string)
  {
    const body = new HttpParams()
    .set('Correo', correo)
    .set('Clave', clave)
    .set('idTipoUsuario', idTipoUsuario)
    .set('Token',token);

     return new Promise((resolve, reject) => {
          this.http.post(url+'Login2',body.toString(),
            { 
              headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded')}
            )
            .subscribe(res => {
                resolve(res);
            }, (err) => {
              reject(err);
          });
      });
  }

  _cosultarUsuarios(){
    const body = new HttpParams();

     return new Promise((resolve, reject) => {
          this.http.post(url+'usuario_consultar',body.toString(),{headers:this._header})
            .subscribe(res => {
                resolve(res);
            }, (err) => {
              reject(err);
          });
      });
  }

  _insertarUsuario(
    _IdPersonaEncriptado:string,
    _Correo:string,
    _Clave:string,
  ){
    const body = new HttpParams()
      .set('Persona.IdPersonaEncriptado', _IdPersonaEncriptado)
      .set('Correo', _Correo)
      .set('Clave',_Clave);
    
    
    
    return new Promise((resolve, reject) => {
      this.http.post(url + 'usuario_insertar', body.toString(),{headers: this._header})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    });

  }

  _modificarUsuario(
    _IdUsuarioEncriptado:string,
    _IdPersonaEncriptado:string,
    _Correo:string,
    _Clave:string
  ){
    const body = new HttpParams()
      .set('IdUsuarioEncriptado', _IdUsuarioEncriptado)
      .set('Persona.IdPersonaEncriptado', _IdPersonaEncriptado)
      .set('Correo', _Correo)
      .set('Clave',_Clave);
    
    return new Promise((resolve, reject) => {
      this.http.post(url+'usuario_modificar', body.toString(),{headers: this._header})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    });
  }

  _eliminarUsuario(IdUsuarioEncriptado:string){
    const body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.post(url+'usuario_eliminar?_idUsuarioEncriptado='+IdUsuarioEncriptado, body.toString(),{headers: this._header})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    });
  }


  private apiUrl = "http://192.168.25.20:90/api/"

  login(
    usuario: string,
    contrasena: string,
    _token: string
  ) {
    const body = new HttpParams()
      .set('usuario', usuario)
      .set('contrasena', contrasena)
      .set('token', _token)
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'TalentoHumano/Login/', body.toString(),
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  consultarUsuarios(_token: string) {
    const body = new HttpParams()
    .set('encriptada', _token)
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'TalentoHumano/ListaUsuariosSistema', body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    });
  }

  moduloDeUnTipoDeUsuario(idTipoUsuario: string, _token: string) {
    const body = new HttpParams()
      .set('IdTipoUsuario', idTipoUsuario)
      .set('encriptada', _token)
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'Usuarios/ListaModulosDeUnTipoUsuario', body.toString(),
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    })
  }

  privilegiosDeUnModuloTipo(idModuloTipo: string, _token: string) {
    const body = new HttpParams()
      .set('IdModuloTipo', idModuloTipo)
      .set('encriptada', _token)
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'TalentoHumano/ListaPrivilegioDeUnTipoDeModulo', body.toString(),
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    })
  }

  consultarTipoUsuario(_token: string){
    const body = new HttpParams()
    .set('encriptada', _token)
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'Usuario/ListaTipoUsuario', body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    });

  }

  consultarAsignacionTipoUsuario(idUsuario: string, _token: string){
    const body = new HttpParams()
    .set('IdUsuario', idUsuario)
    .set('encriptada', _token)
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'Usuarios/ObtenerTipoUsuarioDeUnUsuario', body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    });
  }

  consultarPrivilegios(_token: string) {
    const body = new HttpParams()
    .set('encriptada', _token)
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'TalentoHumano/ListaPrivilegio/',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    });
  }

  consultarModulos(_token: string) {

    const body = new HttpParams()
    .set('encriptada', _token)

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'Usuarios/ListaModulos/', body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    });
  }

  crearUsuario(datosUsuario)
  {
    const body = new HttpParams()
      .set('IdPersona', datosUsuario.idPersona)
      .set('UsuarioLogin', datosUsuario.usuario)
      .set('Contrasena',datosUsuario.contrasena)
      .set('encriptada', datosUsuario.token)
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'TalentoHumano/IngresoCredencial', body.toString(),
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    })
  }

  habilitarUsuario(
    idUsuario: string,
    _token: string
  ){
    const body = new HttpParams()
      .set('IdUsuario', idUsuario)
      .set('encriptada', _token)
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'Usuario/HabilitarUsuario', body.toString(),
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    })
  }

  asignacionTipoUsuario(idUsuario:string,idTipoUsuario:string,_token:string)
  {
    const body = new HttpParams()
      .set('IdUsuario', idUsuario)
      .set('IdTipoUsuario', idTipoUsuario)
      .set('encriptada', _token)
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'TalentoHumano/IngresoTipoUsuario', body.toString(),
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    })
  }

  modificarAsignacionTipoUsuario(
    idAsignacionTU:string,
    idUsuario:string,
    idTipoUsuario:string,
    _token:string
  ) {
    const body = new HttpParams()
    .set('IdAsignacionTU', idAsignacionTU)
    .set('IdUsuario', idUsuario)
    .set('IdTipoUsuario', idTipoUsuario)
    .set('encriptada', _token)
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'TalentoHumano/ActualizarAsignacionTipoUsuario', body.toString(),
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    })
  }

  eliminarAsignacionTipoUsuario(idAsignacionTipoUsuario:string,_token:string)
  {
    const body =  new HttpParams()
      .set('IdAsignacionTU', idAsignacionTipoUsuario)
      .set('encriptada', _token)
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'TalentoHumano/EliminarAsignacionTipoUsuario', body.toString(),
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    })
  }




  eliminarUsuario(idUsuario:string,_token:string)
  {
    const body =  new HttpParams()
      .set('IdUsuario', idUsuario)
      .set('encriptada', _token)
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'TalentoHumano/EliminarCredencial', body.toString(),
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    })
  }

  actualizarUsuario(
    IdUsuario: string,
    IdPersona: string,
    UsuarioLogin: string,
    Contrasena:string,
    _token: string
  ) {
    const body = new HttpParams()
      .set('IdUsuario', IdUsuario)
      .set('IdPersona', IdPersona)
      .set('UsuarioLogin', UsuarioLogin)
      .set('Contrasena', Contrasena)
      .set('encriptada', _token)
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'TalentoHumano/ActualizarCredencial', body.toString(),
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        }
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        })
    })
  }

}
