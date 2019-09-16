import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../../models/application';

@Component({
    selector: 'app-application-list',
    templateUrl: './application-list.component.html',
    styleUrls: ['./application-list.component.scss'],
})
export class ApplicationListComponent implements OnInit {
    @Input() applications: Application[];

    constructor() {
    }

    ngOnInit() {
        console.log(this.applications);
    }

}
