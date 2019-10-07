import {Component, OnInit} from '@angular/core';
import {NativePageTransitions, NativeTransitionOptions} from '@ionic-native/native-page-transitions/ngx';
import {NavController} from '@ionic/angular';
import {EapplicationService} from '../../services/eapplication.service';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
    countOfMessage = 0;
    current = 0;
    index = 0;

    constructor(public navCtrl: NavController,
                private nativePageTransitions: NativePageTransitions,
                private ep: EapplicationService
    ) {
    }

    ngOnInit() {
        this.loadEapplications();
    }

    private getAnimationDirection(index: any): string {
        switch (index.tab) {
            case 'home':
                this.current = 0;
                if (this.current >= 0) {
                    return 'right';
                } else {
                    return 'left';
                }
            case 'tasks':
                if (this.current > 1) {
                    this.current = 1;
                    return 'right';
                } else {
                    this.current = 1;
                    return 'left';
                }
            case 'e-applications':
                if (this.current > 2) {
                    this.current = 2;
                    return 'right';
                } else {
                    this.current = 2;
                    return 'left';
                }
            case 'left-panel':
                if (this.current > 3) {
                    this.current = 3;
                    return 'right';
                } else {
                    this.current = 3;
                    return 'left';
                }
        }
        return null;
    }

    public transition(e: any): void {
        const options: NativeTransitionOptions = {
            direction: this.getAnimationDirection(e),
            duration: 250,
            slowdownfactor: 3,
            slidePixels: 20,
            iosdelay: 100,
            androiddelay: 150,
            fixedPixelsTop: 0,
            fixedPixelsBottom: 60
        };
        this.nativePageTransitions.slide(options);
    }

    public loadEapplications() {
        this.ep.getEapplications({active: 1}).subscribe((value: any) => {
            for (const e of value.models) {
                if (e.active === 1) {
                    this.countOfMessage++;
                }
            }
        });
    }
}
