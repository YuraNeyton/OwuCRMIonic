import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Payment} from '../../../models/payment';
import {PaymentStatus} from '../../../models/paymentStatus';

@Component({
  selector: 'app-single-payment',
  templateUrl: './single-payment.component.html',
  styleUrls: ['./single-payment.component.scss'],
})
export class SinglePaymentComponent implements OnInit {
    @Input() p: Payment;
    @Input() s: PaymentStatus[];

    constructor(private modalController: ModalController) {
    }

    ngOnInit() {
    }

    close() {
        this.modalController.dismiss();
    }
}
