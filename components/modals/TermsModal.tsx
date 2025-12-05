import React from 'react';
import { X } from 'lucide-react';

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-900">Terms of Service</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                        <p className="text-sm text-slate-500 mb-6">Last updated: December 2025</p>

                        <div className="prose prose-slate max-w-none">
                            <p className="text-slate-700 mb-6">
                                By engaging <strong>Broad Options Media (BOMedia)</strong> or submitting artwork for printing, you agree to the terms below.
                            </p>

                            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Our Services</h3>
                            <p className="text-slate-600 mb-4">
                                BOMedia specialises in <strong>large-format printing</strong>, including banners, self-adhesive vinyl (SAV), window graphics, wall branding, and related custom print materials.
                            </p>

                            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Artwork & Design Responsibility</h3>
                            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                                <li>Customers are responsible for providing <strong>correct, print-ready artwork</strong>.</li>
                                <li>All files are reviewed and must be approved <strong>before printing begins</strong>.</li>
                                <li>Once artwork is approved, BOMedia is <strong>not responsible</strong> for spelling errors, layout issues, or incorrect content supplied by the customer.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Colour Variation Disclaimer</h3>
                            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                                <li>Printed output may vary slightly from on-screen colours due to materials, ink behaviour, and lighting.</li>
                                <li>Exact colour matching is not guaranteed unless previously discussed and agreed in writing.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Turnaround Time</h3>
                            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                                <li>Production timelines begin <strong>only after artwork approval and payment confirmation</strong>.</li>
                                <li>Turnaround estimates may change based on job size, finishing, or workload.</li>
                                <li>Same-day or urgent jobs must be clearly stated beforehand.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Payment Terms</h3>
                            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                                <li>Payment (full or agreed percentage) is required <strong>before production starts</strong>.</li>
                                <li>Jobs will not be printed without confirmed payment and approved artwork.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Refunds & Reprints</h3>
                            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                                <li>All printing jobs are customised. <strong>Refunds are not available once production begins</strong>.</li>
                                <li>If an error is confirmed to be from BOMedia, a reprint may be offered at our discretion.</li>
                                <li>Any approved refund is limited strictly to the printing cost.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Limitation of Liability</h3>
                            <p className="text-slate-600 mb-4">
                                BOMedia's maximum liability is limited to <strong>reprinting the affected job</strong>.
                                We are not liable for indirect losses such as missed promotions, events, or business downtime.
                            </p>

                            <p className="text-slate-600 mt-6">
                                For questions, contact:{' '}
                                <a href="mailto:info@bomedia.ng" className="text-primary-700 hover:text-primary-800 font-medium">
                                    info@bomedia.ng
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4">
                        <button
                            onClick={onClose}
                            className="w-full bg-primary-700 hover:bg-primary-800 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                        >
                            I Understand
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;
