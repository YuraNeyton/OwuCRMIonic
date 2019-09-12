import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-clients-map',
  templateUrl: './clients-map.page.html',
  styleUrls: ['./clients-map.page.scss'],
})
export class ClientsMapPage implements OnInit {

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
