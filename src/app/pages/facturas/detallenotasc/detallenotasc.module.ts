import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallenotascPageRoutingModule } from './detallenotasc-routing.module';

import { DetallenotascPage } from './detallenotasc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallenotascPageRoutingModule
  ],
  declarations: [DetallenotascPage]
})
export class DetallenotascPageModule {}
