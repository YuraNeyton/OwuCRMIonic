import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthenticatedGuard} from './services/guards/authenticated.guard';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', loadChildren: () => import('./core/login/login.module').then(l => l.LoginPageModule)},
    {
        path: 'home',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('./core/home/home.module').then(h => h.HomePageModule)
    },
  { path: 'clients', loadChildren: './core/clients/clients.module#ClientsPageModule' },
  { path: 'tasks', loadChildren: './core/tasks/tasks.module#TasksPageModule' },
  { path: 'clients-map', loadChildren: './core/clients-map/clients-map.module#ClientsMapPageModule' },
  { path: 'applications', loadChildren: './core/applications/applications.module#ApplicationsPageModule' },
  { path: 'e-applications', loadChildren: './core/e-applications/e-applications.module#EApplicationsPageModule' },
  { path: 'payments', loadChildren: './core/payments/payments.module#PaymentsPageModule' },
  { path: 'reports', loadChildren: './core/reports/reports.module#ReportsPageModule' },
  { path: 'groups', loadChildren: './core/groups/groups.module#GroupsPageModule' },
  { path: 'courses', loadChildren: './core/courses/courses.module#CoursesPageModule' },
  { path: 'sources', loadChildren: './core/sources/sources.module#SourcesPageModule' },
  { path: 'cities', loadChildren: './core/cities/cities.module#CitiesPageModule' },
  { path: 'managers', loadChildren: './core/managers/managers.module#ManagersPageModule' },
  { path: 'statuses', loadChildren: './core/statuses/statuses.module#StatusesPageModule' },
  { path: 'payment-statuses', loadChildren: './core/payment-statuses/payment-statuses.module#PaymentStatusesPageModule' },
  { path: 'sending', loadChildren: './core/sending/sending.module#SendingPageModule' },
  { path: 'competitors', loadChildren: './core/competitors/competitors.module#CompetitorsPageModule' },
  { path: 'competitor-applications', loadChildren: './core/competitor-applications/competitor-applications.module#CompetitorApplicationsPageModule' },
  { path: 'ratings', loadChildren: './core/ratings/ratings.module#RatingsPageModule' },
  { path: 'tabs', loadChildren: './core/tabs/tabs.module#TabsPageModule' },  { path: 'left-panel', loadChildren: './core/left-panel/left-panel.module#LeftPanelPageModule' },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
