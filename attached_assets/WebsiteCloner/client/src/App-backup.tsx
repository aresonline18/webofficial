import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { TemplateCreator } from "@/pages/template-creator";
import SocialMediaMastery from "@/pages/social-media-mastery";
import ShadowPagesPlaybook from "@/pages/shadow-pages-playbook";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shadow-pages-playbook" component={ShadowPagesPlaybook} />
      <Route path="/social-media-mastery" component={SocialMediaMastery} />

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