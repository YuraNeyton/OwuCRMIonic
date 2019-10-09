import {Component, Input, OnInit} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {TasksFilterComponent} from './tasks-filter/tasks-filter.component';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/task';
import {MaterialTableService} from '../../services/material-table.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import * as moment from 'moment';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.page.html',
    styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
    @Input() byClientId;
    tasks: Task[] = [];
    count = 0;
    pageIndex = 1;
    pageSize = 20;
    countOfPages = 1;
    doneTaskTable = null;
    sort = '';
    filter: any = {};
    tableListCount = 0;
    paramsToAdd = {
        clientTaskTable: null,
        messageTaskTable: null,
        dateTaskTable: null,
        doneTaskTable: 'all',
        include: 'client',
        sortTaskTable: 'createdAt DESC',
        pageTaskTable: 1,
        limit: this.pageSize,
        offset: 0
    };
    hideSkeleton = false;
    pageForSkeleton = 'tasks';

    constructor(
        private menuCtr: MenuController,
        private modalController: ModalController,
        private tasksService: TaskService,
        public materialTableService: MaterialTableService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit() {
        if (localStorage.getItem('tasks')) {
            this.pageSize = JSON.parse(localStorage.getItem('tasks'));
        }
        this.loadTasks();
        this.tasksService.refreshTableSubject.subscribe(() => {
            this.loadTasks();
        });
        this.tasksService.$getHeader.subscribe((value: any) => {
            this.loadSorted(value.name, value.element, value.e);
        });
        this.loadFiltered();
    }

    public closeMenu() {
        this.menuCtr.close('first');
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: TasksFilterComponent,
        });
        this.loadTasks();
        return await modal.present();
    }

    addDateToParams(e) {
        this.router.navigate([], {
            queryParams: {
                dateTaskTable: e._d.getTime() / 1000
            },
            queryParamsHandling: 'merge',
        });
    }


    loadSorted(key: string, headerBlock: HTMLElement, event: any) {
        this.sort = this.materialTableService.sort(key, headerBlock, event);
        this.addParamsToSort(this.sort);
        this.loadTasks();
    }

    loadFiltered() {
        this.tasksService.$Filtered.subscribe((value: any) => {
            this.filter = value;
            this.paramsToAdd.clientTaskTable = value['client.name'];
            this.paramsToAdd.messageTaskTable = value.message;
            this.pageIndex = 1;
            if (value.date) {
                this.paramsToAdd.dateTaskTable = moment(this.filter.date).format('YYYY-MM-DDT00:00:00.000') + 'Z';
            }
            this.loadTasks();
        });
    }

    loadPaginated1(e) {
        if (e.target.value < 1) {
            e.target.value = 1;
        } else if (e.target.value > this.countOfPages) {
            e.target.value = this.countOfPages;
        }
        if (e.target.value !== this.paramsToAdd.pageTaskTable) {
            if (e.target.value > 0 && e.target.value <= this.countOfPages) {
                this.addPageIndexParams(e.target.value);
            }
        }
    }

    loadPaginated1Arrows(action) {
        if (action === '+') {
            if ((this.pageIndex + 1) > this.countOfPages) {
            } else if ((this.pageIndex + 1) <= this.countOfPages) {
                this.addPageIndexParams(this.pageIndex + 1);
            }
        }
        if (action === '-') {
            if ((this.pageIndex - 1) < 1) {
            } else if ((this.pageIndex - 1) >= 1) {
                this.addPageIndexParams(this.pageIndex - 1);
            }
        }
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
        this.loadTasks();
    }

    private sendLoadTasks(): Observable<any> {
        const filterToSend = this.getFilterToSend();
        return this.tasksService.getTasks({
            q: filterToSend,
            include: ['client'],
            sort: this.sort ? this.sort : 'createdAt DESC',
            limit: this.pageSize,
            offset: (this.pageIndex * this.pageSize) - this.pageSize
        });
    }

    private getFilterToSend() {
        const res: any = {};
        if (this.filter.message) {
            res.message = {$like: `${this.filter.message}`};
        }
        if (this.filter['client.name']) {
            res.client = {name: `${this.filter['client.name']}`};
        }
        if (this.byClientId) {
            res.client = {id: this.byClientId, ...res.group};
        }
        if (this.filter.date) {
            res.date = moment(this.filter.date).format('YYYY-MM-DDT00:00:00.000') + 'Z';
        }
        if (this.paramsToAdd.doneTaskTable == '1') {
            res.done = 1;
        } else if (this.paramsToAdd.doneTaskTable == '0') {
            res.done = 0;
        } else if (this.paramsToAdd.doneTaskTable === 'all') {
        }

        return res;
    }

    loadTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.pageSize));
        this.sendLoadTasks().subscribe(response => {
            this.count = response.count;
            this.tasks = response.models;
            this.hideSkeleton = true;
            this.countOfPages = this.materialTableService.calcCountOfPages(this.count, this.pageSize);
        });
    }

    addPageIndexParams(pageIndex: number) {
        this.router.navigate([], {
            queryParams: {
                pageTaskTable: pageIndex
            },
            queryParamsHandling: 'merge',
        });
    }

    addParamsToSort(data) {
        if (data) {
            this.router.navigate([], {
                queryParams: {
                    sortTaskTable: data
                },
                queryParamsHandling: 'merge',
            });
        } else {
            this.router.navigate([], {
                queryParams: {
                    sortTaskTable: null
                },
                queryParamsHandling: 'merge',
            });
        }
    }

    doRefresh(e) {
        setTimeout(() => {
            this.ngOnInit();
            e.target.complete();
        }, 550);
    }

    filterLabel(field) {
        if (field === 'message') {
            this.filter.message = '';
            this.paramsToAdd.messageTaskTable = null;
            this.loadTasks();
        } else if (field === 'client.name') {
            this.filter['client.name'] = '';
            this.paramsToAdd.clientTaskTable = null;
            this.loadTasks();
        } else if (field === 'date') {
            this.filter.date = '';
            this.paramsToAdd.dateTaskTable = null;
            this.loadTasks();
        }
    }

    changePage(event) {
        if (event.direction === 2) {
            this.loadPaginated(1, null);
        } else if (event.direction === 4) {
            this.loadPaginated(-1, null);
        }
    }

}
