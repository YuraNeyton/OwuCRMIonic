import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Client} from '../../../models/client';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker,
    Environment
} from '@ionic-native/google-maps';
import {ClientStatus} from '../../../models/client-status';
import {ClientStatusService} from '../../../services/client-status.service';

@Component({
    selector: 'app-single-client',
    templateUrl: './single-client.component.html',
    styleUrls: ['./single-client.component.scss'],
})
export class SingleClientComponent implements OnInit {
    @Input() c: Client;
    map: GoogleMap;
    clientStatuses: ClientStatus[] = [];

    constructor(
        private modalController: ModalController,
        private clientStatusesService: ClientStatusService
    ) {
    }

    ngOnInit() {
        console.log(this.c);
        this.clientStatusesService.getStatuses({}).subscribe(res => this.clientStatuses = res.models);
    }

    close() {
        this.modalController.dismiss();
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {

        // This code is necessary for browser
        // Environment.setEnv({
        //     'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyD1hTohAdI89Lt9OgxvOy-l8IJ4utdD5xw',
        //     'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyD1hTohAdI89Lt9OgxvOy-l8IJ4utdD5xw'
        // });
        if (this.c.address) {
            const mapOptions: GoogleMapOptions = {
                camera: {
                    target: {
                        lat: this.c.address.ltg,
                        lng: this.c.address.lng
                    },
                    zoom: 18,
                    tilt: 30
                }
            };
            this.map = GoogleMaps.create('map_canvas', mapOptions);

            const marker: Marker = this.map.addMarkerSync({
                title: this.c.name,
                icon: 'blue',
                animation: 'DROP',
                position: {
                    lat: this.c.address.ltg,
                    lng: this.c.address.lng
                }
            });
            marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                alert('clicked');
            });
        }
    }
}
