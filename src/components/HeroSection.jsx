import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.5 } },
  };

  return (
    <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Left Side: Text Content */}
          <div className="text-center md:text-left md:w-1/2">
            {/* Animated Heading */}
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              Unlock the Power of Smart E-Wallet Rewards!
            </motion.h1>

            {/* Animated Subheading */}
            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-8"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              Join <span className="font-semibold text-orange-600"> GoSend </span> and experience seamless digital transactions with built-in affiliate marketing. Activate your account, enjoy exclusive features, and earn rewards. 
            </motion.p>

            {/* Animated Buttons */}
            <motion.div
              className="flex justify-center md:justify-start space-x-4"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
            >
              <Button asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Side: Image */}
          <div className="md:w-1/2">
            <img
              src="https://placehold.co/600x400" // Replace with your image URL
              alt="Hero Image"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}