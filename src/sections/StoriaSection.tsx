import { useState } from 'react';
import { historyEvents, galleryImages } from '@/data/mockData';
import { History, X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export function StoriaSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section id="storia" className="py-24 bg-slate-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 mb-6">
            <History className="w-4 h-4" />
            <span className="text-sm font-medium">La Nostra Storia</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-slate-800 font-bold mb-6">
            Sei Secoli di Fede
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Dalla fondazione nel 1534 ad oggi, la nostra parrocchia ha accompagnato
            generazioni di fedeli nel loro cammino spirituale.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="space-y-16">
            {historyEvents.map((event, index) => (
              <div
                key={event.id}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative group">
                    <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    {/* Year badge */}
                    <div className="absolute -bottom-4 -right-4 lg:-right-8 bg-amber-500 text-white px-6 py-3 rounded-2xl shadow-lg">
                      <span className="font-serif text-2xl font-bold">{event.year}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-2 text-amber-700 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{event.year}</span>
                  </div>
                  <h3 className="font-serif text-3xl text-slate-800 font-bold mb-4">
                    {event.title}
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl text-slate-800 font-bold mb-4">
              Galleria Storica
            </h3>
            <p className="text-slate-600">
              Un tuffo nel passato grazie alle nostre fotografie tramandate di generazione in generazione.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => openLightbox(index)}
                className={`group relative overflow-hidden rounded-2xl ${index === 0 ? 'col-span-2 row-span-2' : ''
                  }`}
              >
                <div
                  className={`${index === 0 ? 'aspect-square' : 'aspect-[4/3]'
                    }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-medium">{image.caption}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[80vh] px-16">
            <img
              src={galleryImages[currentImageIndex].src}
              alt={galleryImages[currentImageIndex].alt}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            <p className="text-white/80 text-center mt-4 text-lg">
              {galleryImages[currentImageIndex].caption}
            </p>
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
