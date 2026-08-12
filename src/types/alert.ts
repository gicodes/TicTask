export type AlertType = 'success' | 'error' | 'info' | 'warning';

export type AlertContextType = {
  showAlert: (message: string, severity?: AlertType) => void;
  confirm: (message: string, title?: string, deleteText?: string) => Promise<boolean>;
  prompt: (
    message: string,
    title?: string,
    defaultValue?: string,
    confirmText?: string
  ) => Promise<string | null>;
};