import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
    sort = '';

    constructor(
        public modalController: ModalController
    ) {
    }

    ngOnInit() {
    }

    close() {
        this.modalController.dismiss({
            // 'dismissed': true
            data: this.sort
        });
    }
}
