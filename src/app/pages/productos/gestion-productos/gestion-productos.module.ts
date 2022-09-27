import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionProductosPageRoutingModule } from './gestion-productos-routing.module';

import { GestionProductosPage } from './gestion-productos.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    GestionProductosPageRoutingModule
  ],
  declarations: [GestionProductosPage]
})
export class GestionProductosPageModule {}
