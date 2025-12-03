import React from 'react';
import { GALLERY_ITEMS } from '../../constants';

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Recent prints
          </h2>
          <p className="text-lg text-slate-600">Some of our work around Lagos.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className="group relative overflow-hidden rounded-2xl bg-slate-100 aspect-[4/3] cursor-pointer"
            >
              <img 
                src={item.imageUrl} 
                alt={item.caption} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6">
                  <p className="text-white font-medium text-lg">{item.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;