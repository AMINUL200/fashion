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
  Filter
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
  const productsPerPage = 8;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);
  const navigate = useNavigate();

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
      {/* Search, Filter button, View toggle and Sort — same layout on mobile & desktop */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 pb-4 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] transition-all duration-200 hover:border-[#182E72] hover:shadow-md flex-shrink-0"
          >
            <Filter size={18} className="text-[#182E72]" />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#182E72] text-white text-xs flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          <div className="relative flex-1 sm:w-80 sm:flex-none">
            <Search size={18} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl text-sm focus:border-[#182E72] focus:ring-2 focus:ring-[#182E72]/20 transition-all outline-none"
            />
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-sm text-[#6B7280] whitespace-nowrap hidden sm:inline">
            <span className="text-[#111827] font-medium">{products.length}</span> products
          </span>

          {/* Grid / List toggle */}
          <div className="flex items-center gap-1 bg-[#F8FAFC] rounded-lg p-1 border border-[#E5E7EB]">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid view"
              className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'grid' ? 'bg-[#182E72] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#182E72]'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              title="List view"
              className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'list' ? 'bg-[#182E72] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#182E72]'}`}
            >
              <Layers size={18} />
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-sm focus:border-[#182E72] focus:ring-2 focus:ring-[#182E72]/20 transition-all outline-none"
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

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedBrands.map(brand => (
            <span key={brand} className="flex items-center gap-1.5 bg-[#E9EEFF] text-[#182E72] px-3 py-1.5 rounded-full text-xs font-medium">
              {brand}
              <button onClick={() => setSelectedBrands(selectedBrands.filter(b => b !== brand))} className="hover:text-[#DC2626] transition-colors">
                <X size={14} />
              </button>
            </span>
          ))}
          {selectedColors.map(color => (
            <span key={color} className="flex items-center gap-1.5 bg-[#E9EEFF] text-[#182E72] px-3 py-1.5 rounded-full text-xs font-medium">
              <span className="w-3 h-3 rounded-full border border-[#E5E7EB]" style={{ backgroundColor: getColorHex(color) }} />
              {color}
              <button onClick={() => setSelectedColors(selectedColors.filter(c => c !== color))} className="hover:text-[#DC2626] transition-colors">
                <X size={14} />
              </button>
            </span>
          ))}
          {selectedSizes.map(size => (
            <span key={size} className="flex items-center gap-1.5 bg-[#E9EEFF] text-[#182E72] px-3 py-1.5 rounded-full text-xs font-medium">
              Size {size}
              <button onClick={() => setSelectedSizes(selectedSizes.filter(s => s !== size))} className="hover:text-[#DC2626] transition-colors">
                <X size={14} />
              </button>
            </span>
          ))}
          {selectedRating > 0 && (
            <span className="flex items-center gap-1.5 bg-[#E9EEFF] text-[#182E72] px-3 py-1.5 rounded-full text-xs font-medium">
              {selectedRating}+ Stars
              <button onClick={() => setSelectedRating(0)} className="hover:text-[#DC2626] transition-colors">
                <X size={14} />
              </button>
            </span>
          )}
          {selectedMaterial !== 'All' && (
            <span className="flex items-center gap-1.5 bg-[#E9EEFF] text-[#182E72] px-3 py-1.5 rounded-full text-xs font-medium">
              {selectedMaterial}
              <button onClick={() => setSelectedMaterial('All')} className="hover:text-[#DC2626] transition-colors">
                <X size={14} />
              </button>
            </span>
          )}
          {selectedFit !== 'All' && (
            <span className="flex items-center gap-1.5 bg-[#E9EEFF] text-[#182E72] px-3 py-1.5 rounded-full text-xs font-medium">
              {selectedFit} Fit
              <button onClick={() => setSelectedFit('All')} className="hover:text-[#DC2626] transition-colors">
                <X size={14} />
              </button>
            </span>
          )}
          {availability !== 'All' && (
            <span className="flex items-center gap-1.5 bg-[#E9EEFF] text-[#182E72] px-3 py-1.5 rounded-full text-xs font-medium">
              {availability}
              <button onClick={() => setAvailability('All')} className="hover:text-[#DC2626] transition-colors">
                <X size={14} />
              </button>
            </span>
          )}
          <button onClick={resetFilters} className="text-xs text-[#6B7280] hover:text-[#182E72] transition-colors font-medium">
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
          {currentProducts.map((product) => (
            viewMode === 'grid' ? (
              // GRID CARD — image on top, content below
              <div
                key={product.id}
                onClick={() => navigate(`/products-details/${product.id}`)}
                className="group bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#182E72]/20 hover:-translate-y-1 cursor-pointer"
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full aspect-[3/4] object-cover" 
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isNew && (
                      <span className="bg-[#16A34A] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Sparkles size={12} /> New
                      </span>
                    )}
                    {product.isSale && (
                      <span className="bg-[#DC2626] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Zap size={12} /> -{product.discount}%
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-[#6B7280] uppercase tracking-wider font-medium">{product.brand}</p>
                      <h4 className="font-semibold text-[#111827] text-sm mt-1 line-clamp-2">{product.name}</h4>
                    </div>
                    {product.isSale && (
                      <div className="bg-[#FEF2F2] text-[#DC2626] text-xs font-bold px-2 py-0.5 rounded-full">
                        SALE
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1.5">
                    {renderStars(product.rating)}
                    <span className="text-xs text-[#9CA3AF] ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-[#182E72]">${product.price}</span>
                    {product.isSale && (
                      <span className="text-sm text-[#9CA3AF] line-through">${(product.price * 1.3).toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // LIST CARD — image left, content right, single column
              <div 
                key={product.id} 
                onClick={() => navigate(`/products-details/${product.id}`)} 
                className="group flex bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#182E72]/20 cursor-pointer"
              >
                <div className="relative w-40 sm:w-52 flex-shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isNew && (
                      <span className="bg-[#16A34A] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Sparkles size={12} /> New
                      </span>
                    )}
                    {product.isSale && (
                      <span className="bg-[#DC2626] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Zap size={12} /> -{product.discount}%
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-[#6B7280] uppercase tracking-wider font-medium">{product.brand}</p>
                      <h4 className="font-semibold text-[#111827] text-sm sm:text-base mt-1">{product.name}</h4>
                    </div>
                    {product.isSale && (
                      <div className="bg-[#FEF2F2] text-[#DC2626] text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                        SALE
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1.5">
                    {renderStars(product.rating)}
                    <span className="text-xs text-[#9CA3AF] ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-[#182E72]">${product.price}</span>
                    {product.isSale && (
                      <span className="text-sm text-[#9CA3AF] line-through">${(product.price * 1.3).toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-[#6B7280]">
                    <span className="flex items-center gap-1"><Ruler size={14} /> {product.size}</span>
                    <span className="flex items-center gap-1"><Palette size={14} /> {product.color}</span>
                    <span className="flex items-center gap-1"><Layers size={14} /> {product.material}</span>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E5E7EB]">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="font-heading text-xl text-[#111827] mb-2">No products found</h3>
          <p className="text-[#6B7280]">Try adjusting your filters or search terms</p>
          <button onClick={resetFilters} className="btn-primary mt-4 px-6 py-2.5 text-sm rounded-xl">
            Reset Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8 pt-4 border-t border-[#F1F5F9]">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`w-10 h-10 rounded-xl border transition-all duration-200 flex items-center justify-center ${
              currentPage === 1
                ? 'border-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                : 'border-[#E5E7EB] hover:border-[#182E72] hover:text-[#182E72] hover:shadow-md'
            }`}
          >
            <ChevronLeft size={18} />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentPage === i + 1
                  ? 'bg-[#182E72] text-white shadow-md'
                  : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#182E72] hover:text-[#182E72] hover:shadow-sm'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 rounded-xl border transition-all duration-200 flex items-center justify-center ${
              currentPage === totalPages
                ? 'border-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                : 'border-[#E5E7EB] hover:border-[#182E72] hover:text-[#182E72] hover:shadow-md'
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;