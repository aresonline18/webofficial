interface RelatedResourcesProps {
  currentResourceSlug: string;
  colorScheme?: string;
  title?: string;
}

export default function RelatedResources({
  currentResourceSlug,
  colorScheme = "purple",
  title = "More Resources ↓"
}: RelatedResourcesProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h3 className="text-2xl font-bold text-center mb-8">{title}</h3>
      <div className="text-center text-gray-600">
        <p>Explore more free resources to grow your Shadow Pages business</p>
      </div>
    </div>
  );
}
