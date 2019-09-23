import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ClientService} from '../../../services/client.service';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
    sort = '';
    filterParams = {name: '', surname: '', phone: ''};

    constructor(
        private modalController: ModalController,
        private clientService: ClientService
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
        this.clientService.$Filtered.next(this.filterParams);
        this.close();
    }
}
