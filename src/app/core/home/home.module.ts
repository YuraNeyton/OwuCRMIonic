import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {HomePage} from './home.page';
import {ElementModule} from '../../elements/element.module';
import {HomeFilterComponent} from './home-filter/home-filter.component';

const routes: Routes = [
    {
        path: '',
        component: HomePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ElementModule,
        RouterModule.forChild(routes)
    ], entryComponents: [HomeFilterComponent],
    declarations: [HomePage],
})
export class HomePageModule {
}
