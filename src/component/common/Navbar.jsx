import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  Phone,
  Mail,
  ShoppingCart,
  User,
  ChevronDown,
  MessageCircle,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Navbar = ({ toggleMenu, contactData }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const userDropdownRef = useRef(null);
  const megaMenuRef = useRef(null);
  const shopContainerRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const isTouchDeviceRef = useRef(false);

  /* ================= DUMMY MEGA MENU DATA ================= */
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
    featured: {
      title: "FEATURED",
      categories: ["New Arrivals", "Best Sellers", "Trending", "Sale"],
    },
    promotion: {
      title: "PROMOTION",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
      alt: "Summer Collection",
      description: "Summer Collection",
      discount: "Up to 50% OFF",
      buttonText: "Shop Now",
    },
  };

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= DETECT TOUCH DEVICE ================= */
  useEffect(() => {
    const checkTouch = () => {
      isTouchDeviceRef.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    checkTouch();
  }, []);

  /* ================= CLOSE DROPDOWNS ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target)
      ) {
        setUserDropdownOpen(false);
      }

      if (
        isTouchDeviceRef.current &&
        megaMenuRef.current &&
        !megaMenuRef.current.contains(e.target) &&
        shopContainerRef.current &&
        !shopContainerRef.current.contains(e.target)
      ) {
        setMegaMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= CLOSE DROPDOWNS ON ROUTE CHANGE ================= */
  useEffect(() => {
    setUserDropdownOpen(false);
    setMegaMenuOpen(false);
  }, [location.pathname]);

  /* ================= MEGA MENU HOVER HANDLERS ================= */
  const handleMouseEnter = () => {
    if (isTouchDeviceRef.current) return;
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    if (isTouchDeviceRef.current) return;
    
    hoverTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200);
  };

  const handleMegaMenuMouseEnter = () => {
    if (isTouchDeviceRef.current) return;
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleMegaMenuMouseLeave = () => {
    if (isTouchDeviceRef.current) return;
    
    hoverTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200);
  };

  /* ================= SHOP CLICK HANDLER ================= */
  const handleShopClick = (e) => {
    if (isTouchDeviceRef.current) {
      e.preventDefault();
      setMegaMenuOpen(!megaMenuOpen);
    }
  };

  /* ================= NAV LINKS ================= */
  const navLinks = [
    { id: "home", label: "Home", path: "/" },
    { id: "shop", label: "Shop", hasMegaMenu: true },
    { id: "new-arrivals", label: "New Arrivals", path: "/products/new-arrivals" },
    { id: "sale", label: "Sale", path: "/products/sale" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  /* ================= TOP CONTACT LINKS ================= */
  const contactLinks = [
    {
      id: "phone",
      label: contactData?.phone || "+91 98765 43210",
      icon: Phone,
      path: `tel:${contactData?.phone}`,
    },
    {
      id: "email",
      label: contactData?.email || "info@onerepmore.com",
      icon: Mail,
      path: `mailto:${contactData?.email}`,
    },
  ];

  /* ================= CATEGORY CLICK HANDLER ================= */
  const handleCategoryClick = (category) => {
    navigate(`/products/${category.toLowerCase()}`);
    setMegaMenuOpen(false);
  };

  /* ================= USER FUNCTIONS ================= */
  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate("/login");
  };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const cartCount = getTotalItems();

  const handleWhatsAppClick = () => {
    const phoneNumber =
      contactData?.whats_app?.replace(/[^0-9]/g, "") || "919876543210";
    const message = encodeURIComponent(
      "Hi! I'm interested in your products. Can you help me?"
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 font-heading">
      {/* ================= MAIN NAVBAR ================= */}
      <div
        className={`flex justify-between items-center px-6 md:px-10 transition-all duration-300 ${
          scrolled 
            ? "bg-white shadow-md py-1" 
            : "bg-transparent py-3"
        }`}
        style={{
          borderBottom: scrolled ? "1px solid #E5E7EB" : "1px solid transparent",
        }}
      >
        {/* LEFT: LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="relative">
            {contactData?.site_web_logo ? (
              <img
                src="/image/logo.jpeg"
                alt={contactData?.site_name || "One Rep More"}
                className={`h-24 w-auto object-contain rounded transition-all duration-300 ${
                  scrolled ? "bg-white" : "bg-white/90"
                }`}
              />
            ) : (
              <img
                src="/image/gym_logo.png"
                alt="One Rep More"
                className={`h-14 w-14 object-contain rounded-full p-1 transition-all duration-300 ${
                  scrolled ? "bg-white" : "bg-white/90"
                }`}
              />
            )}
          </div>

          
        </div>

        {/* CENTER: NAV LINKS */}
        <nav className="hidden md:flex flex-col items-center gap-2">
          {/* TOP: CONTACT INFO */}
          {/* <div className="flex items-center gap-6 text-xs">
            {contactLinks.map((link) => (
              <a
                key={link.id}
                href={link.path}
                className={`flex items-center gap-2 transition-colors duration-300 ${
                  scrolled 
                    ? "text-[#6B7280] hover:text-[#182E72]" 
                    : "text-white/80 hover:text-white"
                }`}
              >
                <link.icon size={12} className={scrolled ? "text-[#182E72]" : "text-white"} />
                <span>{link.label}</span>
              </a>
            ))}
          </div> */}

          {/* BOTTOM: NAV LINKS - Reduced font size */}
          <div className="flex items-center gap-6">
            {navLinks.map((item) => {
              const active =
                location.pathname === item.path ||
                (item.id === "shop" && location.pathname.startsWith("/products"));

              if (item.id === "shop") {
                return (
                  <div 
                    key={item.id} 
                    ref={shopContainerRef}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={handleShopClick}
                      className={`nav-link flex items-center gap-1 text-base md:text-lg font-semibold tracking-wide transition-all duration-300 px-2 py-1 ${
                        active || megaMenuOpen
                          ? scrolled ? "text-[#182E72] active" : "text-white active"
                          : scrolled 
                            ? "text-[#182E72] hover:text-[#2848A0]" 
                            : "text-white hover:text-white/80"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-all duration-300 ${
                          megaMenuOpen ? "rotate-180" : ""
                        } ${scrolled ? "text-[#6B7280]" : "text-white/70"}`}
                      />
                    </button>

                    {/* FULL-WIDTH MEGA MENU */}
                    <div
                      ref={megaMenuRef}
                      className={`absolute left-0 w-full min-w-[1200px] max-w-[90vw] mt-2 bg-white border-t border-[#E5E7EB] shadow-2xl transition-all duration-300 ease-out origin-top ${
                        megaMenuOpen 
                          ? "opacity-100 scale-y-100 pointer-events-auto" 
                          : "opacity-0 scale-y-95 pointer-events-none"
                      }`}
                      style={{
                        top: "100%",
                        left: "50%",
                        transform: megaMenuOpen 
                          ? "translateX(-50%) scaleY(1)" 
                          : "translateX(-50%) scaleY(0.95)",
                        zIndex: 9999,
                        maxHeight: "80vh",
                        overflowY: "auto",
                        transformOrigin: "top center",
                        width: "1200px",
                      }}
                      onMouseEnter={handleMegaMenuMouseEnter}
                      onMouseLeave={handleMegaMenuMouseLeave}
                    >
                      <div className="px-6 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                          {/* MEN Column */}
                          <div>
                            <h3 className="text-sm font-bold text-[#182E72] uppercase tracking-wider mb-4">
                              {megaMenuData.men.title}
                            </h3>
                            <ul className="space-y-2">
                              {megaMenuData.men.categories.map((cat) => (
                                <li key={cat}>
                                  <button
                                    onClick={() => handleCategoryClick(cat)}
                                    className="text-[#6B7280] hover:text-[#182E72] transition-colors text-left w-full py-1 hover:translate-x-1 transform duration-200"
                                  >
                                    {cat}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* WOMEN Column */}
                          <div>
                            <h3 className="text-sm font-bold text-[#182E72] uppercase tracking-wider mb-4">
                              {megaMenuData.women.title}
                            </h3>
                            <ul className="space-y-2">
                              {megaMenuData.women.categories.map((cat) => (
                                <li key={cat}>
                                  <button
                                    onClick={() => handleCategoryClick(cat)}
                                    className="text-[#6B7280] hover:text-[#182E72] transition-colors text-left w-full py-1 hover:translate-x-1 transform duration-200"
                                  >
                                    {cat}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* KIDS Column */}
                          <div>
                            <h3 className="text-sm font-bold text-[#182E72] uppercase tracking-wider mb-4">
                              {megaMenuData.kids.title}
                            </h3>
                            <ul className="space-y-2">
                              {megaMenuData.kids.categories.map((cat) => (
                                <li key={cat}>
                                  <button
                                    onClick={() => handleCategoryClick(cat)}
                                    className="text-[#6B7280] hover:text-[#182E72] transition-colors text-left w-full py-1 hover:translate-x-1 transform duration-200"
                                  >
                                    {cat}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* FEATURED Column */}
                          <div>
                            <h3 className="text-sm font-bold text-[#182E72] uppercase tracking-wider mb-4">
                              {megaMenuData.featured.title}
                            </h3>
                            <ul className="space-y-2">
                              {megaMenuData.featured.categories.map((cat) => (
                                <li key={cat}>
                                  <button
                                    onClick={() => handleCategoryClick(cat)}
                                    className="text-[#6B7280] hover:text-[#182E72] transition-colors text-left w-full py-1 hover:translate-x-1 transform duration-200"
                                  >
                                    {cat}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* PROMOTION Column */}
                          <div className="bg-[#E9EEFF] rounded-lg p-6 flex flex-col items-center justify-center text-center">
                            <div className="w-full aspect-[4/3] bg-[#182E72]/10 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                              <img
                                src={megaMenuData.promotion.image}
                                alt={megaMenuData.promotion.alt}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h4 className="text-lg font-bold text-[#182E72] mb-1">
                              {megaMenuData.promotion.description}
                            </h4>
                            <p className="text-2xl font-black text-[#DC2626] mb-2">
                              {megaMenuData.promotion.discount}
                            </p>
                            <button
                              onClick={() => {
                                navigate("/products/sale");
                                setMegaMenuOpen(false);
                              }}
                              className="bg-[#182E72] text-white text-sm px-6 py-2 rounded-lg hover:bg-[#2848A0] transition-all duration-300 hover:shadow-lg hover:scale-105"
                            >
                              {megaMenuData.promotion.buttonText}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`nav-link relative tracking-wide transition-all duration-300 text-base md:text-lg ${
                    active 
                      ? scrolled ? "text-[#182E72] active" : "text-white active"
                      : scrolled 
                        ? "text-[#182E72] hover:text-[#2848A0]" 
                        : "text-white hover:text-white/80"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* RIGHT: ICONS */}
        <div className="flex items-center gap-5">
          {/* CART */}
          <button
            onClick={() => navigate("/cart")}
            className="relative transition-all duration-300 hover:scale-110"
            aria-label="Cart"
          >
            <ShoppingCart size={22} className={`transition-colors duration-300 ${
              scrolled ? "text-[#182E72]" : "text-white"
            }`} />
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center text-white bg-[#182E72]"
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* USER */}
          {isAuthenticated ? (
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 hover-lift"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white transition-all duration-300 ${
                  scrolled ? "bg-[#182E72]" : "bg-white/20 backdrop-blur-sm"
                }`}>
                  {getInitials(user?.name)}
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-all duration-300 ${
                    userDropdownOpen ? "rotate-180" : ""
                  } ${scrolled ? "text-[#6B7280]" : "text-white/70"}`}
                />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-3 w-60 rounded-lg shadow-xl bg-white border border-[#E5E7EB]"
                  style={{ zIndex: 100 }}
                >
                  <div className="p-4 border-b border-[#E5E7EB]">
                    <p className="font-medium text-[#182E72]">{user?.name}</p>
                    <p className="text-xs text-[#6B7280]">{user?.email}</p>
                  </div>

                  <div className="py-2">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[#F8FAFC] text-[#111827] transition"
                    >
                      <User size={16} className="text-[#6B7280]" /> Profile
                    </button>

                    <button
                      onClick={() => {
                        navigate("/orders");
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[#F8FAFC] text-[#111827] transition"
                    >
                      <ShoppingCart size={16} className="text-[#6B7280]" /> My Orders
                    </button>

                    <div className="my-2 mx-4 h-px bg-[#E5E7EB]" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[#F8FAFC] transition text-[#DC2626]"
                    >
                      <X size={16} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className={`px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                scrolled 
                  ? "bg-[#182E72] hover:bg-[#2848A0]" 
                  : "bg-white/20 backdrop-blur-sm hover:bg-white/30"
              }`}
            >
              Login
            </button>
          )}

          {/* MOBILE MENU */}
          <button className="md:hidden transition-all duration-300 hover:scale-110" onClick={toggleMenu} aria-label="Menu">
            <Menu size={28} className={scrolled ? "text-[#182E72]" : "text-white"} />
          </button>
        </div>
      </div>

      {/* CSS ANIMATION */}
      <style jsx>{`
        /* Poppins Font for all navbar text */
        .font-heading {
          font-family: 'Poppins', sans-serif;
        }

        /* Smooth transition for mega menu */
        .duration-250 {
          transition-duration: 250ms;
        }
        
        .ease-out {
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #F1F5F9;
          border-radius: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #182E72;
          border-radius: 4px;
        }

        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: #182E72 #F1F5F9;
        }

        /* Hover effect for nav links - White underline on transparent background */
        .nav-link {
          position: relative;
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: ${scrolled ? '#182E72' : '#FFFFFF'};
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link.active::after {
          width: 100%;
          background: ${scrolled ? '#182E72' : '#FFFFFF'};
        }

        /* Ensure mega menu doesn't get clipped */
        .relative {
          overflow: visible !important;
        }

        /* Mega menu links with Poppins */
        .mega-link {
          font-family: 'Poppins', sans-serif;
        }

        /* Responsive adjustments */
        @media (max-width: 1280px) {
          .min-w-\\[1200px\\] {
            min-width: 90vw !important;
          }
        }

        /* Desktop nav link size */
        @media (min-width: 768px) {
          .nav-link {
            font-size: 0.95rem;
          }
        }

        /* Large screens */
        @media (min-width: 1024px) {
          .nav-link {
            font-size: 1rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;