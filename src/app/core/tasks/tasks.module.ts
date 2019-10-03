import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TasksPage} from './tasks.page';
import {TasksFilterComponent} from './tasks-filter/tasks-filter.component';
import {TasksTableComponent} from './tasks-table/tasks-table.component';
import {SingleTaskComponent} from './single-task/single-task.component';

const routes: Routes = [
    {
        path: '',
        component: TasksPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [TasksPage, TasksFilterComponent, TasksTableComponent, SingleTaskComponent],
    entryComponents: [TasksFilterComponent, SingleTaskComponent],
})
export class TasksPageModule {
}
