import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemiseValiderPageRoutingModule } from './remise-valider-routing.module';

import { RemiseValiderPage } from './remise-valider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemiseValiderPageRoutingModule
  ],
  declarations: [RemiseValiderPage]
})
export class RemiseValiderPageModule {}
