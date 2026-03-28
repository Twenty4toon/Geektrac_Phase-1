import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Truck, 
  Monitor, 
  Activity, 
  ShieldCheck, 
  Calendar,
  Settings2,
  AlertTriangle,
  User as UserIcon,
  Tractor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const initialVehicles = [
  { id: 1, name: "Truck-01", plate: "MH 12 AB 1234", type: "Heavy Truck", status: "Active", driver: "Rajesh Kumar", imei: "358942100876541", odometer: "45,210 km", lastService: "12 Oct 2025" },
  { id: 2, name: "Truck-02", plate: "MH 12 CD 5678", type: "Medium Truck", status: "Idle", driver: "Suresh Singh", imei: "358942100876542", odometer: "32,150 km", lastService: "05 Nov 2025" },
  { id: 3, name: "Van-12", plate: "MH 12 EF 9012", type: "Delivery Van", status: "Active", driver: "Amit Patel", imei: "358942100876543", odometer: "12,400 km", lastService: "20 Sep 2025" },
  { id: 4, name: "Truck-05", plate: "MH 12 GH 3456", type: "Heavy Truck", status: "Service", driver: "Vikram Shah", imei: "358942100876544", odometer: "88,900 km", lastService: "01 Dec 2025" },
  { id: 5, name: "Pickup-08", plate: "MH 12 IJ 7890", type: "Pickup Truck", status: "Offline", driver: "Unassigned", imei: "358942100876545", odometer: "5,600 km", lastService: "15 Jan 2026" },
];

export default function VehiclesModule() {
  const [vehicles] = useState(initialVehicles);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.driver.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || v.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Vehicle Management</h1>
          <p className="text-slate-400 text-sm">Monitor and manage your entire fleet assets here.</p>
        </div>
        
        <Dialog>
          <DialogTrigger render={
            <Button className="bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-[#06090F] font-bold">
              <Plus className="w-4 h-4 mr-2" />
              Add New Vehicle
            </Button>
          } />
          <DialogContent className="bg-[#0a0f1a] border-slate-800 text-white max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl">Register New Vehicle</DialogTitle>
              <DialogDescription className="text-slate-400">
                Enter the vehicle and GPS device details to begin tracking.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Vehicle Name</Label>
                <Input id="name" placeholder="Truck-04" className="bg-slate-900 border-slate-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plate">Plate Number</Label>
                <Input id="plate" placeholder="MH 12 XX 0000" className="bg-slate-900 border-slate-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Vehicle Type</Label>
                <Select value={selectedVehicle} onValueChange={(val) => val && setSelectedVehicle(val)}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-400">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-white">
                    <SelectItem value="heavy">Heavy Truck</SelectItem>
                    <SelectItem value="medium">Medium Truck</SelectItem>
                    <SelectItem value="van">Delivery Van</SelectItem>
                    <SelectItem value="pickup">Pickup Truck</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="imei">GPS IMEI Number</Label>
                <Input id="imei" placeholder="15 digits" className="bg-slate-900 border-slate-700" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">Cancel</Button>
              <Button className="bg-[#00D4FF] text-[#06090F] font-bold">Save Vehicle</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
            { label: "Active", count: 42, color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { label: "Idle", count: 18, color: "text-amber-500", bg: "bg-amber-500/10" },
            { label: "In Service", count: 8, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Critical Alerts", count: 3, color: "text-rose-500", bg: "bg-rose-500/10" }
        ].map((item, i) => (
            <Card key={i} className="bg-[#0a0f1a] border-slate-800 shadow-sm transition-transform hover:-translate-y-1">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-3xl font-bold text-white">{item.count}</div>
                            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">{item.label}</div>
                        </div>
                        <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center`}>
                            <Truck className={`w-5 h-5 ${item.color}`} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>

      {/* Search & Filters */}
      <Card className="bg-[#0a0f1a] border-slate-800">
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input 
                placeholder="Search by name, plate, or driver..." 
                className="pl-10 bg-slate-900 border-slate-700 text-sm focus:border-[#00D4FF] focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Select value={statusFilter} onValueChange={(val) => val && setStatusFilter(val)}>
                <SelectTrigger className="w-full md:w-[150px] bg-slate-900 border-slate-700 text-slate-300">
                   <Filter className="w-4 h-4 mr-2" />
                   <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-white">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="idle">Idle</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                <Settings2 className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="bg-[#0a0f1a] border-slate-800 overflow-hidden group hover:border-[#00D4FF]/30 transition-all">
            <div className="p-5 border-b border-slate-800">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-slate-800 ${
                      vehicle.type.includes("Heavy") ? "bg-[#00D4FF]/5" : "bg-purple-500/5"
                  }`}>
                    <Tractor className={`w-6 h-6 ${
                        vehicle.type.includes("Heavy") ? "text-[#00D4FF]" : "text-purple-400"
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white flex items-center gap-2">
                        {vehicle.name}
                        <Badge variant="outline" className={`text-[10px] uppercase px-1.5 h-4 border-none ${
                            vehicle.status === "Active" ? "bg-emerald-500/20 text-emerald-400" :
                            vehicle.status === "Idle" ? "bg-amber-500/20 text-amber-400" :
                            vehicle.status === "Service" ? "bg-blue-500/20 text-blue-400" :
                            "bg-slate-500/20 text-slate-400"
                        }`}>
                            {vehicle.status}
                        </Badge>
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{vehicle.plate}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                        <UserIcon className="w-2.5 h-2.5" /> Assigned Driver
                    </p>
                    <p className="text-sm font-medium text-slate-200">{vehicle.driver}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                        <Activity className="w-2.5 h-2.5" /> Odometer
                    </p>
                    <p className="text-sm font-medium text-slate-200">{vehicle.odometer}</p>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                        <AlertTriangle className="w-2.5 h-2.5" /> Device IMEI
                    </p>
                    <p className="text-xs font-mono text-slate-400">{vehicle.imei}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" /> Last Service
                    </p>
                    <p className="text-sm font-medium text-slate-200">{vehicle.lastService}</p>
                 </div>
              </div>

              <div className="pt-4 flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-slate-900 border-slate-700 text-xs text-slate-300 hover:bg-slate-800">
                    <Monitor className="w-3.5 h-3.5 mr-1.5" /> Live
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-slate-900 border-slate-700 text-xs text-slate-300 hover:bg-slate-800">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> Reports
                </Button>
                <Button variant="outline" size="sm" className="bg-slate-900 border-slate-700 text-xs text-slate-300 hover:bg-slate-800 px-2 shrink-0">
                    <Settings2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
