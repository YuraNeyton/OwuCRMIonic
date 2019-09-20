import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ClientService} from '../../../services/client.service';
import {ApplicationService} from '../../../services/application.service';

@Component({
    selector: 'app-home-filter',
    templateUrl: './home-filter.component.html',
    styleUrls: ['./home-filter.component.scss'],
})
export class HomeFilterComponent implements OnInit {
    sort = '';
    filterParams = {
        'client.fullname': '',
        'city.name': '',
        'course.name': '',
        'group.name': '',
        surname: '',
        fullPrice: '',
        leftToPay: ''
    };

    constructor(
        private modalController: ModalController,
        private applicationService: ApplicationService
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

    filter() {
        this.applicationService.$Filter.next(this.filterParams);
        this.close();
    }
}
