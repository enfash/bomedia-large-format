import React from 'react';
import { SERVICES } from '../../constants';

const Services: React.FC = () => {
  return (
    <section id="what-we-print" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            What we print
          </h2>
          <p className="text-lg text-slate-600">
            Focused large-format printing for brands, shops and events in Lagos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              className="group relative p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                <service.icon size={24} />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-700 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-slate-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="inline-flex items-center text-xs font-semibold text-primary-700 bg-primary-50 px-3 py-1 rounded-full">
                {service.meta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;