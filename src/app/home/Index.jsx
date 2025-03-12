import React from 'react'
import { HeroSection } from '@/components/HeroSection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { HowItWorksSection } from '@/components/HowItWorksSection'
import { TestimonialsSection } from '@/components/TestimonialsSections'
import { CTASection } from '@/components/CTASection'


const Index = () => {
  return (
    <div>



        <HeroSection/>
        <FeaturesSection/>
        <CTASection
          title="Wanna be our business partner?"
          description="Our Community is ready to connect with your business"
          primaryButtonText="Become a Merchant"
          primaryButtonLink="/register"
          secondaryButtonText="Learn More"
          secondaryButtonLink="/about"
        />

        <HowItWorksSection/>
        <TestimonialsSection/>
        <CTASection/>

        



    </div>
  )
}

export default Index