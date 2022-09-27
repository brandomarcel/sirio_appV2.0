import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallefacturaPage } from './detallefactura.page';

const routes: Routes = [
  {
    path: '',
    component: DetallefacturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallefacturaPageRoutingModule {}
