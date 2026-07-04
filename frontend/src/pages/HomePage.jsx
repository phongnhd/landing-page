import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Specifications from '../components/sections/Specifications';
import Gallery from '../components/sections/Gallery';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Specifications />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
