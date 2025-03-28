import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import LocationForm from "./Location.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {  AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

  
import Mapbox from "@/app/dashboard/merchant/components/Mapbox";

export function MerchantRegisterForm({ setAlert, className, ...props }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);


  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const [location, setLocation] = useState({ latitude: null, longitude: null});

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedBarangay, setSelectedBarangay] = useState(null);

  // State to hold form data
  const [formData, setFormData] = useState({
    mobileNumber: '',
    businessName: '',
    businessType: '',
    businessEmail: '',
    street: '',
  });

    // Handle input changes


   // Handle input changes
   const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "mobileNumber") {
      // Allow only numbers and limit length to 10
      if (!/^\d*$/.test(value)) return; // Block non-numeric input
      if (value.length > 10) return; // Enforce max length
    }

    if (name === "businessEmail") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        businessEmail: value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Please enter a valid email address."
          : "",
      }));
    }
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  

  // Handle location change from Mapbox
  const handleLocationChange = ([longitude, latitude]) => {
    setLocation({ latitude, longitude });
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          formData.mobileNumber.trim() !== "" &&
          formData.businessName.trim() !== "" &&
          formData.businessType.trim() !== "" &&
          formData.businessEmail.trim() !== ""
        );
      case 2:
        return (
          selectedRegion !== null &&
          selectedProvince !== null &&
          selectedCity !== null &&
          selectedBarangay !== null &&
          formData.street.trim() !== ""
        );
      case 3:
        return (
          location.latitude !== null &&
          location.longitude !== null
        );
      default:
        return false;
    }
  };

  const [errors, setErrors] = useState({
    mobileNumber: "",
    businessEmail: "",
  });




  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validate required fields
    if (
      !formData.mobileNumber ||
      !formData.businessName ||
      !formData.businessType ||
      !formData.businessEmail ||
      !selectedRegion ||
      !selectedProvince ||
      !selectedCity ||
      !selectedBarangay ||
      !formData.street
    ) {
      toast.error("All fields are required.", {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      });
      return;
    }
  
    const payload = {
      mobile_number: formData.mobileNumber,
      business_name: formData.businessName,
      business_type: formData.businessType,
      discount: 0,
      status: true,
      business_email: formData.businessEmail,
      latitude: String(location.latitude),
      longitude: String(location.longitude),
    
      contact_number: formData.mobileNumber,
      region: selectedRegion?.name || "",
      province: selectedProvince?.name || "",
      municipality_city: selectedCity?.name || "",
      barangay: selectedBarangay?.name || "",
      street: formData.street,
    };
  
    console.log('Payload:', payload);
  
    try {
      const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
      const BIG_BOSS_ID = import.meta.env.VITE_BIG_BOSS_ID;
      const url = `http://${API_BASE_URL}/v1/merchant/create/${BIG_BOSS_ID}`;
      
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        console.error("Error response:", result);
        toast.error(result.message, {
          icon: <AlertCircle className="w-5 h-5 text-red-500" />,
        });
              // Reset form and redirect to step 1
      setCurrentStep(1); 
      return
      }
  
      toast.success(result.message, {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      });
  
      // Reset form and redirect to step 1
      setCurrentStep(1); 
      setFormData({
        mobileNumber: "",
        businessName: "",
        businessType: "",
        businessEmail: "",
        street: "",
      });
      setSelectedRegion(null);
      setSelectedProvince(null);
      setSelectedCity(null);
      setSelectedBarangay(null);
      setLocation({ latitude: null, longitude: null });
  
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.", {
        icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      });
    }
  };
  

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Merchant Registration</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Please complete the form below to register your business and gain access to our platform.
        </p>
      </div>

      {currentStep === 1 && (
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="mobileNumber">Registered Mobile Number:</Label>
            <Input
              id="mobileNumber"
              name="mobileNumber"
              type="text"
              placeholder="9456656707"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
            />
            {errors.mobileNumber && (
              <p className="text-sm text-red-500">{errors.mobileNumber}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="businessName">Business Name:</Label>
            <Input
              id="businessName"
              name="businessName"
              type="text"
              placeholder="GoSend"
              value={formData.businessName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="businessType">Business Type:</Label>
            <Input
              id="businessType"
              name="businessType"
              type="text"
              placeholder="Sari-Sari Store"
              value={formData.businessType}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="businessEmail">Business Email</Label>
              <Input
                id="businessEmail"
                name="businessEmail"
                type="email"
                placeholder="business@example.com"
                value={formData.businessEmail}
                onChange={handleInputChange}
                required
              />
              {errors.businessEmail && (
                <p className="text-sm text-red-500">{errors.businessEmail}</p>
              )}
          </div>

          
          <Button
            onClick={nextStep}
            className="w-full"
            disabled={!validateStep(currentStep)} // Disable if validation fails
          >
            Next
          </Button>
        </div>
      )}

      {currentStep === 2 && (
        <div className="grid gap-6">
          <LocationForm 
            selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion}
            selectedProvince={selectedProvince} setSelectedProvince={setSelectedProvince}
            selectedCity={selectedCity} setSelectedCity={setSelectedCity}
            selectedBarangay={selectedBarangay} setSelectedBarangay={setSelectedBarangay}
            street={formData.street} setStreet={(value) => setFormData((prev) => ({ ...prev, street: value }))}
          />
          <div className="flex justify-between">
            <Button onClick={prevStep} className="w-full me-2">Back</Button>
            <Button
              onClick={nextStep}
              className="w-full"
              disabled={!validateStep(currentStep)} // Disable if validation fails
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="grid gap-6">
          <div>
            <Mapbox onLocationChange={handleLocationChange} />
          </div>

          <div className="flex justify-between">
            <Button onClick={prevStep} className="w-full me-2">Back</Button>
            <Button type="submit" className="w-full">Submit</Button>
          </div>
        </div>
      )}
    </form>
  );
}