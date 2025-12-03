import { 
  Printer, 
  Layers, 
  Scan, 
  MessageSquare, 
  FileCheck, 
  Truck 
} from 'lucide-react';
import { NavItem, ServiceItem, TimelineStep, GalleryItem, FAQItem } from './types';

export const WHATSAPP_LINK = "https://wa.me/2348022247567?text=Hi%20BOMedia%2C%20I%20need%20a%20quote%20for%20large%20format%20printing.";
export const PHONE_DISPLAY = "+234 802 224 7567";
export const EMAIL_DISPLAY = "info@bomedia.ng";

export const NAV_LINKS: NavItem[] = [
  { label: 'What we print', href: '#what-we-print' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'flex',
    title: 'Flex Banners',
    description: 'Bold, durable outdoor banners for shops and events.',
    meta: 'Ready in 48–72 hrs',
    icon: Printer,
  },
  {
    id: 'sav',
    title: 'Self-Adhesive Vinyl (SAV)',
    description: 'Clean adhesive prints for walls, glass and boards.',
    meta: 'Perfect for branding spaces',
    icon: Layers,
  },
  {
    id: 'stickers',
    title: 'Window & Clear Stickers',
    description: 'Sharp branding that sits cleanly on glass.',
    meta: 'Professional finish, clear look',
    icon: Scan,
  },
];

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: 1,
    title: 'Send details',
    description: 'Tell us what you need on WhatsApp or via the form — size, material and quantity.',
    icon: MessageSquare,
  },
  {
    id: 2,
    title: 'Get quote & approve',
    description: 'We send you pricing and a proof. You confirm before we print.',
    icon: FileCheck,
  },
  {
    id: 3,
    title: 'We print & deliver',
    description: 'We produce and arrange pickup or Lagos delivery within 48–72 hours for standard jobs.',
    icon: Truck,
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, imageUrl: 'https://picsum.photos/600/400?random=1', caption: 'Shopfront flex banner' },
  { id: 2, imageUrl: 'https://picsum.photos/600/400?random=2', caption: 'Window branding' },
  { id: 3, imageUrl: 'https://picsum.photos/600/400?random=3', caption: 'Event back-drop banner' },
  { id: 4, imageUrl: 'https://picsum.photos/600/400?random=4', caption: 'Clear sticker details' },
  { id: 5, imageUrl: 'https://picsum.photos/600/400?random=5', caption: 'SAV Wall wrap' },
  { id: 6, imageUrl: 'https://picsum.photos/600/400?random=6', caption: 'Roll-up banner stand' },
];

export const FAQS: FAQItem[] = [
  {
    question: 'What do you print?',
    answer: 'We focus on large-format: flex banners, self-adhesive vinyl (SAV), window graphics and clear stickers. We don’t do business cards, flyers or books.',
  },
  {
    question: 'How is pricing calculated?',
    answer: 'Pricing depends on size (square metres), material, quantity and finishing. Share your job details and we’ll send a quote.',
  },
  {
    question: 'What file formats do you accept?',
    answer: 'PDF, AI, high-res JPG or PNG. Artwork should be clear and print-ready.',
  },
  {
    question: 'How long does printing take?',
    answer: 'Standard jobs are ready within 48–72 hours after artwork approval. Larger jobs may take longer.',
  },
  {
    question: 'Do you offer installation?',
    answer: 'We handle printing. Installation can be arranged separately on request.',
  },
  {
    question: 'Do you deliver?',
    answer: 'Yes, we deliver within Lagos or you can pick up from our location.',
  },
];
