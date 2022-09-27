import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionFacturasPage } from './gestion-facturas.page';

const routes: Routes = [
  {
    path: '',
    component: GestionFacturasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionFacturasPageRoutingModule {}
