import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../../models/task";
import {TaskService} from "../../../services/task.service";

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss'],
})
export class TasksTableComponent implements OnInit {
  @Input() tasks: Task[] = [];
  constructor(
      private tasksService: TaskService,
  ) { }

  ngOnInit() {}

  getHeader(key: string, headerBlock: HTMLElement, event: any) {
    this.tasksService.$getHeader.next({name: key, element: headerBlock, e: event});
  }

}
