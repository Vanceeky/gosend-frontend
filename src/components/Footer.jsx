import { Link } from "react-router-dom";

export function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">
                We are a leading e-wallet provider, making transactions simple and secure.
              </p>
            </div>
  
            {/* Column 2 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link to="/features" className="text-gray-400 hover:text-white">Features</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
  
            {/* Column 3 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">Email: support@ewallet.com</p>
              <p className="text-gray-400">Phone: +123 456 7890</p>
            </div>
  
            {/* Column 4 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <Link to="#" className="text-gray-400 hover:text-white">Facebook</Link>
                <Link to="#" className="text-gray-400 hover:text-white">Twitter</Link>
                <Link to="#" className="text-gray-400 hover:text-white">Instagram</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }