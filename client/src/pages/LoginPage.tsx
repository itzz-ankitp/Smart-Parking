import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Settings, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';

export const LoginPage = () => {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, loading } = useAuth();
  const { showNotification } = useNotification();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRegisterMode) {
      if (formData.password !== formData.confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
      }
      await signUpWithEmail(formData.email, formData.password);
    } else {
      await signInWithEmail(formData.email, formData.password);
    }
  };

  const handleGoogleAuth = async () => {
    await signInWithGoogle();
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setFormData({ email: '', password: '', confirmPassword: '' });
  };

  if (loading) {
    return <LoadingSpinner message={isRegisterMode ? "Creating account..." : "Signing in..."} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center smart-gradient py-12 px-4 sm:px-6 lg:px-8 page-transition">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-[var(--smart-primary)] rounded-xl flex items-center justify-center mb-4">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--smart-primary)]">
            Smart Services Portal
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isRegisterMode ? 'Create your account to get started' : 'Sign in to access your services dashboard'}
          </p>
        </div>
        
        <Card className="smart-shadow">
          <CardContent className="p-8">
            <form onSubmit={handleEmailAuth} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="Enter your email"
                    />
                    <Mail className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10"
                      placeholder={isRegisterMode ? "Create a password" : "Enter your password"}
                    />
                    <Lock className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {isRegisterMode && (
                  <div>
                    <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="mt-1 relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="Confirm your password"
                      />
                      <Lock className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-[var(--smart-primary)] hover:bg-[var(--smart-primary)]/90 text-white smart-transition"
                  disabled={loading}
                >
                  {isRegisterMode ? 'Create Account' : 'Sign In'}
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full smart-transition hover:bg-gray-50"
                  onClick={handleGoogleAuth}
                  disabled={loading}
                >
                  <FaGoogle className="h-4 w-4 mr-2 text-red-500" />
                  Sign in with Google
                </Button>
              </div>
            </form>

            <div className="text-center mt-6">
              <Button
                variant="link"
                onClick={toggleMode}
                className="text-sm text-[var(--smart-accent)] hover:text-[var(--smart-accent)]/80 font-medium smart-transition"
              >
                {isRegisterMode ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
