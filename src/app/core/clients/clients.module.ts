import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ClientsPage} from './clients.page';
import {ClientsTableComponent} from './clients-table/clients-table.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FilterComponent} from './filter/filter.component';

const routes: Routes = [
    {
        path: '',
        component: ClientsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NgxDatatableModule,
        RouterModule.forChild(routes),
    ], entryComponents: [FilterComponent],
    declarations: [ClientsPage, ClientsTableComponent, FilterComponent]
})
export class ClientsPageModule {
}
