import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../../models/application';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-single-application',
    templateUrl: './single-application.component.html',
    styleUrls: ['./single-application.component.scss'],
})
export class SingleApplicationComponent implements OnInit {
    @Input() a: Application;

    constructor(private modalController: ModalController) {
    }

    ngOnInit() {
        console.log(this.a);
    }

    close() {
        this.modalController.dismiss();
    }
}
