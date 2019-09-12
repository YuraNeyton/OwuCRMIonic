import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-payment-statuses',
  templateUrl: './payment-statuses.page.html',
  styleUrls: ['./payment-statuses.page.scss'],
})
export class PaymentStatusesPage implements OnInit {

    constructor(
        private menuCtr: MenuController
    ) {
    }

    ngOnInit() {
        this.closeMenu();
    }

    public closeMenu() {
        this.menuCtr.close('first');
    }

}
