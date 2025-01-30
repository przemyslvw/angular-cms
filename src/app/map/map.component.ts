import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
})
export class MapComponent implements AfterViewInit {
  map: L.Map | null = null;
  locations$: Observable<any[]>;

  constructor(private firestore: Firestore) {
    const locationsCollection = collection(this.firestore, 'locations');
    this.locations$ = collectionData(locationsCollection, { idField: 'id' });
  }

  ngAfterViewInit(): void {
    this.map = L.map('main-map').setView([52.2297, 21.0122], 6); // Domyślnie Polska

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.locations$.subscribe((locations) => {
      locations.forEach((location) => {
        L.marker([location.latitude, location.longitude])
          .addTo(this.map!)
          .bindPopup(`<b>${location.title}</b><br>${location.description}`);
      });
    });
  }
}
