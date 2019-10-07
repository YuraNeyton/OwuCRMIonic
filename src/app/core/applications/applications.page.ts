import {Component, Input, OnInit} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {HomeFilterComponent} from '../home/home-filter/home-filter.component';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ApplicationService} from '../../services/application.service';
import {MaterialTableService} from '../../services/material-table.service';
import {City} from '../../models/city';
import {Application} from '../../models/application';

@Component({
    selector: 'app-applications',
    templateUrl: './applications.page.html',
    styleUrls: ['./applications.page.scss'],
})
export class ApplicationsPage implements OnInit {
    @Input() byGroupId;
    @Input() byClientId;
    appDateInput;
    applications: Application[];
    sort = '';
    count = 0;
    pageIndex = 1;
    pageSize = 20;
    countOfPages = 1;
    filter: any = {};
    tableListCount = 0;
    hideSkeleton = false;
    pageForSkeleton = 'application';

    constructor(
        private menuCtr: MenuController,
        private authService: AuthService,
        private router: Router,
        private applicationService: ApplicationService,
        private modalController: ModalController,
        private materialTableService: MaterialTableService
    ) {
    }

    ngOnInit() {
        if (localStorage.getItem('applications')) {
            this.pageSize = JSON.parse(localStorage.getItem('applications'));
        }
        this.loadApplications();
        this.applicationService.$getHeader.subscribe((value: any) => {
            this.loadSorted(value.name, value.element, value.e);
        });
        this.loadFiltered();
    }

    public closeMenu() {
        this.menuCtr.close('first');
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: HomeFilterComponent,
            componentProps: {component: 'applicationsPage'}
        });
        return await modal.present();
    }

    sendLoadApplications() {
        const filterToSend = this.getFilterToSend();
        return this.applicationService.getApplications({
            q: filterToSend,
            sort: this.sort ? this.sort : 'createdAt DESC',
            limit: this.pageSize,
            offset: (this.pageIndex * this.pageSize) - this.pageSize,
            include: ['client', 'course', 'group', 'city']
        });
    }

    loadSorted(key: string, headerBlock: HTMLElement, event: any) {
        this.sort = this.materialTableService.sort(key, headerBlock, event);
        this.loadApplications();
    }

    loadFiltered() {
        this.applicationService.$Filter.subscribe((value: any) => {
            if (value.c === 'applicationsPage') {
                this.filter = value.f;
                this.pageIndex = 1;
                this.loadApplications();
            }
        });
    }

    private getFilterToSend() {
        const res: any = {};

        if (this.filter['client.fullname']) {
            res.client = {fullname: `${this.filter['client.fullname']}`};
        }
        if (this.filter['course.name']) {
            res.course = {name: `${this.filter['course.name']}`};
        }
        if (this.filter['group.name']) {
            res.group = {name: `${this.filter['group.name']}`};
        }
        if (this.filter['city.name']) {
            res.city = {name: `${this.filter['city.name']}`};
        }
        if (this.filter.certificate) {
            res.certificate = {$like: `${this.filter.certificate}`};
        }
        if (this.filter.fullPrice) {
            res.fullPrice = this.filter.fullPrice;
        }
        if (this.filter.discount) {
            res.discount = this.filter.discount;
        }
        if (this.filter.wantPractice === '+' || this.filter.wantPractice === '-') {
            res.wantPractice = this.filter.wantPractice === '+' ? 1 : this.filter.wantPractice === '-' ? 0 : null;
        }
        if (this.filter.needLaptop === '+' || this.filter.needLaptop === '-') {
            res.needLaptop = this.filter.needLaptop === '+' ? 1 : this.filter.needLaptop === '-' ? 0 : null;
        }
        if (this.filter.hasPractice === '+' || this.filter.hasPractice === '-') {
            res.hasPractice = this.filter.hasPractice === '+' ? 1 : this.filter.hasPractice === '-' ? 0 : null;
        }
        if (this.filter.gotLaptop === '+' || this.filter.gotLaptop === '-') {
            res.gotLaptop = this.filter.gotLaptop === '+' ? 1 : this.filter.gotLaptop === '-' ? 0 : null;
        }
        if (this.filter.leftToPay) {
            res.leftToPay = this.filter.leftToPay;
        }
        if (this.byGroupId) {
            res.group = {id: this.byGroupId, ...res.group};
        }
        if (this.byClientId) {
            res.client = {id: this.byClientId, ...res.client};
        }
        const cities: City[] = JSON.parse(localStorage.getItem('cities'));

        if (!this.byClientId) {
            res.$or = [
                {
                    cityId: cities.map(c => c.id)
                },
                {
                    cityId: null
                }
            ];
        }
        if (this.appDateInput) {
            res.date = this.appDateInput;
        }

        return res;
    }

    filterLabel(field) {
        if (field === 'client.fullname') {
            this.filter['client.fullname'] = '';
            this.loadApplications();
        } else if (field === 'city.name') {
            this.filter['city.name'] = '';
            this.loadApplications();
        } else if (field === 'course.name') {
            this.filter['course.name'] = '';
            this.loadApplications();
        } else if (field === 'group.name') {
            this.filter['group.name'] = '';
            this.loadApplications();
        } else if (field === 'fullPrice') {
            this.filter.fullPrice = '';
            this.loadApplications();
        } else if (field === 'leftToPay') {
            this.filter.leftToPay = '';
            this.loadApplications();
        }
    }

    public loadPaginated(offset: number, e: any) {
        this.hideSkeleton = false;
        this.pageIndex = this.materialTableService.calcNextPage({
            countOfPages: this.countOfPages,
            currentPage: this.pageIndex,
            nextOffset: offset,
            nextPage: e ? e.target.value : 0,
            event: e
        });
        // if (offset === 1) {
        //     if (this.countOfPages !== 1) {
        //         this.tableListCount += this.pageSize;
        //     }
        // } else {
        //     if (this.tableListCount !== 0) {
        //         this.tableListCount -= this.pageSize;
        //     }
        //
        // }
        this.loadApplications();
        this.tableListCount = this.pageSize * (this.pageIndex - 1);
        if (this.pageIndex === 1) {
            this.tableListCount = 0;
        }

    }

    public loadApplications() {
        localStorage.setItem('applications', JSON.stringify(this.pageSize));
        if (this.pageSize) {
            this.sendLoadApplications().subscribe(response => {
                this.count = response.count;
                this.applications = response.models;
                this.hideSkeleton = true;
                this.countOfPages = this.materialTableService.calcCountOfPages(this.count, this.pageSize);
            });
        }
    }
    doRefresh(e) {
        setTimeout(() => {
            this.ngOnInit();
            e.target.complete();
        }, 550);
    }

    changePage(event) {
        if (event.direction === 2) {
            this.loadPaginated(1, null);
        } else if (event.direction === 4) {
            this.loadPaginated(-1, null);
        }
    }

}
