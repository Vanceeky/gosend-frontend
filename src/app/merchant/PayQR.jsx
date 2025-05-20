import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import logo from '@/assets/gosend_logo.png'
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner"


const PayQR = () => {
    const { merchant_id } = useParams();
    const [merchant, setMerchant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [amount, setAmount] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [paymentResponse, setPaymentResponse] = useState(null);
    const [transactionID, setTransactionID] = useState('')
    const [otp, setOtp] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOtpSubmitting, setIsOtpSubmitting] = useState(false);

    useEffect(() => {
        if (merchant_id) {
            fetchMerchantDetails();
        }
    }, [merchant_id]);


    const fetchMerchantDetails = async () => {
        try {
            const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
            const response = await fetch(`http://${API_BASE_URL}/v1/merchant/${merchant_id}`, {
                method: 'GET',
                credentials: "include",
            });
            if (!response.ok) throw new Error('Failed to fetch merchant details');
            const data = await response.json();
            setMerchant(data.data);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
            const response = await fetch(`http://${API_BASE_URL}/v1/merchant/pay-qr/${merchant_id}`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount })
            });
            if (!response.ok) throw new Error('Payment initiation failed');
            const data = await response.json();
            setPaymentResponse(data.data);
            setTransactionID(data.data.Transaction_id); // Use data directly here
    
            setIsDialogOpen(true);
            toast.success("Payment initiated successfully!");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleOtpSubmit = async () => {
        setIsOtpSubmitting(true);
        try {
            const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
            const response = await fetch(`http://${API_BASE_URL}/v1/merchant/process/pay-qr/${merchant_id}`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Transaction_id: transactionID, otp, amount }) // Use transactionID instead of paymentResponse
            });
            if (!response.ok) throw new Error('OTP verification failed');
            
            toast.success('Payment successful!');
            setIsDialogOpen(false);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsOtpSubmitting(false);
        }
    };
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">

                    <Card>
                        <CardHeader>
                            <div className="flex">
                            <Link to="/" className="flex items-center gap-2 self-center font-medium">
                                <img src={logo} alt="Logo" className="h-12 w-12" />
                            </Link>
                            <div className='ml-4'>
                                <CardTitle className="text-2xl">Pay Merchant</CardTitle>
                                <CardDescription>Please enter the amount</CardDescription>
                            </div>
                            </div>



                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label>Business Name</Label>
                                        <Input type="text" value={merchant.business_name} readOnly className="cursor-pointer" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Amount</Label>
                                        <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? 'Processing...' : 'Submit'}
                                    </Button>
                                </div>
                                <div className="mt-4 text-center text-sm">{merchant.member.full_name}</div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Dialog for OTP Confirmation */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enter OTP to Confirm Payment</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p>Transaction ID: {paymentResponse?.Transaction_id}</p>
                    
                        <Input type="hidden" value={paymentResponse?.Transaction_id || ""} readOnly required />

                        <InputOTP value={otp} onChange={(value) => setOtp(value.replace(/\D/g, ""))} maxLength={6}>
                            <InputOTPGroup>
                                {[...Array(6)].map((_, index) => (
                                    <InputOTPSlot key={index} index={index} />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleOtpSubmit} disabled={isOtpSubmitting}>
                            {isOtpSubmitting ? 'Processing...' : 'Confirm Payment'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PayQR;