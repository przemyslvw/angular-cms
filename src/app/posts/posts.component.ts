import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
})
export class PostsComponent implements OnInit {
  posts$: Observable<any[]>;

  constructor(private firestore: Firestore) {
    const postsCollection = collection(this.firestore, 'posts');
    this.posts$ = collectionData(postsCollection, { idField: 'id' });
  }

  ngOnInit() {}
}
