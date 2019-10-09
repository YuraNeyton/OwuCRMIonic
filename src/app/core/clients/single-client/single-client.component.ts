import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Client} from '../../../models/client';
import {GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, Marker} from '@ionic-native/google-maps';
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
        this.clientStatusesService.getStatuses({}).subscribe(res => this.clientStatuses = res.models);
    }

    close() {
        this.modalController.dismiss();
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {
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
