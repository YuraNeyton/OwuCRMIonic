import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {CourseService} from '../../../services/course.service';

@Component({
    selector: 'app-courses-filter',
    templateUrl: './courses-filter.component.html',
    styleUrls: ['./courses-filter.component.scss'],
})
export class CoursesFilterComponent implements OnInit {
    sort = '';
    filterParams = {
        name: ''
    };

    constructor(
        private modalController: ModalController,
        private coursesService: CourseService
    ) {
    }

    ngOnInit() {
    }

    filter() {
        this.coursesService.$Filtered.next(this.filterParams);
        this.close();
    }

    close() {
        this.modalController.dismiss({
            data: this.sort
        });
    }

}
