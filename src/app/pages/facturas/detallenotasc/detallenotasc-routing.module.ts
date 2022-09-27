import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallenotascPage } from './detallenotasc.page';

const routes: Routes = [
  {
    path: '',
    component: DetallenotascPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallenotascPageRoutingModule {}
