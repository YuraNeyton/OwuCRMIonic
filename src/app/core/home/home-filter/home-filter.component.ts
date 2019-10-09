import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ApplicationService} from '../../../services/application.service';

@Component({
    selector: 'app-home-filter',
    templateUrl: './home-filter.component.html',
    styleUrls: ['./home-filter.component.scss'],
})
export class HomeFilterComponent implements OnInit {
    @Input() component: string;
    sort = '';
    filterParams = {
        'client.fullname': '',
        'city.name': '',
        'course.name': '',
        'group.name': '',
        surname: '',
        fullPrice: '',
        leftToPay: '',
        appDateInput: '',
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
            data: this.sort
        });
    }

    filter() {
        this.applicationService.$Filter.next({c: this.component, f: this.filterParams});
        this.close();
    }
}
