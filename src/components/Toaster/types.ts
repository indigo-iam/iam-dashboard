export type NotificationType = "info" | "success" | "warning" | "error";

export type Notification = {
  type: NotificationType;
  message: string;
  subtitle?: string;
};
