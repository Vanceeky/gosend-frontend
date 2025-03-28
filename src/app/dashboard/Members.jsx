import { useEffect, useState } from "react";
import MembersDataTable from "@/components/MembersDataTable";

export default function Members() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
        const response = await fetch(`http://${API_BASE_URL}/v1/member/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch members");
        }
        const result = await response.json();
        console.log("API Response:", result); // Log the API response
  
        const formattedData = result.data.map(member => {
          // Construct the name dynamically, skipping null or empty values
          const nameParts = [
            member.user_details.first_name,
            member.user_details.middle_name,
            member.user_details.last_name,
            member.user_details.suffix_name
          ].filter(part => part); // Filter out null or empty strings
        
          const name = nameParts.join(" "); // Join the parts with a space
        
          return {
            id: member.user_id,
            name: name, // Use the dynamically constructed name
            mobile_number: member.mobile_number,
            wallet_balance: member.wallet.wallet_balance,
            reward_points: member.wallet.reward_points,
            account_type: member.account_type || "MEMBER",
            community_id: member.community_id,
            community_name: member.community_name || "N/A",
            address: `${member.user_address.house_number} ${member.user_address.street_name}, ${member.user_address.city}`,
            is_kyc_verified: member.is_kyc_verified,
            is_activated: member.is_activated
          };
        });
  
        setData(formattedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMembers();
  }, []);

  const handleActivationUpdate = (userId) => {
    console.log("Updating user:", userId); // Debugging
    setData((prevData) =>
      prevData.map((user) =>
        user.id === userId
          ? { ...user, is_activated: true }
          : user
      )
    );
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  
  return (

      <MembersDataTable data={data} setData={setData} onActivate={handleActivationUpdate} />
   
  );
}
