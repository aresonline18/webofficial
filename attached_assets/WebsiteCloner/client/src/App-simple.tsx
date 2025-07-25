import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Simple test without wouter
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen bg-white p-8">
          <h1 className="text-4xl font-bold text-center text-black">
            APPLICATION IS WORKING
          </h1>
          <p className="text-center text-gray-600 mt-4">
            The basic app loads correctly without routing.
          </p>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;