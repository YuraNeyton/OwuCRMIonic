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
    hideSkeleton = false;
    constructor(
        private menuCtr: MenuController,
        private eapplicationService: EapplicationService,
    ) {
    }

    ngOnInit() {
        this.loadEapplications();
    }

    public loadEapplications() {
        this.hideSkeleton = false;
        this.eapplicationService.getEapplications().subscribe((value: any) => {
            this.eapplications = value.models;
            this.hideSkeleton = true;
        });
    }

    public doRefresh(e) {
        setTimeout(() => {
            this.ngOnInit();
            e.target.complete();
        }, 550);
    }

}
