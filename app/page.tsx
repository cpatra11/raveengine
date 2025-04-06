import BenefitsSection from "@/components/ui/benefits-section";
import HeroSection from "@/components/ui/hero-section";
import { PricingSection } from "@/components/ui/pricing-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <BenefitsSection />
      <PricingSection />
    </main>
  );
}
