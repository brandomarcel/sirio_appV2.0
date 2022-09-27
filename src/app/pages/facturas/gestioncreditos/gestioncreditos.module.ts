import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestioncreditosPageRoutingModule } from './gestioncreditos-routing.module';

import { GestioncreditosPage } from './gestioncreditos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestioncreditosPageRoutingModule
  ],
  declarations: [GestioncreditosPage]
})
export class GestioncreditosPageModule {}
