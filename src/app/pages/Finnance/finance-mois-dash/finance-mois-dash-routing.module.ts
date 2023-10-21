import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinanceMoisDashPage } from './finance-mois-dash.page';

const routes: Routes = [
  {
    path: '',
    component: FinanceMoisDashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceMoisDashPageRoutingModule {}
