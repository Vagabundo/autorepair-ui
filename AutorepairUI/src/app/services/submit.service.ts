import { Injectable } from '@angular/core';
import { Answer } from '../models/answer';
import { HttpClient } from '@angular/common/http';
import { JobSheet } from '../models/job-sheet';

@Injectable({
  providedIn: 'root'
})
export class SubmitService {

  private readonly url: string = 'http://localhost:5000/api/repair/submit';
  private answer: Answer = null;

  constructor(private client: HttpClient) { }

  submitSheet(sheet: JobSheet): Promise<Answer> {
    return this.client.post<Answer>(this.url, sheet)
      .toPromise()
      .then(response => (this.answer = response))
      .catch(err => {
        return Promise.reject(err.error || 'Server error');
      }
    );
  }
}
