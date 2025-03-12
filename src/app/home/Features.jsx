import * as React from "react";
import { Card, CardContent } from "@/components/ui/card"; // ShadCN's Card components
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"; // ShadCN Carousel components

// How It Works Carousel Component
const HowItWorksCarousel = () => {
  const steps = [
    {
      title: 'Sign Up',
      description: 'Create an account in just a few simple steps.',
      number: 1,
    },
    {
      title: 'Add Funds',
      description: 'Link your bank account or card to add funds.',
      number: 2,
    },
    {
      title: 'Start Transacting',
      description: 'Send, receive, and pay with just a few taps.',
      number: 3,
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-4xl font-semibold mb-12">How It Works</h2>

        {/* ShadCN Carousel Component with custom arrows */}
        <Carousel className="w-full max-w-2xl mx-auto">
          <CarouselContent>
            {steps.map((step, index) => (
              <CarouselItem key={index} className="flex justify-center items-center">
                <Card className="w-full max-w-xs p-4">
                  <CardContent className="flex flex-col items-center justify-center text-center p-6">
                    <div className="bg-blue-500 text-white rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                      <span className="text-xl font-bold">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className="text-white bg-black p-2 rounded-full left-0">
            ←
          </CarouselPrevious>
          <CarouselNext className="text-white bg-black p-2 rounded-full right-0">
            →
          </CarouselNext>
        </Carousel>
      </div>
    </div>
  );
};

export function FeaturesSection() {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Secure Payments */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            {/* Image Container */}
            <div className="flex justify-center items-center mb-6">
                <img
                src="src/assets/Online-Payment-Security-v2.webp"
                alt="Secure Payments"
                className="w-40 h-40 object-cover rounded-full" // Circular image with defined size
                />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600">
                Enjoy secure and encrypted transactions with our advanced technology. Your financial information is always safe with us.
            </p>
            </div>
            
                    {/* Feature 2: Mobile-Friendly */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            {/* Image Container */}
            <div className="flex justify-center items-center mb-6">
                <img
                src="src/assets/mobile-friendly-2.webp"
                alt="Mobile-Friendly"
                className="w-40 h-40 object-cover rounded-full" // Circular image with defined size
                />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mobile-Friendly</h3>
            <p className="text-gray-600">
                Access your wallet anytime, anywhere with our easy-to-use mobile app. Convenient and accessible on the go.
            </p>
            </div>

            {/* Feature 3: Instant Transfers */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            {/* Image Container */}
            <div className="flex justify-center items-center mb-6">
                <img
                src="src/assets/instant transfer.jpg"
                alt="Instant Transfers"
                className="w-40 h-40 object-cover rounded-full" // Circular image with defined size
                />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Transfers</h3>
            <p className="text-gray-600">
                Send and receive money instantly with zero delays. Experience real-time transactions and smooth transfers.
            </p>
            </div>

            {/* Feature 4: User-Friendly Interface */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            {/* Image Container */}
            <div className="flex justify-center items-center mb-6">
                <img
                src="src/assets/user friendly.jpg"
                alt="User-Friendly Interface"
                className="w-40 h-40 object-cover rounded-full" // Circular image with defined size
                />
            </div>
            <h3 className="text-xl font-semibold mb-2">User-Friendly Interface</h3>
            <p className="text-gray-600">
                Enjoy an intuitive and easy-to-navigate interface. We’ve designed it for a seamless user experience.
            </p>
            </div>

            {/* Feature 5: Bill Payments & Top-Ups */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            {/* Image Container */}
            <div className="flex justify-center items-center mb-6">
                <img
                src="src/assets/billpayment.jpg"
                alt="Bill Payments & Top-Ups"
                className="w-40 h-40 object-cover rounded-full" // Circular image with defined size
                />
            </div>
            <h3 className="text-xl font-semibold mb-2">Bill Payments & Top-Ups</h3>
            <p className="text-gray-600">
                Pay your bills and top up your accounts directly from your e-wallet. Convenient and hassle-free.
            </p>
            </div>

            {/* Feature 6: Loyalty and Rewards Programs */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            {/* Image Container */}
            <div className="flex justify-center items-center mb-6">
                <img
                src="src/assets/reward.webp"
                alt="Loyalty & Rewards Programs"
                className="w-40 h-40 object-cover rounded-full" // Circular image with defined size
                />
            </div>
            <h3 className="text-xl font-semibold mb-2">Loyalty & Rewards Programs</h3>
            <p className="text-gray-600">
                 hi Earn rewards and exclusive benefits with every transaction. Your loyalty is valued, and we’ve got exciting rewards for you.
            </p>
            </div>
  
            {/* Feature 7: Advanced Security Features */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            {/* Image Container */}
            <div className="flex justify-center items-center mb-6">
                <img
                src="src/assets/Advanced-Security.jpg"
                alt="Advanced Security Features"
                className="w-40 h-40 object-cover rounded-full" // Circular image with defined size
                />
            </div>
            <h3 className="text-xl font-semibold mb-2">Advanced Security Features</h3>
            <p className="text-gray-600">
                We prioritize your security. Our app uses advanced encryption, multi-factor authentication, and secure protocols.
            </p>
            </div>

            {/* Feature 8: Peer-to-Peer Payments */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            {/* Image Container */}
            <div className="flex justify-center items-center mb-6">
                <img
                src="src/assets/peer-to-peer.png"
                alt="Peer-to-Peer Payments"
                className="w-40 h-40 object-cover rounded-full" // Circular image with defined size
                />
            </div>
            <h3 className="text-xl font-semibold mb-2">Peer-to-Peer Payments</h3>
            <p className="text-gray-600">
                Easily send money to friends, family, or others directly. Peer-to-peer payments are quick, easy, and free.
            </p>
            </div>

            {/* Feature 9: Customer Support */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            {/* Image Container */}
            <div className="flex justify-center items-center mb-6">
                <img
                src="src/assets/customersupport.jpg"
                alt="Customer Support"
                className="w-40 h-40 object-cover rounded-full" // Circular image with defined size
                />
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
            <p className="text-gray-600">
                Our customer support team is available 24/7 to assist with any inquiries or issues. We're always here for you!
            </p>
            </div>

          </div>
        </div>
      </section>
    );
  }
  
  
// Main Features Component
const Features = () => {
  return (
    <>
      {/* Header Section */}
      <div className="bg-orange-500 py-12">
        <div className="container mx-auto text-center text-white px-6">
          <h1 className="text-5xl font-bold mb-4">Features and Services</h1>
          <p className="text-xl mb-8">
            Explore our ‘Features and Services’ page to understand the full capabilities of our payment solutions.
            From secure payment gateways to mobile payment options, we offer a range of tools designed to streamline
            your financial transactions and enhance your business operations.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Carousel */}
      <HowItWorksCarousel />
    </>
  );
};

export default Features;
