export function HowItWorksSection() {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-500 text-white p-6 rounded-full w-16 h-16 mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">
                Create an account in just a few simple steps.
              </p>
            </div>
  
            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-blue-500 text-white p-6 rounded-full w-16 h-16 mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Add Funds</h3>
              <p className="text-gray-600">
                Link your bank account or card to add funds.
              </p>
            </div>
  
            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-blue-500 text-white p-6 rounded-full w-16 h-16 mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Transacting</h3>
              <p className="text-gray-600">
                Send, receive, and pay with just a few taps.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }