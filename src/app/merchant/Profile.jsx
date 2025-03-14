import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoaderCircle } from 'lucide-react'  // Import the LoaderCircle icon

const ProfileManagement = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'John Doe',
    mobileNumber: '+1234567890',
    businessName: 'Doe Enterprises',
    businessType: 'Consulting',
    contactNumber: '+1234567890',
    email: 'johndoe@gmail.com',
  })

  const [addressInfo, setAddressInfo] = useState({
    streetName: '5678 Oak Street',
    barangay: 'San Vicente',
    city: 'Makati',
    province: 'Metro Manila',
    region: 'NCR',
    longitude: '77.5946° E',
    latitude: '12.9716° N',
  })

  const [isSaved, setIsSaved] = useState(false)  // State for showing the save notification
  const [loading, setLoading] = useState(false)  // State for showing loader

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }))
  }

  const handleAddressInfoChange = (e) => {
    const { name, value } = e.target
    setAddressInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }))
  }

  const handleSaveChanges = () => {
    setLoading(true);  // Start the loader

    // Simulate an API call or save logic
    setTimeout(() => {
      console.log("Personal info saved:", personalInfo)
      console.log("Address info saved:", addressInfo)

      // Show success message
      setIsSaved(true)
      setLoading(false)  // Stop the loader
      setTimeout(() => {
        setIsSaved(false)  // Hide success message after 2 seconds
      }, 2000)
    }, 2000)  // Simulate API delay
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="shadow-lg p-4 w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Profile Management
          </CardTitle>
        </CardHeader>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Name</Label>
                  <Input
                    name="fullName"
                    value={personalInfo.fullName}
                    onChange={handlePersonalInfoChange}
                    className="w-full text-sm p-2 border rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Mobile Number</Label>
                  <Input
                    name="mobileNumber"
                    value={personalInfo.mobileNumber}
                    onChange={handlePersonalInfoChange}
                    className="w-full text-sm p-2 border rounded-md"
                  />
                </div>

                <div className="space-y-1">
                  <Label>Business Name</Label>
                  <Input
                    name="businessName"
                    value={personalInfo.businessName}
                    onChange={handlePersonalInfoChange}
                    className="w-full text-sm p-2 border rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Business Type</Label>
                  <Input
                    name="businessType"
                    value={personalInfo.businessType}
                    onChange={handlePersonalInfoChange}
                    className="w-full text-sm p-2 border rounded-md"
                  />
                </div>

                <div className="space-y-1">
                  <Label>Contact Number</Label>
                  <Input
                    name="contactNumber"
                    value={personalInfo.contactNumber}
                    onChange={handlePersonalInfoChange}
                    className="w-full text-sm p-2 border rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    className="w-full text-sm p-2 border rounded-md"
                  />
                </div>
              </div>

              {/* Save Changes Button */}
              <Button
                onClick={handleSaveChanges}
                className="w-full text-sm py-2 bg-black text-white hover:bg-gray-800"
                disabled={loading}  // Disable button while loading
              >
                {loading ? (
                  <LoaderCircle className="animate-spin text-white" size={24} />  // Use Lucide LoaderCircle
                ) : (
                  'Save Changes'
                )}
              </Button>

              {/* Notification Text below Save Button */}
              {isSaved && (
                <div className="mt-3 text-black-500 text-center">
                  Changes Saved Successfully!
                </div>
              )}
            </CardContent>
          </TabsContent>

          {/* Address Information */}
          <TabsContent value="address">
            <CardContent className="space-y-4">
              {/* Address Section */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Street Name</Label>
                  <Input
                    name="streetName"
                    value={addressInfo.streetName}
                    onChange={handleAddressInfoChange}
                    className="w-full text-sm p-2 border rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Barangay</Label>
                  <Input
                    name="barangay"
                    value={addressInfo.barangay}
                    onChange={handleAddressInfoChange}
                    className="w-full text-sm p-2 border rounded-md"
                  />
                </div>

                <div className="space-y-1">
                  <Label>City</Label>
                  <Input
                    name="city"
                    value={addressInfo.city}
                    onChange={handleAddressInfoChange}
                    className="w-full text-sm p-2 border rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Province</Label>
                  <Input
                    name="province"
                    value={addressInfo.province}
                    onChange={handleAddressInfoChange}
                    className="w-full text-sm p-2 border rounded-md"
                  />
                </div>

                <div className="space-y-1">
                  <Label>Region</Label>
                  <Input
                    name="region"
                    value={addressInfo.region}
                    onChange={handleAddressInfoChange}
                    className="w-full text-sm p-2 border rounded-md"
                  />
                </div>
              </div>

              {/* Shadcn-style Separator */}
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-2 text-black-500">Coordinates</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Coordinates Section */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Longitude</Label>
                  <Input
                    name="longitude"
                    value={addressInfo.longitude}
                    onChange={handleAddressInfoChange}
                    className="w-full text-sm p-2 border rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Latitude</Label>
                  <Input
                    name="latitude"
                    value={addressInfo.latitude}
                    onChange={handleAddressInfoChange}
                    className="w-full text-sm p-2 border rounded-md"
                  />
                </div>
              </div>

              {/* Save Changes Button */}
              <Button
                onClick={handleSaveChanges}
                className="w-full text-sm py-2 bg-black text-white hover:bg-gray-800"
                disabled={loading}  // Disable button while loading
              >
                {loading ? (
                  <LoaderCircle className="animate-spin text-white" size={24} />  // Use Lucide LoaderCircle
                ) : (
                  'Save Changes'
                )}
              </Button>

              {/* Notification Text below Save Button */}
              {isSaved && (
                <div className="mt-3 text-black-500 text-center">
                  Changes Saved Successfully!
                </div>
              )}
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

export default ProfileManagement
