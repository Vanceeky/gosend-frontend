import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you have React Router

const Dashboard = () => {
  const [merchantDetails, setMerchantDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // 🔄 For navigation

  // ✅ Function to decode JWT token
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1]; // Get the payload
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64)); // Decode
      return payload;
    } catch (err) {
      console.error("Failed to decode token:", err);
      return null;
    }
  };

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Remove token
    navigate('/login'); // Redirect to login page
  };

  // ✅ Fetch merchant details securely
  const fetchMerchantDetails = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) throw new Error("No access token found.");

      const tokenPayload = decodeToken(accessToken);
      if (!tokenPayload) throw new Error("Invalid token.");
      
      const merchantId = tokenPayload.user_id;
      if (!merchantId) throw new Error("Merchant ID missing in token.");

      const response = await fetch(`http://127.0.0.1:8000/v1/merchant/${merchantId}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 403) {
          alert("Unauthorized! Redirecting to login.");
          handleLogout();
          return;
        }
        throw new Error("Failed to fetch merchant details.");
      }

      const data = await response.json();
      setMerchantDetails(data.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching merchant details:", err);
    }
  };

  // ✅ Fetch details on mount
  useEffect(() => {
    fetchMerchantDetails();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!merchantDetails) return <div>Loading...</div>;

  return (
    <div>
      <h1>Merchant Dashboard</h1>
      <h2>Merchant Details</h2>
      <pre>{JSON.stringify(merchantDetails, null, 2)}</pre>

      {/* 🔴 Logout Button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
