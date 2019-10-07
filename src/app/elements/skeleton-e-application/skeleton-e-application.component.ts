import {Component, Input, OnInit} from '@angular/core';
import {Eapplication} from '../../models/eapplication';

@Component({
  selector: 'app-skeleton-e-application',
  templateUrl: './skeleton-e-application.component.html',
  styleUrls: ['./skeleton-e-application.component.scss'],
})
export class SkeletonEApplicationComponent implements OnInit {
    @Input() eapplications: Eapplication[];
  constructor() { }

  ngOnInit() {}

}
