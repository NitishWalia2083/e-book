import { Component, OnInit, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { BookService } from '../services/book.service';
import { ReadingProgressService } from '../services/reading-progress.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, PdfViewerModule],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  @ViewChild('pdfViewer') pdfViewer: any;
  book: any;
  pdfSrc: string = '';
  currentPage = 1;
  totalPages = 0;
  progressPercentage = 0;
  lastReadTime: string | null = null;
  private isBrowser: boolean;
  errorMessage: string | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private readingProgressService: ReadingProgressService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.initializeComponent();
    }
  }

  private initializeComponent() {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.book = this.bookService.getBookById(parseInt(bookId, 10));
      if (this.book) {
        if (this.book.pdfPath) {
          this.pdfSrc = this.book.pdfPath;
          this.loadReadingProgress();
          this.isLoading = false;
        } else {
          this.errorMessage = 'PDF file not available for this book.';
          this.isLoading = false;
        }
      } else {
        this.errorMessage = 'Book not found.';
        this.isLoading = false;
      }
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updateProgress();
    this.saveProgress();
  }

  onLoadComplete(pdf: any) {
    this.totalPages = pdf.numPages;
    this.updateProgress();
    this.isLoading = false;
  }

  onError(error: any) {
    console.error('PDF Error:', error);
    this.errorMessage = 'Error loading PDF. Please try again later.';
    this.isLoading = false;
  }

  private updateProgress() {
    if (this.totalPages > 0) {
      this.progressPercentage = Math.round((this.currentPage / this.totalPages) * 100);
    }
  }

  private saveProgress() {
    if (this.book && this.totalPages) {
      this.readingProgressService.saveProgress(
        this.book.id.toString(),
        this.currentPage,
        0, // If you're not tracking line numbers
        this.book.category || 'default',
        this.totalPages
      );
      this.lastReadTime = new Date().toISOString();
    }
  }

  private loadReadingProgress() {
    const progress = this.readingProgressService.getProgress(this.book.id.toString());
    if (progress) {
      this.currentPage = progress.lastPage;
      this.progressPercentage = progress.progressPercentage || 0;
      this.lastReadTime = new Date(progress.lastReadTimestamp).toISOString();
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}