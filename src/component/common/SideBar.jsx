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

    return "👔"; // Default icon
  };

  /* ================= SIDEBAR LINKS MATCHING NAVBAR ================= */
  const sidebarLinks = [
    {
      id: "home",
      label: "Home",
      path: "/",
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: "products",
      label: "Shop",
      icon: <Package className="w-5 h-5" />,
      dropdown:
        categoryData && categoryData.length > 0
          ? categoryData.map((category) => ({
              id: category.id,
              label: category.name,
              path: `/products/${category.slug}`,
              icon: getCategoryIcon(category.name),
              image: category.image,
            }))
          : [
              { id: "men", label: "Men", path: "/products/men" },
              { id: "women", label: "Women", path: "/products/women" },
              { id: "kids", label: "Kids", path: "/products/kids" },
              { id: "accessories", label: "Accessories", path: "/products/accessories" },
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
              ? "bg-[#182E72] text-white font-semibold"
              : open
                ? "bg-[#E9EEFF] text-[#182E72]"
                : "text-[#6B7280] hover:bg-[#FAFAFA] hover:text-[#182E72]"
          }`}
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
            className={`overflow-hidden transition-all ${
              open ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="border-l border-[#E5E7EB] ml-4">
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
              ? "bg-[#182E72] text-white font-semibold"
              : open
                ? "bg-[#E9EEFF] text-[#182E72]"
                : "text-[#6B7280] hover:bg-[#FAFAFA] hover:text-[#182E72]"
          }`}
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
            className={`overflow-hidden transition-all ${
              open ? "max-h-[800px]" : "max-h-0"
            }`}
          >
            {item.dropdown.map((d) => renderDropdownItem(d))}
          </div>
        )}

        {/* Show message if products dropdown is empty */}
        {item.id === "products" &&
          item.dropdown &&
          item.dropdown.length === 0 &&
          open && (
            <div className="px-4 py-3 ml-8 text-sm text-[#6B7280] italic">
              No categories available
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

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB] bg-[#FAFAFA]">
          <h2 className="text-xl font-bold font-heading">
            <span className="text-[#182E72]">ONE </span>
            <span className="text-[#182E72]">REP MORE</span>
          </h2>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-[#F8FAFC] transition"
          >
            <X className="text-[#182E72]" size={20} />
          </button>
        </div>

        {/* Category Count Badge (if needed) */}
        {categoryData && categoryData.length > 0 && (
          <div className="px-6 py-2 border-b border-[#E5E7EB] bg-white">
            <span className="text-xs text-[#6B7280]">
              {categoryData.length} Categories Available
            </span>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 max-h-[calc(100vh-180px)] custom-scrollbar">
          {sidebarLinks.map(renderNavItem)}
        </nav>

        {/* Auth Section */}
        {!isAuthenticated ? (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E5E7EB] bg-[#FAFAFA]">
            <button
              onClick={() => {
                navigate("/login");
                toggleMenu();
              }}
              className="w-full bg-[#182E72] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#2848A0] transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              Login / Sign Up
            </button>
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E5E7EB] bg-[#FAFAFA]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white bg-[#182E72]">
                U
              </div>
              <div>
                <p className="text-[#111827] font-medium">User Name</p>
                <p className="text-xs text-[#6B7280]">user@example.com</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-[#DC2626] hover:bg-[#DC2626]/10 transition"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </aside>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .font-heading {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F1F5F9;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #182E72;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2848A0;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #182E72 #F1F5F9;
        }
      `}</style>
    </>
  );
};

export default SideBar;