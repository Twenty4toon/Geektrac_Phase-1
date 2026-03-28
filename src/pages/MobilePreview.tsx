import { useState, useEffect } from "react";
import { 
  Smartphone, 
  Battery, 
  Wifi, 
  Signal, 
  Navigation, 
  Truck, 
  Play, 
  Square, 
  Clock, 
  Map as MapIcon, 
  User, 
  Bell,
  Menu,
  Droplets,
  AlertTriangle,
  ClipboardList,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MobilePreview() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [tripActive, setTripActive] = useState(false);
  const [odometer, setOdometer] = useState(42680);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-4">
      <div className="mb-6 text-center max-w-md">
        <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <Smartphone className="w-6 h-6 text-[#00D4FF]" />
            Driver App Preview
        </h1>
        <p className="text-slate-500 text-sm mt-2 font-medium">This is how your drivers see assignments and track their trips on the field.</p>
      </div>

      {/* Smartphone Frame */}
      <div className="relative w-[320px] h-[640px] bg-[#06090F] rounded-[3rem] border-[8px] border-slate-800 shadow-[0_0_50px_rgba(0,212,255,0.1)] overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-50 flex items-center justify-center">
            <div className="w-10 h-1 bg-slate-900 rounded-full"></div>
        </div>

        {/* Status Bar */}
        <div className="h-10 px-6 flex items-center justify-between text-[10px] font-bold text-white pt-2 z-40">
            <span>{currentTime}</span>
            <div className="flex items-center gap-1.5">
                <Signal className="w-2.5 h-2.5" />
                <Wifi className="w-2.5 h-2.5" />
                <Battery className="w-3 h-3 text-emerald-500" />
            </div>
        </div>

        {/* App Content */}
        <div className="h-full flex flex-col bg-[#0a0f1a] overflow-y-auto no-scrollbar">
            {/* App Nav */}
            <div className="p-4 flex items-center justify-between border-b border-white/5">
                <button className="p-1.5 rounded-lg bg-white/5"><Menu className="w-4 h-4 text-white" /></button>
                <span className="text-xs font-bold text-white tracking-widest uppercase">GEEKTRAC</span>
                <button className="p-1.5 rounded-lg bg-rose-500/10"><Bell className="w-4 h-4 text-rose-500" /></button>
            </div>

            {/* Profile Header */}
            <div className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#00D4FF] flex items-center justify-center bg-slate-900">
                    <User className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                    <h2 className="text-sm font-bold text-white">Rajesh Kumar</h2>
                    <p className="text-[10px] text-slate-500 font-mono tracking-tighter">ID: DRV-0042 • MH-04-AX-2901</p>
                </div>
            </div>

            {/* Main Action Area */}
            <div className="px-5 space-y-4 pb-20">
                {/* Active Job Card */}
                <div className="p-4 rounded-2xl bg-[#00D4FF]/5 border border-[#00D4FF]/20 space-y-4">
                    <div className="flex items-center justify-between">
                        <Badge className="bg-[#00D4FF]/20 text-[#00D4FF] border-none text-[8px] tracking-widest font-bold">CURRENT JOB</Badge>
                        <span className="text-[10px] text-slate-500 font-bold">#JOB-8841</span>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm">Pune Warehouse Delivery</h3>
                        <p className="text-[10px] text-slate-500 mt-1">Expected Delivery: 4:30 PM (Today)</p>
                    </div>
                    
                    <div className="space-y-3 pt-2 relative">
                        <div className="absolute left-[7px] top-[14px] bottom-[14px] w-0.5 border-l border-dashed border-slate-700"></div>
                        <div className="flex items-center gap-3">
                            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shrink-0 z-10 border-2 border-[#0a0f1a]"></div>
                            <span className="text-[10px] text-slate-300 font-medium truncate">Mumbai Central Hub (PICKUP)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shrink-0 z-10 border-2 border-[#0a0f1a]"></div>
                            <span className="text-[10px] text-slate-300 font-bold truncate tracking-tight">Pune Cargo Terminal B (DROPOFF)</span>
                        </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <Button className="flex-1 bg-white/5 border border-white/10 text-white text-[10px] h-8 font-bold">NAVIGATE</Button>
                        <Button className="flex-1 bg-white/5 border border-white/10 text-white text-[10px] h-8 font-bold">DOCUMENTS</Button>
                    </div>
                </div>

                {/* Tracking Controls */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Trip Odometer</span>
                            <p className="text-lg font-mono text-white tracking-widest">{odometer.toLocaleString()} <span className="text-[10px] text-slate-500 uppercase font-bold">km</span></p>
                        </div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tripActive ? "bg-emerald-500/20" : "bg-slate-800"}`}>
                            <Navigation className={`w-5 h-5 ${tripActive ? "text-emerald-500 animate-pulse" : "text-slate-600"}`} />
                        </div>
                    </div>

                    {tripActive ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-2.5 rounded-xl bg-slate-900/50 border border-white/5 text-center">
                                    <span className="text-[8px] text-slate-500 uppercase font-black tracking-tighter">Avg Speed</span>
                                    <p className="text-sm font-bold text-white">54 km/h</p>
                                </div>
                                <div className="p-2.5 rounded-xl bg-slate-900/50 border border-white/5 text-center">
                                    <span className="text-[8px] text-slate-500 uppercase font-black tracking-tighter">Distance</span>
                                    <p className="text-sm font-bold text-white">12.4 km</p>
                                </div>
                            </div>
                            <Button 
                                onClick={() => setTripActive(false)}
                                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs h-12"
                            >
                                <Square className="w-4 h-4 mr-2" /> END TRIP (SUBMIT)
                            </Button>
                        </div>
                    ) : (
                        <Button 
                            onClick={() => {
                                setTripActive(true);
                                setOdometer(prev => prev + 1.2);
                            }}
                            className="w-full bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-[#06090F] font-bold text-xs h-12 shadow-[0_4px_20px_rgba(0,212,255,0.3)]"
                        >
                            <Play className="w-4 h-4 mr-2 fill-current" /> START TRIP
                        </Button>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-slate-900 border border-white/5 hover:border-[#00D4FF]/30 transition-colors">
                        <Droplets className="w-5 h-5 text-blue-500" />
                        <span className="text-[9px] font-bold text-slate-400 tracking-tight uppercase">Update Fuel</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-slate-900 border border-white/5 hover:border-amber-500/30 transition-colors">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        <span className="text-[9px] font-bold text-slate-400 tracking-tight uppercase">Manual SOS</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-slate-900 border border-white/5 hover:border-emerald-500/30 transition-colors">
                        <MapIcon className="w-5 h-5 text-emerald-500" />
                        <span className="text-[9px] font-bold text-slate-400 tracking-tight uppercase">Waypoints</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-slate-900 border border-white/5 hover:border-slate-500/30 transition-colors">
                        <Clock className="w-5 h-5 text-slate-500" />
                        <span className="text-[9px] font-bold text-slate-400 tracking-tight uppercase">History</span>
                    </button>
                </div>
            </div>

            {/* Mobile Tab Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#06090F]/90 backdrop-blur-md border-t border-white/10 flex items-center justify-around px-2 z-50">
                <button className="flex flex-col items-center gap-1 text-[#00D4FF]"><MapIcon className="w-5 h-5" /><span className="text-[8px] font-bold">HOME</span></button>
                <button className="flex flex-col items-center gap-1 text-slate-500"><ClipboardList className="w-5 h-5" /><span className="text-[8px] font-bold">JOBS</span></button>
                <div className="w-12 h-12 -mt-10 rounded-full bg-[#00D4FF] flex items-center justify-center shadow-[0_4px_15px_rgba(0,212,255,0.4)] border-4 border-[#06090F]">
                    <Plus className="w-6 h-6 text-[#06090F]" />
                </div>
                <button className="flex flex-col items-center gap-1 text-slate-500"><Truck className="w-5 h-5" /><span className="text-[8px] font-bold">FLEET</span></button>
                <button className="flex flex-col items-center gap-1 text-slate-500"><User className="w-5 h-5" /><span className="text-[8px] font-bold">MORE</span></button>
            </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full z-50"></div>
      </div>
    </div>
  );
}
