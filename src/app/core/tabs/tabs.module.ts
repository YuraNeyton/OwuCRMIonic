import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TabsPage} from './tabs.page';
import {AuthenticatedGuard} from '../../services/guards/authenticated.guard';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'home',
                canActivate: [AuthenticatedGuard],
                loadChildren: () => import('src/app/core/home/home.module').then(h => h.HomePageModule)
            },
            { path: 'tasks', loadChildren: '../../core/tasks/tasks.module#TasksPageModule' },
            { path: 'e-applications', loadChildren: '../../core/e-applications/e-applications.module#EApplicationsPageModule' },
            { path: 'clients', loadChildren: '../../core/clients/clients.module#ClientsPageModule' },
            { path: 'applications', loadChildren: '../../core/applications/applications.module#ApplicationsPageModule' },
            { path: 'groups', loadChildren: '../../core/groups/groups.module#GroupsPageModule' },
            { path: 'courses', loadChildren: '../../core/courses/courses.module#CoursesPageModule' },
            { path: 'payments', loadChildren: '../../core/payments/payments.module#PaymentsPageModule' },
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [TabsPage]
})
export class TabsPageModule {
}
