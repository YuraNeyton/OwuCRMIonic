import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../services/client.service';
import {Client} from '../../../models/client';

@Component({
    selector: 'app-clients-table',
    templateUrl: './clients-table.component.html',
    styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent implements OnInit {
    clients: Client[];

    constructor(
        private clientService: ClientService
    ) {
    }

    ngOnInit() {
        this.loadClients();
    }

    public loadClients() {
        this.clientService.getClients().subscribe(value => {
            console.log(value);
            this.clients = value.models;
        });
    }

}
