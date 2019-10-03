import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {EApplicationsPage} from './e-applications.page';
import {ElementModule} from '../../elements/element.module';

const routes: Routes = [
    {
        path: '',
        component: EApplicationsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ElementModule,
        RouterModule.forChild(routes)
    ],
    declarations: [EApplicationsPage]
})
export class EApplicationsPageModule {
}
