import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {TaskService} from "../../../services/task.service";

@Component({
  selector: 'app-tasks-filter',
  templateUrl: './tasks-filter.component.html',
  styleUrls: ['./tasks-filter.component.scss'],
})
export class TasksFilterComponent implements OnInit {
  sort = '';
  filterParams = {message: '', date: '', 'client.name': ''};

  constructor(
      private modalController: ModalController,
      private tasksService: TaskService,
  ) {
  }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss({
      data: this.sort
    });
  }

  filter() {
    this.tasksService.$Filtered.next(this.filterParams);
    this.close();
  }
}
