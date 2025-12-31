'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Dumbbell, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Send 
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Classes', href: '/classes' },
    { label: 'Trainers', href: '/trainers' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
  ];

  const services = [
    'Personal Training',
    'Group Classes',
    'Nutrition Planning',
    'Yoga & Meditation',
    'Strength Training',
    'Recovery Therapy',
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: 'https://facebook.com/ironpeakfitness', label: 'Facebook' },
    { icon: <Instagram className="h-5 w-5" />, href: 'https://instagram.com/ironpeakfitness', label: 'Instagram' },
    { icon: <Twitter className="h-5 w-5" />, href: 'https://twitter.com/ironpeakfitness', label: 'Twitter' },
    { icon: <Youtube className="h-5 w-5" />, href: 'https://youtube.com/ironpeakfitness', label: 'YouTube' },
  ];

  const contactInfo = [
    { icon: <Phone className="h-5 w-5" />, text: '+1 (555) 123-4567' },
    { icon: <Mail className="h-5 w-5" />, text: 'info@ironpeakfitness.com' },
    { icon: <MapPin className="h-5 w-5" />, text: '123 Fitness Street, New York, NY 10001' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Dumbbell className="h-8 w-8 text-red-500" />
              <span className="text-2xl font-bold">
                IronPeak<span className="text-red-500">Fitness</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Transforming lives through fitness since 2018. Join our community 
              and achieve your health goals with state-of-the-art facilities 
              and expert guidance.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-red-600 rounded-full transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-red-400 transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-400 transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for fitness tips, class updates, and exclusive offers.
            </p>
            
            <form className="mb-8">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-red-600 to-orange-500 px-4 py-3 rounded-r-lg hover:opacity-90 transition-opacity"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    {info.icon}
                  </div>
                  <span className="text-gray-300">{info.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} IronPeak Fitness. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;