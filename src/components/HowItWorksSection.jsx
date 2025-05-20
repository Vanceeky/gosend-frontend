import { UserPlus, CheckCircle, Gift } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-gray-800">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1: Register Account */}
          <div className="text-center bg-white shadow-lg rounded-lg p-8 transition-transform duration-300 hover:scale-105">
            <div className="bg-orange-500 text-white p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <UserPlus className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Register an Account</h3>
            <p className="text-gray-600">
              Sign up using a referral link or invite code to create your GoSend account.
            </p>
          </div>

          {/* Step 2: Activate Membership */}
          <div className="text-center bg-white shadow-lg rounded-lg p-8 transition-transform duration-300 hover:scale-105">
            <div className="bg-orange-500 text-white p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Activate Your Membership</h3>
            <p className="text-gray-600">
              Complete activation to unlock rewards and start earning from transactions.
            </p>
          </div>

          {/* Step 3: Earn Rewards */}
          <div className="text-center bg-white shadow-lg rounded-lg p-8 transition-transform duration-300 hover:scale-105">
            <div className="bg-orange-500 text-white p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Gift className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Earn Rewards</h3>
            <p className="text-gray-600">
              Get rewards for referrals, purchases, and becoming a partner merchant.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
