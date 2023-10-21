import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedagMoisDashPage } from './pedag-mois-dash.page';

const routes: Routes = [
  {
    path: '',
    component: PedagMoisDashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedagMoisDashPageRoutingModule {}
