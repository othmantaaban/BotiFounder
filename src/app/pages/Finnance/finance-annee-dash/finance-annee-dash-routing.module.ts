import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinanceAnneeDashPage } from './finance-annee-dash.page';

const routes: Routes = [
  {
    path: '',
    component: FinanceAnneeDashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceAnneeDashPageRoutingModule {}
