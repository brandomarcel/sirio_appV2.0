import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosFacturaPage } from './productos-factura.page';

const routes: Routes = [
  {
    path: '',
    component: ProductosFacturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosFacturaPageRoutingModule {}
