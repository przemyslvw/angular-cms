import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
})
export class AddLocationComponent implements AfterViewInit {
  map: L.Map | null = null;
  marker: L.Marker | null = null;

  latitude: number | null = null;
  longitude: number | null = null;
  title = '';
  description = '';

  constructor(private firestore: Firestore) {}

  ngAfterViewInit(): void {
    this.map = L.map('add-map').setView([52.2297, 21.0122], 13); // Domyślnie Warszawa

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;

      this.latitude = lat;
      this.longitude = lng;

      if (this.marker) {
        this.marker.setLatLng(event.latlng);
      } else {
        if (this.map) {
          this.marker = L.marker(event.latlng).addTo(this.map);
        }
      }
    });
  }

  addLocation() {
    if (!this.latitude || !this.longitude || !this.title || !this.description) {
      alert('Wypełnij wszystkie pola!');
      return;
    }

    const locationsCollection = collection(this.firestore, 'locations');
    addDoc(locationsCollection, {
      latitude: this.latitude,
      longitude: this.longitude,
      title: this.title,
      description: this.description,
    })
      .then(() => {
        alert('Punkt został dodany!');
        this.latitude = null;
        this.longitude = null;
        this.title = '';
        this.description = '';
        if (this.marker) {
          this.map!.removeLayer(this.marker);
          this.marker = null;
        }
      })
      .catch((error) => {
        alert(`Błąd przy dodawaniu punktu: ${error.message}`);
      });
  }
}
