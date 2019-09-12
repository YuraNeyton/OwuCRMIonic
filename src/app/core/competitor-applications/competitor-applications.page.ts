import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-competitor-applications',
  templateUrl: './competitor-applications.page.html',
  styleUrls: ['./competitor-applications.page.scss'],
})
export class CompetitorApplicationsPage implements OnInit {

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
