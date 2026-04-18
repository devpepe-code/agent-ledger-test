import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { SectionEyebrow } from "./section-eyebrow";

export function MarketingWhyNow() {
  return (
    <section className="border-t border-white/[0.06] bg-[#0d0d14] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <SectionEyebrow>{"// why_now.md"}</SectionEyebrow>
        <h2 className="mt-6 max-w-3xl text-left text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl">
          The shift already happened.
        </h2>
        <div className="mt-8 flex w-full max-w-2xl flex-col gap-4 text-left text-lg leading-relaxed text-white/65 sm:text-xl">
          <p>Your competitors are deploying agents.</p>
          <p>Your customers are asking questions.</p>
          <p>Regulators are writing laws.</p>
        </div>
        <p className="mt-10 max-w-2xl text-left text-lg font-medium leading-snug text-white/80 sm:text-xl">
          The question isn&apos;t whether AI agents will be accountable.
          <br />
          <span className="text-white">It&apos;s whether yours will be first.</span>
        </p>
        <Link
          href="/#how-it-works"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "mt-10 inline-flex min-h-[48px] w-full justify-center sm:w-auto",
          )}
        >
          See how proof works →
        </Link>
      </div>
    </section>
  );
}
