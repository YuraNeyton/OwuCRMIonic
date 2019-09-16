import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu/menu.component';
import {IonicModule} from '@ionic/angular';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ApplicationListComponent} from './application-list/application-list.component';
import {EApplicationListComponent} from './e-application-list/e-application-list.component';


@NgModule({
    declarations: [MenuComponent, ApplicationListComponent, EApplicationListComponent],
    imports: [
        CommonModule,
        IonicModule,
        // BrowserModule,
        RouterModule
    ],
    exports: [MenuComponent, ApplicationListComponent, EApplicationListComponent]
})
export class ElementModule {
}
