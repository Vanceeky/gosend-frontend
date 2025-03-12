import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Key Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="bg-blue-50 p-6 rounded-full w-16 h-16 mx-auto mb-4"
              whileHover={{ rotate: 10 }}
            >
              💳
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600">
              Enjoy secure and encrypted transactions with our advanced technology.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="bg-blue-50 p-6 rounded-full w-16 h-16 mx-auto mb-4"
              whileHover={{ rotate: 10 }}
            >
              📱
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">Mobile-Friendly</h3>
            <p className="text-gray-600">
              Access your wallet anytime, anywhere with our mobile app.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="bg-blue-50 p-6 rounded-full w-16 h-16 mx-auto mb-4"
              whileHover={{ rotate: 10 }}
            >
              💰
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">Instant Transfers</h3>
            <p className="text-gray-600">
              Send and receive money instantly with zero delays.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}