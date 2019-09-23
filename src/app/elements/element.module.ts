import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu/menu.component';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {ApplicationListComponent} from './application-list/application-list.component';
import {EApplicationListComponent} from './e-application-list/e-application-list.component';
import {SingleApplicationComponent} from './single-application/single-application.component';
import {HomeFilterComponent} from '../core/home/home-filter/home-filter.component';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [MenuComponent, ApplicationListComponent, EApplicationListComponent, SingleApplicationComponent, HomeFilterComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        RouterModule
    ], entryComponents: [SingleApplicationComponent, HomeFilterComponent],
    exports: [MenuComponent, ApplicationListComponent, EApplicationListComponent, SingleApplicationComponent, HomeFilterComponent]
})
export class ElementModule {
}
