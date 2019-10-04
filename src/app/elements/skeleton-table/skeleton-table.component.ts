import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-skeleton-table',
  templateUrl: './skeleton-table.component.html',
  styleUrls: ['./skeleton-table.component.scss'],
})
export class SkeletonTableComponent implements OnInit {
  @Input() pageSize;
  @Input() page;
  skeletons = [];
  constructor() { }

  ngOnInit() {
      for (let i = 0; i < this.pageSize; i++) {
          this.skeletons.push(i);
      }
  }

}
