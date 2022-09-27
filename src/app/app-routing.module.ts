import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {

    path: '',
   /*  path: 'login', */
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
    
  },
  {
    path: 'gestion-productos',
    loadChildren: () => import('./pages/productos/gestion-productos/gestion-productos.module').then( m => m.GestionProductosPageModule)
  },
  {
    path: 'nuevo-producto',
    loadChildren: () => import('./pages/productos/nuevo-producto/nuevo-producto.module').then( m => m.NuevoProductoPageModule)
  },
  {
    path: 'gestion-clientes',
    loadChildren: () => import('./pages/clientes/gestion-clientes/gestion-clientes.module').then( m => m.GestionClientesPageModule)
  },
  {
    path: 'nuevo-cliente/:id',
    loadChildren: () => import('./pages/clientes/nuevo-cliente/nuevo-cliente.module').then( m => m.NuevoClientePageModule)
  },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
