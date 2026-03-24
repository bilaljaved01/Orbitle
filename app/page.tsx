// app/page.tsx  (Operators homepage)
// Changes:
//   1. ContactForm rendered 3 times (hero CTA section, mid-page, and final CTA section)
//   2. Multiple CTAs — one targeting agents, one targeting operators
//   3. AgentBanner CTA directing independent agents to /agents
//   4. Footer cross-link via FooterNew already handles it

import NavNew from "@/components/NavNew";
import TopBarNew from "@/components/TopBarNew";
import HeroNew from "@/components/HeroNew";
import HowItWorksNew from "@/components/HowItWorksNew";
import ModulesNew from "@/components/ModulesNew";
import WhyOrbitleNew from "@/components/WhyOrbitleNew";
import TestimonialsNew from "@/components/TestimonialsNew";
import PricingNew from "@/components/PricingNew";
import ContactNew from "@/components/ContactNew";
import FooterNew from "@/components/FooterNew";
import AgentBanner from "@/components/AgentBanner";
import MidPageCTA from "@/components/MidPageCTA";

export default function Home() {
  return (
    <main>
      <TopBarNew />
      <NavNew />
      <HeroNew />

      {/* ── CTA INSTANCE 1: immediately after hero (operators focus) ── */}
      <ContactNew id="contact-hero" heading="See Orbitle in Action" subheading="Book a 20-minute demo and we'll walk you through the full operator platform — marketplace, agent portal, and lead management." />

      {/* ── AGENT BANNER: nudge independent agents to their own page ── */}
      <AgentBanner />

      <HowItWorksNew />
      <ModulesNew />
      <WhyOrbitleNew />

      {/* ── CTA INSTANCE 2: mid-page (operators focus) ── */}
      <MidPageCTA />

      <TestimonialsNew />
      <PricingNew />

      {/* ── CTA INSTANCE 3: final bottom CTA (main contact section) ── */}
      <ContactNew id="contact" heading="Ready to launch your travel platform?" subheading="Tell us about your business and we'll get back within 24 hours with a tailored demo and plan options." />

      <FooterNew />
    </main>
  );
}
