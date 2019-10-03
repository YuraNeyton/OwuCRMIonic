import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PaymentsPage} from './payments.page';
import {PaymentsTableComponent} from './payments-table/payments-table.component';
import {SinglePaymentComponent} from './single-payment/single-payment.component';
import {PaymentsFilterComponent} from './payments-filter/payments-filter.component';

const routes: Routes = [
    {
        path: '',
        component: PaymentsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [PaymentsPage, PaymentsTableComponent, SinglePaymentComponent, PaymentsFilterComponent],
    entryComponents: [SinglePaymentComponent, PaymentsFilterComponent]
})
export class PaymentsPageModule {
}
