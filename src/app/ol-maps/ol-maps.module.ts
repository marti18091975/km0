import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlMapComponent } from './ol-map/ol-map.component';
import { OlMapMarkerComponent } from './ol-map-marker/ol-map-marker.component';
import { OlControlComponent } from './ol-control/ol-control.component';

const COMPONENTS = [OlMapComponent, OlMapMarkerComponent, OlControlComponent];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [CommonModule],
})
export class OlMapsModule {}
