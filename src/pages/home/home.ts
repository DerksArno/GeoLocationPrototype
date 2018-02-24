import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationTrackerProvider } from "../../providers/location-tracker/location-tracker";
import { GoogleMapProvider } from '../../providers/google-map/google-map';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public locationTracker: LocationTrackerProvider, public navCtrl: NavController, public googlemaps: GoogleMapProvider) {

    }

    ionViewDidLoad() {
        this.googlemaps.loadMap();
    }
    
    onButtonClick() {
        this.googlemaps.onButtonClick(this.locationTracker.locations);
    }

    start() {
        this.locationTracker.startTracking();
    }

    stop() {
        this.locationTracker.stopTracking();
    }
}
