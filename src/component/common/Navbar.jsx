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
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* ================= MAIN NAVBAR ================= */}
      <div
        className="flex justify-between items-center transition-all duration-300"
        style={{
          background: 'black',
          height: '88px',
          padding: '0 60px',
          // borderBottom: '1px solid #EFE7C8',
          boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
        }}
      >
        {/* LEFT: LOGO */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="relative">
            {contactData?.site_web_logo ? (
              <img
                src="/image/logo2.jpeg"
                alt={contactData?.site_name || "One Rep More"}
                className="h-20 w-auto object-contain rounded transition-all duration-300"
              />
            ) : (
              <img
                src="/image/gym_logo.png"
                alt="One Rep More"
                className="h-14 w-14 object-contain rounded-full p-1 transition-all duration-300"
              />
            )}
          </div>
        </div>

        {/* CENTER: NAV LINKS */}
        <nav className="hidden md:flex flex-col items-center gap-2">
          {/* BOTTOM: NAV LINKS */}
          <div className="flex items-center gap-8">
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
                      className={`nav-link flex items-center gap-1 transition-all duration-300 px-2 py-1 ${
                        active || megaMenuOpen
                          ? 'active'
                          : ''
                      }`}
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 500,
                        letterSpacing: '1px',
                        fontSize: '15px',
                        color: (active || megaMenuOpen) ? '#D19701' : '#ffff',
                      }}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-all duration-300 ${
                          megaMenuOpen ? "rotate-180" : ""
                        }`}
                        style={{ color: (active || megaMenuOpen) ? '#D19701' : '#666666' }}
                      />
                    </button>

                    {/* FULL-WIDTH MEGA MENU */}
                    <div
                      ref={megaMenuRef}
                      className={`absolute left-0 transition-all duration-300 ease-out origin-top ${
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
                        background: '#FFFFFF',
                        border: '1px solid #EFE7C8',
                        borderRadius: '20px',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.08)',
                        padding: '40px',
                        marginTop: '12px',
                      }}
                      onMouseEnter={handleMegaMenuMouseEnter}
                      onMouseLeave={handleMegaMenuMouseLeave}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {/* MEN Column */}
                        <div>
                          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#111111' }}>
                            {megaMenuData.men.title}
                          </h3>
                          <ul className="space-y-2">
                            {megaMenuData.men.categories.map((cat) => (
                              <li key={cat}>
                                <button
                                  onClick={() => handleCategoryClick(cat)}
                                  className="mega-link transition-all duration-300 text-left w-full"
                                  style={{
                                    color: '#666666',
                                    fontSize: '0.875rem',
                                    padding: '4px 0',
                                    fontFamily: "'Inter', sans-serif",
                                  }}
                                >
                                  {cat}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* WOMEN Column */}
                        <div>
                          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#111111' }}>
                            {megaMenuData.women.title}
                          </h3>
                          <ul className="space-y-2">
                            {megaMenuData.women.categories.map((cat) => (
                              <li key={cat}>
                                <button
                                  onClick={() => handleCategoryClick(cat)}
                                  className="mega-link transition-all duration-300 text-left w-full"
                                  style={{
                                    color: '#666666',
                                    fontSize: '0.875rem',
                                    padding: '4px 0',
                                    fontFamily: "'Inter', sans-serif",
                                  }}
                                >
                                  {cat}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* KIDS Column */}
                        <div>
                          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#111111' }}>
                            {megaMenuData.kids.title}
                          </h3>
                          <ul className="space-y-2">
                            {megaMenuData.kids.categories.map((cat) => (
                              <li key={cat}>
                                <button
                                  onClick={() => handleCategoryClick(cat)}
                                  className="mega-link transition-all duration-300 text-left w-full"
                                  style={{
                                    color: '#666666',
                                    fontSize: '0.875rem',
                                    padding: '4px 0',
                                    fontFamily: "'Inter', sans-serif",
                                  }}
                                >
                                  {cat}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* FEATURED Column */}
                        <div>
                          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#111111' }}>
                            {megaMenuData.featured.title}
                          </h3>
                          <ul className="space-y-2">
                            {megaMenuData.featured.categories.map((cat) => (
                              <li key={cat}>
                                <button
                                  onClick={() => handleCategoryClick(cat)}
                                  className="mega-link transition-all duration-300 text-left w-full"
                                  style={{
                                    color: '#666666',
                                    fontSize: '0.875rem',
                                    padding: '4px 0',
                                    fontFamily: "'Inter', sans-serif",
                                  }}
                                >
                                  {cat}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* PROMOTION Column */}
                        <div className="rounded-lg p-6 flex flex-col items-center justify-center text-center" style={{ background: '#FDFBD4', borderRadius: '18px' }}>
                          <div className="w-full aspect-[4/3] rounded-lg flex items-center justify-center mb-4 overflow-hidden" style={{ background: '#FDFBD4' }}>
                            <img
                              src={megaMenuData.promotion.image}
                              alt={megaMenuData.promotion.alt}
                              className="w-full h-full object-cover"
                              style={{ borderRadius: '12px' }}
                            />
                          </div>
                          <h4 className="text-lg font-bold mb-1" style={{ color: '#111111' }}>
                            {megaMenuData.promotion.description}
                          </h4>
                          <p className="text-2xl font-black mb-2" style={{ color: '#D19701' }}>
                            {megaMenuData.promotion.discount}
                          </p>
                          <button
                            onClick={() => {
                              navigate("/products/sale");
                              setMegaMenuOpen(false);
                            }}
                            className="text-sm px-6 py-3 transition-all duration-300 hover:scale-105"
                            style={{
                              background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                              color: '#5A3A00',
                              borderRadius: '14px',
                              border: '1px solid #C38A00',
                              boxShadow: '0 10px 25px rgba(209,151,1,0.35)',
                              fontWeight: 500,
                              fontFamily: "'Inter', sans-serif",
                            }}
                          >
                            {megaMenuData.promotion.buttonText}
                          </button>
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
                  className={`nav-link relative transition-all duration-300 ${
                    active ? 'active' : ''
                  }`}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    letterSpacing: '1px',
                    fontSize: '15px',
                    color: active ? '#D19701' : '#fff',
                    padding: '8px 0',
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* RIGHT: ICONS */}
        <div className="flex items-center gap-6">
          {/* CART */}
          <button
            onClick={() => navigate("/cart")}
            className="relative transition-all duration-300 hover:scale-110"
            aria-label="Cart"
          >
            <ShoppingCart size={22} className="transition-colors duration-300" style={{ color: '#fff' }} />
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center"
                style={{
                  background: '#D19701',
                  color: '#FFFFFF',
                }}
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
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white transition-all duration-300" style={{ background: '#D19701' }}>
                  {getInitials(user?.name)}
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-all duration-300 ${
                    userDropdownOpen ? "rotate-180" : ""
                  }`}
                  style={{ color: '#666666' }}
                />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-3 w-60 rounded-xl shadow-xl bg-white border"
                  style={{ 
                    zIndex: 100,
                    borderColor: '#EFE7C8',
                    borderRadius: '16px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                  }}
                >
                  <div className="p-4 border-b" style={{ borderColor: '#EFE7C8' }}>
                    <p className="font-medium" style={{ color: '#111111' }}>{user?.name}</p>
                    <p className="text-xs" style={{ color: '#666666' }}>{user?.email}</p>
                  </div>

                  <div className="py-2">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition"
                      style={{ color: '#111111' }}
                    >
                      <User size={16} style={{ color: '#666666' }} /> Profile
                    </button>

                    <button
                      onClick={() => {
                        navigate("/orders");
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition"
                      style={{ color: '#111111' }}
                    >
                      <ShoppingCart size={16} style={{ color: '#666666' }} /> My Orders
                    </button>

                    <div className="my-2 mx-4 h-px" style={{ background: '#EFE7C8' }} />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition"
                      style={{ color: '#DC2626' }}
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
              className="transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              style={{
                background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                color: '#5A3A00',
                borderRadius: '14px',
                padding: '9px 34px',
                border: '1px solid #C38A00',
                boxShadow: '0 10px 25px rgba(209,151,1,0.35)',
                fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 700,
                
              }}
            >
              LOGIN
            </button>
          )}

          {/* MOBILE MENU */}
          <button className="md:hidden transition-all duration-300 hover:scale-110" onClick={toggleMenu} aria-label="Menu">
            <Menu size={28} style={{ color: '#fff' }} />
          </button>
        </div>
      </div>

      {/* CSS ANIMATION */}
      <style>{`
        /* Poppins Font for all navbar text */
        * {
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
          background: #F5F0E0;
          border-radius: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #D19701;
          border-radius: 4px;
        }

        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: #D19701 #F5F0E0;
        }

        /* Hover effect for nav links - Gold underline */
        .nav-link {
          position: relative;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          letter-spacing: 1px;
          font-size: 15px;
          padding: 8px 0;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 3px;
          border-radius: 2px;
          background: linear-gradient(90deg, #B67E00, #D19701, #FFF19C, #D19701, #B67E00);
          transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .nav-link:hover::after {
          width: 32px;
        }

        .nav-link.active::after {
          width: 32px;
        }

        .nav-link:hover {
          color: #D19701 !important;
        }

        /* Mega menu link styles */
        .mega-link {
          position: relative;
          display: inline-block;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          padding-left: 0;
        }

        .mega-link:hover {
          color: #D19701 !important;
          padding-left: 12px;
        }

        /* Ensure mega menu doesn't get clipped */
        .relative {
          overflow: visible !important;
        }

        /* Dropdown animation */
        .dropdown-enter {
          opacity: 0;
          transform: translateY(-10px);
        }

        .dropdown-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Responsive adjustments */
        @media (max-width: 1280px) {
          .min-w-\\[1200px\\] {
            min-width: 90vw !important;
          }
        }

        @media (max-width: 768px) {
          .navbar-container {
            padding: 0 20px !important;
            height: 72px !important;
          }
        }

        @media (max-width: 1024px) {
          .navbar-container {
            padding: 0 30px !important;
          }
        }

        /* Hover lift for icons */
        .hover-lift {
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hover-lift:hover {
          transform: translateY(-2px);
        }

        /* Cart icon hover */
        .cart-icon:hover {
          color: #D19701 !important;
        }
      `}</style>
    </header>
  );
};

export default Navbar;