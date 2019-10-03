import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';
import {EapplicationService} from '../../services/eapplication.service';
import {Eapplication} from '../../models/eapplication';

@Component({
  selector: 'app-e-applications',
  templateUrl: './e-applications.page.html',
  styleUrls: ['./e-applications.page.scss'],
})
export class EApplicationsPage implements OnInit {
    eapplications: Eapplication[];
    constructor(
        private menuCtr: MenuController,
        private eapplicationService: EapplicationService,
    ) {
    }

    ngOnInit() {
        this.closeMenu();
        this.loadEapplications();
    }

    public closeMenu() {
        this.menuCtr.close('first');
    }

    public loadEapplications() {
        this.eapplicationService.getEapplications().subscribe((value: any) => {
            this.eapplications = value.models;
        });
    }

    public doRefresh(e) {
        setTimeout(() => {
            this.ngOnInit();
            e.target.complete();
        }, 550);
    }

}
