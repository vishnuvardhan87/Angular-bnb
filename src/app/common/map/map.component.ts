import { MapService } from './map.service';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() location : string;
  isPositionError: boolean = false;

  lat: number;
  lng: number;

  constructor(private mapService: MapService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  mapReadyHandler(){
    this.mapService.geoCodeLocation(this.location).subscribe(
      (coordinates)=>{
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;

        this.ref.detectChanges();
      },()=>{
        this.isPositionError = true
      }
    )
  }

}
