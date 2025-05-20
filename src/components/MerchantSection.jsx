import { Store, Wallet, Users } from "lucide-react";
import bg from "@/assets/gosend_bg.jpg";

export function MerchantSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Content Section */}
        <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
                Become a GoSend Partner Merchant
            </h2>
            <p className="text-gray-600 mb-6">
                Expand your business by accepting payments and earning from the GoSend ecosystem. 
                Increase customer reach and gain more sales through our growing community.
            </p>

            <div className="space-y-4">
                {/* Feature 1 */}
                <div className="flex items-center gap-4">
                <div className="bg-orange-500 text-white p-3 rounded-full">
                    <Store className="h-6 w-6" />
                </div>
                <p className="text-gray-700 font-medium">Get more customers from GoSend users.</p>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-4">
                <div className="bg-orange-500 text-white p-3 rounded-full">
                    <Wallet className="h-6 w-6" />
                </div>
                <p className="text-gray-700 font-medium">Receive payments instantly and securely.</p>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center gap-4">
                <div className="bg-orange-500 text-white p-3 rounded-full">
                    <Users className="h-6 w-6" />
                </div>
                <p className="text-gray-700 font-medium">Earn commissions when customers shop.</p>
                </div>
            </div>


        </div>
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={bg}// Replace with actual image path
            alt="GoSend Merchant"
            className="w-full rounded-lg shadow-lg"
          />
        </div>


      </div>
    </section>
  );
}
