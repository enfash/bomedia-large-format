import React from 'react';
import { TIMELINE_STEPS } from '../../constants';
import { ChevronRight, ArrowDown } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            How it works
          </h2>
          <div className="h-1 w-20 bg-primary-500 rounded-full"></div>
        </div>

        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-12 left-12 right-12 h-0.5 bg-slate-200 -z-10"></div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {TIMELINE_STEPS.map((step, index) => (
              <div key={step.id} className="relative flex flex-col md:items-center md:text-center">
                {/* Mobile Connecting Line */}
                {index !== TIMELINE_STEPS.length - 1 && (
                  <div className="md:hidden absolute left-6 top-16 bottom-0 w-0.5 bg-slate-200 -z-10"></div>
                )}

                <div className="flex items-center md:flex-col gap-6 md:gap-0">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white border-2 border-primary-100 rounded-full flex items-center justify-center text-primary-600 shadow-sm z-10 md:mb-6">
                      <span className="font-bold text-lg md:text-xl">{step.id}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 pt-1 md:pt-0">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;