import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

const Lightbox = ({ items, currentIndex, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (currentIndex === null || !items || !items[currentIndex]) return null;

  const current = items[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fadeIn">
      {/* Top Bar */}
      <div className="flex items-center justify-between text-white z-10">
        <div className="text-sm font-medium text-cream-200">
          <span>{currentIndex + 1} / {items.length}</span>
          <span className="mx-2 text-cream-400">•</span>
          <span className="font-semibold text-white">{current.title_hi || current.title}</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={current.image_url || current.src}
            download={`chhath-puja-${currentIndex + 1}.jpg`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Download image"
          >
            <Download className="w-5 h-5" />
          </a>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 select-none">
        {/* Prev Button */}
        {items.length > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-2 sm:left-6 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-110 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <img
          src={current.image_url || current.src}
          alt={current.title_hi || current.title || 'Chhath Puja image'}
          className="max-h-[75vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transition-all"
        />

        {/* Next Button */}
        {items.length > 1 && (
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-6 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-110 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Caption */}
      <div className="text-center py-2 text-cream-100 max-w-2xl mx-auto">
        <h3 className="text-base sm:text-lg font-bold text-gold-300 font-hindi">
          {current.title_hi || current.title}
        </h3>
        {(current.caption_hi || current.caption) && (
          <p className="text-xs sm:text-sm text-cream-200/80 mt-1 font-hindi">
            {current.caption_hi || current.caption}
          </p>
        )}
      </div>
    </div>
  );
};

export default Lightbox;

