import { Users, ShoppingCart, Store } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-gray-800">
          Key Features of GoSend
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1: Referral System */}
          <div className="text-center bg-white shadow-lg rounded-lg p-8 transition-transform duration-300 hover:scale-105">
            <div className="bg-blue-50 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-10 w-10 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Earn by Referring</h3>
            <p className="text-gray-600">
              Invite friends to join GoSend with your referral link and earn rewards when they make transactions.
            </p>
          </div>

          {/* Feature 2: Rewards for Purchases */}
          <div className="text-center bg-white shadow-lg rounded-lg p-8 transition-transform duration-300 hover:scale-105">
            <div className="bg-blue-50 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <ShoppingCart className="h-10 w-10 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Earn from Purchases</h3>
            <p className="text-gray-600">
              Get rewarded when your referrals shop with our partner merchants. More purchases, more earnings!
            </p>
          </div>

          {/* Feature 3: Merchant Partnership */}
          <div className="text-center bg-white shadow-lg rounded-lg p-8 transition-transform duration-300 hover:scale-105">
            <div className="bg-blue-50 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Store className="h-10 w-10 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Become a Merchant</h3>
            <p className="text-gray-600">
              Register as a GoSend partner merchant to attract more customers and boost your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
