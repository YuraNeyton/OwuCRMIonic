import {Component, Input, OnInit} from '@angular/core';
import {Eapplication} from '../../models/eapplication';

@Component({
    selector: 'app-e-application-list',
    templateUrl: './e-application-list.component.html',
    styleUrls: ['./e-application-list.component.scss'],
})
export class EApplicationListComponent implements OnInit {
    @Input() eapplications: Eapplication[];

    constructor() {
    }

    ngOnInit() {
    }

}
