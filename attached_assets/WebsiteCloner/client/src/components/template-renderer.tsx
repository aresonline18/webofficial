import React from 'react';
import { LandingPageTemplate, ContentBlock, LandingPageSection } from '../../../shared/landing-page-template';

interface TemplateRendererProps {
  template: LandingPageTemplate;
}

export function TemplateRenderer({ template }: TemplateRendererProps) {
  const renderContentBlock = (block: ContentBlock, index: number) => {
    const spacing = block.spacing === 'tight' ? 'mb-2' : block.spacing === 'loose' ? 'mb-8' : 'mb-4';
    const baseClasses = `${spacing} ${block.className || ''}`;

    switch (block.type) {
      case 'headline':
        const headingLevel = block.style || 'h2';
        const headingClasses = {
          h1: 'font-inter font-black text-4xl md:text-5xl text-black',
          h2: 'font-inter font-black text-2xl md:text-3xl text-black',
          h3: 'font-inter font-bold text-xl md:text-2xl text-black',
          h4: 'font-inter font-bold text-lg md:text-xl text-black'
        };
        const HeadingTag = headingLevel as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={index} className={`${headingClasses[headingLevel]} ${baseClasses}`}>
            {block.content as string}
          </HeadingTag>
        );

      case 'text':
        const textStyle = block.style || 'paragraph';
        const textClasses = {
          paragraph: 'text-gray-800',
          italic: 'text-gray-800 italic',
          bold: 'text-gray-800 font-bold',
          center: 'text-gray-800 text-center',
          left: 'text-gray-800 text-left'
        };
        return (
          <p key={index} className={`${textClasses[textStyle]} ${baseClasses}`}>
            {textStyle === 'italic' ? <em>{block.content as string}</em> : block.content as string}
          </p>
        );

      case 'image':
        const imageContent = block.content as { src: string; alt: string; caption?: string };
        const imageStyle = block.style === 'center' ? 'flex justify-center' : '';
        return (
          <div key={index} className={`${imageStyle} ${baseClasses}`}>
            <div className="max-w-full">
              <img 
                src={imageContent.src} 
                alt={imageContent.alt}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              {imageContent.caption && (
                <p className="text-sm text-gray-600 text-center mt-2 italic">
                  {imageContent.caption}
                </p>
              )}
            </div>
          </div>
        );

      case 'list':
        const listItems = block.content as string[];
        const listStyle = block.style || 'bullet';
        return (
          <div key={index} className={baseClasses}>
            {listStyle === 'bullet' ? (
              <ul className="space-y-2">
                {listItems.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-800">
                    <span className="mr-2">▶︎</span>
                    {item.includes('Harvard Business School') ? (
                      <>
                        {item.split('Harvard Business School')[0]}
                        <strong>Harvard Business School</strong>
                        {item.split('Harvard Business School')[1]}
                      </>
                    ) : item.includes('$1.1 billion') ? (
                      <>
                        {item.split('$1.1 billion')[0]}
                        <strong>$1.1 billion</strong>
                        {item.split('$1.1 billion')[1]}
                      </>
                    ) : item.includes('multi-7 figures') ? (
                      <>
                        {item.split('multi-7 figures')[0]}
                        <strong>multi-7 figures</strong>
                        {item.split('multi-7 figures')[1]}
                      </>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <ol className="space-y-2 list-decimal list-inside">
                {listItems.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-800">
                    {item}
                  </li>
                ))}
              </ol>
            )}
          </div>
        );

      case 'stats':
        const stats = block.content as { value: string; description: string }[];
        return (
          <div key={index} className={`grid grid-cols-1 md:grid-cols-3 gap-6 text-center ${baseClasses}`}>
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
          <blockquote key={index} className={`border-l-4 border-blue-500 pl-6 italic text-gray-700 ${baseClasses}`}>
            {block.content as string}
          </blockquote>
        );

      default:
        return (
          <div key={index} className={baseClasses}>
            <p className="text-gray-800">{block.content as string}</p>
          </div>
        );
    }
  };

  const renderSection = (section: LandingPageSection) => {
    return (
      <div key={section.id} className={`container-narrow ${section.containerClass || ''}`}>
        {section.title && (
          <h2 className="font-inter font-black text-2xl text-black mb-6">
            <strong>{section.title}</strong>
          </h2>
        )}
        {section.blocks.map(renderContentBlock)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Logo - Mobile Only */}
      {template.logo && template.logo.mobileOnly && (
        <div className="container-narrow pt-1 pb-1 logo-section-mobile md:hidden">
          <img 
            src={template.logo.src}
            alt={template.logo.alt}
            className="h-24 w-auto mb-2 mx-auto"
          />
        </div>
      )}

      {/* Header Section */}
      <div className="container-narrow mb-8 mobile-section" style={{ marginTop: 0, paddingTop: 0 }}>
        <h1 className="headline-primary mb-4">
          {template.headline}
        </h1>
        
        <h2 className="headline-secondary mb-6">
          {template.subheadline}
        </h2>
        
        <p className="text-gray-600 text-base mb-2 author-mobile" style={{ textAlign: 'center' }}>
          Written by <a href="#" className="text-blue-600 hover:underline">{template.authorName}</a>{' '}
          <span className="text-gray-500">({template.authorTitle})</span>
        </p>
      </div>

      {/* Lifestyle Images */}
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
        
        {template.proofDisclaimer && (
          <p className="text-xs text-gray-500 mt-4 italic text-center">
            {template.proofDisclaimer}
          </p>
        )}
      </div>

      {/* Dynamic Sections */}
      {template.sections.map(renderSection)}

      {/* More Resources */}
      {template.moreResourcesArticles && (
        <div className="container-narrow mb-12">
          <h2 className="font-inter font-black text-2xl text-black mb-6 text-center">
            Want more resources?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {template.moreResourcesArticles.map((article, index) => (
              <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.alt}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold text-sm transition-colors duration-200">
                    Read now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}