import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_LINK, HERO_IMAGES } from '../../constants';

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-slate-50 pt-32 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 rounded-full px-4 py-1.5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              <span className="text-sm font-medium text-primary-800">Open for orders in Lagos</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Premium Large Format <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-primary-500">
                Printing Solutions
              </span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              From vibrant flex banners to precision window graphics, we deliver professional quality prints that make your brand stand out. Fast turnaround, competitive pricing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href={WHATSAPP_LINK}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-primary-700/20"
              >
                Get a Quote
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#gallery"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-primary-700 text-slate-700 hover:text-primary-700 px-8 py-4 rounded-full font-semibold transition-all"
              >
                View Our Work
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-500" />
                <span>48hr Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-500" />
                <span>High Resolution</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-500" />
                <span>Free Consultation</span>
              </div>
            </div>
          </div>

          {/* Hero Image Slideshow */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-2xl ring-1 ring-slate-900/5 transform transition-transform hover:scale-[1.01] duration-500">

              {HERO_IMAGES.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`Large format print example ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                />
              ))}

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}