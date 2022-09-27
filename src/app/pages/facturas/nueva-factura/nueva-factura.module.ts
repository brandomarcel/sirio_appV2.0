import { IonicSelectableModule } from 'ionic-selectable';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaFacturaPageRoutingModule } from './nueva-factura-routing.module';

import { NuevaFacturaPage } from './nueva-factura.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    NuevaFacturaPageRoutingModule
  ],
  declarations: [NuevaFacturaPage]
})
export class NuevaFacturaPageModule {}
