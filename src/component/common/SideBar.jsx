import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  X,
  ChevronRight,
  Home,
  Package,
  DollarSign,
  Mail,
  User,
  LogOut,
  Info,
  Sparkles,
  Tag,
} from "lucide-react";

const SideBar = ({ toggleMenu, isOpen, categoryData }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  /* ================= MEGA MENU DATA (Same as Navbar) ================= */
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
  };

  /* ================= ICON MAPPING FOR CATEGORIES ================= */
  const getCategoryIcon = (categoryName) => {
    const name = categoryName?.toLowerCase() || "";

    if (name.includes("t-shirt") || name.includes("shirt")) return "👕";
    if (name.includes("jeans") || name.includes("pant")) return "👖";
    if (name.includes("dress")) return "👗";
    if (name.includes("skirt")) return "👘";
    if (name.includes("hoodie") || name.includes("jacket")) return "🧥";
    if (name.includes("saree") || name.includes("kurta")) return "👚";
    if (name.includes("accessor")) return "🧤";
    if (name.includes("blazer") || name.includes("suit")) return "🤵";
    if (name.includes("ethnic") || name.includes("wear")) return "👳";
    if (name.includes("boys") || name.includes("girls")) return "👶";
    if (name.includes("baby")) return "🍼";

    return "👔"; // Default icon
  };

  /* ================= SIDEBAR LINKS WITH MEGA MENU DROPDOWN ================= */
  const sidebarLinks = [
    {
      id: "home",
      label: "Home",
      path: "/",
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: "shop",
      label: "Shop",
      icon: <Package className="w-5 h-5" />,
      dropdown: [
        {
          id: "men",
          label: "MEN",
          icon: "👨",
          dropdown: megaMenuData.men.categories.map((cat) => ({
            id: cat.toLowerCase().replace(/\s+/g, '-'),
            label: cat,
            path: `/products/${cat.toLowerCase()}`,
            icon: getCategoryIcon(cat),
          })),
        },
        {
          id: "women",
          label: "WOMEN",
          icon: "👩",
          dropdown: megaMenuData.women.categories.map((cat) => ({
            id: cat.toLowerCase().replace(/\s+/g, '-'),
            label: cat,
            path: `/products/${cat.toLowerCase()}`,
            icon: getCategoryIcon(cat),
          })),
        },
        {
          id: "kids",
          label: "KIDS",
          icon: "👶",
          dropdown: megaMenuData.kids.categories.map((cat) => ({
            id: cat.toLowerCase().replace(/\s+/g, '-'),
            label: cat,
            path: `/products/${cat.toLowerCase()}`,
            icon: getCategoryIcon(cat),
          })),
        },
        {
          id: "featured",
          label: "FEATURED",
          icon: "⭐",
          dropdown: megaMenuData.featured.categories.map((cat) => ({
            id: cat.toLowerCase().replace(/\s+/g, '-'),
            label: cat,
            path: `/products/${cat.toLowerCase().replace(/\s+/g, '-')}`,
            icon: cat === "New Arrivals" ? "🆕" : cat === "Best Sellers" ? "🏆" : cat === "Trending" ? "🔥" : "💎",
          })),
        },
      ],
    },
    {
      id: "new-arrivals",
      label: "New Arrivals",
      path: "/products/new-arrivals",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      id: "sale",
      label: "Sale",
      path: "/products/sale",
      icon: <Tag className="w-5 h-5" />,
    },
    {
      id: "contact",
      label: "Contact",
      path: "/contact",
      icon: <Mail className="w-5 h-5" />,
    },
  ];

  // dummy auth (unchanged)
  const isAuthenticated = false;
  const userData = { user_type: 2 };

  useEffect(() => {
    if (isOpen) toggleMenu();
  }, [location.pathname]);

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNavClick = (path) => {
    if (path) {
      navigate(path);
      setOpenDropdowns({});
    }
  };

  const handleLogout = () => {
    navigate("/");
    toggleMenu();
  };

  const isActivePath = (path) => location.pathname === path;

  const renderDropdownItem = (item, level = 1) => {
    const hasSub = item.dropdown?.length;
    const key = `${item.id}-${level}`;
    const open = openDropdowns[key];
    const active = item.path && isActivePath(item.path);

    return (
      <div key={item.id}>
        <div
          onClick={() =>
            hasSub ? toggleDropdown(key) : handleNavClick(item.path)
          }
          className={`flex items-center justify-between px-4 py-3 text-sm cursor-pointer transition ${
            level > 1 ? "pl-10" : "pl-6"
          } ${
            active
              ? "text-[#5A3A00] font-semibold"
              : open
                ? "bg-[#FDFBD4] text-[#D19701]"
                : "text-[#666666] hover:bg-[#FDFBD4] hover:text-[#D19701]"
          }`}
          style={{
            background: active ? 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)' : open ? '#FDFBD4' : 'transparent'
          }}
        >
          <div className="flex items-center gap-2">
            {item.icon && <span className="text-base">{item.icon}</span>}
            <span>{item.label}</span>
          </div>
          {hasSub && (
            <ChevronRight
              className={`w-4 h-4 transition-transform ${
                open ? "rotate-90" : ""
              }`}
            />
          )}
        </div>

        {hasSub && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-l border-[#EFE7C8] ml-4">
              {item.dropdown.map((sub) => renderDropdownItem(sub, level + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderNavItem = (item) => {
    const open = openDropdowns[item.id];
    const active = item.path && isActivePath(item.path);

    return (
      <div key={item.id}>
        <div
          onClick={() =>
            item.dropdown ? toggleDropdown(item.id) : handleNavClick(item.path)
          }
          className={`flex items-center justify-between px-4 py-3 mx-2 rounded-lg cursor-pointer transition ${
            active
              ? "text-[#5A3A00] font-semibold"
              : open
                ? "bg-[#FDFBD4] text-[#D19701]"
                : "text-[#666666] hover:bg-[#FDFBD4] hover:text-[#D19701]"
          }`}
          style={{
            background: active 
              ? 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)' 
              : open 
                ? '#FDFBD4' 
                : 'transparent',
            boxShadow: active ? '0 8px 20px rgba(209,151,1,0.25)' : 'none'
          }}
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <span>{item.label}</span>
          </div>
          {item.dropdown && item.dropdown.length > 0 && (
            <ChevronRight
              className={`w-5 h-5 transition-transform ${
                open ? "rotate-90" : ""
              }`}
            />
          )}
        </div>

        {item.dropdown && item.dropdown.length > 0 && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              open ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {item.dropdown.map((d) => renderDropdownItem(d))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } md:hidden`}
        onClick={toggleMenu}
      />

      {/* Sidebar - Gold Theme */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.5)",
          borderLeft: "1px solid #EFE7C8",
        }}
      >
        {/* Header - Gold Theme - Fixed at top */}
        <div className="flex items-center justify-between p-6 border-b border-[#EFE7C8] flex-shrink-0" style={{ background: 'linear-gradient(90deg, #FFFFFF 0%, #FDFBD4 100%)' }}>
          <h2 className="text-xl font-heading font-bold">
            <span className="text-[#D19701]">APSARA</span>
          </h2>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-[#FDFBD4] transition"
          >
            <X className="text-[#D19701]" size={20} />
          </button>
        </div>

        {/* Category Count Badge - Gold Theme */}
        <div className="px-6 py-2 border-b border-[#EFE7C8] bg-white flex-shrink-0">
          <span className="text-xs text-[#666666]">
            Shop by Category
          </span>
        </div>

        {/* Nav - Gold Theme - Scrollable middle section with proper overflow */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">
          <div className="space-y-1">
            {sidebarLinks.map(renderNavItem)}
          </div>
        </nav>

        {/* Auth Section - Gold Theme - Fixed at bottom */}
        {!isAuthenticated ? (
          <div className="flex-shrink-0 p-4 border-t border-[#EFE7C8]" style={{ background: 'linear-gradient(90deg, #FFFFFF 0%, #FDFBD4 100%)' }}>
            <button
              onClick={() => {
                navigate("/login");
                toggleMenu();
              }}
              className="w-full font-heading font-semibold py-2.5 px-4 rounded-[14px] transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                color: '#5A3A00',
                border: '1px solid #C38A00',
                boxShadow: '0 8px 20px rgba(209,151,1,0.25)',
              }}
            >
              Login / Sign Up
            </button>
          </div>
        ) : (
          <div className="flex-shrink-0 p-4 border-t border-[#EFE7C8]" style={{ background: 'linear-gradient(90deg, #FFFFFF 0%, #FDFBD4 100%)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-[#5A3A00]" style={{ background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)' }}>
                U
              </div>
              <div>
                <p className="text-[#111111] font-medium">User Name</p>
                <p className="text-xs text-[#666666]">user@example.com</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-[14px] text-[#B67E00] hover:bg-[#FDFBD4] transition border border-[#EFE7C8]"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </aside>

      {/* Custom Scrollbar Styles - Gold Theme */}
      <style jsx>{`
        .font-heading {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #FDFBD4;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #D19701;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #B67E00;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #D19701 #FDFBD4;
        }

        /* Dropdown item hover effect */
        .dropdown-item {
          transition: all 0.3s ease;
        }

        .dropdown-item:hover {
          padding-left: 2rem;
        }

        /* Active state with gold gradient */
        .active-gold {
          background: linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%);
          color: #5A3A00;
        }

        /* Sidebar container - flex column layout */
        .sidebar-container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        /* Ensure nav takes remaining space and scrolls */
        .nav-scroll {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
        }

        /* Footer stays at bottom */
        .sidebar-footer {
          flex-shrink: 0;
        }

        /* Smooth dropdown transitions */
        .dropdown-transition {
          transition: max-height 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Ensure dropdown content doesn't cause overflow issues */
        .dropdown-content {
          overflow: hidden;
        }

        /* Prevent horizontal scroll */
        .overflow-x-hidden {
          overflow-x: hidden;
        }

        /* Ensure the nav can scroll even with many items */
        .nav-scrollable {
          flex: 1 1 auto;
          min-height: 0;
          overflow-y: auto;
        }
      `}</style>
    </>
  );
};

export default SideBar;