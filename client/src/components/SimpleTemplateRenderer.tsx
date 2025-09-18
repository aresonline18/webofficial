import React from 'react';
import { SimpleTemplateInput, ParsedContent, parseBodyContent } from '@shared/simple-template';

interface SimpleTemplateRendererProps {
  template: SimpleTemplateInput;
}

export function SimpleTemplateRenderer({ template }: SimpleTemplateRendererProps) {
  const parsedContent = parseBodyContent(template.bodyContent);

  const renderContent = (item: ParsedContent, index: number) => {
    switch (item.type) {
      case 'headline':
        const level = item.level || 2;
        const headingClasses: Record<number, string> = {
          1: 'font-inter font-black text-4xl text-black mb-6',
          2: 'font-inter font-black text-2xl text-black mb-4',
          3: 'font-inter font-bold text-xl text-black mb-3',
          4: 'font-inter font-bold text-lg text-black mb-2'
        };
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
        
        return (
          <HeadingTag key={index} className={headingClasses[level]}>
            <strong>{item.content as string}</strong>
          </HeadingTag>
        );

      case 'paragraph':
        const isItalic = item.style === 'italic';
        return (
          <p key={index} className={`text-gray-800 mb-4 ${isItalic ? 'italic' : ''}`}>
            {isItalic ? (
              <em dangerouslySetInnerHTML={{ __html: (item.content as string).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            ) : (
              <span dangerouslySetInnerHTML={{ __html: (item.content as string).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            )}
          </p>
        );

      case 'image':
        const imageData = item.content as { src: string; alt: string; caption?: string };
        return (
          <div key={index} className="flex justify-center mb-8">
            <div className="max-w-full">
              <img 
                src={imageData.src} 
                alt={imageData.alt}
                className="w-full h-auto rounded-lg shadow-lg max-w-2xl"
              />
              {imageData.caption && (
                <p className="text-sm text-gray-600 text-center mt-2 italic">
                  {imageData.caption}
                </p>
              )}
            </div>
          </div>
        );

      case 'list':
        const items = item.content as string[];
        return (
          <div key={index} className="mb-6">
            {items.map((listItem, itemIndex) => (
              <p key={itemIndex} className="text-gray-800 mb-2">
                <span className="mr-2">▶︎</span>
                <span dangerouslySetInnerHTML={{ 
                  __html: listItem
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/Harvard Business School/g, '<strong>Harvard Business School</strong>')
                    .replace(/\$1\.1 billion/g, '<strong>$1.1 billion</strong>')
                    .replace(/multi-7 figures/g, '<strong>multi-7 figures</strong>')
                }} />
              </p>
            ))}
          </div>
        );

      case 'stats':
        const stats = item.content as { value: string; description: string }[];
        return (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-8">
            {stats.map((stat, statIndex) => (
              <div key={statIndex} className="bg-white p-6 rounded-lg shadow-lg border">
                <div className="text-3xl font-black text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        );

      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-blue-500 pl-6 italic text-gray-700 mb-6">
            <em>{item.content as string}</em>
          </blockquote>
        );

      default:
        return (
          <p key={index} className="text-gray-800 mb-4">
            {item.content as string}
          </p>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Logo - Mobile Only */}
      {template.logoUrl && (
        <div className="container-narrow pt-1 pb-1 logo-section-mobile md:hidden">
          <img 
            src={template.logoUrl}
            alt="Logo"
            className="h-24 w-auto mb-2 mx-auto"
          />
        </div>
      )}

      {/* Header Section */}
      <div className="container-narrow mb-8 mobile-section" style={{ marginTop: 0, paddingTop: 0 }}>
        <h1 className="headline-primary mb-4">
          {template.headline}
        </h1>
        
        {template.subheadline && (
          <h2 className="headline-secondary mb-6">
            <span dangerouslySetInnerHTML={{ 
              __html: template.subheadline.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
            }} />
          </h2>
        )}
        
        <p className="text-gray-600 text-base mb-2 author-mobile" style={{ textAlign: 'center' }}>
          Written by <a href="#" className="text-blue-600 hover:underline">{template.authorName}</a>{' '}
          <span className="text-gray-500">({template.authorTitle})</span>
        </p>
      </div>

      {/* Lifestyle Images */}
      {template.lifestyleImages && template.lifestyleImages.length > 0 && (
        <div className="container-narrow mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {template.lifestyleImages.map((image, index) => (
              <div key={index} className="flex flex-col">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-600 text-center mt-2 italic">
                  {image.caption}
                </p>
              </div>
            ))}
          </div>
          
          <p className="text-xs text-gray-500 mt-4 italic text-center">
            *I would prefer not to share these pictures (I don't even have an Instagram), but I feel it's needed as proof that I have something that worked for me, allowing me to do the things I want and like.
          </p>
        </div>
      )}

      {/* Dynamic Content */}
      <div className="container-narrow">
        {parsedContent.map(renderContent)}
      </div>
    </div>
  );
}