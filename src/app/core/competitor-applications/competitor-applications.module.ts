import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CompetitorApplicationsPage } from './competitor-applications.page';

const routes: Routes = [
  {
    path: '',
    component: CompetitorApplicationsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CompetitorApplicationsPage]
})
export class CompetitorApplicationsPageModule {}
