import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-sending',
  templateUrl: './sending.page.html',
  styleUrls: ['./sending.page.scss'],
})
export class SendingPage implements OnInit {

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
