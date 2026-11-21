import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import ModuleShowcase from './components/ModuleShowcase';
import DogExperience from './components/DogExperience';
import ProductSection from './components/ProductSection';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';

function HomePage() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <ModuleShowcase />
      <DogExperience />
      <ProductSection />
    </main>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#FDF8F3] text-[#1E1E1E]">
      <Navbar />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
