import {Component, OnInit} from '@angular/core';
import {NativePageTransitions, NativeTransitionOptions} from '@ionic-native/native-page-transitions/ngx';
import {NavController} from "@ionic/angular";
import {EapplicationService} from "../../services/eapplication.service";

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
    loaded: boolean = false;
    tabIndex: number = 0;
    countOfMessage = 0;

    constructor(public navCtrl: NavController,
                private nativePageTransitions: NativePageTransitions,
                private ep: EapplicationService
    ) {
    }

    ngOnInit() {
        this.loadEapplications();
    }

    private getAnimationDirection(index: number): string {
        let currentIndex = this.tabIndex;

        this.tabIndex = index;

        switch (true) {
            case (currentIndex < index):
                return ('left');
            case (currentIndex > index):
                return ('right');
        }
    }

    public transition(e: any): void {
        let options: NativeTransitionOptions = {
            direction: this.getAnimationDirection(e.index),
            duration: 250,
            slowdownfactor: -1,
            slidePixels: 0,
            iosdelay: 20,
            androiddelay: 0,
            fixedPixelsTop: 0,
            fixedPixelsBottom: 48
        };

        if (!this.loaded) {
            this.loaded = true;
            return;
        }

        this.nativePageTransitions.slide(options);
    }

    public loadEapplications() {
        this.ep.getEapplications({active: 1}).subscribe((value: any) => {
            console.log(value.models);
            for (const e of value.models) {
                if (e.active == 1) {
                    this.countOfMessage++;
                }
            }
        });
    }
}
