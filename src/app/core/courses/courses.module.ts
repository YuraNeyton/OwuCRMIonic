import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CoursesPage} from './courses.page';
import {CoursesTableComponent} from './courses-table/courses-table.component';
import {CoursesFilterComponent} from './courses-filter/courses-filter.component';

const routes: Routes = [
    {
        path: '',
        component: CoursesPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ], entryComponents: [CoursesFilterComponent],
    declarations: [CoursesPage, CoursesTableComponent, CoursesFilterComponent]
})
export class CoursesPageModule {
}
