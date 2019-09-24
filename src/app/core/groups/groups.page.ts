import {Component, Input, OnInit} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {Group} from '../../models/group';
import {Observable} from 'rxjs';
import {City} from '../../models/city';
import {GroupService} from '../../services/group.service';
import {MaterialTableService} from '../../services/material-table.service';
import {FilterGroupsComponent} from './filter-groups/filter-groups.component';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.page.html',
    styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {
    @Input() byCourseId;
    groups: Group[] = [];

    count = 0;

    pageIndex = 1;
    pageSize = 19;
    countOfPages = 1;

    sort = '';
    filter: any = {};

    constructor(
        private menuCtr: MenuController,
        private groupsService: GroupService,
        private materialTableService: MaterialTableService,
        private modalController: ModalController
    ) {
    }

    ngOnInit() {
        this.closeMenu();
        this.groupsService.$getHeader.subscribe((value: any) => {
            this.loadSorted(value.name, value.element, value.e);
        });
        this.loadGroups();
        this.loadFiltered();
    }

    public closeMenu() {
        this.menuCtr.close('first');
    }

    loadGroups() {
        if (this.pageSize) {
            this.sendLoadGroups().subscribe(response => {
                this.count = response.count;
                this.groups = response.models;
                this.countOfPages = this.materialTableService.calcCountOfPages(this.count, this.pageSize);
            });
        }
    }

    loadSorted(key: string, headerBlock: HTMLElement, event: any) {
        this.sort = this.materialTableService.sort(key, headerBlock, event);
        this.loadGroups();
    }

    loadPaginated(offset: number, e: any) {
        this.pageIndex = this.materialTableService.calcNextPage({
            countOfPages: this.countOfPages,
            currentPage: this.pageIndex,
            nextOffset: offset,
            nextPage: e ? e.target.value : 0,
            event: e
        });
        this.loadGroups();
    }

    private sendLoadGroups(): Observable<any> {
        const filterToSend = this.getFilterToSend();
        return this.groupsService.getGroups({
            q: filterToSend,
            sort: this.sort ? this.sort : 'createdAt DESC',
            limit: this.pageSize,
            offset: (this.pageIndex * this.pageSize) - this.pageSize,
            include: ['course', 'city']
        });
    }

    private getFilterToSend() {
        const res: any = {};

        if (this.filter.name) {
            res.name = {$like: `${this.filter.name}`};
        }
        if (this.filter.freePractice) {
            res.freePractice = this.filter.freePractice;
        }
        if (this.filter.usedPractice) {
            res.usedPractice = this.filter.usedPractice;
        }
        if (this.filter['course.name']) {
            res.course = {name: `${this.filter['course.name']}`};
        }
        if (this.filter['city.name']) {
            res.city = {name: `${this.filter['city.name']}`};
        }
        if (this.byCourseId) {
            res.course = {id: this.byCourseId};
        }
        const cities: City[] = JSON.parse(localStorage.getItem('cities'));
        res.$or = [
            {
                cityId: cities.map(c => c.id)
            },
            {
                cityId: null
            }
        ];

        return res;
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: FilterGroupsComponent,
        });
        return await modal.present();
    }

    loadFiltered() {
        this.groupsService.$Filtered.subscribe((value: any) => {
            this.filter = value;
            this.loadGroups();
        });
    }

    filterLabel(field) {
        if (field === 'name') {
            this.filter.name = '';
            this.loadGroups();
        } else if (field === 'city.name') {
            this.filter['city.name'] = '';
            this.loadGroups();
        } else if (field === 'course.name') {
            this.filter['course.name'] = '';
            this.loadGroups();
        } else if (field === 'freePractice') {
            this.filter.freePractice = '';
            this.loadGroups();
        } else if (field === 'usedPractice') {
            this.filter.usedPractice = '';
            this.loadGroups();
        } else if (field === 'usedPractice') {
            this.filter.usedPractice = '';
            this.loadGroups();
        }
    }
    doRefresh(e) {
        setTimeout(() => {
            this.ngOnInit();
            e.target.complete();
        }, 550);
    }

}
