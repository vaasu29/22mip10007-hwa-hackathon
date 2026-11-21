import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { playSnapSound, playUnlockChime } from '../soundEffects';
import type { CheckoutFormData } from '../types';

export default function CheckoutPage() {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    paymentMethod: 'upi',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim()) errs.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Valid email required';

    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) errs.phone = '10-digit phone number required';

    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.state.trim()) errs.state = 'State is required';

    if (!formData.pinCode.trim()) errs.pinCode = 'PIN code is required';
    else if (!/^\d{6}$/.test(formData.pinCode.trim())) errs.pinCode = '6-digit PIN code required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    playSnapSound();
    if (promoCode.trim().toUpperCase() === 'ADVENTURE10') {
      setDiscountPercent(10);
      setPromoMessage('10% demo discount applied! 🎉');
    } else if (promoCode.trim().toUpperCase() === 'PUPSOCIETY') {
      setDiscountPercent(15);
      setPromoMessage('15% PupSociety member discount applied! 🐾');
    } else {
      setDiscountPercent(0);
      setPromoMessage('Invalid promo code. Try "ADVENTURE10"');
    }
  };

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = Math.max(0, total - discountAmount);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    playUnlockChime();
    const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
    const generatedOrderNo = `TT-${randomChars}`;
    setOrderNumber(generatedOrderNo);
    setOrderComplete(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishAndClear = () => {
    playSnapSound();
    clearCart();
    navigate('/');
  };

  if (orderComplete) {
    return (
      <div className="pt-28 pb-24 px-4 sm:px-6 max-w-2xl mx-auto min-h-screen">
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border-2 border-[#1E1E1E] shadow-pop text-center relative overflow-hidden">
          
          <div className="w-20 h-20 rounded-full bg-[#D2F4E2] border-2 border-[#1E1E1E] text-[#00C371] flex items-center justify-center mx-auto mb-6 shadow-xs">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <span className="bg-[#FFDFDF] border border-[#1E1E1E] text-[#1E1E1E] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3 inline-block">
            ORDER CONFIRMED
          </span>

          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#1E1E1E] mb-3 leading-tight">
            Adventure booked!
          </h1>

          <div className="inline-block bg-[#FDF8F3] px-4 py-2 rounded-2xl border-2 border-[#1E1E1E] mb-6 font-mono font-bold text-[#1E1E1E] text-base">
            Order #{orderNumber}
          </div>

          <p className="text-xs sm:text-sm text-[#1E1E1E]/80 leading-relaxed mb-8 max-w-lg mx-auto font-medium">
            Your Treasure Trails adventure is ready to begin. We're packing your modular challenge pieces with care.
            A dispatch confirmation will be sent to <span className="font-bold text-[#1E1E1E]">{formData.email}</span>.
          </p>

          <div className="bg-[#D2F4E2] rounded-2xl p-5 mb-8 text-left border-2 border-[#1E1E1E] text-xs font-medium">
            <div className="flex items-center justify-between font-bold text-[#1E1E1E] mb-2">
              <span>Shipping To:</span>
              <span className="text-[#00C371] font-black">Standard Delivery (2–4 Days)</span>
            </div>
            <p className="font-black text-sm text-[#1E1E1E]">{formData.fullName}</p>
            <p className="text-[#1E1E1E]/80">{formData.address}, {formData.city}, {formData.state} — {formData.pinCode}</p>
            <p className="mt-1 text-[11px] text-[#1E1E1E]/70 font-mono">Payment: {formData.paymentMethod.toUpperCase()} (Demo Prototype)</p>
          </div>

          <button
            onClick={handleFinishAndClear}
            className="w-full sm:w-auto px-8 py-4 bg-[#CE1B3D] hover:bg-[#B51634] text-white font-black text-xs uppercase tracking-wider rounded-full border-2 border-[#1E1E1E] shadow-pop-hover cursor-pointer transition-all"
          >
            Continue Shopping →
          </button>

        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-36 pb-24 px-4 text-center min-h-screen">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-[#FFDFDF] border-2 border-[#1E1E1E] flex items-center justify-center text-3xl mx-auto mb-4">
            🛒
          </div>
          <h1 className="font-display font-black text-2xl text-[#1E1E1E] mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-xs text-[#1E1E1E]/70 mb-6 font-medium">
            You don't have any modular sets in your cart to check out.
          </p>
          <Link
            to="/#trail-builder"
            className="inline-block bg-[#CE1B3D] text-white font-black px-6 py-3 rounded-full text-xs border-2 border-[#1E1E1E] shadow-pop-hover"
          >
            Build a Custom Trail →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 max-w-6xl mx-auto min-h-screen">
      
      {/* Breadcrumb */}
      <nav className="text-xs font-bold text-[#1E1E1E]/60 mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-[#1E1E1E]">Home</Link>
        <span>/</span>
        <span className="text-[#CE1B3D]">Secure Checkout</span>
      </nav>

      <h1 className="font-display font-black text-3xl sm:text-4xl text-[#1E1E1E] mb-8">
        Checkout & Adventure Booking
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Form */}
        <form onSubmit={handleSubmitOrder} className="lg:col-span-7 bg-white rounded-[2.5rem] p-6 sm:p-10 border-2 border-[#1E1E1E] shadow-pop space-y-8">
          
          {/* Contact Details */}
          <div>
            <h2 className="font-display font-black text-xl text-[#1E1E1E] mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1E1E1E] text-white font-mono text-xs flex items-center justify-center">1</span>
              <span>Contact Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-black uppercase tracking-wider text-[#1E1E1E] block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Maya Sharma"
                  className={`w-full p-3 bg-[#FDF8F3] border-2 rounded-2xl text-xs focus:outline-none focus:border-[#CE1B3D] ${
                    errors.fullName ? 'border-[#CE1B3D] bg-red-50' : 'border-[#1E1E1E]'
                  }`}
                />
                {errors.fullName && <span className="text-[10px] text-[#CE1B3D] font-bold mt-1 block">{errors.fullName}</span>}
              </div>

              <div>
                <label className="text-[11px] font-black uppercase tracking-wider text-[#1E1E1E] block mb-1">
                  Phone Number (10 digits) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="9876543210"
                  maxLength={10}
                  className={`w-full p-3 bg-[#FDF8F3] border-2 rounded-2xl text-xs focus:outline-none focus:border-[#CE1B3D] ${
                    errors.phone ? 'border-[#CE1B3D] bg-red-50' : 'border-[#1E1E1E]'
                  }`}
                />
                {errors.phone && <span className="text-[10px] text-[#CE1B3D] font-bold mt-1 block">{errors.phone}</span>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-black uppercase tracking-wider text-[#1E1E1E] block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="maya@example.com"
                  className={`w-full p-3 bg-[#FDF8F3] border-2 rounded-2xl text-xs focus:outline-none focus:border-[#CE1B3D] ${
                    errors.email ? 'border-[#CE1B3D] bg-red-50' : 'border-[#1E1E1E]'
                  }`}
                />
                {errors.email && <span className="text-[10px] text-[#CE1B3D] font-bold mt-1 block">{errors.email}</span>}
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="pt-6 border-t-2 border-[#1E1E1E]/20">
            <h2 className="font-display font-black text-xl text-[#1E1E1E] mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1E1E1E] text-white font-mono text-xs flex items-center justify-center">2</span>
              <span>Shipping Address</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-black uppercase tracking-wider text-[#1E1E1E] block mb-1">
                  Street Address *
                </label>
                <textarea
                  rows={2}
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Flat / House no., Street, Landmark"
                  className={`w-full p-3 bg-[#FDF8F3] border-2 rounded-2xl text-xs focus:outline-none focus:border-[#CE1B3D] ${
                    errors.address ? 'border-[#CE1B3D] bg-red-50' : 'border-[#1E1E1E]'
                  }`}
                />
                {errors.address && <span className="text-[10px] text-[#CE1B3D] font-bold mt-1 block">{errors.address}</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-black uppercase tracking-wider text-[#1E1E1E] block mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Bengaluru"
                    className={`w-full p-3 bg-[#FDF8F3] border-2 rounded-2xl text-xs focus:outline-none focus:border-[#CE1B3D] ${
                      errors.city ? 'border-[#CE1B3D] bg-red-50' : 'border-[#1E1E1E]'
                    }`}
                  />
                  {errors.city && <span className="text-[10px] text-[#CE1B3D] font-bold mt-1 block">{errors.city}</span>}
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase tracking-wider text-[#1E1E1E] block mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Karnataka"
                    className={`w-full p-3 bg-[#FDF8F3] border-2 rounded-2xl text-xs focus:outline-none focus:border-[#CE1B3D] ${
                      errors.state ? 'border-[#CE1B3D] bg-red-50' : 'border-[#1E1E1E]'
                    }`}
                  />
                  {errors.state && <span className="text-[10px] text-[#CE1B3D] font-bold mt-1 block">{errors.state}</span>}
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase tracking-wider text-[#1E1E1E] block mb-1">PIN Code (6 digits) *</label>
                  <input
                    type="text"
                    name="pinCode"
                    maxLength={6}
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    placeholder="560038"
                    className={`w-full p-3 bg-[#FDF8F3] border-2 rounded-2xl text-xs focus:outline-none focus:border-[#CE1B3D] ${
                      errors.pinCode ? 'border-[#CE1B3D] bg-red-50' : 'border-[#1E1E1E]'
                    }`}
                  />
                  {errors.pinCode && <span className="text-[10px] text-[#CE1B3D] font-bold mt-1 block">{errors.pinCode}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selector (matching pastel cards) */}
          <div className="pt-6 border-t-2 border-[#1E1E1E]/20">
            <h2 className="font-display font-black text-xl text-[#1E1E1E] mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1E1E1E] text-white font-mono text-xs flex items-center justify-center">3</span>
              <span>Payment Method (Simulated Demo)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'upi', label: 'UPI / QR', icon: '⚡', color: 'bg-[#FFDFDF]' },
                { id: 'card', label: 'Credit Card', icon: '💳', color: 'bg-[#D2F4E2]' },
                { id: 'cod', label: 'Cash on Del.', icon: '💵', color: 'bg-[#EFE3FF]' },
              ].map(method => {
                const isChecked = formData.paymentMethod === method.id;
                return (
                  <div
                    key={method.id}
                    onClick={() => {
                      playSnapSound();
                      setFormData(prev => ({ ...prev, paymentMethod: method.id as any }));
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      isChecked
                        ? `${method.color} border-[#1E1E1E] shadow-sm scale-102`
                        : 'border-[#1E1E1E]/30 bg-[#FDF8F3] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl">{method.icon}</span>
                      <div className={`w-4 h-4 rounded-full border-2 border-[#1E1E1E] flex items-center justify-center ${isChecked ? 'bg-[#1E1E1E]' : 'bg-white'}`}>
                        {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <p className="text-xs font-black text-[#1E1E1E]">{method.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#CE1B3D] hover:bg-[#B51634] text-white font-black text-xs uppercase tracking-wider rounded-full border-2 border-[#1E1E1E] shadow-pop-hover transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Place Demo Order — ₹{finalTotal.toLocaleString('en-IN')} →</span>
          </button>

        </form>

        {/* Right: Summary */}
        <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-6 sm:p-8 border-2 border-[#1E1E1E] shadow-pop sticky top-28 space-y-6">
          <h2 className="font-display font-black text-xl text-[#1E1E1E] pb-3 border-b-2 border-[#1E1E1E]">
            Order Summary ({items.length} item{items.length > 1 ? 's' : ''})
          </h2>

          <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-[#1E1E1E]/10 pr-1">
            {items.map(item => (
              <div key={item.id} className="pt-3 first:pt-0 flex items-start justify-between gap-3 text-xs">
                <div>
                  <p className="font-black text-[#1E1E1E]">{item.name}</p>
                  <p className="text-[10px] text-[#1E1E1E]/60">Qty: {item.quantity}</p>
                </div>
                <span className="font-mono font-bold text-[#1E1E1E]">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Promo code */}
          <form onSubmit={handleApplyPromo} className="pt-4 border-t-2 border-[#1E1E1E]/20">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#1E1E1E] block mb-1">
              Promo Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="ADVENTURE10"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                className="flex-1 p-2 bg-[#FDF8F3] border-2 border-[#1E1E1E] rounded-xl text-xs uppercase font-bold focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#1E1E1E] text-white text-xs font-bold rounded-xl border border-[#1E1E1E] cursor-pointer"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <span className={`text-[11px] font-bold mt-1.5 block ${discountPercent > 0 ? 'text-[#00C371]' : 'text-[#CE1B3D]'}`}>
                {promoMessage}
              </span>
            )}
          </form>

          {/* Totals */}
          <div className="pt-4 border-t-2 border-[#1E1E1E]/20 space-y-2 text-xs font-medium">
            <div className="flex justify-between text-[#1E1E1E]/70">
              <span>Subtotal</span>
              <span className="font-mono font-bold text-[#1E1E1E]">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#00C371] font-bold">
                <span>Discount ({discountPercent}%)</span>
                <span className="font-mono">- ₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-[#1E1E1E]/70">
              <span>Shipping</span>
              <span className="font-mono font-bold text-[#1E1E1E]">
                {shipping === 0 ? <span className="text-[#00C371] font-black">FREE</span> : `₹${shipping}`}
              </span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-[#1E1E1E]/20 font-black">
              <span>Total</span>
              <span className="font-display font-black text-2xl text-[#CE1B3D]">
                ₹{finalTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
