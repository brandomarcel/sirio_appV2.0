import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestioncreditosPage } from './gestioncreditos.page';

const routes: Routes = [
  {
    path: '',
    component: GestioncreditosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestioncreditosPageRoutingModule {}
