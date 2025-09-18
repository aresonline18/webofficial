import { useUrlTracking } from "@/hooks/use-url-tracking";
import { Link } from "wouter";

interface ResourceCardProps {
  imageUrl: string;
  imageAlt?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  buttonColor?: "red" | "blue";
  resourceId?: string; // For linking to full template pages
}

export default function ResourceCard({
  imageUrl,
  imageAlt = "",
  title,
  description,
  buttonText,
  buttonUrl,
  buttonColor = "blue",
  resourceId
}: ResourceCardProps) {
  const { trackResourceRead } = useUrlTracking();
  
  // Consistent button styling - always use the blue gradient
  const buttonClasses = "bg-gradient-to-b from-[rgb(56,93,198)] to-[rgb(44,74,158)] hover:from-[rgb(46,83,188)] hover:to-[rgb(34,64,148)]";
  
  // Check if this is an internal resource page link
  const isInternalLink = buttonUrl.startsWith('/free-resources/');

  return (
    <div className="resource-card-glow">
      <div className="flex flex-col md:flex-row items-center md:items-center gap-5">
        <div className="w-full md:w-52 flex-shrink-0 flex justify-center md:justify-start">
          <div className="w-40 h-40 md:w-44 md:h-44 bg-white rounded-xl flex items-center justify-center p-3 shadow-sm">
            <img 
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-contain"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              key={imageUrl}

            />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left md:ml-[-5px]">
          <h2 className="text-2xl md:text-3xl font-black text-[var(--shadow-navy)] mb-3">
            {title}
          </h2>
          <div 
            className="text-lg text-[var(--gray-600)] mb-5"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {isInternalLink ? (
            <Link 
              href={buttonUrl}
              className={`inline-block ${buttonClasses} text-white px-6 py-[11px] rounded-[20px] font-semibold transition-colors`}
              onClick={() => {
                // Async tracking - don't block navigation
                trackResourceRead(title).catch(console.error);
              }}
            >
              {buttonText}
            </Link>
          ) : (
            <a 
              href={buttonUrl}
              className={`inline-block ${buttonClasses} text-white px-6 py-[11px] rounded-[20px] font-semibold transition-colors`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                // Async tracking - don't block navigation
                trackResourceRead(title).catch(console.error);
              }}
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
