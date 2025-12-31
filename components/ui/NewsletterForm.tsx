'use client';

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

interface NewsletterFormProps {
  compact?: boolean;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ compact = false }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setEmail('');
        setName('');
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:border-red-500"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-r-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-red-100 text-red-600 rounded-lg">
          <Send className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Stay Updated</h3>
          <p className="text-gray-600 text-sm">
            Get fitness tips and exclusive offers
          </p>
        </div>
      </div>

      {isSuccess ? (
        <div className="text-center p-4 bg-green-50 rounded-xl">
          <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <p className="text-green-700 font-medium">Successfully subscribed!</p>
          <p className="text-green-600 text-sm">
            Check your email for confirmation
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center"
          >
            {isSubmitting ? 'Subscribing...' : (
              <>
                Subscribe to Newsletter
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
          <p className="text-gray-500 text-xs text-center">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  );
};

export default NewsletterForm;