import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import bg from '@/assets/image/image2.1.png';
import bg1 from '@/assets/image/applelogo.png';
import bg2 from '@/assets/image/google.png';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        {/* Header Section */}
        <div className="w-full py-12 bg-orange-500 bg-cover bg-center bg-no-repeat bg-blend-multiply">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">About Us</h1>
          <p className="text-gray-200 text-center text-lg px-6 md:px-10 mt-4">
            Welcome to <span className="font-semibold">GoSend</span>—your trusted partner in fast, reliable, and eco-conscious deliveries.
          </p>
        </div>

        {/* About Us Section */}
        <div className="w-full py-12 bg-gradient-to-r from-gray-800 to-gray-900 flex flex-col md:flex-row items-center px-6 md:px-12">
          {/* Left Container */}
          <div className="w-full md:w-1/2 text-white text-center md:text-left">
            <div className="mt-8 p-6 bg-gray-700 bg-opacity-50 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-semibold text-orange-400">GoSend Services</h2>
              <p className="text-gray-300 mt-2 leading-relaxed">
                Pay bills, buy load, add e-money, and more—all in one place! Easily access these services through the{" "}
                <span className="font-semibold text-orange-300">GoSend</span> app anytime, anywhere.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Button asChild className="flex items-center px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition">
                  <Link to="#" className="flex items-center">
                    <img
                      src={bg2} // Replace with your actual image URL
                      alt="Google Play-Store"
                      className="w-6 h-6 mr-3" // Adjust width as needed
                    />
                    <span className="text-sm font-medium">Get it on Google Play</span>
                  </Link>
                </Button>

                <Button asChild className="flex items-center px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition">
                  <Link to="#" className="flex items-center">
                    <img
                      src={bg1} // Replace with your actual image URL
                      alt="Google Play-Store"
                      className="w-6 h-6 mr-3" // Adjust width as needed
                    />
                    <span className="text-sm font-medium">Download on the App Store</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Container */}
          <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
            <img
              src={bg} // Replace with your actual image URL
              alt="Google Play-Store"
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-10 px-6 bg-orange-500 py-10">
          {[
            { title: "Our Mission", text: "To provide a secure, convenient, and rewarding digital payment solution that empowers businesses and individuals." },
            { title: "Our Vision", text: "To be the leading e-wallet platform, making transactions seamless, rewarding, and accessible for everyone." }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-6 bg-white shadow-md rounded-lg border border-gray-200"
            >
              <h2 className="text-2xl font-semibold text-orange-700 mb-3">{item.title}</h2>
              <p className="text-gray-600 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>


        {/* Why Choose Us */}
        <div className="mb-10 mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Why Choose GoSend eWallet?</h2>
          <div className="text-1xl grid md:grid-cols-2 gap-6">
            {[
              { title: "Secure & Fast Transactions", description: "Enjoy seamless and secure payments with GoSend eWallet.", icon: "🔒" },
              { title: "Affordable & Convenient", description: "Low transaction fees and easy wallet management.", icon: "💰" },
              { title: "Exclusive Rewards", description: "Earn GoPoints and unlock special discounts with every transaction.", icon: "🎁" },
              { title: "Eco-Friendly Incentives", description: "Get rewarded for choosing sustainable and cashless payments.", icon: "🌱" },
              { title: "24/7 Support", description: "Reliable customer assistance whenever you need it.", icon: "💬" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-4 shadow-md border">
                  <CardContent>
                    <CardTitle className="mb-2">{item.icon} {item.title}</CardTitle>
                    <p>{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>


        {/* Rewards Program */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-10 px-6"
        >
          <div className="bg-orange-200 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-orange-800 mb-4">Earn Rewards with Every Transactions!</h2>
            <p className="text-gray-700 leading-relaxed">
              Every action with GoSend eWallet earns you GoPoints! Complete transactions, send packages, refer friends, or choose eco-friendly options to accumulate points and unlock exclusive rewards.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
              <li>🎁 <strong>Earn GoPoints</strong> – Get rewarded for every transaction, and referral with GoSend eWallet.</li>
              <li>💳 <strong>Redeem Rewards</strong> – Use GoPoints for discounts, cashback, and exclusive perks.</li>
              <li>🌟 <strong>VIP Tiers</strong> – Unlock premium benefits and priority services as you level up with GoSend eWallet.</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;