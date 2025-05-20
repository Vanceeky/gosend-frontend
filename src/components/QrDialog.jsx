import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
  import { QrCode } from 'lucide-react'; // Make sure to import the QrCode icon

const QrDialog = ({user, open, onClose, qrCodeUrl}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>
          <h3 className="text-lg font-bold text-center">
            My QR
          </h3>
        </DialogTitle>

        <Tabs defaultValue="qrph" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="qrph">QrPH</TabsTrigger>
        <TabsTrigger value="topwallet">TOPWALLET</TabsTrigger>
      </TabsList>
      <TabsContent value="qrph">
        {/* Display QR Code */}
        {qrCodeUrl ? (
            <div className="flex flex-col items-center">
                <img 
                    src={qrCodeUrl} 
                    alt="User QR Code" 
                    width={200} 
                    height={200} 
                    className="mx-auto"
                />
                <p className="mt-2 text-sm text-gray-500">
                    Scan this QR code to receive payments
                </p>
            </div>
        ) : (
            <div className="text-center py-4">
                <p>Loading QR code...</p>
            </div>
        )}
      </TabsContent>
      <TabsContent value="topwallet">

      </TabsContent>
    </Tabs>


      </DialogContent>
    </Dialog>
  )
}

export default QrDialog
