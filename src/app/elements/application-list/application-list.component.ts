import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../../models/application';
import {Client} from '../../models/client';
import {SingleClientComponent} from '../../core/clients/single-client/single-client.component';
import {ModalController} from '@ionic/angular';
import {SingleApplicationComponent} from '../single-application/single-application.component';
import {ApplicationService} from '../../services/application.service';

@Component({
    selector: 'app-application-list',
    templateUrl: './application-list.component.html',
    styleUrls: ['./application-list.component.scss'],
})
export class ApplicationListComponent implements OnInit {
    @Input() applications: Application[];

    constructor(
        private modalController: ModalController,
        private applicationService: ApplicationService
    ) {
    }

    ngOnInit() {
        console.log(this.applications);
    }

    getHeader(key: string, headerBlock: HTMLElement, event: any) {
        this.applicationService.$getHeader.next({name: key, element: headerBlock, e: event});
    }

    async presentModal(application: Application) {
        const modal = await this.modalController.create({
            component: SingleApplicationComponent,
            componentProps: {a: application}
        });
        return await modal.present();
    }

}
