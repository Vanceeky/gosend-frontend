import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LocationForm from "@/components/Location.jsx";
import { AlertTriangle, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function RegForm({ setAlert, className, ...props }) {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedBarangay, setSelectedBarangay] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    suffix: "",
    mobileNumber: "",
    email: "",
    street: "",
    house_number: "",
  });


  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          formData.firstName.trim() !== "" &&
          formData.lastName.trim() !== "" &&
          formData.middleName.trim() !== "" &&
          (formData.suffix?.trim() || true) && // Suffix is optional
          formData.mobileNumber.trim() !== "" &&
          formData.email.trim() !== ""
        );
      case 2:
        return (
          selectedRegion !== null &&
          selectedProvince !== null &&
          selectedCity !== null &&
          selectedBarangay !== null &&
          formData.street.trim() !== ""
        );

      default:
        return false;
    }
  };
  



  // Mobile Number Validation: Only numbers and max 10 digits
  const handleMobileChange = (e) => {
    const { value } = e.target;
    const formattedValue = value.replace(/[^0-9]/g, "").slice(0, 10); // Only numbers and max length of 10
    setFormData((prevData) => ({
      ...prevData,
      mobileNumber: formattedValue,
    }));
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    const payload = {

      mobile_number: formData.mobileNumber,
      
      details: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        middle_name: formData.middleName,
        suffix_name: formData.suffix,
      },
      address: {
        region: selectedRegion?.name || "",
        province: selectedProvince?.name || "",
        city: selectedCity?.name || "",
        barangay: selectedBarangay?.name || "",
        house_number: formData.house_number || "0",
        street_name: formData.street,
      },
    };

  
    console.log('Payload:', payload);
  
    try {
      const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
      const BIG_BOSS_ID = import.meta.env.VITE_BIG_BOSS_ID;
      const url = `http://${API_BASE_URL}/v1/member/create/${BIG_BOSS_ID}`;
      
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
      console.log("API Response",result)
  
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
  
      // Redirect to the KYC success URL if available
      if (result.data?.kyc_response?.success) {
        window.location.href = result.data.kyc_response.success;
      } else {
        setCurrentStep(1); // Fallback to resetting the form if no URL is found
      }
 
  
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.", {
        icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Member Registration</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Please complete the form below to register your business and gain access to our platform.
        </p>
      </div>

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <div className="grid gap-6">
          {/* Personal Info */}
          <div className="flex gap-6">
            <div className="flex-1 min-w-[180px]">
              <Label htmlFor="firstName">First Name:</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex-1 min-w-[180px]">
              <Label htmlFor="lastName">Last Name:</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-1 min-w-[180px]">
              <Label htmlFor="middleName">Middle Name: (Optional)</Label>
              <Input
                id="middleName"
                name="middleName"
                type="text"
                placeholder="Dope"
                value={formData.middleName}
                onChange={handleInputChange}
                
              />
            </div>

            <div className="flex-6 min-w-[180px]">
              <Label htmlFor="suffix">Suffix (Optional):</Label>
              <Input
                id="suffix"
                name="suffix"
                type="text"
                placeholder="Jr."
                value={formData.suffix}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div className="grid gap-2">
            <Label htmlFor="mobileNumber">Mobile Number:</Label>
            <Input
              id="mobileNumber"
              name="mobileNumber"
              type="text"
              placeholder="9456656707"
              value={formData.mobileNumber}
              onChange={handleMobileChange} // Updated handler
              maxLength={10} // Limit to 10 characters
              required
            />
          </div>

          {/* Business Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email:</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="business@example.com"
              value={formData.email}
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
                  
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      )}

    </form>
  );
}