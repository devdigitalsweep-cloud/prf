
import React from 'react';

export const BioBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#001F15]">
      {/* Deep Midnight Green base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#001F15] via-[#00120b] to-black"></div>
      
      {/* Animated Blobs - Neon Mint and Metallic Gold */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00D2A0]/10 blur-[120px] rounded-full animate-pulse duration-[8000ms]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#C0A062]/10 blur-[140px] rounded-full"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]"></div>
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(0, 210, 160, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      {/* DNA/Data Abstract Art */}
      <svg className="absolute opacity-20 dna-animation top-20 right-0 w-[800px] h-[800px]" viewBox="0 0 100 100">
        <path d="M10 10 Q 50 50 90 10" stroke="#C0A062" fill="none" strokeWidth="0.2" />
        <path d="M10 20 Q 50 60 90 20" stroke="#00D2A0" fill="none" strokeWidth="0.2" />
        <path d="M10 30 Q 50 70 90 30" stroke="#C0A062" fill="none" strokeWidth="0.2" />
        <path d="M10 40 Q 50 80 90 40" stroke="#00D2A0" fill="none" strokeWidth="0.2" />
        <circle cx="50" cy="50" r="30" stroke="#ffffff" strokeWidth="0.1" fill="none" />
        <circle cx="50" cy="50" r="20" stroke="#C0A062" strokeWidth="0.1" strokeDasharray="1 2" fill="none" />
      </svg>
    </div>
  );
};

export const MetricCard: React.FC<{ label: string; value: string; detail: string; gold?: boolean }> = ({ label, value, detail, gold }) => (
  <div className={`p-6 rounded-2xl transition-all duration-500 group relative overflow-hidden h-full flex flex-col justify-between ${gold ? 'glass-gold' : 'glass hover:bg-[#00D2A0]/5'}`}>
    <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl -mr-12 -mt-12 transition-colors ${gold ? 'bg-[#C0A062]/20' : 'bg-[#00D2A0]/10 group-hover:bg-[#00D2A0]/20'}`}></div>
    <div>
      <p className={`text-[10px] font-bold mb-3 uppercase tracking-[0.25em] relative z-10 ${gold ? 'text-[#C0A062]' : 'text-[#00D2A0]'}`}>{label}</p>
      <h3 className="text-3xl md:text-4xl font-bold mb-3 font-lexend text-[#F0FDF4] relative z-10">{value}</h3>
    </div>
    <p className="text-[#F0FDF4]/60 text-xs leading-relaxed relative z-10 mt-2 border-t border-white/5 pt-3">{detail}</p>
  </div>
);

export const ShareProfile: React.FC = () => {
  const shareUrl = window.location.href;
  const shareText = "FAHM Biotech - Sovereign Health Intelligence.";

  return (
    <div className="flex gap-3">
      <button 
        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, '_blank')}
        className="px-4 py-2 flex items-center gap-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-[#00D2A0]/50 transition-all group backdrop-blur-md"
      >
        <span className="text-lg">💬</span>
        <span className="text-xs font-medium text-[#F0FDF4]/70 group-hover:text-white hidden md:inline">WhatsApp</span>
      </button>
      <button 
        onClick={() => window.location.href = `mailto:?subject=FAHM Profile&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`}
        className="px-4 py-2 flex items-center gap-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-[#C0A062]/50 transition-all group backdrop-blur-md"
      >
        <span className="text-lg">📧</span>
        <span className="text-xs font-medium text-[#F0FDF4]/70 group-hover:text-white hidden md:inline">Email</span>
      </button>
    </div>
  );
};
