import React, { useState } from 'react'; 

import { Phone, Mail, MapPin, Facebook, ChevronDown } from 'lucide-react'; 
import * as Collapsible from '@radix-ui/react-collapsible'; 


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [messageStatus, setMessageStatus] = useState(null);

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

    // Simulate a successful form submission
    setMessageStatus('success');
    setTimeout(() => setMessageStatus(null), 3000);
  };

  return (
    <>
      {/* Contact Us Heading and Description */}
      <div className="bg-orange-500 py-16 w-full">
        <div className="w-full px-12 text-center text-white max-w-7xl mx-auto">
          <h1 className="text-4xl font-semibold mb-4">Contact Us</h1>
          <p className="text-lg mb-4">
            Have questions or need assistance? Explore this ‘Contact Us’ page to reach out to our dedicated support team. 
            Whether you’re seeking technical support, have queries about our services, or want to provide feedback, we’re here to help. 
            We value your input and are committed to providing you with the best possible experience with our financial technology solutions.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex justify-center items-center bg-white py-8 px-4 w-full">
        <div className="flex flex-col sm:flex-row w-full max-w-7xl mx-auto bg-white p-8">
          
          {/* Contact Info (Orange Background) */}
          <div className="w-full sm:w-1/2 p-6 bg-orange-500 text-white sm:mr-8 mb-0 rounded-lg">
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
                <p>Location: <span className="font-semibold">Unit 425 Cityland Shaw Tower, Mandaluyong</span></p>
              </div>

              {/* Facebook Button Styled Like Contact Info */}
              <div className="flex items-center text-lg mt-4">
                <Facebook className="mr-3 text-white" />
                <a
                  href="https://web.facebook.com/gosendofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Get In Touch Form Section */}
          <div className="w-full sm:w-1/2 p-6 mt-0 rounded-none">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Get In Touch</h1>

            {/* Feedback Messages */}
            {messageStatus === 'success' && (
              <div className="text-green-500 mb-4">Thank you for reaching out! We’ll get back to you shortly.</div>
            )}
            {messageStatus === 'error' && (
              <div className="text-red-500 mb-4">Oops! Something went wrong. Please try again.</div>
            )}

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
                  placeholder="Your Name"
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
                  placeholder="Your Email"
                  required
                />
              </div>

              {/* Subject Dropdown */}
              <div>
                <label htmlFor="subject" className="block text-lg font-semibold text-gray-700">Your Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select a Subject</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Billing and Payment Issues">Billing and Payment Issues</option>
                  <option value="Others">Others</option>
                </select>
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
                  placeholder="Write your message here"
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

      {/* FAQ Section with White Background */}
      <div className="bg-white py-12 w-full">
        <div className="w-full px-6 text-center max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>

          {/* Collapsible FAQ Items */}
          <div className="space-y-6">
            <Collapsible.Root className="w-full">
              <Collapsible.Trigger 
                className="text-xl font-semibold w-full text-left cursor-pointer px-4 py-3 border-b-2 border-gray-300 hover:bg-gray-300 focus:outline-none transition-all duration-300 ease-in-out text-gray-800 flex justify-between items-center"
              >
                How can I contact customer support?
                <ChevronDown className="text-gray-800 transition-transform duration-300 ease-in-out transform" />
              </Collapsible.Trigger>
              <Collapsible.Content>
                <p className="mt-2 text-gray-700 px-4 py-3 border-b-2 border-gray-300">
                  You can reach our customer support team by filling out the form above, or by emailing us directly at support@go-send.com.
                </p>
              </Collapsible.Content>
            </Collapsible.Root>

            <Collapsible.Root className="w-full">
              <Collapsible.Trigger 
                className="text-xl font-semibold w-full text-left cursor-pointer px-4 py-3 border-b-2 border-gray-300 hover:bg-gray-300 focus:outline-none transition-all duration-300 ease-in-out text-gray-800 flex justify-between items-center"
              >
                What services do you offer?
                <ChevronDown className="text-gray-800 transition-transform duration-300 ease-in-out transform" />
              </Collapsible.Trigger>
              <Collapsible.Content>
                <p className="mt-2 text-gray-700 px-4 py-3 border-b-2 border-gray-300">
                  We provide eCommerce solutions, digital transactions, affiliate marketing, and business growth tools. Get in touch for more info!
                </p>
              </Collapsible.Content>
            </Collapsible.Root>

            <Collapsible.Root className="w-full">
              <Collapsible.Trigger 
                className="text-xl font-semibold w-full text-left cursor-pointer px-4 py-3 border-b-2 border-gray-300 hover:bg-gray-300 focus:outline-none transition-all duration-300 ease-in-out text-gray-800 flex justify-between items-center"
              >
                Where is your office located?
                <ChevronDown className="text-gray-800 transition-transform duration-300 ease-in-out transform" />
              </Collapsible.Trigger>
              <Collapsible.Content>
                <p className="mt-2 text-gray-700 px-4 py-3 border-b-2 border-gray-300">
                  Our office is located at <strong>Unit 425 Cityland Shaw Tower, Mandaluyong</strong>.
                </p>
              </Collapsible.Content>
            </Collapsible.Root>

            <Collapsible.Root className="w-full">
              <Collapsible.Trigger 
                className="text-xl font-semibold w-full text-left cursor-pointer px-4 py-3 border-b-2 border-gray-300 hover:bg-gray-300 focus:outline-none transition-all duration-300 ease-in-out text-gray-800 flex justify-between items-center"
              >
                What are your business hours?
                <ChevronDown className="text-gray-800 transition-transform duration-300 ease-in-out transform" />
              </Collapsible.Trigger>
              <Collapsible.Content>
                <p className="mt-2 text-gray-700 px-4 py-3 border-b-2 border-gray-300">
                  Our business hours are from 9 AM to 5 PM, Monday to Friday. We are closed on weekends and public holidays.
                </p>
              </Collapsible.Content>
            </Collapsible.Root>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;