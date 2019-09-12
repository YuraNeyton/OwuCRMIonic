import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-e-applications',
  templateUrl: './e-applications.page.html',
  styleUrls: ['./e-applications.page.scss'],
})
export class EApplicationsPage implements OnInit {

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
