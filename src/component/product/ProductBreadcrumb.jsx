import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductBreadcrumb = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-[#9CA3AF]">/</span>}
              {item.path ? (
                <button 
                  onClick={() => navigate(item.path)} 
                  className="text-[#6B7280] hover:text-[#182E72] transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <span className="text-[#182E72] font-medium">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductBreadcrumb;