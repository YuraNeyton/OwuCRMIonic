import {Component, OnInit} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {ClientService} from '../../services/client.service';
import {Client} from '../../models/client';
import {MaterialTableService} from '../../services/material-table.service';
import {Observable} from 'rxjs';
import {FilterComponent} from './filter/filter.component';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.page.html',
    styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {
    clients: Client[];
    count = 0;
    pageIndex = 1;
    pageSize = 19;
    countOfPages = 1;
    sort = '';
    filter: any = {};
    statusIdForSearch: number;

    constructor(
        private menuCtr: MenuController,
        private clientsService: ClientService,
        private materialTableService: MaterialTableService,
        private modalController: ModalController
    ) {
    }

    ngOnInit() {
        this.closeMenu();
        this.loadClients();
        this.clientsService.$getHeader.subscribe((value: any) => {
            this.loadSorted(value.name, value.element, value.e);
        });
        this.loadFiltered();
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: FilterComponent,
        });
        this.loadClients();
        return await modal.present();
    }

    public closeMenu() {
        this.menuCtr.close('first');
    }

    private sendLoadClients(): Observable<any> {
        const filterToSend = this.getFilterToSend();
        return this.clientsService.getClients({
            q: filterToSend,
            sort: this.sort ? this.sort : 'createdAt DESC',
            limit: this.pageSize,
            offset: (this.pageIndex * this.pageSize) - this.pageSize,
            include: ['social', 'address']
        });
    }

    private getFilterToSend() {
        const res: any = {};

        if (this.filter.name) {
            res.name = {$like: `${this.filter.name}`};
        }
        if (this.filter.surname) {
            res.surname = {$like: `${this.filter.surname}`};
        }
        if (this.filter.age) {
            res.age = {$like: `${this.filter.age}`};
        }
        if (this.filter.phone) {
            res.phone = {$like: `${this.filter.phone}`};
        }
        if (this.filter.email) {
            res.email = {$like: `${this.filter.email}`};
        }
        if (this.statusIdForSearch) {
            res.statusId = {$like: `${this.statusIdForSearch}`};
        }
        if (this.filter['social.url']) {
            res.social = {url: `${this.filter['social.url']}`};
        }

        return res;
    }

    public loadClients() {
        if (this.pageSize) {
            this.sendLoadClients().subscribe(response => {
                this.count = response.count;
                this.clients = response.models;
                this.countOfPages = this.materialTableService.calcCountOfPages(this.count, this.pageSize);
            });
        }
    }

    public loadPaginated(offset: number, e: any) {
        this.pageIndex = this.materialTableService.calcNextPage({
            countOfPages: this.countOfPages,
            currentPage: this.pageIndex,
            nextOffset: offset,
            nextPage: e ? e.target.value : 0,
            event: e
        });
        this.loadClients();

    }

    loadSorted(key: string, headerBlock: HTMLElement, event: any) {
        this.sort = this.materialTableService.sort(key, headerBlock, event);
        this.loadClients();
    }

    loadFiltered() {
        this.clientsService.$Filtered.subscribe((value: any) => {
            // this.filter = this.materialTableService.getFilter(value.el);
            // console.log(this.filter);
            this.filter = value;
            this.loadClients();
        });
    }

    filterLabel(field) {
        if (field === 'name') {
            this.filter.name = '';
            this.loadClients();
        } else if (field === 'surname') {
            this.filter.surname = '';
            this.loadClients();
        } else {
            this.filter.phone = '';
            this.loadClients();
        }
    }
    doRefresh(e) {
        setTimeout(() => {
            this.ngOnInit();
            e.target.complete();
        }, 550);
    }
}
