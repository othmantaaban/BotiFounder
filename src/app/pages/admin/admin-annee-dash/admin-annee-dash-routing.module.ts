import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAnneeDashPage } from './admin-annee-dash.page';

const routes: Routes = [
  {
    path: '',
    component: AdminAnneeDashPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAnneeDashPageRoutingModule {}
