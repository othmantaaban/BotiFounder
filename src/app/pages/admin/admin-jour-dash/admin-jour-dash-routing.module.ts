import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminJourDashPage } from './admin-jour-dash.page';

const routes: Routes = [
  {
    path: '',
    component: AdminJourDashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminJourDashPageRoutingModule {}
