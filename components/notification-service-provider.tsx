// components/notification-service-provider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { NotificationServiceWeb } from "@/lib/notification-service.web";

// Define the shape of our NotificationService (native or web)
interface INotificationService {
  initialize: () => Promise<void>;
  sendLocalNotification: (title: string, body: string, id?: number) => Promise<void>;
  registerDeviceToken: (userId: string) => Promise<void>;
  unregisterDevice: () => Promise<void>;
  // Add other public methods if needed
}

// Create a context for the notification service
const NotificationServiceContext = createContext<INotificationService | undefined>(undefined);

export const NotificationServiceProvider = ({ children }: { children: ReactNode }) => {
  const [notificationService, setNotificationService] = useState<INotificationService | undefined>(undefined);

  useEffect(() => {
    const loadService = async () => {
      if (typeof window !== "undefined" && (window as any).Capacitor) {
        // Native environment
        const { NotificationService } = await import(/* webpackIgnore: true */ "@/lib/notification-service.native");
        setNotificationService(new NotificationService());
      } else {
        // Web environment
        setNotificationService(new NotificationServiceWeb());
      }
    };

    loadService();
  }, []);

  return (
    <NotificationServiceContext.Provider value={notificationService}>
      {children}
    </NotificationServiceContext.Provider>
  );
};

// Custom hook to use the notification service
export const useNotificationService = () => {
  const context = useContext(NotificationServiceContext);
  if (context === undefined) {
    throw new Error("useNotificationService must be used within a NotificationServiceProvider");
  }
  return context;
};
