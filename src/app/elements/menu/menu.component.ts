import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';

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
            icon: 'home',
            children: []
        },
        {
            id: 1,
            open: false,
            title: 'Клієнти',
            url: '/clients',
            icon: 'person',
            // children: [
            //     // {id: 1, title: 'Завдання', url: '/tasks'},
            //     // {id: 2, title: 'Карта', url: '/clients-map'}
            // ]
        },
        {
            id: 2,
            open: false,
            title: 'Завдання',
            url: '/tasks',
            icon: 'attach',
        },
        {
            id: 3,
            open: false,
            title: 'Заявки',
            url: '/applications',
            icon: 'clipboard',
            // children: [
            //     {id: 1, title: 'Ел. Заявки', url: '/e-applications'},
            //     {id: 2, title: 'Платежі', url: '/payments'},
            //     // {id: 3, title: 'Статистика по платежам', url: '/reports'},
            // ]
        },
        {
            id: 3,
            open: false,
            title: 'Ел. Заявки',
            url: '/e-applications',
            icon: 'mail',
            // children: [
            //     {id: 1, title: 'Ел. Заявки', url: '/e-applications'},
            //     {id: 2, title: 'Платежі', url: '/payments'},
            //     // {id: 3, title: 'Статистика по платежам', url: '/reports'},
            // ]
        },
        {
            id: 3,
            open: false,
            title: 'Платежі',
            url: '/payments',
            icon: 'card',
            // children: [
            //     {id: 1, title: 'Ел. Заявки', url: '/e-applications'},
            //     {id: 2, title: 'Платежі', url: '/payments'},
            //     // {id: 3, title: 'Статистика по платежам', url: '/reports'},
            // ]
        },
        {
            id: 4,
            open: false,
            title: 'Групи',
            url: '/groups',
            icon: 'people',
            children: []
        },
        {
            id: 5,
            open: false,
            title: 'Курси',
            url: '/courses',
            icon: 'school',
            children: []
        },
        // {
        //     id: 5,
        //     open: false,
        //     title: 'Інше',
        //     url: '/sources',
        //     icon: 'apps',
        //     children: [
        //         {id: 1, title: 'Джерела', url: '/sources'},
        //         {id: 2, title: 'Міста', url: '/cities'},
        //         {id: 3, title: 'Менеджери', url: '/managers'},
        //         {id: 4, title: 'Статуси Клієнтів', url: '/statuses'},
        //         {id: 5, title: 'Статуси Платежів', url: '/payment-statuses'},
        //         {id: 6, title: 'Розсилки', url: '/sending'},
        //     ]
        // },
        // {
        //     id: 6,
        //     open: false,
        //     title: 'Конкуренти',
        //     url: '/competitors',
        //     icon: 'man',
        //     children: [
        //         {id: 1, title: 'Заявки', url: '/competitor-applications'},
        //     ]
        // },
        // {
        //     id: 6,
        //     open: false,
        //     title: 'Рейтинги',
        //     url: '/ratings',
        //     icon: 'podium',
        //     children: []
        // },
    ];

    constructor(
        private menuController: MenuController,
    ) {
    }

    ngOnInit() {
    }

    closeMenu() {
        this.menuController.close('first');
    }

}
