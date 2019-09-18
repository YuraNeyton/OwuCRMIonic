import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Client} from '../../../models/client';

@Component({
    selector: 'app-single-client',
    templateUrl: './single-client.component.html',
    styleUrls: ['./single-client.component.scss'],
})
export class SingleClientComponent implements OnInit {
    @Input() c: Client;

    constructor(
        private modalController: ModalController,
    ) {
    }

    ngOnInit() {
        console.log(this.c);
    }

    close() {
        this.modalController.dismiss();
    }

}
