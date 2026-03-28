import { useState, useEffect } from "react";
import { 
  Bell, 
  Filter, 
  AlertTriangle, 
  ShieldAlert, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Zap, 
  Navigation
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast, Toaster } from "sonner";

const initialAlerts = [
  { id: 1, type: "Overspeeding", vehicle: "Truck-01", severity: "High", message: "Vehicle exceeded 80km/h on Mumbai Highway.", time: "2 mins ago", location: "Mumbai-Pune Expway", status: "Unread" },
  { id: 2, type: "Geofence Exit", vehicle: "Van-12", severity: "Medium", message: "Vehicle exited 'Warehouse A Zone'.", time: "15 mins ago", location: "Andheri East", status: "Unread" },
  { id: 3, type: "SOS / Panic", vehicle: "Truck-05", severity: "Critical", message: "Panic button pressed by Driver Rajesh.", time: "45 mins ago", location: "Lonavala Bypass", status: "Unread" },
  { id: 4, type: "Power Cut", vehicle: "Truck-02", severity: "High", message: "Main power supply disconnected from GPS.", time: "1 hour ago", location: "Vashi Sector 17", status: "Read" },
  { id: 5, type: "Harsh Braking", vehicle: "Pickup-08", severity: "Low", message: "Sudden deceleration detected (4.2g).", time: "3 hours ago", location: "Panvel Hub", status: "Read" },
  { id: 6, type: "Idling Alert", vehicle: "Truck-01", severity: "Low", message: "Engine idling for more than 20 minutes.", time: "5 hours ago", location: "Parking Lot B", status: "Archived" },
];

export default function AlertsModule() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filter, setFilter] = useState("all");
  const search = ""; // Mock search query for now

  // Demo Notification
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.error("CRITICAL ALERT", {
        description: "SOS Signal received from Truck-05 near Lonavala.",
        action: {
          label: "View Map",
          onClick: () => console.log("Navigate to map"),
        },
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const filteredAlerts = alerts.filter(a => {
    const matchesSearch = a.vehicle.toLowerCase().includes(search.toLowerCase()) || 
                          a.message.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || a.severity.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const markAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, status: "Read" })));
    toast.success("All alerts marked as read");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Toaster position="top-right" richColors theme="dark" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#FF6B9D]" />
            Alerts Center
          </h1>
          <p className="text-slate-400 text-sm">Real-time safety and security event monitoring.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" className="border-slate-800 text-slate-400 hover:bg-slate-800" onClick={markAllRead}>
                Mark All Read
            </Button>
            <Button className="bg-[#FF6B9D] hover:bg-[#FF6B9D]/80 text-white font-bold">
                <Filter className="w-4 h-4 mr-2" />
                Configure Rules
            </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {["all", "Critical", "High", "Medium", "Low"].map((lvl) => (
            <Button 
                key={lvl}
                variant={filter === lvl ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(lvl)}
                className={filter === lvl ? "bg-[#00D4FF] text-[#06090F]" : "border-slate-800 text-slate-400 hover:bg-slate-800"}
            >
                {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
            </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredAlerts.map((alert) => (
            <Card key={alert.id} className={`bg-[#0a0f1a] border-slate-800 transition-all hover:border-slate-700 ${
                alert.status === "Unread" ? "border-l-4 border-l-[#FF6B9D]" : ""
            }`}>
                <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                alert.severity === "Critical" ? "bg-rose-500/10 text-rose-500" :
                                alert.severity === "High" ? "bg-amber-500/10 text-amber-500" :
                                "bg-blue-500/10 text-blue-500"
                            }`}>
                                {alert.severity === "Critical" ? <ShieldAlert className="w-5 h-5" /> : 
                                 alert.type === "Overspeeding" ? <Zap className="w-5 h-5" /> :
                                 <AlertTriangle className="w-5 h-5" />}
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-slate-200">{alert.type}</h3>
                                    <Badge variant="outline" className={`h-4 text-[10px] uppercase border-none ${
                                        alert.severity === "Critical" ? "bg-rose-500/10 text-rose-500" :
                                        alert.severity === "High" ? "bg-amber-500/10 text-amber-500" :
                                        "bg-blue-500/10 text-blue-500"
                                    }`}>
                                        {alert.severity}
                                    </Badge>
                                    <span className="text-slate-600 font-mono text-xs tracking-tighter">• {alert.vehicle}</span>
                                </div>
                                <p className="text-sm text-slate-400 leading-relaxed">{alert.message}</p>
                                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500 font-medium">
                                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {alert.time}</span>
                                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {alert.location}</span>
                                    <Button variant="link" className="h-auto p-0 text-[#00D4FF] text-xs font-bold">
                                        <Navigation className="w-3.5 h-3.5 mr-1" /> View on Map
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:text-emerald-500">
                                <CheckCircle2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:text-rose-500">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="flex items-center justify-center pt-6">
        <Button variant="outline" className="border-slate-800 text-slate-400">
            LOAD OLDER ALERTS
        </Button>
      </div>
    </div>
  );
}
