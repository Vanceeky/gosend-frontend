export function TestimonialsSection() {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                "This e-wallet app has made my life so much easier. Transactions are fast and secure!"
              </p>
              <div className="flex items-center">
                <div className="bg-blue-500 text-white p-4 rounded-full mr-4">
                  😊
                </div>
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-sm text-gray-500">Freelancer</p>
                </div>
              </div>
            </div>
  
            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                "I love how easy it is to send money to my family and friends. Highly recommend!"
              </p>
              <div className="flex items-center">
                <div className="bg-blue-500 text-white p-4 rounded-full mr-4">
                  😄
                </div>
                <div>
                  <h4 className="font-semibold">Jane Smith</h4>
                  <p className="text-sm text-gray-500">Small Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }