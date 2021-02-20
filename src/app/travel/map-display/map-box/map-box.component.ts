import { Component, OnInit, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson, FeatureCollection, IGeoJson, Trip } from 'src/app/travel/map-display/map/map';
import { MapService } from 'src/app/service/map.service';
import { EventEmitter } from '@angular/core';
import { strictEqual } from 'assert';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})
export class MapBoxComponent implements OnChanges {

  @Input()
  request: number;

  @Input()
  trip: Trip;

  @Output()
  markerToDisplay: EventEmitter<GeoJson> = new EventEmitter();

  public map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = 43.6171461;
  lng = 7.0642366;
  public source: any;
  public markers: GeoJson[] = []

  constructor(private mapService: MapService) {
    this.mapService.getMarkers().subscribe(data => {
      this.markers = data;
    },
      error => {
        console.log(error);
      }
    )
  }


  ngOnChanges(changes: SimpleChanges) {
    if (this.map && this.markers && this.source) {
      if (this.trip) {
        this.selectedTrip(this.trip)
      }
      else {
        let data = new FeatureCollection(this.markers)
        this.source.setData(data)
        this.map.flyTo({ center: [this.lng, this.lat], zoom: 1 })
      }
    }


  }

  ngOnInit() {
    this.buildMap();
  }


  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 1,
      center: [this.lng, this.lat]
    });


    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');


    /// Add realtime firebase data on map load
    this.map.on('load', (event) => {
      this.map.addSource('backend', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });
      this.source = this.map.getSource('backend')

      this.mapService.getMarkers().subscribe(markers => {
        let data = new FeatureCollection(markers)
        this.source.setData(data)
        this.drawPath(this.tripEnum.AUSTRALIE)
        this.drawPath(this.tripEnum.US)
        this.drawPath(this.tripEnum.CHINA)
        this.drawPath(this.tripEnum.OUZBEK_KIRGHIZ)

      });

      this.map.loadImage("/assets/icon/map-marker-icon.png", function (error, image) {
        this.map.addImage('custom-marker', image);

        this.map.addLayer({
          id: 'markers',
          source: 'backend',
          type: 'symbol',
          layout: {
            'icon-image': 'custom-marker',
            "icon-size": 0.05

          },
          paint: {
            'text-color': '#f16624',
            'text-halo-color': '#fff',
            'text-halo-width': 2
          }
        })

      }.bind(this))


      //

      this.map.on('click', 'markers', function (e) {
        this.markerToDisplay.emit(e.features[0])
      }.bind(this));


      // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
      this.map.on('mouseenter', 'markers', function () {
        this.map.getCanvas().style.cursor = 'pointer';
      }.bind(this));

      // Change it back to a pointer when it leaves.
      this.map.on('mouseleave', 'markers', function () {
        this.map.getCanvas().style.cursor = '';
      }.bind(this));

    });


  }

  get tripEnum() {
    return Trip;
  }

  selectedTrip(trip: Trip) {

    switch (trip) {
      case Trip.US:
        this.map.flyTo({ center: [this.mapService.US.center[0], this.mapService.US.center[1]], zoom: this.mapService.US.zoom })
        break;
      case Trip.CHINA:
        this.map.flyTo({ center: [this.mapService.Chine.center[0], this.mapService.Chine.center[1]], zoom: this.mapService.Chine.zoom })
        break;
      case Trip.AUSTRALIE:
        this.map.flyTo({ center: [this.mapService.Australie.center[0], this.mapService.Australie.center[1]], zoom: this.mapService.Australie.zoom })
        break;
      case Trip.OUZBEK_KIRGHIZ:
        this.map.flyTo({ center: [this.mapService.OuzbKhirg.center[0], this.mapService.OuzbKhirg.center[1]], zoom: this.mapService.OuzbKhirg.zoom })
        break;
      case Trip.EUROPE:
        this.map.flyTo({ center: [this.mapService.Europe.center[0], this.mapService.Europe.center[1]], zoom: this.mapService.Europe.zoom })
        break;
    }

  }

  drawPath(trip: Trip) {
    let tab=[]
    this.markers.forEach(element => {

        if(element.properties.trip==trip){
          tab.push(element.geometry.coordinates)
        }

    });
    let id='route'+trip
    this.map.addSource(id, {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'properties': {
              'color': '#F7455D' // red
            },
            'geometry': {
              'type': 'LineString',
              'coordinates': tab
            }
          },
        ]
      }
    })
    this.map.addLayer({
      'id': id,
      'type': 'line',
      'source': id,
      'layout': {
      'line-join': 'round',
      'line-cap': 'round'
      },
      'paint': {
      'line-color': 'green',
      'line-width': 3
      }
      });



  }


}
