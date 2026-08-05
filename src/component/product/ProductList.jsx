import React, { useState } from 'react';
import { 
  Search, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Ruler,
  Palette,
  Layers,
  LayoutGrid,
  Sparkles,
  Zap,
  Filter,
  Eye,
  Heart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductList = ({
  products,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  currentPage,
  setCurrentPage,
  totalPages,
  renderStars,
  getColorHex,
  resetFilters,
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
  showFilters,
  setShowFilters,
  FilterComponent,
  brands,
  colors,
  sizes,
  materials,
  fits,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange
}) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const productsPerPage = 8;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);
  const navigate = useNavigate();

  // Toggle wishlist
  const toggleWishlist = (productId, e) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Check if any filters are active
  const hasActiveFilters = 
    selectedBrands.length > 0 || 
    selectedColors.length > 0 || 
    selectedSizes.length > 0 || 
    selectedRating > 0 || 
    selectedMaterial !== 'All' || 
    selectedFit !== 'All' || 
    availability !== 'All';

  const activeFilterCount = selectedBrands.length + selectedColors.length + selectedSizes.length;

  return (
    <div className="w-full">
      {/* Search, Filter button, View toggle and Sort — Gold Theme */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 pb-4 border-b border-[#EFE7C8]">
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#EFE7C8] rounded-[14px] text-sm text-[#111111] transition-all duration-200 hover:border-[#D19701] hover:shadow-md flex-shrink-0"
          >
            <Filter size={18} className="text-[#D19701]" />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full text-white text-xs flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #B67E00, #D19701)' }}>
                {activeFilterCount}
              </span>
            )}
          </button>
          <div className="relative flex-1 sm:w-80 sm:flex-none">
            <Search size={18} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#999999]" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#EFE7C8] rounded-[14px] text-sm focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-[#111111] placeholder:text-[#999999]"
            />
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-sm text-[#666666] whitespace-nowrap hidden sm:inline">
            <span className="text-[#111111] font-medium">{products.length}</span> products
          </span>

          {/* Grid / List toggle - Gold Theme */}
          <div className="flex items-center gap-1 bg-[#FDFBD4] rounded-[12px] p-1 border border-[#EFE7C8]">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid view"
              className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'grid' ? 'text-white shadow-sm' : 'text-[#666666] hover:text-[#D19701]'}`}
              style={{ background: viewMode === 'grid' ? 'linear-gradient(90deg, #B67E00, #D19701)' : 'transparent' }}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              title="List view"
              className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'list' ? 'text-white shadow-sm' : 'text-[#666666] hover:text-[#D19701]'}`}
              style={{ background: viewMode === 'list' ? 'linear-gradient(90deg, #B67E00, #D19701)' : 'transparent' }}
            >
              <Layers size={18} />
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-white border border-[#EFE7C8] rounded-[14px] text-sm focus:border-[#D19701] focus:ring-2 focus:ring-[#D19701]/20 transition-all outline-none text-[#111111]"
          >
            <option value="featured">Featured</option>
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Filters Drawer — slides in on both mobile and desktop */}
      {showFilters && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl animate-slideIn overflow-y-auto">
            <FilterComponent 
              isMobile={true} 
              onClose={() => setShowFilters(false)}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              selectedSizes={selectedSizes}
              setSelectedSizes={setSelectedSizes}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              selectedMaterial={selectedMaterial}
              setSelectedMaterial={setSelectedMaterial}
              selectedFit={selectedFit}
              setSelectedFit={setSelectedFit}
              availability={availability}
              setAvailability={setAvailability}
              resetFilters={resetFilters}
              brands={brands}
              colors={colors}
              sizes={sizes}
              materials={materials}
              fits={fits}
              renderStars={renderStars}
              getColorHex={getColorHex}
            />
          </div>
        </div>
      )}

      {/* Active Filters - Gold Theme */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedBrands.map(brand => (
            <span key={brand} className="flex items-center gap-1.5 text-[#5A3A00] px-3 py-1.5 rounded-full text-xs font-medium border border-[#C38A00]" style={{ background: 'linear-gradient(90deg, #FFF19C, #FDFBD4)' }}>
              {brand}
              <button onClick={() => setSelectedBrands(selectedBrands.filter(b => b !== brand))} className="hover:text-[#B67E00] transition-colors">
                <X size={14} />
              </button>
            </span>
          ))}
          {selectedColors.map(color => (
            <span key={color} className="flex items-center gap-1.5 text-[#5A3A00] px-3 py-1.5 rounded-full text-xs font-medium border border-[#C38A00]" style={{ background: 'linear-gradient(90deg, #FFF19C, #FDFBD4)' }}>
              <span className="w-3 h-3 rounded-full border border-[#EFE7C8]" style={{ backgroundColor: getColorHex(color) }} />
              {color}
              <button onClick={() => setSelectedColors(selectedColors.filter(c => c !== color))} className="hover:text-[#B67E00] transition-colors">
                <X size={14} />
              </button>
            </span>
          ))}
          {selectedSizes.map(size => (
            <span key={size} className="flex items-center gap-1.5 text-[#5A3A00] px-3 py-1.5 rounded-full text-xs font-medium border border-[#C38A00]" style={{ background: 'linear-gradient(90deg, #FFF19C, #FDFBD4)' }}>
              Size {size}
              <button onClick={() => setSelectedSizes(selectedSizes.filter(s => s !== size))} className="hover:text-[#B67E00] transition-colors">
                <X size={14} />
              </button>
            </span>
          ))}
          {selectedRating > 0 && (
            <span className="flex items-center gap-1.5 text-[#5A3A00] px-3 py-1.5 rounded-full text-xs font-medium border border-[#C38A00]" style={{ background: 'linear-gradient(90deg, #FFF19C, #FDFBD4)' }}>
              {selectedRating}+ Stars
              <button onClick={() => setSelectedRating(0)} className="hover:text-[#B67E00] transition-colors">
                <X size={14} />
              </button>
            </span>
          )}
          {selectedMaterial !== 'All' && (
            <span className="flex items-center gap-1.5 text-[#5A3A00] px-3 py-1.5 rounded-full text-xs font-medium border border-[#C38A00]" style={{ background: 'linear-gradient(90deg, #FFF19C, #FDFBD4)' }}>
              {selectedMaterial}
              <button onClick={() => setSelectedMaterial('All')} className="hover:text-[#B67E00] transition-colors">
                <X size={14} />
              </button>
            </span>
          )}
          {selectedFit !== 'All' && (
            <span className="flex items-center gap-1.5 text-[#5A3A00] px-3 py-1.5 rounded-full text-xs font-medium border border-[#C38A00]" style={{ background: 'linear-gradient(90deg, #FFF19C, #FDFBD4)' }}>
              {selectedFit} Fit
              <button onClick={() => setSelectedFit('All')} className="hover:text-[#B67E00] transition-colors">
                <X size={14} />
              </button>
            </span>
          )}
          {availability !== 'All' && (
            <span className="flex items-center gap-1.5 text-[#5A3A00] px-3 py-1.5 rounded-full text-xs font-medium border border-[#C38A00]" style={{ background: 'linear-gradient(90deg, #FFF19C, #FDFBD4)' }}>
              {availability}
              <button onClick={() => setAvailability('All')} className="hover:text-[#B67E00] transition-colors">
                <X size={14} />
              </button>
            </span>
          )}
          <button onClick={resetFilters} className="text-xs text-[#666666] hover:text-[#D19701] transition-colors font-medium">
            Clear All
          </button>
        </div>
      )}

      {/* Product List — grid (up to 4 per row) or single-column list */}
      {currentProducts.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' 
          : 'grid grid-cols-1 gap-4'
        }>
          {currentProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const isHovered = hoveredProduct === product.id;

            return viewMode === 'grid' ? (
              // GRID CARD — Gold Theme with View Details Always Visible
              <div
                key={product.id}
                onClick={() => navigate(`/products-details/${product.id}`)}
                className="group bg-white rounded-[18px] border border-[#EFE7C8] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(209,151,1,0.12)] hover:border-[#D19701] hover:-translate-y-1 cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full aspect-[4/4] object-fill transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isNew && (
                      <span className="bg-[#111111] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Sparkles size={12} /> New
                      </span>
                    )}
                    {product.isSale && (
                      <span className="bg-[#D19701] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Zap size={12} /> -{product.discount}%
                      </span>
                    )}
                  </div>
                  
                  {/* Wishlist Button - Gold Theme */}
                  <button
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
                      isWishlisted
                        ? 'bg-[#D19701] text-white'
                        : 'bg-white/90 backdrop-blur-sm text-[#666666] hover:bg-[#D19701] hover:text-white'
                    } ${isHovered || isWishlisted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                  >
                    <Heart size={15} className={isWishlisted ? 'fill-current' : ''} />
                  </button>

                  {/* Quick View — appears on hover */}
                  <div className={`absolute bottom-3 left-0 right-0 flex items-center justify-center transition-all duration-300 ${
                    isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/products-details/${product.id}`);
                      }}
                      className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
                      style={{
                        background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                        color: '#5A3A00',
                        border: '1px solid #C38A00',
                      }}
                    >
                      <Eye size={14} /> Quick View
                    </button>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-[#666666] uppercase tracking-wider font-medium">{product.brand}</p>
                      <h4 className="font-heading font-semibold text-[#111111] text-sm mt-1 line-clamp-2">{product.name}</h4>
                    </div>
                    {product.isSale && (
                      <div className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{
                        background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                        color: '#5A3A00',
                        border: '1px solid #C38A00',
                      }}>
                        SALE
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1.5">
                    {renderStars(product.rating)}
                    <span className="text-xs text-[#999999] ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-heading font-bold text-[#D19701]">${product.price}</span>
                    {product.isSale && (
                      <span className="text-sm text-[#999999] line-through">${(product.price * 1.3).toFixed(2)}</span>
                    )}
                  </div>
                  
                  {/* View Details Button - Always Visible - Gold Theme */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/products-details/${product.id}`);
                    }}
                    className="w-full mt-3 py-2.5 rounded-[14px] text-sm font-medium transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                    style={{
                      background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                      color: '#5A3A00',
                      border: '1px solid #C38A00',
                      boxShadow: '0 4px 15px rgba(209,151,1,0.15)',
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ) : (
              // LIST CARD — Gold Theme
              <div 
                key={product.id} 
                onClick={() => navigate(`/products-details/${product.id}`)} 
                className="group flex bg-white rounded-[18px] border border-[#EFE7C8] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(209,151,1,0.12)] hover:border-[#D19701] cursor-pointer"
              >
                <div className="relative w-40 sm:w-52 flex-shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isNew && (
                      <span className="bg-[#111111] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Sparkles size={12} /> New
                      </span>
                    )}
                    {product.isSale && (
                      <span className="bg-[#D19701] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Zap size={12} /> -{product.discount}%
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-[#666666] uppercase tracking-wider font-medium">{product.brand}</p>
                      <h4 className="font-heading font-semibold text-[#111111] text-sm sm:text-base mt-1">{product.name}</h4>
                    </div>
                    {product.isSale && (
                      <div className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{
                        background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                        color: '#5A3A00',
                        border: '1px solid #C38A00',
                      }}>
                        SALE
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1.5">
                    {renderStars(product.rating)}
                    <span className="text-xs text-[#999999] ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-heading font-bold text-[#D19701]">${product.price}</span>
                    {product.isSale && (
                      <span className="text-sm text-[#999999] line-through">${(product.price * 1.3).toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-[#666666]">
                    <span className="flex items-center gap-1"><Ruler size={14} /> {product.size}</span>
                    <span className="flex items-center gap-1"><Palette size={14} /> {product.color}</span>
                    <span className="flex items-center gap-1"><Layers size={14} /> {product.material}</span>
                  </div>
                  
                  {/* View Details Button - Always Visible in List View */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/products-details/${product.id}`);
                    }}
                    className="mt-3 px-6 py-2 rounded-[14px] text-sm font-medium transition-all duration-300 hover:shadow-xl hover:scale-[1.02] w-fit"
                    style={{
                      background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
                      color: '#5A3A00',
                      border: '1px solid #C38A00',
                      boxShadow: '0 4px 15px rgba(209,151,1,0.15)',
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#EFE7C8]">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="font-heading text-xl text-[#111111] mb-2">No products found</h3>
          <p className="text-[#666666]">Try adjusting your filters or search terms</p>
          <button onClick={resetFilters} className="mt-4 px-6 py-2.5 text-sm rounded-[14px] font-medium transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)',
              color: '#5A3A00',
              border: '1px solid #C38A00',
              boxShadow: '0 4px 15px rgba(209,151,1,0.15)',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Pagination - Gold Theme */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8 pt-4 border-t border-[#EFE7C8]">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`w-10 h-10 rounded-[14px] border transition-all duration-200 flex items-center justify-center ${
              currentPage === 1
                ? 'border-[#EFE7C8] text-[#999999] cursor-not-allowed'
                : 'border-[#EFE7C8] hover:border-[#D19701] hover:text-[#D19701] hover:shadow-md'
            }`}
          >
            <ChevronLeft size={18} />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-[14px] text-sm font-medium transition-all duration-200 ${
                currentPage === i + 1
                  ? 'text-white shadow-md'
                  : 'bg-white text-[#666666] border border-[#EFE7C8] hover:border-[#D19701] hover:text-[#D19701] hover:shadow-sm'
              }`}
              style={{
                background: currentPage === i + 1 
                  ? 'linear-gradient(90deg, #B67E00 0%, #D19701 20%, #FFF19C 50%, #D19701 80%, #B67E00 100%)'
                  : '#FFFFFF',
                color: currentPage === i + 1 ? '#5A3A00' : '#666666',
                border: currentPage === i + 1 ? '1px solid #C38A00' : '1px solid #EFE7C8'
              }}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 rounded-[14px] border transition-all duration-200 flex items-center justify-center ${
              currentPage === totalPages
                ? 'border-[#EFE7C8] text-[#999999] cursor-not-allowed'
                : 'border-[#EFE7C8] hover:border-[#D19701] hover:text-[#D19701] hover:shadow-md'
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* CSS */}
      <style jsx>{`
        .font-heading {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductList;