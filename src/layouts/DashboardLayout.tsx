import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Truck, 
  Users, 
  Route, 
  Droplets, 
  Bell, 
  Wrench, 
  Briefcase, 
  BarChart3, 
  Settings,
  Search,
  Bell as NotificationBell,
  User,
  Menu,
  LogOut,
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Live Map", icon: MapIcon, href: "/dashboard/map" },
  { label: "Vehicles", icon: Truck, href: "/dashboard/vehicles" },
  { label: "Drivers", icon: Users, href: "/dashboard/drivers" },
  { label: "Trips", icon: Route, href: "/dashboard/trips" },
  { label: "Fuel", icon: Droplets, href: "/dashboard/fuel" },
  { label: "Alerts", icon: Bell, href: "/dashboard/alerts" },
  { label: "Maintenance", icon: Wrench, href: "/dashboard/maintenance" },
  { label: "Jobs", icon: Briefcase, href: "/dashboard/jobs" },
  { label: "Mobile App", icon: Smartphone, href: "/dashboard/mobile-preview" },
  { label: "Reports", icon: BarChart3, href: "/dashboard/reports" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#06090F] text-slate-100 overflow-hidden selection:bg-[#00D4FF]/30">
      {/* Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 border-r border-slate-800 bg-[#0a0f1a] flex flex-col z-40 hidden md:flex`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00D4FF] to-[#FF6B9D] flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00D4FF] to-[#FF6B9D]">
              Geektrac
            </span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-3 space-y-1 py-4 custom-scrollbar">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
                  isActive 
                    ? "bg-[#00D4FF]/10 text-[#00D4FF]" 
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                <link.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-[#00D4FF]" : "group-hover:text-white"}`} />
                {sidebarOpen && <span className="font-medium">{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Button variant="ghost" className="w-full flex items-center justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50">
            <LogOut className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>Log out</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 bg-[#06090F]/80 backdrop-blur-md flex items-center justify-between px-6 z-30">
          <div className="flex items-center gap-4">
            <Button 
                variant="ghost" 
                size="icon" 
                className="text-slate-400 hover:text-white hidden md:flex" 
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="relative max-w-md hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-[#00D4FF] transition-colors w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white">
              <NotificationBell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#06090F]"></span>
            </Button>
            <div className="h-8 w-[1px] bg-slate-800 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium">Test User</div>
                <div className="text-xs text-slate-500">Fleet Admin</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                <User className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#06090F] custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
