import { Component } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent {
  title: string = '';
  content: string = '';
  image: File | null = null; 
  isSidenavOpened: boolean = false;

  constructor(private articleService: ArticleService) { }

  // Handle file selection
  onFileChange(event: any): void {
    this.image = event.target.files[0];
  }

  // Submit the form to create an article
  submitArticle(): void {
    this.articleService.createArticle(this.title, this.content, this.image || undefined).subscribe({
      next: (response) => {
        console.log('Article Created Successfully', response);
        alert('Article created successfully!');
        // Optionally reset the form
        this.title = '';
        this.content = '';
        this.image = null;
      },
      error: (error) => {
        console.error('Error Creating the Article', error);
        alert('Error creating the article.');
      }
    });
  }
  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }
}
