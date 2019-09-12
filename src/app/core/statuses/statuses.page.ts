import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.page.html',
  styleUrls: ['./statuses.page.scss'],
})
export class StatusesPage implements OnInit {

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
