import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {GroupsPage} from './groups.page';
import {GroupsTableComponent} from './groups-table/groups-table.component';
import {SingleGroupComponent} from './single-group/single-group.component';
import {FilterGroupsComponent} from './filter-groups/filter-groups.component';
import {ElementModule} from '../../elements/element.module';

const routes: Routes = [
    {
        path: '',
        component: GroupsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ElementModule,
        RouterModule.forChild(routes)
    ], entryComponents: [SingleGroupComponent, FilterGroupsComponent],
    declarations: [GroupsPage, GroupsTableComponent, SingleGroupComponent, FilterGroupsComponent]
})
export class GroupsPageModule {
}
