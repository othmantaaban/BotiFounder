import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinanceJourDashPage } from './finance-jour-dash.page';

const routes: Routes = [
  {
    path: '',
    component: FinanceJourDashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceJourDashPageRoutingModule {}
