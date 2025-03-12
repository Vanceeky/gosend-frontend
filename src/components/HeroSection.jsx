import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import bg from '@/assets/image/image2.1.png';
import bg1 from '@/assets/image/applelogo.png';
import bg2 from '@/assets/image/google.png';

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
      <div className="max-w-7xl mx-auto px-6">
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
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-5 p-4 sm:p-0">
                <Button asChild className="flex items-center px-5 py-3 text-white bg-black rounded-lg hover:bg-gray-800 transition">
                  <Link to="#" className="flex items-center">
                    <img
                      src={bg1} // Replace with your actual image URL
                      alt="Google Play-Store"
                      className="w-6 h-6 mr-3" // Adjust width as needed
                    />
                    <span className="text-base font-medium">Get it on Google Play</span>
                  </Link>
                </Button>

                <Button asChild className="flex items-center px-5 py-3 text-white bg-black rounded-lg hover:bg-gray-800 transition">
                  <Link to="#" className="flex items-center">
                  <img
                      src={bg2} // Replace with your actual image URL
                      alt="Download Options"
                      className="w-6 h-6 mr-3" // Adjust width as needed
                    />
                    <span className="text-base font-medium">Get it on App Store</span>
                  </Link>
                </Button>
              </div>

            </motion.div>
          </div>

          {/* Right Side: Image */}
          <div className="md:w-1/2">
            <img
              src={bg} // Replace with your image URL
              alt="Hero Image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}