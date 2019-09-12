import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

    constructor(
        private menuCtr: MenuController
    ) {
    }

    ngOnInit() {
        this.closeMenu();
    }

    public closeMenu() {
        this.menuCtr.close('first');
    }

}
