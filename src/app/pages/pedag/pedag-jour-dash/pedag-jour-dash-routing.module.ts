import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedagJourDashPage } from './pedag-jour-dash.page';

const routes: Routes = [
  {
    path: '',
    component: PedagJourDashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedagJourDashPageRoutingModule {}
