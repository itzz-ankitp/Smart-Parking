import { createContext, useContext, useState, ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

interface NotificationContextType {
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const { toast } = useToast();

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    toast({
      title: type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Information',
      description: message,
      variant: type === 'error' ? 'destructive' : 'default',
    });
  };

  const value = {
    showNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Toaster />
    </NotificationContext.Provider>
  );
};
