import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class AddPostComponent {
  title = '';
  content = '';

  constructor(private firestore: Firestore, private auth: Auth) {}

  createPost() {
    const user = this.auth.currentUser;

    if (!user) {
      alert('Musisz być zalogowany, aby dodać wpis.');
      return;
    }

    const postsCollection = collection(this.firestore, 'posts');
    addDoc(postsCollection, {
      title: this.title,
      content: this.content,
      authorId: user.uid,
      createdAt: new Date(),
      likes: 0,
      dislikes: 0,
    })
      .then(() => {
        alert('Wpis został dodany!');
        this.title = '';
        this.content = '';
      })
      .catch((error) => {
        alert(`Błąd przy dodawaniu wpisu: ${error.message}`);
      });
  }
}
