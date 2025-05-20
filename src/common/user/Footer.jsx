import React from 'react';
import logoMain from '../../assets/common/logoMain.png';
import { useGetCategoryQuery } from '../../features/category/categoryApi';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { data: categories, isLoading: categoriesLoading } = useGetCategoryQuery();
  return (
    <footer className=''>
      <div className='grid grid-cols-5 grid-rows-5 gap-x-10 gap-y-1 m-11'>
        <div className='col-span-5 block font-semibold text-xl tracking-wider mb-3'>Categories</div>
        {categories && categories.length > 0 ? (
          categories
            .filter(category => category.parent_id != null)
            .map((category, index) => (
               <Link key={index} to={`/explore/${category.id}`}>
              <div >{category.name}</div></Link>
            ))
        ) : null}


      </div>
      <div className='border border-gray-100 p-4'>
        <div className='flex justify-around ml-5'>
          <img className="h-10 w-auto" src={logoMain} alt="Logo" />
          <div className='flex justify-evenly gap-28'>
            <div className='flex flex-col'>
              <div className='font-semibold text-lg'>Ultras</div>
              <div>About Us</div>
              <div>Careers</div>
              <div>Affilate Programs</div>
            </div>
            <div className='flex flex-col'>
              <div className='font-semibold text-lg'>Customer Services</div>
              <div>FAQs</div>
              <div>Contacts</div>
              <div>Privacy Policy</div>
              <div>Return and Refunds</div>
              <div>Delivery Partners</div>
            </div>
          </div>
          <div className='flex flex-col '>
            <div className='font-semibold text-lg'>Subscribe Us</div>
            <div>Subscribe to our newsletters to get updates </div>
            <div>about our grand offers </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;