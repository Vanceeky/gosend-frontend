import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCard = ({ bufferData }) => {
  const [qrData, setQrData] = useState("");

  useEffect(() => {
    if (bufferData) {
      // Convert Buffer/Uint8Array to Base64 (reduces size)
      const base64Data = btoa(
        String.fromCharCode.apply(null, new Uint8Array(bufferData))
      );
      setQrData(base64Data);
    }
  }, [bufferData]);

  return (
    <div className="max-w-xs p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">QR Code</h2>
      <div className="p-2 border border-gray-200 rounded flex justify-center">
        <QRCodeCanvas
          value={qrData}
          size={256} // Larger size for more data
          level="H" // Highest error correction
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>
      <p className="mt-2 text-xs text-gray-500 break-all">
        {qrData.slice(0, 50)}... // Preview first 50 chars
      </p>
    </div>
  );
};

export default QRCard;