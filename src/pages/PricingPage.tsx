import React, { useState } from 'react';
import { useSaaS } from '../context/SaaSContext';
import { Check, CreditCard, Sparkles, TrendingUp, ShieldAlert, BadgeInfo, X, Smartphone, Loader2 } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { photographer, upgradeTier, t, currentLanguage } = useSaaS();
  const [selectedTierBilling, setSelectedTierBilling] = useState<'Free' | 'Pro' | 'Studio'>(photographer.tier);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  
  // Payment methods selection inside checkout
  const [paymentGateway, setPaymentGateway] = useState<'momo' | 'card'>('momo');
  const [momoNumber, setMomoNumber] = useState('0793216848');
  const [isProcessingmomo, setIsProcessingmomo] = useState(false);
  const [showMomoPinPrompt, setShowMomoPinPrompt] = useState(false);

  // Billing history mock using Rwandan Francs (RWF)
  const billingHistory = [
    { 
      id: 'inv-4458', 
      date: '2026-05-15', 
      amount: '20,000 RWF', 
      status: 'Paid', 
      method: 'MTN Mobile Money' 
    },
    { 
      id: 'inv-4122', 
      date: '2026-04-15', 
      amount: '20,000 RWF', 
      status: 'Paid', 
      method: 'MTN Mobile Money' 
    },
  ];

  const handleUpgradeTrigger = (tier: 'Free' | 'Pro' | 'Studio') => {
    setSelectedTierBilling(tier);
    setCheckoutModalOpen(true);
    // Reset MoMo states
    setIsProcessingmomo(false);
    setShowMomoPinPrompt(false);
  };

  const startMoMoFlow = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingmomo(true);
    
    // Simulate MOMO push notification delay
    setTimeout(() => {
      setIsProcessingmomo(false);
      setShowMomoPinPrompt(true);
    }, 2000);
  };

  const confirmMoMoPinSubmit = () => {
    // Approved! Upgrade tier
    upgradeTier(selectedTierBilling);
    setCheckoutModalOpen(false);
    setShowMomoPinPrompt(false);
    alert(`${t.successMoMoUpgrade} ${selectedTierBilling}!`);
  };

  const confirmUpgradeWithCard = () => {
    upgradeTier(selectedTierBilling);
    setCheckoutModalOpen(false);
  };

  // Get localized plan labels
  const getPlanLabel = (tierName: 'Free' | 'Pro' | 'Studio') => {
    if (tierName === 'Free') return t.freePlan;
    if (tierName === 'Pro') return t.proPlan;
    return t.studioPlan;
  };

  return (
    <div className="space-y-8 p-3 sm:p-6 lg:p-8 text-left animate-fade-in">
      
      {/* Header detail */}
      <div className="border-b border-gray-15 dark:border-gray-850 pb-5">
        <h1 className="text-2xl font-serif italic text-gray-900 dark:text-white sm:text-3xl tracking-tight">
          {t.pricingTitle}
        </h1>
        <p className="text-sm text-neutral-400 mt-1 dark:text-neutral-500">
          {t.pricingSub}
        </p>
      </div>

      {/* Subscription info badge banner */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-850 dark:bg-editorial-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm text-xs">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">{t.currentSubscription}</span>
          <p className="text-base font-black text-gray-900 dark:text-white flex items-center gap-2 font-sans">
            LuminaOS {getPlanLabel(photographer.tier)}
            <span className="inline-flex items-center rounded-full bg-editorial-tan text-editorial-dark px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider">
              {photographer.storageLimit} GB {t.limit}
            </span>
          </p>
          <span className="block text-gray-400 font-sans">{t.renewalText}</span>
        </div>

        <div className="bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800 px-4 py-3 rounded-xl max-w-sm text-neutral-400 font-semibold leading-relaxed font-sans">
          💡 {t.renewalAlert}
        </div>
      </div>

      {/* Structured Plans Grid to change tier */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
        
        {/* FREE PLAN */}
        <div className={`rounded-2xl border bg-white dark:bg-neutral-950 p-6 flex flex-col justify-between transition-all duration-350 ${
          photographer.tier === 'Free' ? 'border-2 border-editorial-tan dark:border-editorial-tan shadow-lg scale-[1.02]' : 'border-gray-100 dark:border-neutral-900 shadow-sm'
        }`}>
          <div>
            <div className="flex justify-between items-start">
              <h3 className="font-extrabold text-neutral-905 dark:text-white text-base">{t.freePlan}</h3>
              {photographer.tier === 'Free' && (
                <span className="bg-editorial-tan text-editorial-dark px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">{t.active}</span>
              )}
            </div>
            <p className="text-neutral-405 text-xs text-neutral-400 mt-1">{t.startingPoint}</p>
            
            <div className="mt-5 flex items-baseline">
              <span className="text-3xl font-black text-neutral-905 dark:text-white">0 RWF</span>
              <span className="text-xs text-neutral-400 ml-1">/ month</span>
            </div>

            <ul className="mt-6 space-y-3.5 text-xs text-gray-500 font-semibold dark:text-neutral-400">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> 5 GB High-Res Shares</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> 3 Active Albums</li>
              <li className="flex items-center gap-2 text-neutral-300 dark:text-neutral-800 shrink-0"><Check className="w-4 h-4 text-neutral-400" /> Passcode locks restricted</li>
            </ul>
          </div>

          <button
            onClick={() => handleUpgradeTrigger('Free')}
            disabled={photographer.tier === 'Free'}
            className="w-full py-2.5 mt-8 border rounded-xl text-xs font-bold text-gray-500 dark:text-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900 disabled:opacity-50 transition cursor-pointer"
          >
            {photographer.tier === 'Free' ? t.currentPackage : t.downgradeFree}
          </button>
        </div>

        {/* PRO PLAN */}
        <div className={`rounded-2xl border bg-white dark:bg-neutral-950 p-6 flex flex-col justify-between transition-all duration-350 ${
          photographer.tier === 'Pro' ? 'border-2 border-editorial-tan dark:border-editorial-tan shadow-lg scale-[1.02]' : 'border-gray-100 dark:border-neutral-900 shadow-sm'
        }`}>
          <div>
            <div className="flex justify-between items-start">
              <h3 className="font-extrabold text-neutral-905 dark:text-white text-base">{t.proPlan}</h3>
              {photographer.tier === 'Pro' && (
                <span className="bg-editorial-tan text-editorial-dark px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">{t.active}</span>
              )}
            </div>
            <p className="text-neutral-405 text-xs text-neutral-400 mt-1">{t.busyArtists}</p>
            
            <div className="mt-5 flex items-baseline">
              <span className="text-3xl font-black text-neutral-905 dark:text-white">20,000 RWF</span>
              <span className="text-xs text-neutral-400 ml-1">/ month</span>
            </div>

            <ul className="mt-6 space-y-3.5 text-xs text-gray-500 font-semibold dark:text-neutral-400">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> 100 GB Sharing Capacity</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Unlimited Album Galleries</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Passcode Passphrase Locking</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Granular Expiration & Logs</li>
            </ul>
          </div>

          <button
            onClick={() => handleUpgradeTrigger('Pro')}
            disabled={photographer.tier === 'Pro'}
            className="w-full py-2.5 mt-8 bg-neutral-950 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-955 dark:hover:bg-neutral-100 transition shadow-xs cursor-pointer"
          >
            {photographer.tier === 'Pro' ? t.currentPackage : t.upgradePro}
          </button>
        </div>

        {/* STUDIO PLAN */}
        <div className={`rounded-2xl border bg-white dark:bg-neutral-950 p-6 flex flex-col justify-between transition-all duration-350 ${
          photographer.tier === 'Studio' ? 'border-2 border-editorial-tan dark:border-editorial-tan shadow-lg scale-[1.02]' : 'border-gray-100 dark:border-neutral-900 shadow-sm'
        }`}>
          <div>
            <div className="flex justify-between items-start">
              <h3 className="font-extrabold text-neutral-905 dark:text-white text-base">{t.studioPlan}</h3>
              {photographer.tier === 'Studio' && (
                <span className="bg-editorial-tan text-editorial-dark px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">{t.active}</span>
              )}
            </div>
            <p className="text-neutral-405 text-xs text-neutral-400 mt-1">{t.bespokeBranding}</p>
            
            <div className="mt-5 flex items-baseline">
              <span className="text-3xl font-black text-neutral-905 dark:text-white">60,000 RWF</span>
              <span className="text-xs text-neutral-400 ml-1">/ month</span>
            </div>

            <ul className="mt-6 space-y-3.5 text-xs text-gray-500 font-semibold dark:text-neutral-400">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> 1 TB Premium Cloud space</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Custom Agency Branding</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Team management logins</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Priority 24/7 Support Desk</li>
            </ul>
          </div>

          <button
            onClick={() => handleUpgradeTrigger('Studio')}
            disabled={photographer.tier === 'Studio'}
            className="w-full py-2.5 mt-8 bg-neutral-950 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-955 transition cursor-pointer"
          >
            {photographer.tier === 'Studio' ? t.currentPackage : t.upgradeStudio}
          </button>
        </div>

      </div>

      {/* Payment History invoice list */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 dark:border-gray-850 dark:bg-editorial-card shadow-sm text-xs text-left font-sans">
        <h3 className="font-extrabold text-sm mb-4 text-gray-900 dark:text-white flex items-center gap-1.5 font-serif italic">
          <CreditCard className="w-4.5 h-4.5 text-neutral-400" />
          {t.paymentHistory}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#2A2A2E]/10 dark:bg-neutral-900 font-semibold text-neutral-400 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="p-3">{t.receiptId}</th>
                <th className="p-3">{t.authDate}</th>
                <th className="p-3">{t.amount}</th>
                <th className="p-3">{t.method}</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-neutral-900 text-neutral-300">
              {billingHistory.map((invoice, i) => (
                <tr key={i} className="hover:bg-neutral-50/20 dark:hover:bg-neutral-900/30">
                  <td className="p-3 font-bold text-gray-900 dark:text-gray-200">{invoice.id}</td>
                  <td className="p-3 font-semibold text-neutral-400">{invoice.date}</td>
                  <td className="p-3 font-semibold text-editorial-tan">{invoice.amount}</td>
                  <td className="p-3 text-neutral-400 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-yellow-500" />
                    MTN Mobile Money
                  </td>
                  <td className="p-3 text-right">
                    <span className="p-1 px-2.5 text-[10px] font-bold text-green-705 bg-green-500/10 rounded-full dark:text-green-400">
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CHECKOUT POPUP FRAME MODAL WITH MTN MOMO INTELLIGENT ROUTE */}
      {checkoutModalOpen && (
        <div id="checkout-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-105 dark:border-neutral-800 p-6 shadow-2xl text-left text-xs space-y-5 animate-slide-up">
            
            <div className="flex justify-between items-start border-b dark:border-neutral-900 pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-editorial-tan block mb-0.5">
                  {t.checkoutTitle}
                </span>
                <h4 className="text-base font-black text-gray-900 dark:text-white">
                  {t.secureSetup}
                </h4>
              </div>
              <button 
                onClick={() => setCheckoutModalOpen(false)}
                className="text-neutral-400 hover:text-black dark:hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selected pricing segment detail */}
            <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-xl border space-y-2 text-neutral-400 dark:border-neutral-800">
              <span className="block font-bold uppercase tracking-wider text-[10px] text-editorial-tan">{t.billingSelection}</span>
              <div className="flex justify-between text-neutral-900 dark:text-white font-extrabold text-sm">
                <span>LuminaOS {getPlanLabel(selectedTierBilling)} Upgrade</span>
                <span className="text-editorial-tan font-mono">
                  {selectedTierBilling === 'Pro' ? '20,000 RWF' : selectedTierBilling === 'Studio' ? '60,000 RWF' : '0 RWF'}
                </span>
              </div>
              <span className="block leading-relaxed mt-1 text-gray-500 font-semibold text-[10px]">
                {t.mockPaymentSub}
              </span>
            </div>

            {/* Gateway Selection Buttons */}
            <div className="space-y-2">
              <label className="block text-[8px] font-bold uppercase text-neutral-400 block tracking-widest">{t.choosePaymentMethod}</label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => { setPaymentGateway('momo'); setShowMomoPinPrompt(false); }}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    paymentGateway === 'momo' 
                    ? 'border-yellow-500 bg-yellow-500/10 text-neutral-900 dark:text-white' 
                    : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-400'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-yellow-500 mb-1" />
                  <span className="font-bold text-[10px]">{t.payWithMoMo}</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setPaymentGateway('card'); setShowMomoPinPrompt(false); }}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    paymentGateway === 'card' 
                    ? 'border-editorial-tan bg-editorial-tan/10 text-neutral-900 dark:text-white' 
                    : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-400'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-editorial-tan mb-1" />
                  <span className="font-bold text-[10px]">{t.payWithCard}</span>
                </button>
              </div>
            </div>

            {/* CONDITIONAL PAYMENT FORM OPTIONS */}
            {paymentGateway === 'momo' ? (
              <form onSubmit={startMoMoFlow} className="space-y-3.5">
                {isProcessingmomo ? (
                  <div className="py-6 flex flex-col items-center justify-center space-y-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-dashed dark:border-neutral-800">
                    <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
                    <p className="text-xs font-semibold text-neutral-300 tracking-wide text-center px-4 animate-pulse">
                      {t.processingMoMo}
                    </p>
                  </div>
                ) : showMomoPinPrompt ? (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 space-y-3.5">
                    <span className="text-yellow-500 font-extrabold block text-xs uppercase tracking-wider">🔒 MTN MoMo Push Request Sent</span>
                    <p className="text-neutral-300 text-[11px] leading-relaxed">
                      {t.momoPinAlert}
                    </p>
                    
                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase tracking-wider font-bold text-neutral-400">Enter mock PIN on phone screen</label>
                      <button
                        type="button"
                        onClick={confirmMoMoPinSubmit}
                        className="w-full py-2.5 bg-yellow-500 text-black font-extrabold rounded-xl hover:bg-yellow-400 transition tracking-wider uppercase text-[10px] shadow-md shadow-yellow-500/20"
                      >
                        Simulate Authorize Transaction PIN Approved
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-1">
                      <label className="block text-[8px] font-bold uppercase tracking-wider text-neutral-400">{t.momoNumberLabel}</label>
                      <div className="relative">
                        <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input 
                          type="tel" 
                          required
                          value={momoNumber}
                          onChange={(e) => setMomoNumber(e.target.value)}
                          placeholder={t.momoNumberPlaceholder}
                          className="w-full pl-11 pr-4 py-2 bg-neutral-50 border border-neutral-200/80 rounded-xl dark:bg-neutral-900 dark:border-neutral-800 dark:text-white font-bold text-sm"
                        />
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full py-3 bg-yellow-500 text-black font-extrabold rounded-xl hover:bg-yellow-400 transition tracking-wider uppercase text-[10px] shadow-md shadow-yellow-500/10"
                    >
                      {t.processMoMoBtn}
                    </button>
                  </>
                )}
              </form>
            ) : (
              /* CARD PAYMENT FORM GATEWAY */
              <div className="space-y-3.5">
                <div>
                  <label className="block text-[8px] font-bold uppercase tracking-wider text-neutral-400 mb-1">{t.cardholderLabel}</label>
                  <input 
                    type="text" 
                    value={photographer.name}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200/80 rounded-xl dark:bg-neutral-900 dark:border-neutral-800 dark:text-white font-bold"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-[8px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Credit / Debit Card</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
                    <input 
                      type="text" 
                      placeholder="4242 4242 4242 4242"
                      className="w-full pl-11 pr-4 py-2 bg-neutral-50 border border-neutral-200/80 rounded-xl dark:bg-neutral-900 dark:border-neutral-800 dark:text-white font-mono"
                      readOnly
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={confirmUpgradeWithCard}
                    className="w-full py-3 bg-editorial-tan text-editorial-dark font-extrabold rounded-xl hover:bg-white hover:text-black transition tracking-wider uppercase text-[10px] shadow-sm"
                  >
                    {t.processStripeBtn}
                  </button>
                </div>
              </div>
            )}

            <div className="border-t dark:border-neutral-900 pt-3 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(false)}
                className="px-4 py-2 border rounded-xl text-neutral-400 font-bold hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900 transition"
              >
                {t.cancel}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
