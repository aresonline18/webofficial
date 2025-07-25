import React, { useState } from 'react';
import { TemplateRenderer } from '../components/template-renderer';
import { createTemplate } from '../utils/template-helper';
import { LandingPageTemplate } from '../../../shared/landing-page-template';
import { Link } from 'wouter';

export function TemplateCreator() {
  const [headline, setHeadline] = useState('');
  const [subheadline, setSubheadline] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorTitle, setAuthorTitle] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [rawContent, setRawContent] = useState('');
  const [lifestyleImages, setLifestyleImages] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const parseLifestyleImages = (input: string) => {
    if (!input.trim()) return [];
    
    return input.split('\n').filter(line => line.trim()).map(line => {
      const [src, alt, caption] = line.split('|').map(s => s.trim());
      return { src, alt: alt || 'Image', caption: caption || '' };
    });
  };

  const generateTemplate = (): LandingPageTemplate => {
    const parsedImages = parseLifestyleImages(lifestyleImages);
    const logo = logoUrl ? { 
      src: logoUrl, 
      alt: 'Logo', 
      mobileOnly: true 
    } : undefined;

    return createTemplate(
      headline,
      subheadline,
      authorName,
      authorTitle,
      ctaText,
      rawContent,
      parsedImages,
      logo
    );
  };

  if (showPreview) {
    return (
      <div>
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setShowPreview(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-lg"
          >
            Back to Editor
          </button>
        </div>
        <TemplateRenderer template={generateTemplate()} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Navigation - Back to Home */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-lg text-sm font-semibold">
            ← View Live Example
          </button>
        </Link>
      </div>
      
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Landing Page Template Creator</h1>
          
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Headline
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="How I Made $7.18M With Under 7 Clients"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Eric Cole"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Title
                </label>
                <input
                  type="text"
                  value={authorTitle}
                  onChange={(e) => setAuthorTitle(e.target.value)}
                  placeholder="Entrepreneur & Instagram Mastermind"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CTA Button Text
                </label>
                <input
                  type="text"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  placeholder="Book 1:1 Call with Eric's Team"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subheadline
              </label>
              <textarea
                value={subheadline}
                onChange={(e) => setSubheadline(e.target.value)}
                placeholder="See how I get $30k to $150k per month from each client..."
                rows={2}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo URL (Mobile Only)
              </label>
              <input
                type="url"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Lifestyle Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lifestyle Images
              </label>
              <textarea
                value={lifestyleImages}
                onChange={(e) => setLifestyleImages(e.target.value)}
                placeholder={`https://image1.jpg|Alt text|Caption
https://image2.jpg|Alt text|Caption
https://image3.jpg|Alt text|Caption`}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Format: URL|Alt text|Caption (one per line)
              </p>
            </div>

            {/* Main Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Content
              </label>
              <textarea
                value={rawContent}
                onChange={(e) => setRawContent(e.target.value)}
                placeholder={`# My Background
Started first business as 16-17y.o
* Sold app at 19y.o
* Studied at Harvard Business School

## Step 1: Find Your Market
This is the first step...

*This business literally changed my life*

![Alt text](https://image.jpg "Optional caption")

Quote: This is a quote from someone`}
                rows={15}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              />
              <div className="text-sm text-gray-500 mt-2 space-y-1">
                <p><strong>Formatting Guide:</strong></p>
                <p>• Headlines: # H1, ## H2, ### H3, #### H4</p>
                <p>• Bullet lists: * Item or - Item</p>
                <p>• Numbered lists: 1. Item</p>
                <p>• Images: ![Alt text](URL "Caption")</p>
                <p>• Quotes: &gt; Quote text</p>
                <p>• Italic: *text*</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setShowPreview(true)}
                disabled={!headline || !subheadline || !authorName}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-md font-semibold transition-colors duration-200"
              >
                Preview Landing Page
              </button>
              
              <button
                onClick={() => {
                  const template = generateTemplate();
                  navigator.clipboard.writeText(JSON.stringify(template, null, 2));
                  alert('Template JSON copied to clipboard!');
                }}
                disabled={!headline || !subheadline || !authorName}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-md font-semibold transition-colors duration-200"
              >
                Copy Template JSON
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}