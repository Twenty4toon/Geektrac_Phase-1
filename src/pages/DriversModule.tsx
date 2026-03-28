import { useState } from "react";
import { 
  Plus,
  Search,
  Filter,
  Users, 
  ShieldCheck, 
  Star, 
  AlertTriangle, 
  Phone, 
  Mail, 
  MapPin, 
  Truck,
  IdCard,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const drivers = [
  { id: 1, name: "Rajesh Kumar", idNumber: "DRV-1001", status: "Active", vehicle: "Truck-01", phone: "+91 98765 43210", email: "rajesh@geektrac.com", license: "MH12 2018 0045123", rating: 4.8, scorecard: "Excellent", experience: "12 Years", incidents: 0 },
  { id: 2, name: "Suresh Singh", idNumber: "DRV-1024", status: "Idle", vehicle: "Unassigned", phone: "+91 98765 43211", email: "suresh@geektrac.com", license: "MH12 2015 0098765", rating: 4.2, scorecard: "Good", experience: "8 Years", incidents: 1 },
  { id: 3, name: "Amit Patel", idNumber: "DRV-1008", status: "Active", vehicle: "Van-12", phone: "+91 98765 43212", email: "amit@geektrac.com", license: "MH43 2020 1122334", rating: 3.5, scorecard: "Average", experience: "3 Years", incidents: 2 },
  { id: 4, name: "Vikram Shah", idNumber: "DRV-1035", status: "On Leave", vehicle: "Truck-05", phone: "+91 98765 43213", email: "vikram@geektrac.com", license: "MH01 2012 5566778", rating: 4.9, scorecard: "Top Performer", experience: "15 Years", incidents: 0 },
  { id: 5, name: "Unassigned", idNumber: "N/A", status: "N/A", vehicle: "Pickup-08", phone: "N/A", email: "N/A", license: "N/A", rating: 0, scorecard: "N/A", experience: "N/A", incidents: 0 },
];

export function DriversModule() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDrivers = drivers.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.idNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Driver Management</h1>
          <p className="text-slate-400 text-sm">Track driver performance, licensing, and assignments.</p>
        </div>
        <Button className="bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-[#06090F] font-bold">
          <Plus className="w-4 h-4 mr-2" />
          Add New Driver
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#0a0f1a] border-slate-800">
            <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-[#00D4FF]" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">48</div>
                        <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total Drivers</div>
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card className="bg-[#0a0f1a] border-slate-800">
            <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">32</div>
                        <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Active Shifts</div>
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card className="bg-[#0a0f1a] border-slate-800">
            <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-rose-500" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">4</div>
                        <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Pending License Exits</div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

      {/* Search and filter */}
      <Card className="bg-[#0a0f1a] border-slate-800">
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input 
                placeholder="Search by name, ID, or license..." 
                className="pl-10 bg-slate-900 border-slate-700 text-sm focus:border-[#00D4FF] focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Driver Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrivers.map((driver) => (
          <Card key={driver.id} className="bg-[#0a0f1a] border-slate-800 group hover:border-[#00D4FF]/30 transition-all">
            <CardHeader className="p-0">
               <div className="h-24 bg-gradient-to-tr from-slate-900 to-slate-800 relative">
                    <div className="absolute -bottom-6 left-6 p-1 bg-[#0a0f1a] rounded-xl border border-slate-800 shadow-xl">
                        <div className="w-16 h-16 rounded-lg bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-700">
                            <Users className="w-8 h-8 text-slate-500" />
                        </div>
                    </div>
                    <div className="absolute top-4 right-4">
                         <Badge variant="outline" className={`text-[10px] uppercase h-5 border-none ${
                            driver.status === "Active" ? "bg-emerald-500/20 text-emerald-400" :
                            driver.status === "Idle" ? "bg-amber-500/20 text-amber-400" :
                            "bg-slate-500/20 text-slate-400"
                        }`}>
                            {driver.status}
                        </Badge>
                    </div>
               </div>
            </CardHeader>
            <CardContent className="pt-10 p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                   <h3 className="text-xl font-bold text-white">{driver.name}</h3>
                   <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <IdCard className="w-3.5 h-3.5" /> {driver.idNumber}
                      <span className="text-slate-700">•</span>
                      <Briefcase className="w-3.5 h-3.5 text-[#00D4FF]" /> {driver.experience} Exp.
                   </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span className="text-sm font-bold text-slate-200">{driver.rating}</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-500/80 uppercase">Scorecard</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 border-y border-slate-800/50 py-4">
                 <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-500">
                        <Truck className="w-4 h-4" /> Assigned
                    </div>
                    <span className="text-slate-300 font-medium">{driver.vehicle}</span>
                 </div>
                 <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-500">
                        <Phone className="w-4 h-4" /> Phone
                    </div>
                    <span className="text-slate-300 font-medium">{driver.phone}</span>
                 </div>
                 <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-500">
                        <IdCard className="w-4 h-4" /> License
                    </div>
                    <span className="text-slate-300 font-medium truncate max-w-[150px]">{driver.license}</span>
                 </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-2">
                     <Button size="icon" variant="outline" className="h-8 w-8 bg-slate-900 border-slate-700 text-slate-400 hover:text-[#00D4FF] transition-colors">
                        <Phone className="w-3.5 h-3.5" />
                     </Button>
                     <Button size="icon" variant="outline" className="h-8 w-8 bg-slate-900 border-slate-700 text-slate-400 hover:text-[#00D4FF] transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                     </Button>
                     <Button size="icon" variant="outline" className="h-8 w-8 bg-slate-900 border-slate-700 text-slate-400 hover:text-[#00D4FF] transition-colors">
                        <MapPin className="w-3.5 h-3.5" />
                     </Button>
                </div>
                <Button variant="ghost" className="text-[#00D4FF] text-xs font-bold hover:bg-[#00D4FF]/5">
                    View Scorecard
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
