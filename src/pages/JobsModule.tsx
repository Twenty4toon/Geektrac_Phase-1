import { useState } from "react";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  MapPin, 
  Truck, 
  User, 
  ArrowRight,
  ClipboardList,
  Timer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const jobs = [
  { id: 1, title: "Delivery #8841", status: "In Progress", driver: "Rajesh Kumar", vehicle: "Truck-01", origin: "Mumbai Hub", dest: "Pune Warehouse", eta: "45 mins", progress: 75, priority: "High" },
  { id: 2, title: "Fuel Refill", status: "Pending", driver: "Suresh Singh", vehicle: "Truck-02", origin: "Depot B", dest: "Petrol Station", eta: "N/A", progress: 0, priority: "Medium" },
  { id: 3, title: "Maintenance", status: "Delayed", driver: "Unassigned", vehicle: "Truck-05", origin: "Service Center", dest: "Workshop", eta: "Delayed by 2h", progress: 20, priority: "Critical" },
  { id: 4, title: "Express Cargo", status: "In Progress", driver: "Amit Patel", vehicle: "Van-12", origin: "Surat", dest: "Mumbai Airport", eta: "5h 20m", progress: 40, priority: "Medium" },
  { id: 5, title: "Logistics", status: "Pending", driver: "Vikram Shah", vehicle: "Truck-06", origin: "Nashik Hub", dest: "Indore Depot", eta: "8h", progress: 10, priority: "Low" },
];

const columns = [
  { id: "Pending", label: "Upcoming的任务", color: "bg-slate-500/10", text: "text-slate-400" },
  { id: "In Progress", label: "Active Jobs", color: "bg-[#00D4FF]/10", text: "text-[#00D4FF]" },
  { id: "Delayed", label: "Attention Required", color: "bg-rose-500/10", text: "text-rose-500" },
  { id: "Completed", label: "Finalized", color: "bg-emerald-500/10", text: "text-emerald-500" },
];

export default function JobsModule() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = (status: string) => jobs.filter(j => 
    j.status === status && (
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      j.driver.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-[#00D4FF]" />
            Job Dispath & Tracking
          </h1>
          <p className="text-slate-400 text-sm">Assign tasks and monitor live job execution progress.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                    type="text" 
                    placeholder="Search jobs..." 
                    className="w-full bg-[#0a0f1a] border border-slate-800 rounded-md h-9 pl-10 pr-4 text-xs text-white" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <Button className="bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-[#06090F] font-bold">
                <Plus className="w-4 h-4 mr-2" />
                New Job
            </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {columns.map((column) => (
            <div key={column.id} className="space-y-4">
                <div className={`p-4 rounded-xl ${column.color} border border-slate-800/10 flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${column.text.replace('text', 'bg')}`} />
                        <h2 className={`font-bold text-sm uppercase tracking-widest ${column.text}`}>{column.label}</h2>
                    </div>
                    <span className="text-xs font-bold text-slate-500">{filteredJobs(column.id).length}</span>
                </div>

                <div className="space-y-4">
                    {filteredJobs(column.id).map((job) => (
                        <Card key={job.id} className="bg-[#0a0f1a] border-slate-800 hover:border-slate-700 transition-all cursor-pointer group shadow-lg">
                            <CardContent className="p-4 space-y-4">
                               <div className="flex items-start justify-between">
                                  <div className="flex items-center gap-2">
                                     <h3 className="font-bold text-slate-200">{job.title}</h3>
                                     <Badge variant="outline" className={`text-[9px] uppercase h-4 px-1 border-none ${
                                        job.priority === "Critical" ? "bg-rose-500/10 text-rose-500" :
                                        job.priority === "High" ? "bg-amber-500/10 text-amber-500" :
                                        job.priority === "Medium" ? "bg-blue-500/10 text-blue-500" :
                                        "bg-slate-500/10 text-slate-400"
                                     }`}>
                                        {job.priority}
                                     </Badge>
                                  </div>
                                  <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-600 group-hover:text-slate-200">
                                     <MoreVertical className="w-4 h-4" />
                                  </Button>
                               </div>

                               <div className="flex flex-col gap-2">
                                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                                     <span className="flex items-center gap-1.5 font-bold text-slate-500 uppercase">
                                        <MapPin className="w-3 h-3" /> Origin
                                     </span>
                                     <span className="text-slate-300">{job.origin}</span>
                                  </div>
                                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                                     <span className="flex items-center gap-1.5 font-bold text-slate-500 uppercase">
                                        <ArrowRight className="w-3 h-3 text-[#00D4FF]" /> Destination
                                     </span>
                                     <span className="text-slate-300 font-bold">{job.dest}</span>
                                  </div>
                               </div>

                               <div className="space-y-2 pt-2 border-t border-slate-800/50">
                                   <div className="flex items-center justify-between text-[10px] text-slate-500">
                                      <span className="flex items-center gap-1.5 uppercase font-bold tracking-tight">
                                        <Truck className="w-3 h-3" /> {job.vehicle}
                                      </span>
                                      <span className="flex items-center gap-1.5 uppercase font-bold tracking-tight">
                                        <Timer className="w-3 h-3" /> ETA {job.eta}
                                      </span>
                                   </div>
                                   <Progress value={job.progress} className="h-1 bg-slate-900" />
                                   <div className="flex items-center justify-between text-[10px] font-bold">
                                      <span className="flex items-center gap-1 text-slate-400">
                                        <User className="w-3 h-3" /> {job.driver}
                                      </span>
                                      <span className="text-[#00D4FF]">{job.progress}%</span>
                                   </div>
                               </div>
                            </CardContent>
                        </Card>
                    ))}
                    <Button variant="ghost" className="w-full border border-dashed border-slate-800 text-slate-600 hover:text-slate-400 hover:border-slate-700 h-10 text-xs font-bold">
                        <Plus className="w-3 h-3 mr-2" /> 
                        ADD QUICK JOB
                    </Button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
