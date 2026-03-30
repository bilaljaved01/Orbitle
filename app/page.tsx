import { redirect } from 'next/navigation'

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Orbitle",
  "operatingSystem": "Web-based",
  "applicationCategory": "TravelAgencySoftware",
  "offers": {
    "@type": "Offer",
    "price": "499",
    "priceCurrency": "INR"
  },
  "description": "White-label travel business platform for independent agents. Launch your branded travel marketplace in 48 hours.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "150"
  }
};

export default function Home() {
  const [pricingUnlocked, setPricingUnlocked] = useState(false);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TopBarNew />
      <NavNew />
      <HeroNew />

      <ContactNew
        id="contact-hero"
        heading="See Orbitle in Action"
        subheading="Book a 20-minute demo and we'll walk you through the full operator platform — marketplace, agent portal, and lead management."
        onFormSubmit={() => setPricingUnlocked(true)}
      />

      <AgentBanner />

      <HowItWorksNew />
      <ModulesNew />
      <WhyOrbitleNew />

      <MidPageCTA />

      <TestimonialsNew />
      <PricingNew unlocked={pricingUnlocked} />

      <ContactNew
        id="contact"
        heading="Ready to launch your travel platform?"
        subheading="Tell us about your business and we'll get back within 24 hours with a tailored demo and plan options."
        onFormSubmit={() => setPricingUnlocked(true)}
      />

      <FooterNew />
    </main>
  );
}