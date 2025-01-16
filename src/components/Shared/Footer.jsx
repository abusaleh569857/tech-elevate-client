import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="md:ml-4">
            <h1 className="text-2xl font-bold">BookHub</h1>
            <p className="text-gray-400 mt-2">
              BookHub allows users to borrow books online. The platform features
              an intuitive interface where you can browse through categories,
              view book details.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:ml-28">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:ml-16">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p>Email: support@bookhub.com</p>
            <p>Phone: +880 1534 587 570</p>
            <p>Address: Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-gray-400">
            Follow us on
            <span className="inline-flex ml-2">
              <a href="#" className="hover:text-gray-400 mx-2">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-gray-400 mx-2">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-gray-400 mx-2">
                <FaInstagram />
              </a>
            </span>
          </p>
          <p className="text-gray-400 mt-2">
            &copy; {new Date().getFullYear()} BookHub. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
