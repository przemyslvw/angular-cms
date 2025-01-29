import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, deleteDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
})
export class PostsComponent implements OnInit {
  posts$: Observable<any[]>;

  constructor(private firestore: Firestore, private auth: Auth) {
    const postsCollection = collection(this.firestore, 'posts');
    this.posts$ = collectionData(postsCollection, { idField: 'id' });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async toggleVote(postId: string, voteType: 'like' | 'dislike') {
    const user = this.auth.currentUser;
    if (!user) {
      alert('Musisz być zalogowany, aby głosować!');
      return;
    }

    const userId = user.uid;
    const votesCollection = collection(this.firestore, 'votes');

    // Sprawdzenie, czy użytkownik już głosował na ten post
    const q = query(votesCollection, where('postId', '==', postId), where('userId', '==', userId));
    const existingVotes = await getDocs(q);

    if (!existingVotes.empty) {
      const existingVote = existingVotes.docs[0];
      const currentVoteType = existingVote.data()['voteType'];


      if (currentVoteType === voteType) {
        // Jeśli użytkownik klika ten sam typ głosu, usuń głos
        await deleteDoc(doc(this.firestore, 'votes', existingVote.id));
      } else {
        // Jeśli użytkownik zmienia głos, zaktualizuj dokument
        await setDoc(doc(this.firestore, 'votes', existingVote.id), { voteType }, { merge: true });
      }
    } else {
      // Jeśli użytkownik nie głosował, dodaj nowy głos
      const newVoteRef = doc(this.firestore, 'votes', `${userId}_${postId}`);
      await setDoc(newVoteRef, { userId, postId, voteType });
    }
  }
}