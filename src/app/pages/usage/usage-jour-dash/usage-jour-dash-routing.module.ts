import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsageJourDashPage } from './usage-jour-dash.page';

const routes: Routes = [
  {
    path: '',
    component: UsageJourDashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsageJourDashPageRoutingModule {}
