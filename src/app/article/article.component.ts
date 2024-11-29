import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleService } from '../services/article.service';
import { Article } from '../model/article.model';
import { DialogContentArticleDetailsComponent } from '../dialog-content-article-details/dialog-content-article-details.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  articles: Article[] = [];
  isLoading: boolean = true; // Add the isLoading property
  isSidenavOpened: boolean = false;

  constructor( private dialog:MatDialog ,  private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.isLoading = true; // Start loading
    this.articleService.getAllArticles().subscribe(
      (data: Article[]) => {
        this.articles = data;
        this.isLoading = false; // Loading complete
        console.log('Articles loaded:', this.articles);
      },
      (error) => {
        this.isLoading = false; // Stop loading on error
        console.error('Erreur lors de la récupération des articles :', error);
      }
    );
  }

  openDialog(article: Article): void{
    const dialogRef = this.dialog.open(DialogContentArticleDetailsComponent,{
      data: article 
    });

    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog result: ${result}`);
    });

    
  }

  consulterArticle(article: Article): void {
    alert(`Consulting article: ${article.title} by ${article.userFullName}`);
  }
  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }


}
