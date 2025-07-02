import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Bot, 
  Map, 
  User, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';

export const Navigation = () => {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/chatbot', label: 'AI Assistant', icon: Bot },
    { path: '/map', label: 'Service Map', icon: Map },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-[var(--smart-primary)]">
                Smart Parking
              </h1>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link key={path} href={path}>
                  <a className={`flex items-center px-3 py-2 rounded-md text-sm font-medium smart-transition ${
                    isActive(path) 
                      ? 'text-[var(--smart-primary)] bg-[var(--smart-background)]' 
                      : 'text-gray-500 hover:text-[var(--smart-accent)]'
                  }`}>
                    <Icon className="h-4 w-4 mr-2" />
                    {label}
                  </a>
                </Link>
              ))}
            </div>
          </div>

          {/* User menu and logout */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-8 h-8 bg-[var(--smart-accent)] rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user?.displayName || user?.email?.split('@')[0] || 'User'}
              </span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-600 smart-transition"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link key={path} href={path}>
                  <a 
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium smart-transition ${
                      isActive(path) 
                        ? 'text-[var(--smart-primary)] bg-[var(--smart-background)]' 
                        : 'text-gray-500 hover:text-[var(--smart-accent)] hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {label}
                  </a>
                </Link>
              ))}
              
              {/* Mobile user info */}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3">
                  <div className="w-8 h-8 bg-[var(--smart-accent)] rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user?.displayName || user?.email?.split('@')[0] || 'User'}
                    </div>
                    <div className="text-sm text-gray-500">{user?.email}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
