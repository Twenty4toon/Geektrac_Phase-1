import { useState } from "react";
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Table as TableIcon, 
  Clock, 
  Activity,
  AlertCircle,
  Mail
} from "lucide-react";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  ComposedChart,
  Area,
  Bar
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast, Toaster } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

const utilizationData = [
  { name: "Active", value: 65, color: "#00D4FF" },
  { name: "Idle", value: 20, color: "#amber-500" },
  { name: "Maintenance", value: 10, color: "#FF6B9D" },
  { name: "Offline", value: 5, color: "#475569" },
];

const distanceData = [
  { day: "Mon", distance: 1200, fuel: 280 },
  { day: "Tue", distance: 1900, fuel: 420 },
  { day: "Wed", distance: 1500, fuel: 330 },
  { day: "Thu", distance: 2100, fuel: 490 },
  { day: "Fri", distance: 2400, fuel: 580 },
  { day: "Sat", distance: 800, fuel: 190 },
  { day: "Sun", distance: 600, fuel: 140 },
];

export default function ReportsModule() {
  const [dateRange] = useState("Last 7 Days");

  const handleExport = (format: string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: `Generating ${format} report...`,
        success: `${format} report downloaded successfully.`,
        error: "Failed to generate report.",
      }
    );
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" richColors theme="dark" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#00D4FF]" />
            Reports & Analytics
          </h1>
          <p className="text-slate-400 text-sm">Deep insights into fleet utilization and operational costs.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="bg-[#0a0f1a] border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-slate-300">
                <Calendar className="w-4 h-4 text-slate-500" />
                {dateRange}
            </div>
            
            <Dialog>
                <DialogTrigger render={
                    <Button variant="outline" className="border-slate-800 text-slate-400 hover:bg-slate-800">
                        <Mail className="w-4 h-4 mr-2" />
                        Schedule
                    </Button>
                } />
                <DialogContent className="bg-[#0a0f1a] border-slate-800 text-white">
                    <DialogHeader>
                        <DialogTitle>Schedule Email Report</DialogTitle>
                        <DialogDescription className="text-slate-500">
                            Receive automated PDF summaries in your inbox.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Frequency</label>
                            <div className="grid grid-cols-3 gap-2">
                                <Button variant="outline" className="bg-slate-900 border-slate-800 text-xs">Daily</Button>
                                <Button className="bg-[#00D4FF] text-[#06090F] border-none text-xs">Weekly</Button>
                                <Button variant="outline" className="bg-slate-900 border-slate-800 text-xs">Monthly</Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Recipient Email</label>
                            <input type="email" placeholder="admin@geektrac.com" className="w-full bg-slate-900 border border-slate-800 rounded-md p-2 text-sm" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button className="w-full bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-[#06090F] font-bold">
                            Save Schedule
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="flex items-center">
                <Button 
                    className="bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-[#06090F] font-bold rounded-r-none"
                    onClick={() => handleExport("PDF")}
                >
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                </Button>
                <Button 
                    variant="outline" 
                    className="border-slate-800 border-l-0 text-slate-400 hover:bg-slate-800 rounded-l-none px-3"
                    onClick={() => handleExport("Excel")}
                >
                    <TableIcon className="w-4 h-4" />
                </Button>
            </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
            { label: "Fleet Utilization", value: "84.2%", trend: "+5.1%", up: true, desc: "vs last 7 days" },
            { label: "Total Distance", value: "11,240 km", trend: "+12.4%", up: true, desc: "24 vehicles active" },
            { label: "Avg Fuel / KM", value: "₹24.8", trend: "-2.3%", up: false, desc: "Optimization improved" }
        ].map((stat, i) => (
            <Card key={i} className="bg-[#0a0f1a] border-slate-800">
                <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                            <h2 className="text-2xl font-bold text-white mt-1">{stat.value}</h2>
                        </div>
                        <Badge variant="outline" className={`border-none ${stat.up ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}`}>
                            {stat.up ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                            {stat.trend}
                        </Badge>
                    </div>
                    <p className="text-[10px] text-slate-600 mt-2 font-medium">{stat.desc}</p>
                </CardContent>
            </Card>
        ))}
      </div>

      <Tabs defaultValue="utilization" className="w-full">
        <TabsList className="bg-[#0a0f1a] border border-slate-800 p-1 mb-6">
          <TabsTrigger value="utilization" className="data-[state=active]:bg-slate-800 data-[state=active]:text-[#00D4FF]">Fleet Utilization</TabsTrigger>
          <TabsTrigger value="cost" className="data-[state=active]:bg-slate-800 data-[state=active]:text-[#00D4FF]">Cost Analysis</TabsTrigger>
          <TabsTrigger value="safety" className="data-[state=active]:bg-slate-800 data-[state=active]:text-[#00D4FF]">Safety Scoring</TabsTrigger>
        </TabsList>

        <TabsContent value="utilization" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-[#0a0f1a] border-slate-800 lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-lg">Daily Activity Trends</CardTitle>
                    <CardDescription className="text-slate-500 text-xs uppercase">Distance covered vs Fuel consumed</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={distanceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="day" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis yAxisId="left" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis yAxisId="right" orientation="right" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: "#0a0f1a", border: "1px solid #1e293b", borderRadius: "8px" }}
                                cursor={{ fill: "rgba(0, 212, 255, 0.05)" }}
                            />
                            <Bar yAxisId="left" dataKey="distance" fill="#00D4FF" radius={[4, 4, 0, 0]} barSize={20} />
                            <Area yAxisId="right" type="monotone" dataKey="fuel" fill="#FF6B9D" stroke="#FF6B9D" fillOpacity={0.1} strokeWidth={2} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="bg-[#0a0f1a] border-slate-800">
                <CardHeader>
                    <CardTitle className="text-lg">Fleet Distribution</CardTitle>
                    <CardDescription className="text-slate-500 text-xs font-bold">BY STATUS</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex flex-col items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={utilizationData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {utilizationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color === "#00D4FF" ? "#00D4FF" : entry.color === "#FF6B9D" ? "#FF6B9D" : "#1e293b"} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-4 w-full mt-4">
                        {utilizationData.map((d, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color === "#00D4FF" ? "#00D4FF" : d.color === "#FF6B9D" ? "#FF6B9D" : "#1e293b" }} />
                                <span className="text-[10px] font-bold text-slate-500 uppercase">{d.name} ({d.value}%)</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cost" className="mt-0">
             <Card className="bg-[#0a0f1a] border-slate-800 flex items-center justify-center p-20">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mx-auto">
                        <Activity className="w-8 h-8 text-slate-600 animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Cost Analysis Detail</h3>
                        <p className="text-slate-500 text-sm max-w-sm">Detailed cost-per-kilometer and route optimization reports are being calculated for your fleet.</p>
                    </div>
                    <Button variant="outline" className="border-slate-800 text-[#00D4FF] font-bold">
                        ENABLE ADVANCED COST TRACKING
                    </Button>
                </div>
             </Card>
        </TabsContent>

        <TabsContent value="safety" className="mt-0">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { driver: "Rajesh Kumar", score: 92, status: "Excellent", alerts: 2 },
                    { driver: "Amit Patel", score: 85, status: "Good", alerts: 5 },
                    { driver: "Suresh Singh", score: 68, status: "Needs Review", alerts: 14 }
                ].map((driver, i) => (
                    <Card key={i} className="bg-[#0a0f1a] border-slate-800">
                        <CardContent className="pt-6">
                             <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-slate-200">{driver.driver}</h3>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-tight mt-1">{driver.status}</p>
                                </div>
                                <div className={`text-2xl font-black ${driver.score > 80 ? "text-emerald-500" : driver.score > 70 ? "text-amber-500" : "text-rose-500"}`}>
                                    {driver.score}
                                </div>
                             </div>
                             <div className="space-y-3">
                                <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase">
                                    <span>Driving Score</span>
                                    <span>{driver.score}%</span>
                                </div>
                                <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full ${driver.score > 80 ? "bg-emerald-500" : driver.score > 70 ? "bg-amber-500" : "bg-rose-500"}`} 
                                        style={{ width: `${driver.score}%` }} 
                                    />
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                     <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                        <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                                        {driver.alerts} Safety Alerts
                                     </div>
                                     <Button variant="link" className="h-auto p-0 text-[#00D4FF] text-xs font-bold">Analyze →</Button>
                                </div>
                             </div>
                        </CardContent>
                    </Card>
                ))}
             </div>
        </TabsContent>
      </Tabs>

      {/* Recent High Level Insights */}
      <div className="pt-4">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Operational Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#00D4FF]/5 border border-[#00D4FF]/10 p-4 rounded-xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#00D4FF]/10 flex items-center justify-center shrink-0">
                    <TrendingDown className="w-5 h-5 text-[#00D4FF]" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-white">Fuel Efficiency Improved</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">Fleet-wide fuel consumption decreased by 5.1% after optimizing Route 08 assigned to Truck-01 and Van-12.</p>
                </div>
            </div>
            <div className="bg-[#FF6B9D]/5 border border-[#FF6B9D]/10 p-4 rounded-xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#FF6B9D]/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#FF6B9D]" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-white">Idle Time Alert</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">Average idle time at Mumbai Hub increased by 14m today. Consider reviewing loading schedules with hub supervisor.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
