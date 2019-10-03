import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Task} from '../../../models/task';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss'],
})
export class SingleTaskComponent implements OnInit {
    @Input() t: Task;

    constructor(private modalController: ModalController) {
    }

    ngOnInit() {
        console.log(this.t);
    }

    close() {
        this.modalController.dismiss();
    }
}
