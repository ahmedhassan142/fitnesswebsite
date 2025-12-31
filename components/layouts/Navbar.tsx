"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Dumbbell } from 'lucide-react';
import JoinModal from '@/components/modals/JoinModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Classes', href: '/classes' },
    // { label: 'Trainers', href: '/Trainers' },
    // { label: 'Pricing', href: '/Pricing' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold text-gray-900">
                IronPeak<span className="text-red-600">Fitness</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Join Now Button */}
              <button 
                onClick={() => setShowJoinForm(true)}
                className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Join Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden mt-4 pb-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-red-600"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Join Now Button */}
              <button 
                onClick={() => {
                  setShowJoinForm(true);
                  setIsOpen(false);
                }}
                className="w-full mt-4 bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Join Now
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Join Modal */}
      {showJoinForm && (
        <JoinModal onClose={() => setShowJoinForm(false)} />
      )}
    </>
  );
};

export default Navbar;