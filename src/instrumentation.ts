// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { registerOTel } from '@vercel/otel'
 
export function register() {
  registerOTel({ serviceName: 'iam-dashboard' })
}
