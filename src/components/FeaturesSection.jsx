export function FeaturesSection() {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="bg-blue-50 p-6 rounded-full w-16 h-16 mx-auto mb-4">
                💳
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Enjoy secure and encrypted transactions with our advanced technology.
              </p>
            </div>
  
            {/* Feature 2 */}
            <div className="text-center">
              <div className="bg-blue-50 p-6 rounded-full w-16 h-16 mx-auto mb-4">
                📱
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile-Friendly</h3>
              <p className="text-gray-600">
                Access your wallet anytime, anywhere with our mobile app.
              </p>
            </div>
  
            {/* Feature 3 */}
            <div className="text-center">
              <div className="bg-blue-50 p-6 rounded-full w-16 h-16 mx-auto mb-4">
                💰
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Transfers</h3>
              <p className="text-gray-600">
                Send and receive money instantly with zero delays.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }