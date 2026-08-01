import {
  AboutSection,
  FeaturesSection,
  JoinGuideSection,
  LeaderboardSection,
  RulesSection,
  SiteFooter,
} from '@/components/community-sections'
import { HeroSection } from '@/components/hero-section'

import { SiteNavbar } from '@/components/site-navbar'

export default function Page() {
  return (
    <main className="min-h-screen bg-[#e5dfd3] dark:bg-[#0b0d12] text-stone-900 dark:text-stone-100 selection:bg-blue-600 selection:text-white transition-colors duration-300">
      <SiteNavbar />

      <HeroSection />
      <FeaturesSection />
      <JoinGuideSection />
      <RulesSection />
      <AboutSection />
      <LeaderboardSection />
      <SiteFooter />
    </main>
  )
}
