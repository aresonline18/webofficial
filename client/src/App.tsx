import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import StaticHomeComplete from "@/pages/StaticHomeComplete";
import Admin from "@/pages/admin";
import ResourcePage from "@/pages/resource";
import FreeResources from "@/pages/free-resources";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={StaticHomeComplete} />
      <Route path="/admin" component={Admin} />
      <Route path="/free-resources" component={FreeResources} />
      <Route path="/free-resources/:slug" component={ResourcePage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
