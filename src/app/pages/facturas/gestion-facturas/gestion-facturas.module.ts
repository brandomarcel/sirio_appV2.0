import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionFacturasPageRoutingModule } from './gestion-facturas-routing.module';

import { GestionFacturasPage } from './gestion-facturas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    GestionFacturasPageRoutingModule
  ],
  declarations: [GestionFacturasPage]
})
export class GestionFacturasPageModule {}
