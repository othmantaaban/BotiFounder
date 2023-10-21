import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemiseValiderPage } from './remise-valider.page';

const routes: Routes = [
  {
    path: '',
    component: RemiseValiderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemiseValiderPageRoutingModule {}
