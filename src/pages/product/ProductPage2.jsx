import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize
} from 'lucide-react';
import { 
  ProductBreadcrumb, 
  ProductFilters, 
  ProductList 
} from '../../component/product';
import PromotionVideo from '../../component/common/PromotionVideo';

const ProductPage2 = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [selectedFit, setSelectedFit] = useState('All');
  const [availability, setAvailability] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  // Dummy product data
  const products = [
    { id: 1, name: 'Classic White T-Shirt', brand: 'Nike', price: 29.99, rating: 4.5, reviews: 128, color: 'White', size: 'M', material: 'Cotton', fit: 'Regular', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop', isNew: true, isSale: false, discount: 0 },
    { id: 2, name: 'Premium Black Tee', brand: 'Adidas', price: 34.99, rating: 4.8, reviews: 89, color: 'Black', size: 'L', material: 'Cotton', fit: 'Slim', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=500&fit=crop', isNew: false, isSale: true, discount: 20 },
    { id: 3, name: 'Vintage Graphic T-Shirt', brand: 'Puma', price: 39.99, rating: 4.3, reviews: 156, color: 'Navy', size: 'XL', material: 'Polyester', fit: 'Regular', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop', isNew: true, isSale: false, discount: 0 },
    { id: 4, name: 'Performance Dry-Fit Tee', brand: 'Under Armour', price: 44.99, rating: 4.7, reviews: 203, color: 'Red', size: 'S', material: 'Polyester', fit: 'Athletic', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop', isNew: false, isSale: false, discount: 0 },
    { id: 5, name: 'Classic Striped T-Shirt', brand: 'Nike', price: 32.99, rating: 4.2, reviews: 67, color: 'Blue', size: 'M', material: 'Cotton', fit: 'Regular', image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop', isNew: false, isSale: true, discount: 15 },
    { id: 6, name: 'Premium Cotton Crew', brand: 'Adidas', price: 27.99, rating: 4.6, reviews: 94, color: 'Gray', size: 'L', material: 'Cotton', fit: 'Slim', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=500&fit=crop', isNew: true, isSale: false, discount: 0 },
    { id: 7, name: 'Essential Logo Tee', brand: 'Puma', price: 24.99, rating: 4.1, reviews: 45, color: 'Black', size: 'XL', material: 'Cotton', fit: 'Regular', image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400&h=500&fit=crop', isNew: false, isSale: false, discount: 0 },
    { id: 8, name: 'Sport Mesh T-Shirt', brand: 'Under Armour', price: 49.99, rating: 4.9, reviews: 312, color: 'White', size: 'S', material: 'Polyester', fit: 'Athletic', image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=500&fit=crop', isNew: false, isSale: true, discount: 25 },
    { id: 9, name: 'Heritage Logo Tee', brand: 'Nike', price: 34.99, rating: 4.4, reviews: 78, color: 'Red', size: 'M', material: 'Cotton', fit: 'Regular', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=500&fit=crop', isNew: true, isSale: false, discount: 0 },
    { id: 10, name: 'Ultra-Soft V-Neck', brand: 'Adidas', price: 29.99, rating: 4.7, reviews: 134, color: 'Navy', size: 'L', material: 'Cotton', fit: 'Slim', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=500&fit=crop', isNew: false, isSale: false, discount: 0 },
    { id: 11, name: 'Graphic Art T-Shirt', brand: 'Puma', price: 42.99, rating: 4.3, reviews: 56, color: 'Gray', size: 'XL', material: 'Polyester', fit: 'Regular', image: 'https://images.unsplash.com/photo-1578587018450-5f847d2aa7ab?w=400&h=500&fit=crop', isNew: false, isSale: true, discount: 10 },
    { id: 12, name: 'Pro Training Tee', brand: 'Under Armour', price: 39.99, rating: 4.8, reviews: 167, color: 'Black', size: 'S', material: 'Polyester', fit: 'Athletic', image: 'https://images.unsplash.com/photo-1565693413579-d84eac5bf60c?w=400&h=500&fit=crop', isNew: false, isSale: false, discount: 0 },
  ];

  const brands = ['Nike', 'Adidas', 'Puma', 'Under Armour', 'Ralph Lauren', 'Zara'];
  const colors = ['White', 'Black', 'Navy', 'Red', 'Blue', 'Gray', 'Green', 'Yellow'];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const materials = ['All', 'Cotton', 'Polyester', 'Wool', 'Silk', 'Linen', 'Cashmere'];
  const fits = ['All', 'Regular', 'Slim', 'Athletic', 'Oversized', 'Relaxed'];

  // Filter products
  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'All' && product.brand !== selectedCategory) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
    if (selectedColors.length > 0 && !selectedColors.includes(product.color)) return false;
    if (selectedSizes.length > 0 && !selectedSizes.includes(product.size)) return false;
    if (selectedRating > 0 && product.rating < selectedRating) return false;
    if (selectedMaterial !== 'All' && product.material !== selectedMaterial) return false;
    if (selectedFit !== 'All' && product.fit !== selectedFit) return false;
    if (availability === 'In Stock' && !product.isNew) return false;
    if (availability === 'On Sale' && !product.isSale) return false;
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return b.id - a.id;
      case 'popular': return b.reviews - a.reviews;
      default: return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / 8);

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('All');
    setPriceRange([0, 500]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedRating(0);
    setSelectedMaterial('All');
    setSelectedFit('All');
    setAvailability('All');
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={i < Math.floor(rating) ? 'text-[#FDBA12] fill-current' : 'text-[#E5E7EB]'}
      />
    ));
  };

  // Get color hex
  const getColorHex = (color) => {
    const colorMap = {
      'White': '#FFFFFF',
      'Black': '#1A1A1A',
      'Navy': '#1A237E',
      'Red': '#D32F2F',
      'Blue': '#1565C0',
      'Gray': '#757575',
      'Green': '#2E7D32',
      'Yellow': '#F9A825'
    };
    return colorMap[color] || '#757575';
  };

  // Video controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };


  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* ===== HERO VIDEO SECTION ===== */}
     <PromotionVideo/>

    

      {/* ===== PAGE HEADER ===== */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-heading text-2xl md:text-3xl text-[#111827] mb-1">Men's T-Shirts</h1>
              <p className="text-[#6B7280] text-sm">Premium Cotton Collection • {sortedProducts.length} Products</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductList
          products={sortedProducts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          renderStars={renderStars}
          getColorHex={getColorHex}
          resetFilters={resetFilters}
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
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          FilterComponent={ProductFilters}
          brands={brands}
          colors={colors}
          sizes={sizes}
          materials={materials}
          fits={fits}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
      </div>

      {/* CSS */}
      <style jsx>{`
        .font-heading {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
        }
        
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default ProductPage2;