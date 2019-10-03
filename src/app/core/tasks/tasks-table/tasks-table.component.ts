import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../../models/task';
import {TaskService} from '../../../services/task.service';
import {ModalController} from '@ionic/angular';
import {Application} from '../../../models/application';
import {SingleApplicationComponent} from '../../../elements/single-application/single-application.component';
import {SingleTaskComponent} from '../single-task/single-task.component';

@Component({
    selector: 'app-tasks-table',
    templateUrl: './tasks-table.component.html',
    styleUrls: ['./tasks-table.component.scss'],
})
export class TasksTableComponent implements OnInit {
    @Input() tasks: Task[] = [];
    @Input() tableListCount;

    constructor(
        private tasksService: TaskService,
        private modalController: ModalController,
    ) {
    }

    ngOnInit() {
    }

    getHeader(key: string, headerBlock: HTMLElement, event: any) {
        this.tasksService.$getHeader.next({name: key, element: headerBlock, e: event});
    }
    async presentModal(task: Task) {
        const modal = await this.modalController.create({
            component: SingleTaskComponent,
            componentProps: {t: task}
        });
        return await modal.present();
    }

}
