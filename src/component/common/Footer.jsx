import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Shield,
  CreditCard,
  Truck,
  Linkedin,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = ({ contactData }) => {
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

  // Nav Links - Same as Navbar
  const navLinks = [
    { id: "home", label: "Home", path: "/" },
    { id: "shop", label: "Shop", path: "/shop" },
    { id: "new-arrivals", label: "New Arrivals", path: "/products/new-arrivals" },
    { id: "sale", label: "Sale", path: "/products/sale" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  // Mega Menu Categories - Same as Navbar
  const megaMenuData = {
    men: {
      title: "MEN",
      categories: [
        "T-Shirts",
        "Shirts",
        "Jeans",
        "Pants",
        "Shorts",
        "Hoodies",
        "Jackets",
        "Blazers",
        "Ethnic Wear",
        "Innerwear",
        "Accessories",
      ],
    },
    women: {
      title: "WOMEN",
      categories: [
        "Dresses",
        "Tops",
        "T-Shirts",
        "Jeans",
        "Pants",
        "Skirts",
        "Kurtis",
        "Sarees",
        "Hoodies",
        "Jackets",
        "Accessories",
      ],
    },
    kids: {
      title: "KIDS",
      categories: ["Boys", "Girls", "Baby"],
    },
  };

  // Social Links
  const socialLinks = [
    {
      icon: Facebook,
      url: contactData?.facebook || "https://facebook.com",
      label: "Facebook",
      active: !!contactData?.facebook,
    },
    {
      icon: Twitter,
      url: contactData?.twitter || "https://twitter.com",
      label: "Twitter",
      active: !!contactData?.twitter,
    },
    {
      icon: Instagram,
      url: contactData?.instagram || "https://instagram.com",
      label: "Instagram",
      active: !!contactData?.instagram,
    },
    {
      icon: Linkedin,
      url: contactData?.linkedin || "https://linkedin.com",
      label: "LinkedIn",
      active: !!contactData?.linkedin,
    },
    { icon: Youtube, url: "#", label: "YouTube", active: false },
  ].filter((social) => social.active);

  // Contact Info - Updated with your details
  const contactInfo = [
    {
      icon: Phone,
      text: "+91 7699367737 / 7980971636",
      url: "tel:+917699367737",
    },
    {
      icon: Mail,
      text: contactData?.email || "support@apsara.com",
      url: `mailto:${contactData?.email || "support@apsara.com"}`,
    },
    {
      icon: MapPin,
      text: "Habra NRC Road, Dhanar Chatal, Jadssore Road, North 24 Parganas",
      url: "#",
    },
  ];

  const trustBadges = [
    { icon: Shield, text: "Secure Payment" },
    { icon: CreditCard, text: "SSL Certified" },
    { icon: Truck, text: "Free Shipping" },
  ];

  return (
    <>
      {/* Red Horizontal Line before Footer */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#182E72] to-transparent opacity-80" />

      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#FFFFFF] text-[#111827] relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Footer Content - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Column 1 - Brand & Contact Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                {/* Logo Section */}
                <div className="flex flex-col items-start gap-3 mb-4">
                  <div className="w-28 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#FAFAFA] border border-[#E5E7EB] p-2">
                    <img
                      src="/image/logo.png"
                      alt="APSARA Logo"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23D19701'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.3em'%3EAPSARA%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-[#D19701]">
                      APSARA
                    </h2>
                    <p className="text-sm text-[#666666] italic tracking-wide">
                      Luxury Women's Fashion
                    </p>
                  </div>
                </div>

                {/* Address Details - Added after logo */}
                <div className="mt-4 p-4 bg-[#FDFBD4] rounded-xl border border-[#EFE7C8]">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-[#D19701] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-[#111111] font-medium">Our Address</p>
                      <p className="text-xs text-[#666666] leading-relaxed">
                        Habra NRC Road, Dhanar Chatal, Jadssore Road,<br />
                        North 24 Parganas, Po+Ps: Habra, Pin: 743263
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 mt-2 pt-2 border-t border-[#EFE7C8]">
                    <Phone size={18} className="text-[#D19701] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-[#111111] font-medium">Contact</p>
                      <p className="text-xs text-[#666666]">
                        +91 7699367737 / 7980971636
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Information */}
              <div className="space-y-3 mb-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.url}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-start gap-3 text-[#6B7280] hover:text-[#D19701] transition-colors duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FAFAFA] border border-[#EFE7C8] flex items-center justify-center group-hover:bg-[#FDFBD4] group-hover:border-[#D19701] transition-colors flex-shrink-0">
                      <info.icon
                        size={16}
                        className="text-[#6B7280] group-hover:text-[#D19701] transition-colors"
                      />
                    </div>
                    <span className="text-sm break-all">{info.text}</span>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div>
                  <h3 className="text-sm font-heading font-semibold mb-3 text-[#111111] uppercase tracking-wider">
                    Follow Us
                  </h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 260 }}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="w-9 h-9 rounded-lg bg-[#FAFAFA] border border-[#EFE7C8] flex items-center justify-center hover:bg-[#D19701] hover:border-[#D19701] transition-all duration-200"
                      >
                        <social.icon
                          size={18}
                          className="text-[#6B7280] hover:text-white transition-colors"
                        />
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Column 2 - Quick Links (Nav Links) */}
            <div>
              <h3 className="text-sm font-heading font-semibold mb-4 text-[#111111] uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a
                      href={link.path}
                      className="text-[#666666] hover:text-[#D19701] transition-all duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D19701] opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Shop Categories (MEN) */}
            <div>
              <h3 className="text-sm font-heading font-semibold mb-4 text-[#111111] uppercase tracking-wider">
                {megaMenuData.men.title}
              </h3>
              <ul className="space-y-2.5">
                {megaMenuData.men.categories.slice(0, 8).map((cat, index) => (
                  <motion.li
                    key={cat}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a
                      href={`/products?category=${cat.toLowerCase()}`}
                      className="text-[#666666] hover:text-[#D19701] transition-all duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D19701] opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
                      {cat}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Women & Kids */}
            <div>
              <div className="mb-6">
                <h3 className="text-sm font-heading font-semibold mb-4 text-[#111111] uppercase tracking-wider">
                  {megaMenuData.women.title}
                </h3>
                <ul className="space-y-2.5">
                  {megaMenuData.women.categories.slice(0, 6).map((cat, index) => (
                    <motion.li
                      key={cat}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <a
                        href={`/products?category=${cat.toLowerCase()}`}
                        className="text-[#666666] hover:text-[#D19701] transition-all duration-200 flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D19701] opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
                        {cat}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-heading font-semibold mb-4 text-[#111111] uppercase tracking-wider">
                  {megaMenuData.kids.title}
                </h3>
                <ul className="space-y-2.5">
                  {megaMenuData.kids.categories.map((cat, index) => (
                    <motion.li
                      key={cat}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <a
                        href={`/products?category=${cat.toLowerCase()}`}
                        className="text-[#666666] hover:text-[#D19701] transition-all duration-200 flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D19701] opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
                        {cat}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Trust Badges - Gold Theme */}
          <div className="mt-10 pt-6 border-t border-[#EFE7C8]">
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-[#666666]"
                >
                  <badge.icon size={18} className="text-[#D19701]" />
                  <span>{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 pt-6 border-t border-[#EFE7C8]"
          >
            {/* Copyright & Links */}
            <div className="flex flex-col items-center gap-3 text-sm">
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="/privacy"
                  className="text-sm text-[#666666] hover:text-[#D19701] transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="text-sm text-[#666666] hover:text-[#D19701] transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="/sitemap"
                  className="text-sm text-[#666666] hover:text-[#D19701] transition-colors"
                >
                  Sitemap
                </a>
              </div>
              <p className="text-sm text-[#666666] text-center">
                © {new Date().getFullYear()}{" "}
                <span className="text-[#D19701] font-heading font-semibold">
                  APSARA
                </span>
                . All rights reserved.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;