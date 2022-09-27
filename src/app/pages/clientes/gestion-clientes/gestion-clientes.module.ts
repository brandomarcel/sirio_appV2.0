import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionClientesPageRoutingModule } from './gestion-clientes-routing.module';

import { GestionClientesPage } from './gestion-clientes.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    GestionClientesPageRoutingModule
  ],
  declarations: [GestionClientesPage]
})
export class GestionClientesPageModule {}
