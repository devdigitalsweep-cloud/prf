
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { jsPDF } from "jspdf";
import { BioBackground, MetricCard } from './components/Visuals';
import { 
  ArrowRight, Download, Activity, ShieldCheck, 
  BrainCircuit, Microscope, Stethoscope, 
  Fingerprint, Puzzle, Cpu, BarChart3, GraduationCap,
  Play, Pause, User, Briefcase, Building, Flag, CheckCircle2,
  Phone, Mail, MapPin, ScanLine, TrendingDown, Zap, Database,
  Users
} from 'lucide-react';

// --- Data Configuration ---

const services = [
  { title: "AI Preventive Screening", icon: <ShieldCheck className="w-5 h-5 text-[#00D2A0]" /> },
  { title: "Neuro-Behavioral", icon: <Puzzle className="w-5 h-5 text-[#C0A062]" /> },
  { title: "Digital Twin", icon: <Fingerprint className="w-5 h-5 text-[#00D2A0]" /> },
  { title: "Clinical Research", icon: <Microscope className="w-5 h-5 text-[#C0A062]" /> },
  { title: "Custom AI Dev", icon: <Cpu className="w-5 h-5 text-[#00D2A0]" /> },
  { title: "Health Data", icon: <BarChart3 className="w-5 h-5 text-[#C0A062]" /> },
  { title: "Decision Support", icon: <BrainCircuit className="w-5 h-5 text-[#00D2A0]" /> },
  { title: "Advisory", icon: <GraduationCap className="w-5 h-5 text-[#C0A062]" /> },
];

const founders = [
  {
    name: "Dr. Nuha Bin Tayyash",
    flag: "🇸🇦",
    role: "Founder & CEO",
    bio: "PhD AI & Bioinformatics | +15 years in Computational Biology.",
    alumni: ["University of Manchester", "King Saud University", "Google", "Savvy"],
    photo: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=400&h=400",
    linkedin: "https://www.linkedin.com/in/nuha-bintayyash",
    qrCode: "", // Placeholder for QR
    icon: <User className="w-4 h-4 text-[#C0A062]" />
  },
  {
    name: "Farid Zourgani",
    flag: "🇫🇷",
    role: "Co-founder & COO",
    bio: "MBA, MSc Electrical Engineering | +20 years in Auto, Tech & Healthcare.",
    alumni: ["Renault", "Nissan", "HEC Paris", "Datavitalis"],
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400",
    linkedin: "https://www.linkedin.com/in/farid-zourgani",
    qrCode: "", // Placeholder for QR
    icon: <Briefcase className="w-4 h-4 text-[#00D2A0]" />
  }
];

const fahisSteps = [
  { id: 1, title: "Booking", icon: <Activity className="w-5 h-5 text-[#00D2A0]" /> },
  { id: 2, title: "Thermal Pod", icon: <Microscope className="w-5 h-5 text-[#C0A062]" /> },
  { id: 3, title: "AI Processing", icon: <BrainCircuit className="w-5 h-5 text-[#00D2A0]" /> },
  { id: 4, title: "Doctor Review", icon: <Stethoscope className="w-5 h-5 text-[#C0A062]" /> },
  { id: 5, title: "Report", icon: <ShieldCheck className="w-5 h-5 text-[#00D2A0]" /> }
];

const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:FAHM Biotech
ORG:FAHM Biotechnology
TEL:+966557101103
EMAIL:info@FAHMbiotech.com
ADR:;;Riyadh;;;Saudi Arabia
URL:https://fahmbiotech.com
END:VCARD`;

const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(vCardData)}&bgcolor=FFFFFF&color=000000&margin=10`;

const generatePDF = () => {
  const doc = new jsPDF();
  let y = 20;
  const margin = 20;
  const contentWidth = 170;

  const addText = (text: string, size: number, weight: "normal" | "bold" | "italic" = "normal", color: [number, number, number] = [0, 0, 0]) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", weight);
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, contentWidth);
    doc.text(lines, margin, y);
    y += (lines.length * size * 0.3527) + 6;
  };

  doc.setFillColor(0, 31, 21);
  doc.rect(0, 0, 210, 40, 'F');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text("FAHM Biotechnology", margin, 25);
  doc.setFontSize(12);
  doc.setTextColor(0, 210, 160);
  doc.text("Sovereign Health Intelligence | Vision 2030", margin, 33);
  y = 55;

  addText("Mission", 16, "bold", [0, 31, 21]);
  addText("To architect Saudi Arabia's biological defense infrastructure through the integration of proprietary AI, advanced biotechnology, and data governance—delivering sovereign capabilities from threat detection to strategic decision support. We deliver precision health for every patient and act as a catalyst for sovereign innovation.", 11);
  y += 5;

  addText("Leadership", 16, "bold", [0, 31, 21]);
  founders.forEach(f => {
    addText(`${f.name} - ${f.role}`, 12, "bold");
    addText(f.bio, 10, "italic");
  });
  doc.save("FAHM_Profile_2026.pdf");
};

const SlideSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <section className={`min-h-screen md:h-screen w-full snap-start flex flex-col items-center justify-center relative px-4 md:px-20 py-16 md:py-12 ${className}`}>
    {children}
  </section>
);

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const SLIDE_COUNT = 9;
  const SCROLL_INTERVAL = 8000;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1 >= SLIDE_COUNT ? 0 : prev + 1));
      }, SCROLL_INTERVAL);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const targetScroll = window.innerHeight * activeSlide;
      container.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }, [activeSlide]);

  const handleInteraction = useCallback(() => {
    if (isPlaying) setIsPlaying(false);
  }, [isPlaying]);

  const goToSlide = (index: number) => {
    handleInteraction();
    setActiveSlide(index);
  };

  return (
    <div className="relative w-full h-screen bg-[#001F15] text-[#F0FDF4] overflow-hidden font-montserrat" onClick={handleInteraction}>
      <BioBackground />

      {/* Navigation - Hidden on mobile for cleaner UI */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 hidden md:flex">
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); goToSlide(i); }}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${activeSlide === i ? 'bg-[#C0A062] scale-125' : 'bg-white/20 hover:bg-white/50'}`}
          />
        ))}
      </div>

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <button 
          onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all border border-white/20 text-[#F0FDF4]"
        >
          {isPlaying ? <Pause className="w-4 h-4 md:w-5 h-5" /> : <Play className="w-4 h-4 md:w-5 h-5 ml-1" />}
        </button>
      </div>

      <div ref={scrollContainerRef} className="h-full w-full overflow-y-auto snap-y snap-mandatory no-scrollbar scroll-smooth">
        
        {/* 1. Hero Slide */}
        <SlideSection>
          <div className="max-w-6xl text-center z-10 w-full px-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6 md:mb-8 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-[#00D2A0]"></span>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#00D2A0]">Sovereign Health Intelligence</span>
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold font-lexend mb-6 leading-tight tracking-tighter">
              FAHM <br />
              <span className="gold-text">Biotechnology</span>
            </h1>
            <p className="text-lg md:text-3xl text-[#F0FDF4]/80 font-light mb-8 md:mb-10 tracking-wide">
              Intelligence for the Kingdom.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <span className="px-6 py-2 bg-[#00D2A0]/10 border border-[#00D2A0]/30 rounded-full text-[10px] md:text-sm font-bold text-[#00D2A0] uppercase tracking-wider backdrop-blur-sm">Vision 2030 Aligned</span>
              <span className="px-6 py-2 bg-[#C0A062]/10 border border-[#C0A062]/30 rounded-full text-[10px] md:text-sm font-bold text-[#C0A062] uppercase tracking-wider backdrop-blur-sm">100% In-Kingdom Data</span>
            </div>
          </div>
        </SlideSection>

        {/* 2. Vision & Mission */}
        <SlideSection>
          <div className="max-w-5xl text-center glass-gold p-8 md:p-20 rounded-[2rem] md:rounded-[3rem] border border-[#C0A062]/30 shadow-2xl mx-4">
            <h2 className="text-2xl md:text-5xl font-bold font-lexend text-white mb-6 md:mb-8 leading-tight">
              "Precision health for every patient and a catalyst for <span className="gold-text">sovereign innovation</span>."
            </h2>
            <div className="h-px w-24 md:w-32 bg-[#C0A062]/50 mx-auto mb-6 md:mb-8"></div>
            <p className="text-base md:text-xl text-[#F0FDF4]/80 font-light leading-relaxed mb-8 md:mb-10">
              To architect Saudi Arabia's biological defense infrastructure through the integration of proprietary AI, advanced biotechnology, and data governance—delivering sovereign capabilities from threat detection to strategic decision support.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-6">
              {['Patient-First', 'PDPL Privacy', 'Sovereign Tech'].map((val, i) => (
                <div key={i} className="flex items-center gap-2 bg-black/40 px-4 py-2 md:px-6 md:py-3 rounded-full border border-[#00D2A0]/20">
                  <CheckCircle2 className="w-3 h-3 md:w-4 h-4 text-[#00D2A0]" />
                  <span className="text-[10px] md:text-sm font-bold text-[#F0FDF4] uppercase tracking-wider">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </SlideSection>

        {/* 3. Flagship Project: FAHIS (Original Split-Screen Layout Reverted) */}
        <SlideSection>
          <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-10 md:gap-16 px-4">
            <div className="flex-1 text-center md:text-left">
              <span className="text-[#C0A062] font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm mb-4 block">Our Flagship Project</span>
              <h2 className="text-4xl md:text-8xl font-bold font-lexend text-white mb-6 md:mb-8 leading-tight tracking-tight">
                FAHIS
              </h2>
              <div className="glass p-6 md:p-10 rounded-[2.5rem] border-l-4 border-l-[#C0A062] backdrop-blur-xl relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#C0A062]/20 to-transparent blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <p className="text-base md:text-2xl text-[#F0FDF4]/90 font-light leading-relaxed relative z-10">
                  <span className="font-bold text-white">FAHIS</span> leverages a <span className="text-[#C0A062] font-semibold">proprietary AI thermography imaging solution</span> to deliver the Kingdom's <span className="text-[#00D2A0] font-semibold">first non-invasive, mass screening platform</span> for breast health—making early detection accessible to <span className="text-white font-semibold">every Saudi woman</span>.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative group scale-110">
                <div className="absolute inset-0 bg-[#00D2A0]/20 blur-3xl rounded-full group-hover:bg-[#00D2A0]/40 transition-all duration-1000 animate-pulse"></div>
                <div className="relative glass w-48 h-48 md:w-72 md:h-72 rounded-full flex items-center justify-center border border-white/20 animate-pulse-gold shadow-[0_0_50px_rgba(192,160,98,0.1)]">
                  <ScanLine className="w-20 h-20 md:w-40 md:h-40 text-[#00D2A0]" />
                </div>
              </div>
            </div>
          </div>
        </SlideSection>

        {/* 4. The Blind Spot */}
        <SlideSection>
          <div className="w-full max-w-6xl flex flex-col items-center px-4">
            <span className="text-[#00D2A0] font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm mb-4">Strategic Gap</span>
            <h2 className="text-4xl md:text-7xl font-bold font-lexend text-white mb-10 md:mb-16 text-center">The Blind Spot</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <MetricCard label="Dense Tissue" value="Hidden Tumors" detail="Mammography failure in dense tissue." />
              <MetricCard label="Younger Age" value="Unscreened" detail="No protocols for women under 40." gold={true} />
              <MetricCard label="Workflow" value="Bottlenecks" detail="Resource delays in critical care." />
            </div>
          </div>
        </SlideSection>

        {/* 5. Impact */}
        <SlideSection>
          <div className="w-full max-w-6xl flex flex-col items-center px-4">
             <span className="text-[#00D2A0] font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm mb-4">Impact & Value</span>
             <h2 className="text-4xl md:text-7xl font-bold font-lexend text-white mb-10 md:mb-16 text-center">Why FAHM?</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {[
                  { val: "50-70%", label: "Reduction", text: "Drastic reduction in screening bottlenecks.", icon: <TrendingDown className="w-6 h-6" />, color: "#00D2A0" },
                  { val: "40%", label: "Faster", text: "Accelerated triage for critical cases.", icon: <Zap className="w-6 h-6" />, color: "#C0A062", gold: true },
                  { val: "100%", label: "Sovereign", text: "In-Kingdom Data Hosting (PDPL).", icon: <Database className="w-6 h-6" />, color: "#00D2A0" }
                ].map((item, i) => (
                  <div key={i} className={`${item.gold ? 'glass-gold' : 'glass'} p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 text-center hover:bg-white/5 transition-all`}>
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4" style={{ color: item.color }}>{item.icon}</div>
                    <h3 className="text-3xl md:text-5xl font-bold font-lexend text-white mb-1">{item.val}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: item.color }}>{item.label}</p>
                    <p className="text-xs md:text-sm text-[#F0FDF4]/70 leading-relaxed">{item.text}</p>
                  </div>
                ))}
             </div>
          </div>
        </SlideSection>

        {/* 6. Workflow */}
        <SlideSection>
          <div className="w-full max-w-7xl text-center px-4">
            <span className="text-[#C0A062] font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm">FAHIS Workflow</span>
            <h2 className="text-4xl md:text-7xl font-bold font-lexend text-white mt-2 mb-12 md:mb-20">The FAHIS Process</h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
              {fahisSteps.map((step, idx) => (
                <div key={step.id} className="flex md:flex-col items-center gap-4 md:gap-0 w-full md:w-auto">
                  <div className="w-16 h-16 md:w-28 md:h-28 rounded-2xl md:rounded-3xl bg-[#001510] border border-white/10 flex items-center justify-center shadow-xl md:mb-4 group">
                    {step.icon}
                  </div>
                  <div className="text-left md:text-center">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-0.5">{step.title}</h3>
                    <span className="text-[10px] text-[#00D2A0] font-bold uppercase tracking-widest">Step 0{idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideSection>

        {/* 7. Ecosystem */}
        <SlideSection>
          <div className="w-full max-w-7xl px-4 py-10">
            <div className="text-center mb-10">
               <h2 className="text-3xl md:text-5xl font-bold font-lexend text-white">Full Service Ecosystem</h2>
               <p className="text-sm text-[#F0FDF4]/60 mt-2">8 Strategic Pillars of Capability</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {services.map((s, i) => (
                <div key={i} className="glass p-4 md:p-6 rounded-xl md:rounded-2xl flex flex-col items-center justify-center text-center border border-white/5">
                  <div className="mb-3 p-2 bg-white/5 rounded-full">{s.icon}</div>
                  <h3 className="text-[10px] md:text-base font-bold text-[#F0FDF4]">{s.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </SlideSection>

        {/* 8. Leadership */}
        <SlideSection>
          <div className="w-full max-w-7xl px-4">
            <h2 className="text-4xl md:text-6xl font-bold font-lexend text-white mb-10 md:mb-16 text-center">Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              {founders.map((founder, i) => (
                <div key={i} className="glass p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <img src={founder.photo} alt={founder.name} className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover grayscale" />
                  <div className="text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-white">{founder.name}</h3>
                    <p className="text-[#C0A062] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3">{founder.role}</p>
                    <p className="text-xs md:text-sm text-[#F0FDF4]/70 leading-relaxed mb-4">{founder.bio}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
                      {founder.alumni.map((a, j) => <span key={j} className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-[#00D2A0]">{a}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideSection>

        {/* 9. Contact */}
        <SlideSection>
          <div className="w-full max-w-7xl px-4 text-center">
             <h2 className="text-3xl md:text-6xl font-bold font-lexend text-white mb-10 md:mb-16">The <span className="gold-text">Sovereign Future</span></h2>
             <div className="bg-[#00120b]/90 border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 backdrop-blur-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div className="space-y-4 text-left border-b md:border-b-0 md:border-r border-white/5 pb-8 md:pb-0 md:pr-8">
                    {[{icon: <MapPin />, label: "Location", val: "Riyadh, KSA"}, {icon: <Mail />, label: "Email", val: "info@FAHMbiotech.com"}].map((c, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="text-[#00D2A0]">{c.icon}</div>
                        <div>
                          <p className="text-[10px] text-[#C0A062] uppercase font-bold">{c.label}</p>
                          <p className="text-sm md:text-lg text-white">{c.val}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col items-center border-b md:border-b-0 md:border-r border-white/5 pb-8 md:pb-0">
                    <img src={qrCodeUrl} className="w-32 h-32 md:w-40 md:h-40 bg-white p-2 rounded-xl mb-3" alt="QR" />
                    <p className="text-[#00D2A0] text-[10px] font-bold uppercase tracking-widest">Connect with us</p>
                  </div>
                  <div className="flex flex-col items-center md:items-start md:pl-8">
                    <p className="text-xs md:text-sm text-[#F0FDF4]/60 mb-6 leading-relaxed">Download our 2026 roadmap and capability profile.</p>
                    <button onClick={generatePDF} className="w-full py-4 bg-[#00D2A0] text-[#001F15] rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" /> Download Profile
                    </button>
                  </div>
                </div>
             </div>
             <p className="mt-8 text-[10px] text-[#F0FDF4]/30 tracking-widest uppercase">© 2026 FAHM Biotechnology</p>
          </div>
        </SlideSection>

      </div>
      
      {isPlaying && (
        <div className="fixed bottom-0 left-0 h-0.5 md:h-1 bg-[#00D2A0] z-50 transition-all ease-linear"
             key={activeSlide}
             style={{ width: '100%', animation: `progress ${SCROLL_INTERVAL}ms linear` }} 
        />
      )}
    </div>
  );
};

export default App;
