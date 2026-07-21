// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { isProduction } from "@/config";

enum LogLevel {
  debug,
  info,
  warn,
  error,
}

const logLevel = isProduction ? LogLevel.error : LogLevel.debug;

function debug(message?: unknown, ...optionalParams: unknown[]) {
  if (logLevel <= LogLevel.debug) {
    console.debug("DEBUG -", message, ...optionalParams);
  }
}

function info(message?: unknown, ...optionalParams: unknown[]) {
  if (logLevel <= LogLevel.info) {
    console.log("INFO  -", message, ...optionalParams);
  }
}

function warn(message?: unknown, ...optionalParams: unknown[]) {
  if (logLevel <= LogLevel.warn) {
    console.log("WARN  - ", message, ...optionalParams);
  }
}

function error(message?: unknown, ...optionalParams: unknown[]) {
  if (logLevel <= LogLevel.error) {
    console.log("ERROR - ", message, ...optionalParams);
  }
}

export const logger = {
  debug,
  info,
  warn,
  error,
};
