import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useScrollTo } from '../hooks';
import { playSnapSound, playTreatDropSound } from '../soundEffects';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalItems,
    subtotal,
    shipping,
    total,
  } = useCart();

  const navigate = useNavigate();
  const scrollTo = useScrollTo();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const freeShippingThreshold = 3000;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-[#1E1E1E]/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDF8F3] border-l-2 border-[#1E1E1E] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 bg-white border-b-2 border-[#1E1E1E] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#CE1B3D]" />
              <h2 className="font-display font-black text-xl text-[#1E1E1E]">
                Your Adventure Cart
              </h2>
              {totalItems > 0 && (
                <span className="bg-[#CE1B3D] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </div>

            <button
              onClick={closeCart}
              aria-label="Close cart drawer"
              className="w-8 h-8 rounded-full border border-[#1E1E1E] bg-[#FDF8F3] hover:bg-neutral-200 flex items-center justify-center font-bold text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {subtotal > 0 && (
            <div className="bg-[#D2F4E2] px-6 py-3 border-b-2 border-[#1E1E1E] text-xs">
              {amountToFreeShipping > 0 ? (
                <p className="text-[#1E1E1E] font-bold mb-1">
                  Add <span className="text-[#CE1B3D]">₹{amountToFreeShipping.toLocaleString('en-IN')}</span> more for <span className="underline">Free Shipping!</span>
                </p>
              ) : (
                <p className="text-[#00C371] font-black flex items-center gap-1.5 mb-1">
                  <span>🎉</span> You unlocked Free Standard Shipping!
                </p>
              )}
              <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-[#1E1E1E]">
                <div
                  className="bg-[#00C371] h-full rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-3xl bg-[#FFDFDF] border-2 border-[#1E1E1E] flex items-center justify-center text-3xl mb-4 shadow-sm">
                  🐾
                </div>
                <h3 className="font-display font-black text-xl text-[#1E1E1E] mb-2">
                  Your trail is empty.
                </h3>
                <p className="text-xs text-[#1E1E1E]/70 max-w-xs mb-6 font-medium">
                  Ready to craft an unforgettable play experience for your dog?
                </p>
                <button
                  onClick={() => {
                    playSnapSound();
                    closeCart();
                    scrollTo('trail-builder');
                  }}
                  className="bg-[#CE1B3D] hover:bg-[#B51634] text-white font-black px-6 py-3 rounded-full text-xs border-2 border-[#1E1E1E] shadow-pop-hover cursor-pointer"
                >
                  Build an adventure →
                </button>
              </div>
            ) : (
              items.map((item, idx) => {
                const cardColor = idx % 2 === 0 ? 'bg-white' : 'bg-[#FFDFDF]/50';
                return (
                  <div
                    key={item.id}
                    className={`${cardColor} rounded-2xl p-4 border-2 border-[#1E1E1E] shadow-xs flex flex-col justify-between`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h4 className="font-display font-black text-sm text-[#1E1E1E] leading-snug">
                          {item.name}
                        </h4>
                        {item.difficulty && (
                          <span className="inline-block mt-1 text-[9px] uppercase font-black px-2 py-0.5 rounded-full bg-[#D2F4E2] border border-[#1E1E1E] text-[#1E1E1E]">
                            {item.difficulty}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          playSnapSound();
                          removeItem(item.id);
                        }}
                        aria-label="Remove item"
                        className="text-[#1E1E1E]/60 hover:text-[#CE1B3D] p-1 cursor-pointer font-bold text-xs"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#1E1E1E]/20">
                      <span className="font-display font-black text-base text-[#1E1E1E]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>

                      <div className="flex items-center gap-2 bg-white rounded-full p-1 border border-[#1E1E1E]">
                        <button
                          onClick={() => {
                            playSnapSound();
                            updateQuantity(item.id, item.quantity - 1);
                          }}
                          className="w-5 h-5 rounded-full bg-[#FDF8F3] hover:bg-neutral-200 text-[#1E1E1E] flex items-center justify-center font-bold text-xs cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-[#1E1E1E] px-1 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            playTreatDropSound();
                            updateQuantity(item.id, item.quantity + 1);
                          }}
                          className="w-5 h-5 rounded-full bg-[#FDF8F3] hover:bg-neutral-200 text-[#1E1E1E] flex items-center justify-center font-bold text-xs cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Sticky Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t-2 border-[#1E1E1E] space-y-4">
              <div className="space-y-1.5 text-xs font-medium">
                <div className="flex items-center justify-between text-[#1E1E1E]/70">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#1E1E1E] font-mono">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#1E1E1E]/70">
                  <span>Shipping</span>
                  <span className="font-bold text-[#1E1E1E] font-mono">
                    {shipping === 0 ? (
                      <span className="text-[#00C371] font-black">FREE</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-black text-[#1E1E1E] pt-2 border-t border-[#1E1E1E]/20">
                  <span>Total</span>
                  <span className="font-display font-black text-2xl text-[#CE1B3D]">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  playSnapSound();
                  closeCart();
                  navigate('/checkout');
                }}
                className="w-full py-4 bg-[#CE1B3D] hover:bg-[#B51634] text-white font-black rounded-full text-xs uppercase tracking-wider border-2 border-[#1E1E1E] shadow-pop-hover transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout →</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
