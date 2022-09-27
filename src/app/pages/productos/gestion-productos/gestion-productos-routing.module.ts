import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { GestionProductosPage } from './gestion-productos.page';

const routes: Routes = [
  {
    path: '',
    component: GestionProductosPage
  },
  {
    path: 'nuevo-producto',
    loadChildren: () => import('../nuevo-producto/nuevo-producto.page').then( m => m.NuevoProductoPage)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionProductosPageRoutingModule {}
