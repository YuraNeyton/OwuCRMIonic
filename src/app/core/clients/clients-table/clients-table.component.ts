import {Component, Input, OnInit} from '@angular/core';
import {Client} from '../../../models/client';
import {MaterialTableService} from '../../../services/material-table.service';
import {ClientService} from '../../../services/client.service';

@Component({
    selector: 'app-clients-table',
    templateUrl: './clients-table.component.html',
    styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent implements OnInit {
    @Input() clients: Client[];

    constructor(
        private clientService: ClientService
    ) {
    }

    ngOnInit() {
    }

    getHeader(key: string, headerBlock: HTMLElement, event: any) {
        this.clientService.$getHeader.next({name: key, element: headerBlock, e: event});
    }

}
