import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from '@/assets/gosend_logo.png';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="GoSendIt Logo" className="h-8 w-8" />
            <span className="text-lg font-semibold text-orange-600">GoSend</span>
          </Link>

          {/* Centered Desktop Links */}
          <div className="hidden md:flex flex-1 justify-center space-x-6">
            <Link to="/about-us" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link to="/services" className="text-sm font-medium hover:text-primary">
              Services
            </Link>
            <Link to="/contact-us" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-orange-500">
              <Link to="/signup">Become a Member</Link>
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-40" onClick={closeMobileMenu}>
          <div className="bg-background w-full max-w-xs p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4 z-50">
            <Link to="/about" className="text-sm font-medium hover:text-primary" onClick={closeMobileMenu}>
              About
            </Link>
            <Link to="/services" className="text-sm font-medium hover:text-primary" onClick={closeMobileMenu}>
              Services
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary" onClick={closeMobileMenu}>
              Contact
            </Link>
            <Button variant="outline" asChild className="w-full">
              <Link to="/login" onClick={closeMobileMenu}>Login</Link>
            </Button>
            <Button asChild className="w-full">
              <Link to="/signup" onClick={closeMobileMenu}>Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}