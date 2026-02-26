// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

/*
src/instrumentation.ts

This file is managed by Next.js and must export a 'register' function.

From the official doc: "This function will be called once when a new Next.js
server instance is initiated, and must complete before the server is ready to
handle requests."

The 'register' function is helpful to setup services such telemetry and
database.

Documentation: https://nextjs.org/docs/pages/guides/instrumentation
*/

import { OTLPHttpJsonTraceExporter, registerOTel } from "@vercel/otel";
import { getMigrations } from "better-auth/db";
import { settings } from "./config";
import { authConfig } from "./auth";
import Database from "better-sqlite3";

const { IAM_DASHBOARD_OTEL_EXPORTER_OTLP_ENDPOINT } = settings;

// sqlite database must have global scope because it is in memory, otherwise
// it will be closed after the migrations and reopened in an empty state.
declare global {
  var db: Database.Database;
}

function setupOtel() {
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

async function setupAuthDb() {
  console.log("Initializing database schema...");
  globalThis.db = new Database(":memory:");
  const migrations = await getMigrations(authConfig(db));
  const { toBeCreated, toBeAdded, runMigrations } = migrations;
  if (toBeCreated.length + toBeAdded.length > 0) {
    try {
      await runMigrations();
    } catch (e) {
      const msg = e instanceof Error ? e.message : e;
      console.error("Failed to run database migrations, exit! error:", msg);
    }
    console.log("Done.");
  } else {
    // it should be logged only for not in memory databases
    console.log("Database already initialized, nothing to do.");
  }
}

// executed only once at startup.
export async function register() {
  setupAuthDb();
  setupOtel();
}
