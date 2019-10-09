import {Component, Input, OnInit} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {Payment} from '../../models/payment';
import {MaterialTableService} from '../../services/material-table.service';
import {PaymentService} from '../../services/payment.service';
import {Observable} from 'rxjs';
import {PaymentsFilterComponent} from './payments-filter/payments-filter.component';
import {PaymentStatus} from '../../models/paymentStatus';
import {ConfigService} from '../../services/config.service';
import {Router} from '@angular/router';
import {PaymentStatusService} from '../../services/payment-status.service';
import * as moment from 'moment';

@Component({
    selector: 'app-payments',
    templateUrl: './payments.page.html',
    styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
    @Input() byApplicationId;
    @Input() openedApplication;
    payments: Payment[] = [];
    paymentStatuses: PaymentStatus[] = [];
    count = 0;
    default = null;
    pageIndex = 1;
    pageSize = 20;
    countOfPages = 1;
    sort = '';
    filter: any = {};
    tableListCount = 0;
    now = new Date();
    hideSkeleton = false;
    pageForSkeleton = 'payments';

    constructor(
        private menuCtr: MenuController,
        private paymentService: PaymentService,
        public materialTableService: MaterialTableService,
        private modalController: ModalController,
        private configService: ConfigService,
        private router: Router,
        private paymentStatusService: PaymentStatusService
    ) {
    }

    ngOnInit() {
        if (localStorage.getItem('payments')) {
            this.pageSize = JSON.parse(localStorage.getItem('payments'));
        }
        this.loadPayments();
        this.paymentStatusService.getStatuses({}).subscribe(value => {
            this.paymentStatuses = value.models;
        });
        this.paymentService.$getHeader.subscribe((value: any) => {
            this.loadSorted(value.name, value.element, value.e);
        });
        this.loadFiltered();
    }

    public closeMenu() {
        this.menuCtr.close('first');
    }

    loadPayments() {
        localStorage.setItem('payments', JSON.stringify(this.pageSize));
        if (this.pageSize) {
            this.sendLoadPayments().subscribe(response => {
                this.count = response.count;
                this.payments = response.models;
                this.hideSkeleton = true;
                this.countOfPages = this.materialTableService.calcCountOfPages(this.count, this.pageSize);
            });
        }
    }

    loadSorted(key: string, headerBlock: HTMLElement, event: any) {
        this.sort = this.materialTableService.sort(key, headerBlock, event);
        this.loadPayments();
    }

    loadFiltered() {
        this.paymentService.$Filtered.subscribe((value: any) => {
            this.filter = value;
            this.pageIndex = 1;
            this.loadPayments();
        });

    }

    loadPaginated(offset: number, e: any) {
        this.hideSkeleton = false;
        this.pageIndex = this.materialTableService.calcNextPage({
            countOfPages: this.countOfPages,
            currentPage: this.pageIndex,
            nextOffset: offset,
            nextPage: e ? e.target.value : 0,
            event: e,
        });
        this.tableListCount = this.pageSize * (this.pageIndex - 1);
        if (this.pageIndex === 1) {
            this.tableListCount = 0;
        }
        this.loadPayments();
    }

    private sendLoadPayments(): Observable<any> {
        const filterToSend = this.getFilterToSend();
        return this.paymentService.getPayments({
            q: filterToSend,
            sort: this.sort ? this.sort : 'expectedDate ASC',
            limit: this.pageSize,
            offset: (this.pageIndex * this.pageSize) - this.pageSize,
            include: [
                this.byApplicationId ? '' : 'application>client',
                this.byApplicationId ? '' : 'application>course',
                'file'
            ],
        });
    }

    private getFilterToSend() {
        const res: any = {};
        if (this.filter.number) {
            res.number = {$like: `${this.filter.number}`};
        }
        if (this.filter.amount) {
            res.amount = this.filter.amount;
        }
        if (this.filter.expectedAmount) {
            res.expectedAmount = this.filter.expectedAmount;
        }
        if (this.byApplicationId) {
            res.applicationId = this.byApplicationId;
        }
        if (this.filter['client.fullname']) {
            res.client = {fullname: `${this.filter['client.fullname']}`};
        }
        if (this.filter['course.name']) {
            res.course = {name: `${this.filter['course.name']}`};
        }
        if (this.filter.paymentDate) {
            res.paymentDate = moment(this.filter.paymentDate).format('YYYY-MM-DDT00:00:00.000') + 'Z';
        }
        if (this.filter.statusId) {
            res.paymentStatusId = this.filter.statusId;
        }
        return res;
    }

    changePage(event) {
        if (event.direction === 2) {
            this.loadPaginated(1, null);
        } else if (event.direction === 4) {
            this.loadPaginated(-1, null);
        }
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: PaymentsFilterComponent,
            componentProps: {s: this.paymentStatuses}
        });
        this.loadPayments();
        return await modal.present();
    }

    filterLabel(field) {
        if (field === 'client.fullname') {
            this.filter['client.fullname'] = '';
            this.loadPayments();
        } else if (field === 'number') {
            this.filter.number = '';
            this.loadPayments();
        } else if (field === 'course.name') {
            this.filter['course.name'] = '';
            this.loadPayments();
        } else if (field === 'expectedAmount') {
            this.filter.expectedAmount = '';
            this.loadPayments();
        } else if (field === 'paymentDate') {
            this.filter.paymentDate = '';
            this.loadPayments();
        } else if (field === 'amount') {
            this.filter.amount = '';
            this.loadPayments();
        } else if (field === 'statusId') {
            this.filter.statusId = '';
            this.loadPayments();
        }
    }
    doRefresh(e) {
        setTimeout(() => {
            this.ngOnInit();
            e.target.complete();
        }, 550);
    }


}
