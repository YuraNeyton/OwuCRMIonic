import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptorService} from './services/interceptors/auth-interceptor.service';
import {ElementModule} from './elements/element.module';
import {
    GoogleMaps,
    GoogleMap,
} from '@ionic-native/google-maps';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ElementModule],
    providers: [
        StatusBar,
        SplashScreen,
        // GoogleMap,
        GoogleMaps,
        LocalNotifications,
        FCM,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        NativePageTransitions,

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
