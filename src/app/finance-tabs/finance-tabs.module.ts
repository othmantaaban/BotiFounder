import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinanceTabsPageRoutingModule } from './finance-tabs-routing.module';

import { FinanceTabsPage } from './finance-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinanceTabsPageRoutingModule
  ],
  declarations: [FinanceTabsPage]
})
export class FinanceTabsPageModule {}
