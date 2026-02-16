import { AlertCircle, AlertTriangle, CheckCircle2, X } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert';

import { NotificationType, useNotificationStore } from '../model';

const icons: Record<NotificationType, React.ElementType> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
};

const variants: Record<NotificationType, 'default' | 'destructive' | 'success' | 'warning'> = {
  success: 'success',
  warning: 'warning',
  error: 'destructive',
};

export const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotificationStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
      {notifications.map((notification) => {
        const Icon = icons[notification.type];

        return (
          <div
            className="pointer-events-auto animate-in slide-in-from-right-5 fade-in duration-300"
            key={notification.id}
          >
            <Alert className="shadow-lg relative pr-8" variant={variants[notification.type]}>
              <Icon className="h-4 w-4" />

              <AlertTitle>{notification.title}</AlertTitle>

              {notification.description && (
                <AlertDescription>{notification.description}</AlertDescription>
              )}

              <button
                className="absolute right-2 top-2 p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity"
                onClick={() => removeNotification(notification.id)}
              >
                <X className="h-4 w-4" />
              </button>
            </Alert>
          </div>
        );
      })}
    </div>
  );
};
