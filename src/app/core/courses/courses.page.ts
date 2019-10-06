import {Component, OnInit} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {Course} from '../../models/course';
import {CourseService} from '../../services/course.service';
import {MaterialTableService} from '../../services/material-table.service';
import {Observable} from 'rxjs';
import {CoursesFilterComponent} from './courses-filter/courses-filter.component';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.page.html',
    styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
    courses: Course[] = [];
    count = 0;

    pageIndex = 1;
    pageSize = 15;
    countOfPages = 1;

    sort = '';
    filter: any = {};
    tableListCount = 0;

    hideSkeleton = false;
    pageForSkeleton = 'courses';

    constructor(
        private menuCtr: MenuController,
        private coursesService: CourseService,
        private materialTableService: MaterialTableService,
        private modalController: ModalController
    ) {
    }

    ngOnInit() {
        this.closeMenu();
        this.coursesService.$getHeader.subscribe((value: any) => {
            this.loadSorted(value.name, value.element, value.e);
        });
        this.loadCourses();
        this.loadFiltered();
    }

    public closeMenu() {
        this.menuCtr.close('first');
    }

    loadCourses() {
        this.sendLoadCourses().subscribe(response => {
            this.count = response.count;
            this.courses = response.models;
            this.hideSkeleton = true;
            this.countOfPages = this.materialTableService.calcCountOfPages(this.count, this.pageSize);
        });
    }

    loadSorted(key: string, headerBlock: HTMLElement, event: any) {
        this.sort = this.materialTableService.sort(key, headerBlock, event);
        this.loadCourses();
    }


    loadPaginated(offset: number, e: any) {
        this.hideSkeleton = false;
        this.pageIndex = this.materialTableService.calcNextPage({
            countOfPages: this.countOfPages,
            currentPage: this.pageIndex,
            nextOffset: offset,
            nextPage: e ? e.target.value : 0,
            event: e
        });
        this.tableListCount = this.pageSize * (this.pageIndex - 1);
        if (this.pageIndex === 1) {
            this.tableListCount = 0;
        }
        this.loadCourses();
    }

    private sendLoadCourses(): Observable<any> {
        const filterToSend = this.getFilterToSend();
        return this.coursesService.getCourses({
            q: filterToSend,
            sort: this.sort ? this.sort : 'createdAt DESC',
            limit: this.pageSize,
            offset: (this.pageIndex * this.pageSize) - this.pageSize
        });
    }

    private getFilterToSend() {
        const res: any = {};

        if (this.filter.name) {
            res.name = {$like: `${this.filter.name}`};
        }

        return res;
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: CoursesFilterComponent,
        });
        return await modal.present();
    }

    loadFiltered() {
        this.coursesService.$Filtered.subscribe((value: any) => {
            this.filter = value;
            this.pageIndex = 1;
            this.loadCourses();
        });
    }

    filterLabel(field) {
        if (field === 'name') {
            this.filter.name = '';
            this.loadCourses();
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
