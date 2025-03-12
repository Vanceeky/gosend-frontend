import React, { useState } from 'react'; 
import { Phone, Mail, MapPin, Facebook } from 'lucide-react';  // Import Facebook icon

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8 px-4">
      <div className="flex flex-col sm:flex-row w-full max-w-6xl bg-white p-8 rounded-lg shadow-xl">
      
        {/* Contact Info */}
        <div className="w-full sm:w-1/2 p-6 bg-orange-500 text-white rounded-lg shadow-lg mr-8 mb-8 sm:mb-0">
          <h2 className="text-3xl font-semibold mb-4">Contact Information</h2>
          <p className="text-lg mb-6">
            Join GoSend, the all-in-one eCommerce platform that empowers you with seamless digital transactions, built-in affiliate marketing, and rewarding experiences. Activate your account today and unlock exclusive features designed to help your business grow!
          </p>

          <div className="space-y-4">
            <div className="flex items-center text-lg">
              <Phone className="mr-3 text-white" />
              <p>Phone: <span className="font-semibold">+63 9391234567</span></p>
            </div>

            <div className="flex items-center text-lg">
              <Mail className="mr-3 text-white" />
              <p>Support Email: <span className="font-semibold">Support@go-send.com</span></p>
            </div>

            <div className="flex items-center text-lg">
              <MapPin className="mr-3 text-white" />
              <p>Location: <span className="font-semibold">Philippines</span></p>
            </div>

            {/* Facebook Button Styled Like Contact Info */}
            <div className="flex items-center text-lg mt-4">
              <Facebook className="mr-3 text-white" />
              <a
                href="https://web.facebook.com/gosendofficial"  // Replace with your actual Facebook link
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full sm:w-1/2 p-6 mt-6 sm:mt-0">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Get In Touch</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder=""
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder=""
                required
              />
            </div>

            {/* Subject Input */}
            <div>
              <label htmlFor="subject" className="block text-lg font-semibold text-gray-700">Your Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder=""
                required
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label htmlFor="message" className="block text-lg font-semibold text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 h-40 resize-none"
                placeholder="Write here your message"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;