// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

export type NotificationType = "info" | "success" | "warning" | "error";

export type Notification = {
  type: NotificationType;
  message: string;
  subtitle?: string;
};
