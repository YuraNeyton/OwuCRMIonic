import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ApplicationsPage} from './applications.page';
import {ElementModule} from '../../elements/element.module';

const routes: Routes = [
    {
        path: '',
        component: ApplicationsPage
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
    declarations: [ApplicationsPage]
})
export class ApplicationsPageModule {
}
