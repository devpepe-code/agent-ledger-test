import { NextResponse } from "next/server";

import { env, getEnvIssues } from "@/lib/env";

export const dynamic = "force-dynamic";

export function GET(): NextResponse {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    appEnv: env.appEnv,
    envIssues: getEnvIssues(),
  });
}
