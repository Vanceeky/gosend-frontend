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
        const response = await fetch(`http://${API_BASE_URL}:8000/v1/users/members/list`);
        if (!response.ok) {
          throw new Error("Failed to fetch members");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);
  const handleActivationUpdate = (userId, newBalance) => {
    console.log("Updating user:", userId, "with new balance:", newBalance); // Debugging
    setData((prevData) =>
      prevData.map((user) =>
        user.user_id === userId
          ? { ...user, is_activated: true, wallet_balance: newBalance }
          : user
      )
    );
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Members List</h2>
      
      <MembersDataTable data={data} setData={setData} onActivate={handleActivationUpdate} />
    </div>
  );
}
