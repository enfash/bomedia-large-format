import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_LINK } from '../../constants';

const WhatsAppFloat: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling 300px
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
                }`}
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={24} />

            {/* Pulse animation ring */}
            <span className="absolute inset-0 rounded-full bg-green-600 animate-ping opacity-20"></span>
        </a>
    );
};

export default WhatsAppFloat;
