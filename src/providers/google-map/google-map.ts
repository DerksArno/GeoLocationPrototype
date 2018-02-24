import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Component } from "@angular/core/";
import { ToastController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  MyLocation,
  GoogleMapsAnimation,
  ILatLng
 } from '@ionic-native/google-maps';

/*
  Generated class for the GoogleMapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoogleMapProvider {

  map: GoogleMap;
  mapReady: boolean = false;
  
  constructor(public toastCtrl: ToastController, private googleMaps: GoogleMaps) {
    console.log('GoogleMapProvider Provider');
  }

  loadMap() {
    // Create a map after the view is loaded.
    // (platform is already ready in app.component.ts)
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 51.773098,
          lng: 5.6405514
        },
        zoom: 18,
        tilt: 30
      }
    });

    // Wait the maps plugin is ready until the MAP_READY event
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapReady = true;
      this.showToast('Map is ready!');
    });
  }

  onButtonClick( locations: ILatLng[] ) {
    if (!this.mapReady) {
      this.showToast('map is not ready yet. Please try again.');
      return;
    }
    this.map.clear();

    /* TEST */
    /*var HND_AIR_PORT = {lat: 35.548852, lng: 139.784086};
        var SFO_AIR_PORT = {lat: 37.615223, lng: -122.389979};
        var HNL_AIR_PORT = {lat: 21.324513, lng: -157.925074};
        locations = [
          HND_AIR_PORT,
          HNL_AIR_PORT,
          SFO_AIR_PORT
        ];*/

    var mapDiv = document.getElementById("map_canvas");

    this.map.getMyLocation()
      .then((location: MyLocation) => {
        return this.map.animateCamera({
          target: location.latLng,
          zoom: 17,
          tilt: 0
        }).then(() => {
          return this.map.addPolyline({
            points: locations,
            'color' : '#AA00FF',
            'width': 1,
            'geodesic': true
          });
        }).then(() => {
          // add a marker
          return this.map.addMarker({
            title: '@ionic-native/google-maps plugin!',
            snippet: 'Hier ben je nu',
            position: location.latLng,
            animation: GoogleMapsAnimation.BOUNCE
          });
        });
      });
    /*
    if (!this.mapReady) {
      this.showToast('map is not ready yet. Please try again.');
      return;
    }
    this.map.clear();

    // Get the location of you
    this.map.getMyLocation()
      .then((location: MyLocation) => {
        console.log(JSON.stringify(location, null ,2));

        // Move the map camera to the location with animation
        return this.map.animateCamera({
          target: location.latLng,
          zoom: 17,
          tilt: 30
        }).then(() => {
          // add a marker
          return this.map.addMarker({
            title: '@ionic-native/google-maps plugin!',
            snippet: 'This plugin is awesome!',
            position: location.latLng,
            animation: GoogleMapsAnimation.BOUNCE
          });
        })
      }).then((marker: Marker) => {
        // show the infoWindow
        marker.showInfoWindow();

        // If clicked it, display the alert
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          this.showToast('clicked!');
        });
      });
    */
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }

}
