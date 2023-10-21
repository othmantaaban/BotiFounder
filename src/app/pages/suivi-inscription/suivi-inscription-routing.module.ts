import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuiviInscriptionPage } from './suivi-inscription.page';

const routes: Routes = [
  {
    path: '',
    component: SuiviInscriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuiviInscriptionPageRoutingModule {}
