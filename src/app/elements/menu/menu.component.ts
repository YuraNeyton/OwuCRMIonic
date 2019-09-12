import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    pages = [
        {
            id: 0,
            open: false,
            title: 'Головна',
            url: '/home',
            children: [
            ]
        },
        {
            id: 1,
            open: false,
            title: 'Клієнти',
            url: '/clients',
            children: [
                {id: 1, title: 'Завдання', url: '/tasks'},
                {id: 2, title: 'Карта', url: '/clients-map'}
            ]
        },
        {
            id: 2,
            open: false,
            title: 'Заявки',
            url: '/applications',
            children: [
                {id: 1, title: 'Ел. Заявки', url: '/e-applications'},
                {id: 2, title: 'Платежі', url: '/payments'},
                {id: 3, title: 'Статистика по платежам', url: '/reports'},
            ]
        },
        {
            id: 3,
            open: false,
            title: 'Групи',
            url: '/groups',
            children: [
            ]
        },
        {
            id: 4,
            open: false,
            title: 'Курси',
            url: '/courses',
            children: [
            ]
        },
        {
            id: 5,
            open: false,
            title: 'Інше',
            url: '/sources',
            children: [
                {id: 1, title: 'Джерела', url: '/sources'},
                {id: 2, title: 'Міста', url: '/cities'},
                {id: 3, title: 'Менеджери', url: '/managers'},
                {id: 4, title: 'Статуси Клієнтів', url: '/statuses'},
                {id: 5, title: 'Статуси Платежів', url: '/payment-statuses'},
                {id: 6, title: 'Розсилки', url: '/sending'},
            ]
        },
        {
            id: 6,
            open: false,
            title: 'Конкуренти',
            url: '/competitors',
            children: [
                {id: 1, title: 'Заявки', url: '/competitor-applications'},
            ]
        },
        {
            id: 7,
            open: false,
            title: 'Рейтинги',
            url: '/ratings',
            children: [
            ]
        },
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
