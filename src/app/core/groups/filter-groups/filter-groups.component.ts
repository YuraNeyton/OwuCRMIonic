import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {GroupService} from '../../../services/group.service';

@Component({
    selector: 'app-filter-groups',
    templateUrl: './filter-groups.component.html',
    styleUrls: ['./filter-groups.component.scss'],
})
export class FilterGroupsComponent implements OnInit {
    sort = '';
    filterParams = {
        'city.name': '',
        'course.name': '',
        name: '',
        freePractice: '',
        usedPractice: ''
    };

    constructor(
        private modalController: ModalController,
        private groupService: GroupService
    ) {
    }

    ngOnInit() {
    }

    filter() {
        this.groupService.$Filtered.next(this.filterParams);
        this.close();
    }

    close() {
        this.modalController.dismiss({
            data: this.sort
        });
    }

}
