import { MarketingFaq } from "./marketing-faq";
import { MarketingHero } from "./marketing-hero";
import { MarketingHowItWorksSection } from "./marketing-solution-steps";
import { MarketingMidCta } from "./marketing-mid-cta";
import { MarketingNav } from "./marketing-nav";
import { MarketingFooter } from "./marketing-pricing-footer";
import { MarketingProblemStats } from "./marketing-problem-stats";
import { CursorGlow } from "./cursor-glow";
import { SectionDivider } from "./section-divider";

export function MarketingPage() {
  return (
    <div
      className="relative min-h-screen min-w-0 overflow-x-clip text-white"
      style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}
    >
      <CursorGlow />
      <div className="relative z-[2]">
        <MarketingNav />
        <MarketingHero />
        <SectionDivider />
        <MarketingProblemStats />
        <SectionDivider />
        <MarketingHowItWorksSection />
        <SectionDivider />
        <MarketingMidCta />
        <SectionDivider />
        <MarketingFaq />
        <MarketingFooter />
      </div>
    </div>
  );
}
