export default function StickyCTA() {
  const handleCallBooking = () => {
    // In a real implementation, this would redirect to a calendar booking system
    window.open('https://calendly.com/jakub-team', '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 md:bottom-5 md:right-5 md:left-auto sticky-cta-mobile">
      <button 
        onClick={handleCallBooking}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors duration-200 shadow-lg hover:shadow-xl w-full md:w-auto"
      >
        Book 1:1 Call with Eric's Team
      </button>
    </div>
  );
}
