import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DonationModal } from '@/components/DonationModal';
import { FloatingDonateButton } from '@/components/FloatingDonateButton';
import { HeroSection } from '@/sections/HeroSection';
import { OrariSection } from '@/sections/OrariSection';
import { StoriaSection } from '@/sections/StoriaSection';
import { CaritasSection } from '@/sections/CaritasSection';
import { DownloadSection } from '@/sections/DownloadSection';
import { ContattiSection } from '@/sections/ContattiSection';
import { SupportersSection } from '@/sections/SupportersSection';

function App() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const openDonationModal = () => setIsDonationModalOpen(true);
  const closeDonationModal = () => setIsDonationModalOpen(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header onDonateClick={openDonationModal} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection onDonateClick={openDonationModal} />

        {/* Orari Section */}
        <OrariSection />

        {/* Storia & Galleria Section */}
        <StoriaSection />

        {/* Caritas Section */}
        <CaritasSection />

        {/* Supporters Section */}
        <SupportersSection />

        {/* Download Section */}
        <DownloadSection />

        {/* Contatti Section */}
        <ContattiSection />
      </main>

      {/* Footer */}
      <Footer onDonateClick={openDonationModal} />

      {/* Floating Donate Button */}
      <FloatingDonateButton onClick={openDonationModal} />

      {/* Donation Modal */}
      <DonationModal isOpen={isDonationModalOpen} onClose={closeDonationModal} />
    </div>
  );
}

export default App;
