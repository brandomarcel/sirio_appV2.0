import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallefacturaPageRoutingModule } from './detallefactura-routing.module';

import { DetallefacturaPage } from './detallefactura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallefacturaPageRoutingModule
  ],
  declarations: [DetallefacturaPage]
})
export class DetallefacturaPageModule {}
