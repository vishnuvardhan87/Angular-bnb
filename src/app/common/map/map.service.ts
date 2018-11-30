import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import {CamelizePipe} from 'ngx-pipes';

@Injectable()
export class MapService{
    private geoCoder;
    private locationCache: any =[];

    constructor(private camelizePipe: CamelizePipe){}

    private camelize(value: string): string{
        return this.camelizePipe.transform(value);
    }

    private cacheLocation(location: string, coordinates: any){
        const camlizedLocation = this.camelize(location);
        this.locationCache[camlizedLocation] = coordinates;
    }

    private isLocationCached(location): boolean{
      return this.locationCache[this.camelize(location)];
    }

    public geoCodeLocation(location: string): Observable<any>{
        this.geoCoder = new (<any>window).google.maps.Geocoder();
        return new Observable((observer)=>{
            if(this.isLocationCached(location)){
                observer.next(this.locationCache[this.camelize(location)])
            } else{
                this.geoCoder.geocode({address:location},(result,status)=>{
                    if(status === 'ok'){
                        const geometry = result[0].geometry.location;
                        const coordiantes = {lat: geometry.lat(), lng: geometry.lng()} 
                        this.cacheLocation(location,coordiantes)
                        observer.next(coordiantes)
                    } else{
                        observer.error('Location could not be fetched');
                    }
                })
            } 
        })
    }
}