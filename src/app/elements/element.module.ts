import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu/menu.component';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {ApplicationListComponent} from './application-list/application-list.component';
import {EApplicationListComponent} from './e-application-list/e-application-list.component';
import {SingleApplicationComponent} from './single-application/single-application.component';


@NgModule({
    declarations: [MenuComponent, ApplicationListComponent, EApplicationListComponent, SingleApplicationComponent],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule
    ], entryComponents: [SingleApplicationComponent],
    exports: [MenuComponent, ApplicationListComponent, EApplicationListComponent, SingleApplicationComponent]
})
export class ElementModule {
}
