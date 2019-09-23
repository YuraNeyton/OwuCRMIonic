import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../models/group';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-single-group',
    templateUrl: './single-group.component.html',
    styleUrls: ['./single-group.component.scss'],
})
export class SingleGroupComponent implements OnInit {
    @Input() g: Group;

    constructor(private modalController: ModalController) {
    }

    ngOnInit() {
    }

    close() {
        this.modalController.dismiss();
    }
}
