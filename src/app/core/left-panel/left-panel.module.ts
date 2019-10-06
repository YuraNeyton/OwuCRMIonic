import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LeftPanelPage } from './left-panel.page';
import {UserProfileComponent} from "./user-profile/user-profile.component";

const routes: Routes = [
  {
    path: '',
    component: LeftPanelPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LeftPanelPage, UserProfileComponent]
})
export class LeftPanelPageModule {}
