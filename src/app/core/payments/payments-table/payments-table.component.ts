import {Component, Input, OnInit} from '@angular/core';
import {Payment} from '../../../models/payment';
import {Application} from '../../../models/application';
import {SingleApplicationComponent} from '../../../elements/single-application/single-application.component';
import {ModalController} from '@ionic/angular';
import {PaymentService} from '../../../services/payment.service';
import {SinglePaymentComponent} from '../single-payment/single-payment.component';
import {ConfigService} from '../../../services/config.service';
import {Router} from '@angular/router';
import {PaymentStatusService} from '../../../services/payment-status.service';
import {PaymentStatus} from '../../../models/paymentStatus';

@Component({
    selector: 'app-payments-table',
    templateUrl: './payments-table.component.html',
    styleUrls: ['./payments-table.component.scss'],
})
export class PaymentsTableComponent implements OnInit {
    @Input() payments: Payment[];
    paymentStatuses: PaymentStatus[] = [];
    @Input() tableListCount = 0;
    constructor(private modalController: ModalController,
                private paymentService: PaymentService,
                private configService: ConfigService,
                private router: Router,
                private paymentStatusService: PaymentStatusService) {
    }

    ngOnInit() {
        this.paymentStatusService.getStatuses({}).subscribe(value => {
            this.paymentStatuses = value.models;
        });
    }

    getHeader(key: string, headerBlock: HTMLElement, event: any) {
        this.paymentService.$getHeader.next({name: key, element: headerBlock, e: event});
    }

    async presentModal(payment: Payment) {
        const modal = await this.modalController.create({
            component: SinglePaymentComponent,
            componentProps: {p: payment, s: this.paymentStatuses}
        });
        return await modal.present();
    }

}
