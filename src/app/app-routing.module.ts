import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './nav/nav.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { PersonaComponent } from './components/persona/persona.component';
// import { InventarioComponent } from "./components/inventario/inventario.component";
// import { CompraComponent } from "./components/compra/compra.component";
// import { VentaComponent } from "./components/venta/venta.component";
import { Page404Component } from './components/page404/page404.component';

// Guards
import { ValidarUsuarioGuard } from "src/app/guards/validar-usuario.guard";
import { PanelAdministracionComponent } from './components/panel-administracion/panel-administracion.component';
import { TipoUsuarioComponent } from './components/tipo-usuario/tipo-usuario.component';
import { CuestionarioGenericoComponent } from './components/cuestionario-generico/cuestionario-generico.component';
import { EstructuraCuestionarioGenericoComponent } from './components/estructura-cuestionario-generico/estructura-cuestionario-generico.component';
import { EncajonarPreguntaComponent } from "./components/encajonar-pregunta/encajonar-pregunta.component";
import { CuestionarioGenericoDetalleComponent } from './components/cuestionario-generico-detalle/cuestionario-generico-detalle.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'inicio',
    component: NavComponent,
    // canActivate: [ValidarUsuarioGuard],
    children: [
      {
        path: 'roles', component: TipoUsuarioComponent,
        // canActivate: [ValidarUsuarioGuard] 
      },
      {
        path: 'usuarios', component: UsuarioComponent,
        // canActivate: [ValidarUsuarioGuard] 
      },
      {
        path: 'personas', component: PersonaComponent,
        // canActivate: [ValidarUsuarioGuard]
      },
      {
        path: 'panel-administracion', component: PanelAdministracionComponent,
        // canActivate: [ValidarUsuarioGuard]
      },
      {
        path: 'cuestionario-generico', component: CuestionarioGenericoComponent,
        // canActivate: [ValidarUsuarioGuard]
      },
      {
        path: 'estructura-cuestionario-generico', component: EstructuraCuestionarioGenericoComponent,
        // canActivate: [ValidarUsuarioGuard]
      }, 
      {
        path: 'encajonar-pregunta', component: EncajonarPreguntaComponent,
        // canActivate: [ValidarUsuarioGuard]
      },
      {
        path: 'cuestionario-generico-detalle', component: CuestionarioGenericoDetalleComponent,
        // canActivate: [ValidarUsuarioGuard]
      },
    ]
  },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
