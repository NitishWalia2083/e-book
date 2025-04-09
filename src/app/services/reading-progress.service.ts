import { Injectable } from '@angular/core';

interface ReadingProgress {
    bookId: string;
    lastPage: number;
    lastLine: number;
    category: string;
    progressPercentage: number;
    lastReadTimestamp: number;
}

@Injectable({
    providedIn: 'root'
})
export class ReadingProgressService {
    private readonly STORAGE_KEY = 'reading_progress';

    constructor() { }

    saveProgress(bookId: string, page: number, line: number, category: string, totalPages: number): void {
        const progress: ReadingProgress = {
            bookId,
            lastPage: page,
            lastLine: line,
            category,
            progressPercentage: (page / totalPages) * 100,
            lastReadTimestamp: Date.now()
        };

        const allProgress = this.getAllProgress();
        const existingIndex = allProgress.findIndex(p => p.bookId === bookId);

        if (existingIndex !== -1) {
            allProgress[existingIndex] = progress;
        } else {
            allProgress.push(progress);
        }

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allProgress));
    }

    getProgress(bookId: string): ReadingProgress | null {
        const allProgress = this.getAllProgress();
        return allProgress.find(p => p.bookId === bookId) || null;
    }

    getAllProgress(): ReadingProgress[] {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    getProgressByCategory(category: string): ReadingProgress[] {
        return this.getAllProgress().filter(p => p.category === category);
    }

    deleteProgress(bookId: string): void {
        const allProgress = this.getAllProgress();
        const filtered = allProgress.filter(p => p.bookId !== bookId);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
    }
}  
