import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">BOMedia</h3>
            <p className="text-sm">Large-format printing for Lagos businesses.</p>
          </div>
          
          <div className="flex gap-8 text-sm">
            <span className="hover:text-white cursor-not-allowed">Privacy</span>
            <span className="hover:text-white cursor-not-allowed">Terms</span>
          </div>
          
          <div className="text-sm">
            &copy; {currentYear} BOMedia. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;