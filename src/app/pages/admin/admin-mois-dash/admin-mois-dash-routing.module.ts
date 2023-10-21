import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminMoisDashPage } from './admin-mois-dash.page';

const routes: Routes = [
  {
    path: '',
    component: AdminMoisDashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminMoisDashPageRoutingModule {}
