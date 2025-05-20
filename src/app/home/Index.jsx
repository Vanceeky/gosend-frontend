import React from 'react'
import { HeroSection } from '@/components/HeroSection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { HowItWorksSection } from '@/components/HowItWorksSection'
import { TestimonialsSection } from '@/components/TestimonialsSections'
import { CTASection } from '@/components/CTASection'
import { MerchantSection } from '@/components/MerchantSection'
import { MemberSection } from '@/components/MemberSection'


const Index = () => {
  return (
    <div>



        <HeroSection/>
        <FeaturesSection/>
        <MemberSection/>

        <HowItWorksSection/>
        <CTASection
          title="Wanna be our business partner?"
          description="Our Community is ready to connect with your business"
          primaryButtonText="Become a Merchant"
          primaryButtonLink="/register-merchant"
          secondaryButtonText="Learn More"
          secondaryButtonLink="/about"
        />

        <MerchantSection/>

        <CTASection/>

        



    </div>
  )
}

export default Index