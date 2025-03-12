import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      text: "This e-wallet app has made my life so much easier. Transactions are fast and secure!",
      name: "John Doe",
      role: "Freelancer",
      emoji: "😊"
    },
    {
      text: "I love how easy it is to send money to my family and friends. Highly recommend!",
      name: "Jane Smith",
      role: "Small Business Owner",
      emoji: "😄"
    },
    {
      text: "The cashback rewards are amazing. I save money on every transaction!",
      name: "Alex Johnson",
      role: "Marketing Specialist",
      emoji: "👍"
    },
    {
      text: "Secure, fast, and reliable. This is the future of digital wallets!",
      name: "Emily Davis",
      role: "Tech Enthusiast",
      emoji: "🚀"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        
        <Carousel>
          <CarouselContent className="flex transition-transform duration-500 ease-linear" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="w-full flex-shrink-0">
                <Card className="bg-gray-50 p-6 rounded-lg">
                  <CardContent>
                    <p className="text-gray-600 mb-4">{testimonial.text}</p>
                    <div className="flex items-center">
                      <div className="bg-blue-500 text-white p-4 rounded-full mr-4">
                        {testimonial.emoji}
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}