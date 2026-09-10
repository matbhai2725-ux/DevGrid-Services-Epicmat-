/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ThreeHeroCanvas from './components/ThreeHeroCanvas';
import ServicesSection from './components/ServicesSection';
import InteractiveConfigurator from './components/InteractiveConfigurator';
import DevGridTerminal from './components/DevGridTerminal';
import MetricsAndTestimonials from './components/MetricsAndTestimonials';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';
import { ServiceItem, ServiceId } from './types';
import { SERVICES_DATA } from './data/servicesData';
import { playSound } from './utils/audio';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [activeFilterServiceId, setActiveFilterServiceId] = useState<string | null>(null);
  const [configuratorServiceId, setConfiguratorServiceId] = useState<ServiceId>('discord-bots');
  const [isTicketModalOpen, setIsTicketModalOpen] = useState<boolean>(false);
  const [preselectedTicketService, setPreselectedTicketService] = useState<ServiceItem | null>(null);
  const [prefilledTicketSummary, setPrefilledTicketSummary] = useState<string>('');

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFrom3D = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setActiveFilterServiceId(serviceId);
    const targetService = SERVICES_DATA.find((s) => s.id === serviceId);
    if (targetService) {
      setConfiguratorServiceId(targetService.id);
    }
    // Scroll to services section
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroServiceFilter = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setActiveFilterServiceId(serviceId);
    const targetService = SERVICES_DATA.find((s) => s.id === serviceId);
    if (targetService) {
      setConfiguratorServiceId(targetService.id);
    }
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (service: ServiceItem) => {
    setConfiguratorServiceId(service.id);
    const el = document.getElementById('configurator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenTicketWithService = (service: ServiceItem) => {
    setPreselectedTicketService(service);
    setPrefilledTicketSummary(`Interested in ${service.title} (${service.tagline})\nEstimated Starting Price: ${service.startingPrice}`);
    setIsTicketModalOpen(true);
  };

  const handleOpenTicketWithPayload = (summary: string) => {
    setPrefilledTicketSummary(summary);
    setIsTicketModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-[#f1f5f9] flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Sticky Navigation */}
      <Navbar
        onOpenTicket={() => {
          setPreselectedTicketService(null);
          setPrefilledTicketSummary('');
          setIsTicketModalOpen(true);
        }}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExploreServices={() => handleNavigate('services')}
          onOpenConfigurator={() => handleNavigate('configurator')}
          onOpenTicket={() => {
            setPreselectedTicketService(null);
            setPrefilledTicketSummary('');
            setIsTicketModalOpen(true);
          }}
          onSelectServiceFilter={handleHeroServiceFilter}
        />

        {/* 3D Interactive Quantum Simulation Stage */}
        <section id="three-hero" className="relative border-b border-slate-800/80">
          <ThreeHeroCanvas
            onSelectService={handleSelectServiceFrom3D}
            selectedServiceId={selectedServiceId}
          />
        </section>

        {/* Core Services Section */}
        <ServicesSection
          onSelectServiceForQuote={handleSelectServiceForQuote}
          onOpenTicketWithService={handleOpenTicketWithService}
          activeFilterId={activeFilterServiceId}
        />

        {/* Interactive Configurator & Pricing Calculator */}
        <InteractiveConfigurator
          initialServiceId={configuratorServiceId}
          onOpenTicketWithPayload={handleOpenTicketWithPayload}
        />

        {/* Live Cloud Terminal & Node Telemetry */}
        <DevGridTerminal />

        {/* Infrastructure Specs, Testimonials & FAQ */}
        <MetricsAndTestimonials />
      </main>

      {/* Footer */}
      <Footer
        onOpenTicket={() => {
          setPreselectedTicketService(null);
          setPrefilledTicketSummary('');
          setIsTicketModalOpen(true);
        }}
        onNavigate={handleNavigate}
      />

      {/* Global Ticket Dispatch Modal */}
      <ContactModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        preselectedService={preselectedTicketService}
        prefilledSummary={prefilledTicketSummary}
      />
    </div>
  );
}
