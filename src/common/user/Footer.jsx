import React from 'react';
import logoMain from '../../assets/common/logoMain.png';
import { useGetCategoryQuery } from '../../features/category/categoryApi';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { data: categories, isLoading: categoriesLoading } = useGetCategoryQuery();
  return (
 
    <footer className="bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-4 p-6 md:p-11">
        <div className="col-span-1 sm:col-span-3 md:col-span-5 font-semibold text-xl tracking-wider mb-4">
          Categories
        </div>
        {categories && categories.length > 0 ? (
          categories
            .filter(category => category.parent_id != null)
            .map((category, index) => (
              <Link key={index} to={`/explore/${category.id}`} className="hover:text-blue-600">
                <div className="mb-2">{category.name}</div>
              </Link>
            ))
        ) : null}
      </div>

      <div className="border-t border-gray-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-around items-start md:items-center space-y-6 md:space-y-0 md:space-x-20">
          <img className="h-10 w-auto" src={logoMain} alt="Logo" />

          <div className="flex flex-col sm:flex-row gap-10 md:gap-28 w-full md:w-auto">
            <div className="flex flex-col space-y-2 min-w-[120px]">
              <div className="font-semibold text-lg">Ultras</div>
              <div className="hover:underline cursor-pointer">About Us</div>
              <div className="hover:underline cursor-pointer">Careers</div>
              <div className="hover:underline cursor-pointer">Affiliate Programs</div>
            </div>
            <div className="flex flex-col space-y-2 min-w-[160px]">
              <div className="font-semibold text-lg">Customer Services</div>
              <div className="hover:underline cursor-pointer">FAQs</div>
              <div className="hover:underline cursor-pointer">Contacts</div>
              <div className="hover:underline cursor-pointer">Privacy Policy</div>
              <div className="hover:underline cursor-pointer">Return and Refunds</div>
              <div className="hover:underline cursor-pointer">Delivery Partners</div>
            </div>
          </div>

          <div className="flex flex-col max-w-xs">
            <div className="font-semibold text-lg mb-1">Subscribe Us</div>
            <div className="text-sm text-gray-600">
              Subscribe to our newsletters to get updates about our grand offers
            </div>
          </div>
        </div>
      </div>
    </footer>

  );
};

export default Footer;