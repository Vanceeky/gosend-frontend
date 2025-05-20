import { UserPlus, Gift, ShoppingCart } from "lucide-react";
import  member  from "@/assets/image/image2.1.png"

export function MemberSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-red-500 to-orange-500 text-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={member} // Replace with actual image path
            alt="GoSend Member"
            className="w-full rounded-lg"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Join GoSend & Start Earning Rewards
          </h2>
          <p className="text-lg opacity-90 mb-6">
            Become a GoSend member and unlock multiple earning opportunities! Earn rewards 
            for referrals, purchases, and transactions within our ecosystem.
          </p>

          <div className="space-y-4">
            {/* Feature 1 */}
            <div className="flex items-center gap-4">
              <div className="bg-white text-orange-500 p-3 rounded-full shadow-md">
                <UserPlus className="h-6 w-6" />
              </div>
              <p className="text-lg">Join using a referral link from an existing member.</p>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-4">
              <div className="bg-white text-orange-500 p-3 rounded-full shadow-md">
                <Gift className="h-6 w-6" />
              </div>
              <p className="text-lg">Earn rewards for every successful referral.</p>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-4">
              <div className="bg-white text-orange-500 p-3 rounded-full shadow-md">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <p className="text-lg">Get commissions when your referrals shop with partner merchants.</p>
            </div>
          </div>

          <button className="mt-6 bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-100 transition duration-300 shadow-md">
            Sign Up Now
          </button>
        </div>
      </div>
    </section>
  );
}
