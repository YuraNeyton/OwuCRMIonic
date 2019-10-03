import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PaymentService} from '../../../services/payment.service';
import {PaymentStatus} from '../../../models/paymentStatus';

@Component({
    selector: 'app-payments-filter',
    templateUrl: './payments-filter.component.html',
    styleUrls: ['./payments-filter.component.scss'],
})
export class PaymentsFilterComponent implements OnInit {
    @Input() s: PaymentStatus[];
    sort = '';
    filterParams = {
        'client.fullname': '',
        'course.name': '',
        number: '',
        expectedAmount: '',
        paymentDate: '',
        amount: '',
        statusId: '',
    };

    constructor(
        private modalController: ModalController,
        private paymentService: PaymentService
    ) {
    }

    ngOnInit() {
    }

    close() {
        this.modalController.dismiss({
            data: this.sort
        });
    }

    filter() {
        this.paymentService.$Filtered.next(this.filterParams);
        this.close();
    }

}
