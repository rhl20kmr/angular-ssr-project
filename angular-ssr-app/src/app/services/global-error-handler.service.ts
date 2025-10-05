// services/global-error-handler.ts
import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private http: HttpClient) {}

  handleError(error: any): void {
    const errorDetails = {
      message: error?.message || 'Unknown error',
      stack: error?.stack || null,
      context: 'Angular Standalone App',
      timestamp: new Date().toISOString(),
    };

    console.error('⚠️ Captured Error:', errorDetails);

    // ✅ Get token from localStorage
    const openaiKey = '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';
    const tokenKey = 'your-secret-key'
    if (!openaiKey) {
      console.warn('⚠️ No auth token found in localStorage!');
      return;
    }

    // Send error to AI API
    this.http.post<any>(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `
            Angular error occurred:

            Message: ${errorDetails.message}
            Stack: ${errorDetails.stack}
            Context: ${errorDetails.context}

            Suggest a likely cause and solution.
            `,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`, // ✅ pulled dynamically
        },
      }
    ).subscribe({
      next: (res) => {
        const suggestion = res.choices[0].message.content;
        console.log('💡 AI Suggestion:', suggestion);

        // Show in UI for demo
        alert('AI Suggestion:\n' + suggestion);
      },
      error: (err) => {
        console.error('❌ AI API failed:', err);
      },
    });
  }
}
