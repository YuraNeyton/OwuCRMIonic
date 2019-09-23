import {Component, Input, OnInit} from '@angular/core';
import {Client} from '../../../models/client';
import {ClientService} from '../../../services/client.service';
import {ModalController} from '@ionic/angular';
import {SingleClientComponent} from '../single-client/single-client.component';

@Component({
    selector: 'app-clients-table',
    templateUrl: './clients-table.component.html',
    styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent implements OnInit {
    @Input() clients: Client[];

    constructor(
        private clientService: ClientService,
        public modalController: ModalController
    ) {
    }

    ngOnInit() {
    }

    getHeader(key: string, headerBlock: HTMLElement, event: any) {
        this.clientService.$getHeader.next({name: key, element: headerBlock, e: event});
    }

    async presentModal(client: Client) {
        const modal = await this.modalController.create({
            component: SingleClientComponent,
            componentProps: {c: client}
        });
        return await modal.present();
    }

}
