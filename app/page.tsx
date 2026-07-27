import {
  AboutSection,
  ExtraSection,
  FeaturesSection,
  JoinGuideSection,
  RulesSection,
  SiteFooter,
} from '@/components/community-sections'
import { HeroSection } from '@/components/hero-section'

import { SiteNavbar } from '@/components/site-navbar'

export default function Page() {
  return (
    <main className="min-h-screen bg-[#e5dfd3] text-stone-900 selection:bg-blue-600 selection:text-white">
      <SiteNavbar />

      <HeroSection />
      <FeaturesSection />
      <JoinGuideSection />
      <RulesSection />
      <AboutSection />
      <ExtraSection />
      <SiteFooter />
    </main>
  )
}
