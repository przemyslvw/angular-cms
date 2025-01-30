import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

interface Location {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
}

// Fixing the issue with Leaflet icons in Angular
const iconRetinaUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png';
const iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
const shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [MatCardModule, CommonModule]
})
export class MapComponent implements AfterViewInit, OnDestroy {
  map: L.Map | null = null;
  locations$: Observable<Location[]>;
  private subscription: Subscription | null = null;

  constructor(private firestore: Firestore) {
    const locationsCollection = collection(this.firestore, 'locations');
    this.locations$ = collectionData(locationsCollection, { idField: 'id' }) as Observable<Location[]>;
  }

  ngAfterViewInit(): void {
    this.map = L.map('main-map').setView([52.2297, 21.0122], 6); // Default to Poland

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.subscription = this.locations$.subscribe((locations) => {
      locations.forEach((location) => {
        L.marker([location.latitude, location.longitude])
          .addTo(this.map!)
          .bindPopup(`<b>${location.title}</b><br>${location.description}`);
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
