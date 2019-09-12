import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';

@Component({
    selector: 'app-applications',
    templateUrl: './applications.page.html',
    styleUrls: ['./applications.page.scss'],
})
export class ApplicationsPage implements OnInit {

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
