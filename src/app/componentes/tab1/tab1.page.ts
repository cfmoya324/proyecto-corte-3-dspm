import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

declare var mapboxgl: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class Tab1Page implements OnInit {

  lat: number= 3.353707;
  lng: number= -76.522317;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.lat, this.lng);
  }

  ngAfterViewInit() {

    mapboxgl.accessToken = 'pk.eyJ1IjoiY2FtdWFvIiwiYSI6ImNtOXlsZ2tnNTFpMWoyaXB5cTQxYzJicDQifQ.jiWfETYeg8s4waMEE-eCQA';

    const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v9',
      center: [this.lng, this.lat],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map'
    });

    map.on('load', () => {

      map.resize();

      // Marker
      new mapboxgl.Marker()
        .setLngLat([ this.lng, this.lat ])
        .addTo(map);

      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;

      let labelLayerId;
        for (let i = 0; i < layers.length; i ++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
        labelLayerId = layers[i].id;
        break;
        }
      }

      map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': [
          '==', 'extrude', 'true'
        ],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
          'fill-extrusion-color': '#aaa',

          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          'fill-extrusion-height': [
            'interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'min_height']
          ],
          'fill-extrusion-opacity': .6
        }
      }, labelLayerId);
    });

  }

}
