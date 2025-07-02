import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  signInWithRedirect,
  getRedirectResult,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useNotification } from './NotificationContext';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Handle redirect result for Google Sign-In
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          showNotification('Successfully signed in with Google!', 'success');
        }
      })
      .catch((error) => {
        console.error('Google Sign-In error:', error);
        showNotification('Google Sign-In failed. Please try again.', 'error');
      });

    return unsubscribe;
  }, [showNotification]);

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      showNotification('Successfully signed in!', 'success');
    } catch (error: any) {
      console.error('Email sign-in error:', error);
      showNotification(error.message || 'Sign-in failed. Please try again.', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Set display name from email
      const displayName = email.split('@')[0];
      await updateProfile(result.user, { displayName });
      
      showNotification('Account created successfully!', 'success');
    } catch (error: any) {
      console.error('Email sign-up error:', error);
      showNotification(error.message || 'Account creation failed. Please try again.', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithRedirect(auth, googleProvider);
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      showNotification('Google Sign-In failed. Please try again.', 'error');
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      showNotification('Successfully signed out!', 'success');
    } catch (error: any) {
      console.error('Logout error:', error);
      showNotification('Logout failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
