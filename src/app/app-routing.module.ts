import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './nav/nav.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { PersonaComponent } from './components/persona/persona.component';
import { PeriodoComponent } from './components/periodo/periodo.component';
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
import { CuestionarioGenericoPublicarComponent } from './components/cuestionario-generico-publicar/cuestionario-generico-publicar.component';
import { CuestionarioGenericoVersionesComponent } from './components/cuestionario-generico-versiones/cuestionario-generico-versiones.component';
import { CaracterizacionComponent } from './components/caracterizacion/caracterizacion.component';
import { ListaCaracterizacionComponent  } from './components/lista-caracterizacion/lista-caracterizacion.component';
import { VersionarCaracterizacionComponent } from './components/versionar-caracterizacion/versionar-caracterizacion.component';
import { PublicarCaracterizacionComponent } from './components/publicar-caracterizacion/publicar-caracterizacion.component';
import { LlenarCaracterizacionComponent } from './components/llenar-caracterizacion/llenar-caracterizacion.component';
import { TreeViewComponent } from './components/tree-view/tree-view.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PreguntasSeleccionadasComponent } from './components/preguntas-seleccionadas/preguntas-seleccionadas.component';

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
        path: 'periodo', component: PeriodoComponent,
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
      {
        path: 'cuestionario-generico-versiones', component: CuestionarioGenericoVersionesComponent,
        // canActivate: [ValidarUsuarioGuard]
      },
      {
        path: 'cuestionario-generico-publicar', component: CuestionarioGenericoPublicarComponent,
        // canActivate: [ValidarUsuarioGuard]
      },
      {
        path: 'cuestionario-caracterizacion', component: CaracterizacionComponent,
        // canActivate: [ValidarUsuarioGuard]
      },
      {
        path: 'cuestionario-lista-caracterizacion', component: ListaCaracterizacionComponent,
        // canActivate: [ValidarUsuarioGuard]
      },
      {
        path: 'cuestionario-version-caracterizacion', component: VersionarCaracterizacionComponent,
        // canActivate: [ValidarUsuarioGuard]
      },
      {
        path: 'cuestionario-publicar-caracterizacion', component: PublicarCaracterizacionComponent,
        // canActivate: [ValidarUsuarioGuard]
      },
      {
        path: 'caracterizacion-llenar', component: LlenarCaracterizacionComponent,
        // canActivate: [ValidarUsuarioGuard]
      },
      {
        path: 'tree-view', component: TreeViewComponent,
        // canActivate: [ValidarUsuarioGuard]
      },
      {
        path: 'inicio', component: InicioComponent,
        // canActivate: [ValidarUsuarioGuard]
      },
      {
        path: 'preguntas-seleccionadas', component: PreguntasSeleccionadasComponent,
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
