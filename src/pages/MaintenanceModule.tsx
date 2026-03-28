import { 
  Wrench, 
  Settings2, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  History, 
  Truck, 
  ClipboardList
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const maintenanceTasks = [
    { id: 1, vehicle: "Truck-01", task: "Engine Oil Change", type: "Preventive", status: "Upcoming", priority: "High", progress: 85, dueDate: "10 Days remaining", odometer: "45,000 km / 50,000 km" },
    { id: 2, vehicle: "Truck-02", task: "Brake Pad Replacement", type: "Repair", status: "In Progress", priority: "Critical", progress: 45, dueDate: "Due Today", odometer: "N/A" },
    { id: 3, vehicle: "Van-12", task: "Tire Rotation", type: "Preventive", status: "Upcoming", priority: "Medium", progress: 60, dueDate: "25 Days remaining", odometer: "12,000 km / 15,000 km" },
    { id: 4, vehicle: "Truck-05", task: "Transmission Flush", type: "Preventive", status: "Upcoming", priority: "Low", progress: 10, dueDate: "60 Days remaining", odometer: "88,000 km / 100,000 km" },
];

const serviceHistory = [
    { id: 1, vehicle: "Truck-01", service: "Full Inspection", date: "15 Jan 2026", cost: "₹18,500", parts: "Oil Filter, Air Filter, Coolant", status: "Completed" },
    { id: 2, vehicle: "Pickup-08", service: "Battery Replacement", date: "12 Jan 2026", cost: "₹7,200", parts: "Exide Gold Battery", status: "Completed" },
    { id: 3, vehicle: "Truck-02", service: "Suspension Repair", date: "05 Jan 2026", cost: "₹42,000", parts: "Front Struts, Bushings", status: "Completed" },
];

export default function MaintenanceModule() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Maintenance & Service</h1>
                    <p className="text-slate-400 text-sm">Automated service reminders and detailed repair logs.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                        <History className="w-4 h-4 mr-2" />
                        Full Logs
                    </Button>
                    <Button className="bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-[#06090F] font-bold">
                        <Plus className="w-4 h-4 mr-2" />
                        Schedule Service
                    </Button>
                </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Due Today", value: "2", icon: Clock, color: "text-rose-500", bg: "bg-rose-500/10" },
                    { label: "In Workshop", value: "3", icon: Wrench, color: "text-amber-500", bg: "bg-amber-500/10" },
                    { label: "Healthy Fleet", value: "92%", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { label: "MTTR (Avg)", value: "1.4d", icon: ClipboardList, color: "text-[#00D4FF]", bg: "bg-[#00D4FF]/10" }
                ].map((stat, i) => (
                    <Card key={i} className="bg-[#0a0f1a] border-slate-800 shadow-sm transition-transform hover:-translate-y-1">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">{stat.label}</div>
                                </div>
                                <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center`}>
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Maintenance Tasks Grid */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-[#00D4FF]" />
                        Upcoming & Pending Tasks
                    </h2>
                    <Button variant="link" className="text-[#00D4FF] font-bold text-sm">View All Schedule →</Button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {maintenanceTasks.map((task) => (
                        <Card key={task.id} className="bg-[#0a0f1a] border-slate-800 hover:border-slate-700 transition-colors">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                                            <Wrench className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-200">{task.task}</h3>
                                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                                <Truck className="w-3 h-3" /> {task.vehicle}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className={`h-5 border-none text-[10px] uppercase font-bold tracking-wider ${
                                        task.priority === "Critical" ? "bg-rose-500/10 text-rose-500" :
                                        task.priority === "High" ? "bg-amber-500/10 text-amber-500" :
                                        "bg-blue-500/10 text-blue-500"
                                    }`}>
                                        {task.priority} Priority
                                    </Badge>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {task.dueDate}</span>
                                        <span className="font-mono">{task.progress}% to service</span>
                                    </div>
                                    <Progress value={task.progress} className="h-1.5 bg-slate-900" />
                                    {task.odometer !== "N/A" && (
                                        <div className="p-3 bg-slate-900/50 rounded-lg flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-slate-600 uppercase">Service Interval</span>
                                                <span className="text-xs font-mono text-slate-300">{task.odometer}</span>
                                            </div>
                                            <Settings2 className="w-4 h-4 text-slate-700" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2 mt-5">
                                    <Button size="sm" className="flex-1 bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-[#06090F] font-bold text-xs">
                                        Mark Done
                                    </Button>
                                    <Button size="sm" variant="outline" className="flex-1 border-slate-800 text-slate-400 font-bold text-xs">
                                        Re-schedule
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Service History Table */}
            <Card className="bg-[#0a0f1a] border-slate-800 mt-8">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg">Recent Service History</CardTitle>
                            <CardDescription className="text-slate-500">Audit trail of past maintenance entries.</CardDescription>
                        </div>
                        <div className="flex gap-2">
                             <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input placeholder="Filter services..." className="w-full pl-10 bg-slate-900 border border-slate-700 rounded-md h-9 text-xs text-white" />
                             </div>
                             <Button variant="outline" size="sm" className="border-slate-800 text-slate-400 hover:bg-slate-800 font-medium whitespace-nowrap">
                                <Filter className="w-3.5 h-3.5 mr-2" />
                                Filter
                             </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-800 text-slate-500 text-left">
                                    <th className="pb-3 font-medium">Vehicle</th>
                                    <th className="pb-3 font-medium">Service Performed</th>
                                    <th className="pb-3 font-medium">Cost</th>
                                    <th className="pb-3 font-medium">Parts Replaced</th>
                                    <th className="pb-3 font-medium text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {serviceHistory.map((history, i) => (
                                    <tr key={i} className="group hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3 font-bold text-slate-200">
                                                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] text-[#00D4FF]">
                                                    {history.vehicle.split("-")[1]}
                                                </div>
                                                {history.vehicle}
                                            </div>
                                        </td>
                                        <td className="py-4 text-slate-300 font-medium">{history.service}</td>
                                        <td className="py-4 font-bold text-[#FF6B9D]">{history.cost}</td>
                                        <td className="py-4 text-slate-500 text-xs italic">{history.parts}</td>
                                        <td className="py-4 text-slate-500 text-right text-xs">
                                            <div className="flex items-center justify-end gap-1.5 font-medium">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {history.date}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
