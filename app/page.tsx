import Hero from '@/components/sections/Hero';
// import Features from '@/components/sections/Features';
import Stats from '@/components/sections/Stats';
import ClassSchedule from '@/components/sections/ClassSchedule';
import FitnessTracker from '@/components/features/FitnessTracker';
import Trainers from '@/components/sections/Trainers';
import TestimonialsSection from '@/components/sections/TestimonialSection';
import Pricing from '@/components/sections/Pricing';
// import GallerySection from '@/components/sections/GallerySection';
import CallToAction from '@/components/sections/CallToAction';
import NewsletterForm from '@/components/ui/NewsletterForm';

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <Features /> */}
      <Stats />
      <ClassSchedule />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FitnessTracker />
          </div>
          <div className="lg:col-span-1">
            <NewsletterForm />
          </div>
        </div>
      </div>
      
      <Trainers />
      <TestimonialsSection />
      <Pricing />
      {/* <GallerySection /> */}
      <CallToAction />
    </>
  );
}