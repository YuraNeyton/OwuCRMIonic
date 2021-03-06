import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ClientsPage} from './clients.page';
import {ClientsTableComponent} from './clients-table/clients-table.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FilterComponent} from './filter/filter.component';
import {SingleClientComponent} from './single-client/single-client.component';
import {PipeModule} from '../../pipes/pipe.module';
import {ElementModule} from '../../elements/element.module';

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
        PipeModule,
        NgxDatatableModule,
        ElementModule,
        RouterModule.forChild(routes),
    ], entryComponents: [FilterComponent, SingleClientComponent],
    declarations: [ClientsPage, ClientsTableComponent, FilterComponent, SingleClientComponent]
})
export class ClientsPageModule {
}
