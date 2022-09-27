import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosFacturaPageRoutingModule } from './productos-factura-routing.module';

import { ProductosFacturaPage } from './productos-factura.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,Ng2SearchPipeModule,
    ProductosFacturaPageRoutingModule
  ],
  declarations: [ProductosFacturaPage]
})
export class ProductosFacturaPageModule {}
