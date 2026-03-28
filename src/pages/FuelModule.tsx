import { useState } from "react";
import { 
  Droplets, 
  Search, 
  Filter, 
  TrendingUp, 
  AlertTriangle, 
  Truck,
  Calendar,
  Zap,
  Clock,
  Navigation
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const fuelData = [
    { time: "08:00", level: 95, distance: 0 },
    { time: "10:00", level: 82, distance: 45 },
    { time: "12:00", level: 68, distance: 110 },
    { time: "14:00", level: 65, distance: 115 }, // Idle
    { time: "16:00", level: 35, distance: 220 }, // Steep drop
    { time: "18:00", level: 90, distance: 225 }, // Fill
    { time: "20:00", level: 78, distance: 280 },
];

const fuelDrainLogs = [
    { id: 1, vehicle: "Truck-01", type: "Fill", amount: "+55L", cost: "₹5,210", location: "BPCL Station, Vashi", time: "2 hours ago", status: "Verified" },
    { id: 2, vehicle: "Truck-02", type: "Drain", amount: "-12L", cost: "₹1,140", location: "Highway Parking, Lonavala", time: "5 hours ago", status: "Critical Alert" },
    { id: 3, vehicle: "Van-12", type: "Fill", amount: "+25L", cost: "₹2,375", location: "Shell Station, Pune", time: "1 day ago", status: "Verified" },
    { id: 4, vehicle: "Truck-05", type: "Consumption", amount: "-85L", cost: "₹8,075", location: "Enroute Nagpur", time: "1 day ago", status: "Verified" },
];

export default function FuelModule() {
    const [selectedVehicle, setSelectedVehicle] = useState("Truck-01");

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Fuel Monitoring</h1>
                    <p className="text-slate-400 text-sm">Real-time fuel level tracking and theft detection.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                        <Calendar className="w-4 h-4 mr-2" />
                        Today
                    </Button>
                    <Button className="bg-[#FF6B9D] hover:bg-[#FF6B9D]/80 text-white font-bold">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Audit All Drains
                    </Button>
                </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Cost", value: "₹2.4L", icon: TrendingUp, color: "text-[#00D4FF]", bg: "bg-[#00D4FF]/10" },
                    { label: "Total Fills", value: "1,240 L", icon: Droplets, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { label: "Suspected Theft", value: "15 L", icon: AlertTriangle, color: "text-rose-500", bg: "bg-rose-500/10" },
                    { label: "Avg Consumption", value: "4.2 km/L", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" }
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Fuel Analysis Chart */}
                <Card className="bg-[#0a0f1a] border-slate-800 lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-lg">Fuel Consumption Analysis</CardTitle>
                            <CardDescription className="text-slate-500">Fuel level vs Distance over time.</CardDescription>
                        </div>
                        <Select value={selectedVehicle} onValueChange={(val) => val && setSelectedVehicle(val)}>
                            <SelectTrigger className="w-[140px] bg-slate-900 border-slate-700 text-slate-300">
                                <SelectValue placeholder="Vehicle" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                <SelectItem value="Truck-01">Truck-01</SelectItem>
                                <SelectItem value="Truck-02">Truck-02</SelectItem>
                                <SelectItem value="Van-12">Van-12</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className="h-[350px] w-full pt-4 pr-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={fuelData}>
                                <defs>
                                    <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis 
                                    dataKey="time" 
                                    stroke="#475569" 
                                    fontSize={12} 
                                    tickLine={false} 
                                    axisLine={false} 
                                    dy={10}
                                />
                                <YAxis 
                                    stroke="#475569" 
                                    fontSize={12} 
                                    tickLine={false} 
                                    axisLine={false}
                                    domain={[0, 100]}
                                    tickFormatter={(val) => `${val}%`}
                                />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: "#0a0f1a", border: "1px solid #1e293b", borderRadius: "8px" }}
                                    itemStyle={{ color: "#e2e8f0" }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="level" 
                                    stroke="#00D4FF" 
                                    strokeWidth={3} 
                                    fillOpacity={1} 
                                    fill="url(#colorLevel)"
                                    activeDot={{ r: 6, strokeWidth: 0, fill: "#00D4FF" }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Consumption Ranking Bar Chart */}
                <Card className="bg-[#0a0f1a] border-slate-800 lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="text-lg text-white">Top Consuming Vehicles</CardTitle>
                        <CardDescription className="text-slate-500">Highest consumption (L) this week.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px] w-full pt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { name: "T-01", value: 450 },
                                { name: "T-05", value: 380 },
                                { name: "T-02", value: 310 },
                                { name: "V-12", value: 240 },
                                { name: "P-08", value: 120 },
                            ]}>
                                <XAxis dataKey="name" stroke="#475569" fontSize={11} axisLine={false} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: "#0a0f1a", border: "1px solid #1e293b", borderRadius: "8px" }}
                                    cursor={{ fill: "rgba(0, 212, 255, 0.05)" }}
                                />
                                <Bar dataKey="value" fill="#00D4FF" radius={[4, 4, 0, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Fuel Log Table */}
            <Card className="bg-[#0a0f1a] border-slate-800">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg">Recent Fuel Logs</CardTitle>
                            <CardDescription className="text-slate-500">Fills, consumption, and suspected drain events.</CardDescription>
                        </div>
                        <div className="flex gap-2">
                             <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <Input placeholder="Filter by vehicle..." className="pl-10 bg-slate-900 border-slate-700 h-9 text-xs" />
                             </div>
                             <Button variant="outline" size="sm" className="border-slate-700 bg-slate-900">
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
                                    <th className="pb-3 font-medium">Type</th>
                                    <th className="pb-3 font-medium">Amount</th>
                                    <th className="pb-3 font-medium">Cost Estimate</th>
                                    <th className="pb-3 font-medium text-center">Location</th>
                                    <th className="pb-3 font-medium text-center">Status</th>
                                    <th className="pb-3 font-medium text-right">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {fuelDrainLogs.map((log, i) => (
                                    <tr key={i} className="group hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3 font-medium text-slate-200">
                                                <Truck className="w-4 h-4 text-[#00D4FF]" />
                                                {log.vehicle}
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <Badge variant="outline" className={`h-6 border-none ${
                                                log.type === "Fill" ? "bg-emerald-500/10 text-emerald-500" :
                                                log.type === "Drain" ? "bg-rose-500/10 text-rose-500" :
                                                "bg-slate-500/10 text-slate-400"
                                            }`}>
                                                {log.type}
                                            </Badge>
                                        </td>
                                        <td className="py-4 font-bold text-slate-100">{log.amount}</td>
                                        <td className="py-4 text-slate-300 tracking-tight">{log.cost}</td>
                                        <td className="py-4 text-center">
                                            <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs">
                                                <Navigation className="w-3.5 h-3.5" />
                                                {log.location}
                                            </div>
                                        </td>
                                        <td className="py-4 text-center">
                                            <span className={`text-[10px] uppercase font-bold tracking-wider ${
                                                log.status === "Verified" ? "text-emerald-500" : "text-rose-500 animate-pulse"
                                            }`}>
                                                {log.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-slate-500 text-right text-xs">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                {log.time}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Button variant="link" className="text-[#00D4FF] p-0 h-auto mt-4 text-sm font-bold">
                        Export Full Consumption Report →
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
