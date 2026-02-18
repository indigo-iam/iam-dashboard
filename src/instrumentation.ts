// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { OTLPHttpJsonTraceExporter, registerOTel } from "@vercel/otel";
import { settings } from "./config";

const { IAM_DASHBOARD_OTEL_EXPORTER_OTLP_ENDPOINT } = settings;

export function register() {
  registerOTel({
    serviceName: "iam-dashboard",
    traceExporter: new OTLPHttpJsonTraceExporter({
      url: IAM_DASHBOARD_OTEL_EXPORTER_OTLP_ENDPOINT,
    }),
    attributes: {
      "service.namespace": "indigo-iam",
    },
  });
}
