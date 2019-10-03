import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../../models/course';
import {CourseService} from '../../../services/course.service';

@Component({
    selector: 'app-courses-table',
    templateUrl: './courses-table.component.html',
    styleUrls: ['./courses-table.component.scss'],
})
export class CoursesTableComponent implements OnInit {

    @Input() courses: Course[];
    @Input() tableListCount;

    constructor(
        private coursesService: CourseService
    ) {
    }

    ngOnInit() {
    }

    getHeader(key: string, headerBlock: HTMLElement, event: any) {
        this.coursesService.$getHeader.next({name: key, element: headerBlock, e: event});
    }
}
