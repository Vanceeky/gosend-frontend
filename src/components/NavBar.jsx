import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from '@/assets/gosend_logo.png';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="GoSend Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold text-orange-600">GoSend</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            <Link to="/about-us" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition">
              About
            </Link>

            <Link to="/features" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition">

              Features
            </Link>
            <Link to="/contact-us" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition">
              Contact
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-orange-500 hover:bg-orange-600 transition">
              <Link to="/signup">Become a Member!</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/50 z-50">
          <div className="bg-white w-11/12 max-w-xs p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4">
            <Link to="/about-us" className="text-lg font-medium text-gray-700 hover:text-orange-500 transition" onClick={closeMobileMenu}>
              About
            </Link>

            <Link to="/services" className="text-lg font-medium text-gray-700 hover:text-orange-500 transition" onClick={closeMobileMenu}>
              Services

            </Link>
            <Link to="/contact-us" className="text-lg font-medium text-gray-700 hover:text-orange-500 transition" onClick={closeMobileMenu}>
              Contact
            </Link>
            <Button variant="outline" asChild className="w-full">
              <Link to="/login" onClick={closeMobileMenu}>Login</Link>
            </Button>
            <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 transition">
              <Link to="/signup" onClick={closeMobileMenu}>Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
