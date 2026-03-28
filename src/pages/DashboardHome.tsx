import { 
    Users, 
    Truck, 
    Bell, 
    Droplets, 
    ArrowUpRight, 
    ArrowDownRight 
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
  LineChart, 
  Line 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const stats = [
  { label: "Total Vehicles", value: "124", icon: Truck, change: "+12%", trend: "up", color: "text-[#00D4FF]", bg: "bg-[#00D4FF]/10" },
  { label: "Active Drivers", value: "86", icon: Users, change: "+5%", trend: "up", color: "text-[#a855f7]", bg: "bg-[#a855f7]/10" },
  { label: "Critical Alerts", value: "12", icon: Bell, change: "-2%", trend: "down", color: "text-[#FF6B9D]", bg: "bg-[#FF6B9D]/10" },
  { label: "Fuel Cost", value: "₹45,210", icon: Droplets, change: "+8%", trend: "up", color: "text-[#10b981]", bg: "bg-[#10b981]/10" },
];

const pieData = [
  { name: "Moving", value: 45, color: "#10b981" },
  { name: "Idle", value: 25, color: "#f59e0b" },
  { name: "Stopped", value: 15, color: "#ef4444" },
  { name: "Offline", value: 15, color: "#6e7681" },
];

const lineData = [
    { name: "08:00", speed: 45 },
    { name: "10:00", speed: 52 },
    { name: "12:00", speed: 38 },
    { name: "14:00", speed: 65 },
    { name: "16:00", speed: 48 },
    { name: "18:00", speed: 55 },
    { name: "20:00", speed: 42 },
];

const recentAlerts = [
    { vehicle: "Truck-01", type: "Overspeeding", severity: "high", time: "2 mins ago" },
    { vehicle: "Van-12", type: "Geofence Exit", severity: "medium", time: "15 mins ago" },
    { vehicle: "Truck-05", type: "Harsh Braking", severity: "low", time: "45 mins ago" },
    { vehicle: "Truck-02", type: "Fuel Drain", severity: "critical", time: "1 hour ago" },
];

export function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Fleet Overview</h1>
          <p className="text-slate-400 text-sm">Real-time status of your entire fleet operation.</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" className="text-slate-200 border-slate-700 bg-slate-800/50 hover:bg-slate-700">
                Download Report
            </Button>
            <Button className="bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-[#06090F] font-bold">
                Add Vehicle
            </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-[#0a0f1a] border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${stat.trend === "up" ? "text-emerald-500" : "text-rose-500"}`}>
                  {stat.change}
                  {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fleet Status Pie Chart */}
        <Card className="bg-[#0a0f1a] border-slate-800 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Fleet Status</CardTitle>
            <CardDescription className="text-slate-500">Live vehicle distribution.</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] w-full pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0a0f1a", border: "1px solid #1e293b", borderRadius: "8px" }}
                  itemStyle={{ color: "#e2e8f0" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-medium">
                {pieData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-slate-400">{item.name}</span>
                        <span className="text-white ml-auto">{item.value}%</span>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Speed Trend Chart */}
        <Card className="bg-[#0a0f1a] border-slate-800 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Avg Fleet Speed</CardTitle>
            <CardDescription className="text-slate-500">Speed trends over the last 24 hours.</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] w-full pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                    dataKey="name" 
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
                    tickFormatter={(value) => `${value} km/h`}
                />
                <Tooltip 
                    contentStyle={{ backgroundColor: "#0a0f1a", border: "1px solid #1e293b", borderRadius: "8px" }}
                    itemStyle={{ color: "#e2e8f0" }}
                />
                <Line 
                    type="monotone" 
                    dataKey="speed" 
                    stroke="#00D4FF" 
                    strokeWidth={3} 
                    dot={{ fill: "#00D4FF", strokeWidth: 2, r: 4, stroke: "#06090F" }} 
                    activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts Table */}
      <Card className="bg-[#0a0f1a] border-slate-800">
        <CardHeader>
            <CardTitle className="text-lg">Recent Alerts</CardTitle>
            <CardDescription className="text-slate-500">Latest security and safety notifications.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-800 text-slate-500 text-left">
                            <th className="pb-3 font-medium">Vehicle</th>
                            <th className="pb-3 font-medium">Alert Type</th>
                            <th className="pb-3 font-medium">Severity</th>
                            <th className="pb-3 font-medium text-right">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {recentAlerts.map((alert, i) => (
                            <tr key={i} className="group hover:bg-slate-800/30 transition-colors">
                                <td className="py-4 font-medium text-slate-200">{alert.vehicle}</td>
                                <td className="py-4 text-slate-300">{alert.type}</td>
                                <td className="py-4">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                        alert.severity === "critical" ? "bg-rose-500/10 text-rose-500 border-rose-500/20" :
                                        alert.severity === "high" ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                                        alert.severity === "medium" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                                        "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                    }`}>
                                        {alert.severity}
                                    </span>
                                </td>
                                <td className="py-4 text-slate-500 text-right">{alert.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Button variant="link" className="text-[#00D4FF] p-0 h-auto mt-4 text-sm font-bold">
                View all alerts →
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
import { Button } from "@/components/ui/button";
