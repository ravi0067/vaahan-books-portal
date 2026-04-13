"use client";

import { useState } from 'react';
import { Download, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function PortalLanding() {
  const [loading, setLoading] = useState(false);
  const [licenseInfo, setLicenseInfo] = useState<{licenseKey: string, downloadUrl: string} | null>(null);

  const handlePurchase = async (plan: string) => {
    setLoading(true);
    // Simulate Razorpay Payment Gateway Delay
    setTimeout(async () => {
      const response = await fetch('/api/license/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planType: plan,
          paymentId: 'pay_' + Math.random().toString(36).substring(7),
          email: 'customer@business.in'
        })
      });
      const data = await response.json();
      setLicenseInfo(data);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-teal-500/30">
      <div className="max-w-6xl mx-auto px-6 py-20">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-24">
          <h1 className="text-5xl md:text-7xl font-bold font-sans tracking-tight bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            VaahanBooks 2026
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The next-generation, AI-powered desktop billing software for Indian SMBs. 
            Download, activate, and replace your outdated accounting system today.
          </p>
        </div>

        {/* License Download Success Block */}
        {licenseInfo && (
          <div className="bg-teal-900/20 border border-teal-500/30 p-8 rounded-3xl mb-24 text-center animate-in zoom-in duration-500">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-500/20 text-teal-400 mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
            <p className="text-teal-200 mb-8">Your Professional License has been generated.</p>
            
            <div className="bg-gray-950 rounded-xl p-6 font-mono text-2xl tracking-wider text-teal-400 border border-gray-800 inline-block mb-8 select-all">
              {licenseInfo.licenseKey}
            </div>

            <div>
              <a href={licenseInfo.downloadUrl} className="inline-flex items-center gap-3 bg-teal-500 hover:bg-teal-400 text-gray-950 font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(20,184,166,0.5)]">
                <Download size={24} />
                Download VaahanBooks Setup (.exe)
              </a>
              <p className="text-sm text-gray-500 mt-4">For Windows 10/11 (64-bit)</p>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        {!licenseInfo && (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Professional Plan */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-teal-500/50 transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">Professional</h3>
                  <p className="text-gray-400 mt-1">For single shops / retailers</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">₹2,499<span className="text-sm text-gray-500">/yr</span></div>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 size={18} className="text-teal-500"/> Unlimited Invoicing & GSTR 1/3B</li>
                <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 size={18} className="text-teal-500"/> Offline First Database (SQLite)</li>
                <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 size={18} className="text-teal-500"/> E-Way Bill & E-Invoice Generation</li>
              </ul>

              <button 
                onClick={() => handlePurchase('PROFESSIONAL')}
                disabled={loading}
                className="w-full bg-white text-gray-950 hover:bg-gray-200 font-bold py-4 rounded-xl transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Buy Now & Get Key'}
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gradient-to-b from-teal-900/40 to-gray-900 border border-teal-500/50 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-teal-500 text-gray-950 text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-teal-400">Enterprise</h3>
                  <p className="text-gray-400 mt-1">For CA & Multi-company</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">₹4,999<span className="text-sm text-gray-500">/yr</span></div>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 size={18} className="text-teal-500"/> All Professional Features</li>
                <li className="flex items-center gap-3 text-gray-300"><ShieldCheck size={18} className="text-teal-400"/> Multi-Company (Up to 10)</li>
                <li className="flex items-center gap-3 text-gray-300"><Zap size={18} className="text-teal-400"/> AI Financial Assistant (Claude 3)</li>
              </ul>

              <button 
                onClick={() => handlePurchase('ENTERPRISE')}
                disabled={loading}
                className="w-full bg-teal-500 hover:bg-teal-400 text-gray-950 font-bold py-4 rounded-xl transition-colors disabled:opacity-50 shadow-lg shadow-teal-500/20"
              >
                {loading ? 'Processing...' : 'Buy Enterprise License'}
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Contact Section */}
      <section className="border-t border-gray-800 bg-gray-950/50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Support</h2>
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto text-teal-400">
                <span className="text-2xl">📍</span>
              </div>
              <p className="font-bold text-white">Address</p>
              <p className="text-sm text-gray-400">Chinhat, Gomti Nagar, Lucknow 226028</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto text-teal-400">
                <span className="text-2xl">📧</span>
              </div>
              <p className="font-bold text-white">Email</p>
              <p className="text-sm text-gray-400">support@vaahanerp.com</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto text-teal-400">
                <span className="text-2xl">📞</span>
              </div>
              <p className="font-bold text-white">Phone</p>
              <p className="text-sm text-gray-400">+91 9554762008</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-900 bg-black py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center font-bold text-black">V</div>
            <span className="text-xl font-bold tracking-tight">VaahanBooks</span>
          </div>
          
          <div className="text-center md:text-left">
            <p className="text-gray-500 text-sm italic">Powered by Ravi Accounting Services</p>
            <p className="text-gray-400 text-sm mt-1">© 2026 Ravi Accounting Services. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-teal-400">Privacy Policy</a>
            <a href="#" className="hover:text-teal-400">Terms of Service</a>
            <a href="#" className="hover:text-teal-400">Data Deletion</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
