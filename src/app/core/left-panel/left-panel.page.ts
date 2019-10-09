import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-left-panel',
    templateUrl: './left-panel.page.html',
    styleUrls: ['./left-panel.page.scss'],
})
export class LeftPanelPage implements OnInit {
    pages: any = [
        {
            id: 0,
            open: false,
            title: 'Головна',
            url: '/tabs/home',
            icon: 'home',
            children: []
        },
        {
            id: 1,
            open: false,
            title: 'Клієнти',
            url: '/tabs/clients',
            icon: 'person',

        },
        {
            id: 2,
            open: false,
            title: 'Завдання',
            url: '/tabs/tasks',
            icon: 'attach',
        },
        {
            id: 3,
            open: false,
            title: 'Заявки',
            url: '/tabs/applications',
            icon: 'clipboard',

        },
        {
            id: 3,
            open: false,
            title: 'Ел. Заявки',
            url: '/tabs/e-applications',
            icon: 'mail',

        },
        {
            id: 3,
            open: false,
            title: 'Платежі',
            url: '/tabs/payments',
            icon: 'card',

        },
        {
            id: 4,
            open: false,
            title: 'Групи',
            url: '/tabs/groups',
            icon: 'people',
            children: []
        },
        {
            id: 5,
            open: false,
            title: 'Курси',
            url: '/tabs/courses',
            icon: 'school',
            children: []
        },

    ];

    constructor(
    ) {
    }

    ngOnInit() {

    }

}
