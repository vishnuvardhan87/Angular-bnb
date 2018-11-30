import { CommonModule } from '@angular/common';
import { CamelizePipe } from 'ngx-pipes';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { MapService } from './map.service';


@NgModule({
  declarations: [
      MapComponent
  ],
  exports:[MapComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyBispmOY9SVRHt58FgVTjLisTdvKzVqOYU'
      })
  ],
  providers: [MapService,CamelizePipe]
})
export class MapModule { }
