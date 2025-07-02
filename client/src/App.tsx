import { Switch, Route, Redirect } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import ChatbotPage from "@/pages/ChatbotPage";
import MapPage from "@/pages/MapPage";
import NotFound from "@/pages/not-found";

function AppRouter() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Initializing..." />;
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Switch>
        <Route path="/" component={() => <Redirect to="/dashboard" />} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/chatbot" component={ChatbotPage} />
        <Route path="/map" component={MapPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <TooltipProvider>
          <AppRouter />
        </TooltipProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
