import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Tag, 
  Palette, 
  Ruler, 
  Layers, 
  Star,
  X,
  ChevronDown
} from 'lucide-react';

const ProductFilters = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  selectedColors,
  setSelectedColors,
  selectedSizes,
  setSelectedSizes,
  selectedRating,
  setSelectedRating,
  selectedMaterial,
  setSelectedMaterial,
  selectedFit,
  setSelectedFit,
  availability,
  setAvailability,
  resetFilters,
  brands,
  colors,
  sizes,
  materials,
  fits,
  renderStars,
  getColorHex,
  isMobile = false,
  onClose
}) => {
  // Which accordion sections are open — Category open by default
  const [openSections, setOpenSections] = useState({
    category: true,
    price: false,
    brand: false,
    color: false,
    size: false,
    rating: false,
    material: false,
    fit: false,
    availability: false,
  });

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Reusable accordion header
  const SectionHeader = ({ sectionKey, icon, label }) => (
    <button
      onClick={() => toggleSection(sectionKey)}
      className="w-full flex items-center justify-between py-1"
    >
      <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider flex items-center gap-2">
        {icon}
        {label}
      </h4>
      <ChevronDown 
        size={16} 
        className={`text-[#9CA3AF] transition-transform duration-200 ${openSections[sectionKey] ? 'rotate-180' : ''}`} 
      />
    </button>
  );

  return (
    // This whole component is what mounts INSIDE the sidebar drawer
    // (see ProductList.jsx -> <FilterComponent .../> inside the slide-in panel)
    <div className={`${isMobile ? 'p-4' : ''}`}>
      {isMobile && (
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F1F5F9]">
          <h3 className="font-heading text-lg text-[#111827] flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-[#182E72]" />
            Filters
          </h3>
          <button onClick={onClose} className="p-1.5 hover:bg-[#F8FAFC] rounded-lg transition-colors">
            <X size={20} className="text-[#6B7280]" />
          </button>
        </div>
      )}

      <div className="divide-y divide-[#F1F5F9]">
        {/* Category */}
        <div className="py-4">
          <SectionHeader sectionKey="category" icon={<Tag size={14} className="text-[#182E72]" />} label="Category" />
          {openSections.category && (
            <div className="space-y-1.5 mt-3">
              {['All', 'Nike', 'Adidas', 'Puma', 'Under Armour'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block text-sm w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                    selectedCategory === cat 
                      ? 'text-[#182E72] bg-[#E9EEFF] font-medium shadow-sm' 
                      : 'text-[#6B7280] hover:text-[#182E72] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="py-4">
          <SectionHeader sectionKey="price" icon={<SlidersHorizontal size={14} className="text-[#182E72]" />} label="Price Range" />
          {openSections.price && (
            <div className="px-2 mt-3">
              <div className="flex justify-between text-sm text-[#6B7280] mb-2">
                <span className="font-medium">${priceRange[0]}</span>
                <span className="font-medium">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-1.5 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#182E72]"
              />
            </div>
          )}
        </div>

        {/* Brand */}
        <div className="py-4">
          <SectionHeader sectionKey="brand" icon={<Layers size={14} className="text-[#182E72]" />} label="Brand" />
          {openSections.brand && (
            <div className="space-y-1.5 mt-3">
              {brands.slice(0, 5).map(brand => (
                <label key={brand} className="flex items-center gap-2.5 text-sm text-[#6B7280] hover:text-[#182E72] cursor-pointer transition-colors group">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => {
                      if (selectedBrands.includes(brand)) {
                        setSelectedBrands(selectedBrands.filter(b => b !== brand));
                      } else {
                        setSelectedBrands([...selectedBrands, brand]);
                      }
                    }}
                    className="w-4 h-4 rounded border-[#E5E7EB] text-[#182E72] focus:ring-[#182E72] focus:ring-2 transition-all"
                  />
                  <span className="group-hover:translate-x-0.5 transition-transform">{brand}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Color */}
        <div className="py-4">
          <SectionHeader sectionKey="color" icon={<Palette size={14} className="text-[#182E72]" />} label="Color" />
          {openSections.color && (
            <div className="flex flex-wrap gap-2.5 mt-3">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => {
                    if (selectedColors.includes(color)) {
                      setSelectedColors(selectedColors.filter(c => c !== color));
                    } else {
                      setSelectedColors([...selectedColors, color]);
                    }
                  }}
                  className={`relative w-9 h-9 rounded-full border-2 transition-all duration-300 ${
                    selectedColors.includes(color) 
                      ? 'border-[#182E72] scale-110 shadow-lg' 
                      : 'border-[#E5E7EB] hover:scale-110 hover:border-[#182E72]'
                  }`}
                  style={{
                    backgroundColor: getColorHex(color),
                    borderColor: selectedColors.includes(color) ? '#182E72' : '#E5E7EB'
                  }}
                  title={color}
                >
                  {selectedColors.includes(color) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white shadow-lg" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Size */}
        <div className="py-4">
          <SectionHeader sectionKey="size" icon={<Ruler size={14} className="text-[#182E72]" />} label="Size" />
          {openSections.size && (
            <div className="flex flex-wrap gap-2 mt-3">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => {
                    if (selectedSizes.includes(size)) {
                      setSelectedSizes(selectedSizes.filter(s => s !== size));
                    } else {
                      setSelectedSizes([...selectedSizes, size]);
                    }
                  }}
                  className={`px-3.5 py-1.5 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
                    selectedSizes.includes(size)
                      ? 'bg-[#182E72] text-white border-[#182E72] shadow-md'
                      : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#182E72] hover:text-[#182E72]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="py-4">
          <SectionHeader sectionKey="rating" icon={<Star size={14} className="text-[#FDBA12] fill-[#FDBA12]" />} label="Rating" />
          {openSections.rating && (
            <div className="space-y-1.5 mt-3">
              {[4, 3, 2, 1].map(rating => (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                  className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition-all duration-200 w-full ${
                    selectedRating === rating 
                      ? 'text-[#182E72] bg-[#E9EEFF] font-medium' 
                      : 'text-[#6B7280] hover:text-[#182E72] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className="flex">{renderStars(rating)}</div>
                  <span className="text-xs">& Up</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Material */}
        <div className="py-4">
          <SectionHeader sectionKey="material" icon={<Layers size={14} className="text-[#182E72]" />} label="Material" />
          {openSections.material && (
            <div className="space-y-1.5 mt-3">
              {materials.map(material => (
                <button
                  key={material}
                  onClick={() => setSelectedMaterial(material)}
                  className={`block text-sm w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                    selectedMaterial === material 
                      ? 'text-[#182E72] bg-[#E9EEFF] font-medium shadow-sm' 
                      : 'text-[#6B7280] hover:text-[#182E72] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {material}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Fit */}
        <div className="py-4">
          <SectionHeader sectionKey="fit" icon={null} label="Fit" />
          {openSections.fit && (
            <div className="space-y-1.5 mt-3">
              {fits.map(fit => (
                <button
                  key={fit}
                  onClick={() => setSelectedFit(fit)}
                  className={`block text-sm w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                    selectedFit === fit 
                      ? 'text-[#182E72] bg-[#E9EEFF] font-medium shadow-sm' 
                      : 'text-[#6B7280] hover:text-[#182E72] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {fit}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Availability */}
        <div className="py-4">
          <SectionHeader sectionKey="availability" icon={null} label="Availability" />
          {openSections.availability && (
            <div className="space-y-1.5 mt-3">
              {['All', 'In Stock', 'On Sale'].map(option => (
                <button
                  key={option}
                  onClick={() => setAvailability(option)}
                  className={`block text-sm w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                    availability === option 
                      ? 'text-[#182E72] bg-[#E9EEFF] font-medium shadow-sm' 
                      : 'text-[#6B7280] hover:text-[#182E72] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-[#182E72] to-[#2848A0] text-white font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
      >
        Reset All Filters
      </button>
    </div>
  );
};

export default ProductFilters;