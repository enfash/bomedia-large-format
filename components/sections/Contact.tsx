import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, Upload, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';
import { WHATSAPP_LINK, PHONE_DISPLAY, EMAIL_DISPLAY } from '../../constants';
import { ContactFormData } from '../../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    jobType: 'Flex Banner',
    message: '',
    file: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    console.log("Form Submitted:", formData);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({
      name: '',
      phone: '',
      email: '',
      jobType: 'Flex Banner',
      message: '',
      file: null
    });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left Side: Info */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                Ready to print?
              </h2>
              <p className="text-lg text-slate-600">
                Send your job details and artwork and we’ll reply with a quote.
              </p>
            </div>

            <div className="space-y-6">
              <Button href={WHATSAPP_LINK} target="_blank" size="lg" className="w-full sm:w-auto gap-2">
                <MessageCircle size={20} />
                WhatsApp BOMedia
              </Button>
              
              <div className="pt-6 border-t border-slate-100 space-y-4">
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary-600">
                    <Phone size={20} />
                  </div>
                  <span className="font-medium">{PHONE_DISPLAY}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary-600">
                    <Mail size={20} />
                  </div>
                  <a href={`mailto:${EMAIL_DISPLAY}`} className="font-medium hover:text-primary-600 transition-colors">
                    {EMAIL_DISPLAY}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-slate-50 rounded-3xl p-8 lg:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
            {isSuccess ? (
              <div className="absolute inset-0 bg-slate-50 flex flex-col items-center justify-center text-center p-8 z-10 animate-fade-in">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
                <p className="text-slate-600">
                  Thanks! We’ve received your request. We’ll get back to you shortly.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 text-primary-600 font-medium hover:text-primary-700"
                >
                  Send another request
                </button>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="080..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">Email (Optional)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="jobType" className="text-sm font-medium text-slate-700">Job Type <span className="text-red-500">*</span></label>
                <select
                  id="jobType"
                  name="jobType"
                  required
                  value={formData.jobType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="Flex Banner">Flex Banner</option>
                  <option value="Self-Adhesive Vinyl (SAV)">Self-Adhesive Vinyl (SAV)</option>
                  <option value="Window / Clear Sticker">Window / Clear Sticker</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700">Message <span className="text-red-500">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Size, quantity, deadline, any notes..."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="file" className="text-sm font-medium text-slate-700">Upload artwork (Optional)</label>
                <div className="relative">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label 
                    htmlFor="file" 
                    className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-primary-500 hover:bg-slate-50 transition-all text-slate-500"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    <span className="truncate">{formData.file ? formData.file.name : 'Choose a file'}</span>
                  </label>
                </div>
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Get Quote'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;