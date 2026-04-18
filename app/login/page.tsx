import { redirect } from "next/navigation";

import { DASHBOARD_CONNECT_HREF } from "@/lib/auth";

type Props = {
  searchParams: { next?: string };
};

/** Sign-in UI lives on `/dashboard` as an overlay; this route stays for old links. */
export default function LoginPage({ searchParams }: Props) {
  const raw = searchParams.next;
  const next =
    typeof raw === "string" &&
    raw.startsWith("/") &&
    !raw.startsWith("//")
      ? raw
      : null;

  if (next && next !== "/dashboard") {
    redirect(
      `/dashboard?connect=1&next=${encodeURIComponent(next)}`,
    );
  }
  redirect(DASHBOARD_CONNECT_HREF);
}
