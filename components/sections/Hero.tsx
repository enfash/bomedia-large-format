import React from 'react';
import { ArrowRight, UploadCloud } from 'lucide-react';
import Button from '../ui/Button';
import { WHATSAPP_LINK } from '../../constants';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary-100/50 rounded-full blur-3xl opacity-60 -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl opacity-60 -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text */}
          <div className="flex flex-col items-start text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                Large-format printing that puts your brand on the street — <span className="text-primary-600">fast</span>.
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 max-w-lg leading-relaxed">
                We specialise in flex banners, self-adhesive vinyl, window graphics and clear stickers for Lagos businesses.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button href={WHATSAPP_LINK} target="_blank" variant="primary" size="lg" className="w-full sm:w-auto">
                Get a quick quote on WhatsApp
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button href="#contact" variant="outline" size="lg" className="w-full sm:w-auto">
                <UploadCloud className="mr-2 h-4 w-4" />
                Upload artwork
              </Button>
            </div>

            {/* Stats Bar (Desktop placement) */}
            <div className="hidden lg:grid grid-cols-3 gap-8 pt-8 border-t border-slate-200 w-full">
              <div>
                <p className="text-2xl font-bold text-slate-900">500+</p>
                <p className="text-sm text-slate-500 font-medium">Print jobs completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">48–72 hrs</p>
                <p className="text-sm text-slate-500 font-medium">Typical turnaround</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">Lagos</p>
                <p className="text-sm text-slate-500 font-medium">Fast local delivery</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="relative">
             {/* "Pedestal" Effect Container */}
            <div className="relative z-10 mx-auto max-w-md lg:max-w-full">
              <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-2xl ring-1 ring-slate-900/5 transform transition-transform hover:scale-[1.01] duration-500">
                {/* Product Image Placeholder */}
                <img 
                  src="https://picsum.photos/800/1000?random=hero" 
                  alt="Large format print example" 
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Label */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50">
                    <p className="text-xs font-bold tracking-wider text-primary-700 uppercase mb-1">
                      Featured Products
                    </p>
                    <p className="text-sm font-medium text-slate-900">
                      Flex Banners • SAV • Window Graphics
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements behind card */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>
          </div>

           {/* Stats Bar (Mobile placement) */}
           <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 lg:hidden w-full pt-4 border-t border-slate-200">
              <div className="col-span-1">
                <p className="text-2xl font-bold text-slate-900">500+</p>
                <p className="text-sm text-slate-500 font-medium">Print jobs completed</p>
              </div>
              <div className="col-span-1">
                <p className="text-2xl font-bold text-slate-900">48–72 hrs</p>
                <p className="text-sm text-slate-500 font-medium">Typical turnaround</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="text-2xl font-bold text-slate-900">Lagos</p>
                <p className="text-sm text-slate-500 font-medium">Fast local delivery</p>
              </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;