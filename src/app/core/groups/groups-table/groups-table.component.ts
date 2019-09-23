import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../models/group';
import {GroupService} from '../../../services/group.service';
import {Client} from '../../../models/client';
import {SingleClientComponent} from '../../clients/single-client/single-client.component';
import {ModalController} from '@ionic/angular';
import {SingleGroupComponent} from '../single-group/single-group.component';

@Component({
    selector: 'app-groups-table',
    templateUrl: './groups-table.component.html',
    styleUrls: ['./groups-table.component.scss'],
})
export class GroupsTableComponent implements OnInit {
    @Input() groups: Group[];

    constructor(
        private groupService: GroupService,
        private modalController: ModalController
    ) {
    }

    ngOnInit() {
    }

    getHeader(key: string, headerBlock: HTMLElement, event: any) {
        this.groupService.$getHeader.next({name: key, element: headerBlock, e: event});
    }

    async presentModal(group: Group) {
        const modal = await this.modalController.create({
            component: SingleGroupComponent,
            componentProps: {g: group}
        });
        return await modal.present();
    }

}
