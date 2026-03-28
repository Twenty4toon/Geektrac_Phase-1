import { useState } from "react";
import { 
  User, 
  Building2, 
  ShieldCheck, 
  Bell, 
  Globe, 
  CloudUpload, 
  Save, 
  Smartphone,
  Lock,
  CreditCard,
  ShieldAlert,
  Wrench,
  Settings,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast, Toaster } from "sonner";

export default function SettingsModule() {
  const [loading, setLoading] = useState(false);

  const handleSave = (section: string) => {
    setLoading(true);
    const promise = new Promise((resolve) => setTimeout(resolve, 1500));
    toast.promise(
      promise,
      {
        loading: `Saving ${section} settings...`,
        success: `${section} settings updated!`,
        error: "Failed to save settings.",
      }
    );
    promise.finally(() => setLoading(false));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <Toaster position="top-right" richColors theme="dark" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-slate-400" />
            System Settings
          </h1>
          <p className="text-slate-400 text-sm">Manage your profile, organization, and security preferences.</p>
        </div>
        <Button 
            className="bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-[#06090F] font-bold"
            onClick={() => handleSave("All")}
            disabled={loading}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-[#0a0f1a] border border-slate-800 mb-8 p-1">
          <TabsTrigger value="profile" className="flex items-center gap-2"><User className="w-4 h-4" /> Profile</TabsTrigger>
          <TabsTrigger value="organization" className="flex items-center gap-2"><Building2 className="w-4 h-4" /> Organization</TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Security</TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2"><Bell className="w-4 h-4" /> Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-[#0a0f1a] border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Account Information</CardTitle>
              <CardDescription className="text-slate-500">Update your personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center overflow-hidden">
                        <User className="w-12 h-12 text-slate-500" />
                    </div>
                    <button className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full transition-opacity cursor-pointer">
                        <CloudUpload className="w-6 h-6 text-white" />
                    </button>
                </div>
                <div className="space-y-1">
                    <h4 className="text-white font-bold">Profile Photo</h4>
                    <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size of 800K</p>
                    <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm" className="h-8 border-slate-800 text-slate-400">Upload</Button>
                        <Button variant="ghost" size="sm" className="h-8 text-rose-500">Remove</Button>
                    </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label className="text-slate-400">Full Name</Label>
                    <Input className="bg-slate-900 border-slate-800 text-white" defaultValue="Test User" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-slate-400">Email Address</Label>
                    <Input className="bg-slate-900 border-slate-800 text-white" defaultValue="admin@geektrac.com" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-slate-400">Job Title</Label>
                    <Input className="bg-slate-900 border-slate-800 text-white" defaultValue="Fleet Manager" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-slate-400">Phone</Label>
                    <Input className="bg-slate-900 border-slate-800 text-white" defaultValue="+91 98765 43210" />
                 </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organization" className="space-y-6">
          <Card className="bg-[#0a0f1a] border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Branding & Fleet Info</CardTitle>
              <CardDescription className="text-slate-500">Identity settings for your fleet management portal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label className="text-slate-400">Organization Name</Label>
                    <Input className="bg-slate-900 border-slate-800 text-white" defaultValue="Geektrac Logistics" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-slate-400">Industry</Label>
                    <Input className="bg-slate-900 border-slate-800 text-white" defaultValue="Freight & Transport" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-slate-400">Default Currency</Label>
                    <Input className="bg-slate-900 border-slate-800 text-white" defaultValue="INR (₹)" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-slate-400">Timezone</Label>
                    <Input className="bg-slate-900 border-slate-800 text-white" defaultValue="Asia/Kolkata (GMT+5:30)" />
                 </div>
              </div>
              <div className="pt-4 border-t border-slate-800">
                 <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <Label className="text-white font-bold flex items-center gap-2">
                            <Globe className="w-4 h-4 text-[#00D4FF]" />
                            Custom Domain (White-label)
                        </Label>
                        <p className="text-xs text-slate-500">Map your own domain for client access labels.</p>
                    </div>
                    <Badge variant="outline" className="bg-[#00D4FF]/10 text-[#00D4FF] border-none font-bold">ADVANCED</Badge>
                 </div>
                 <div className="mt-4 flex gap-2">
                    <Input className="bg-slate-900 border-slate-800 text-white" placeholder="fleet.yourcompany.com" />
                    <Button variant="outline" className="border-slate-800 text-slate-400 whitespace-nowrap">Verify DNS</Button>
                 </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
           <div className="grid grid-cols-1 gap-6">
              <Card className="bg-[#0a0f1a] border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Lock className="w-5 h-5 text-rose-500" />
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="space-y-2">
                      <Label className="text-slate-400">Current Password</Label>
                      <Input type="password" placeholder="••••••••" className="bg-slate-900 border-slate-800" />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <Label className="text-slate-400">New Password</Label>
                         <Input type="password" placeholder="••••••••" className="bg-slate-900 border-slate-800" />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-slate-400">Confirm New Password</Label>
                         <Input type="password" placeholder="••••••••" className="bg-slate-900 border-slate-800" />
                      </div>
                   </div>
                   <Button variant="outline" className="border-slate-800 text-slate-400 mt-2">Update Password</Button>
                </CardContent>
              </Card>

              <Card className="bg-[#0a0f1a] border-slate-800">
                <CardContent className="pt-6">
                   <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                            <Smartphone className="w-6 h-6 text-emerald-500" />
                         </div>
                         <div>
                            <h4 className="text-white font-bold">Two-Factor Authentication</h4>
                            <p className="text-sm text-slate-500">Add an extra layer of security to your account.</p>
                         </div>
                      </div>
                      <Switch className="data-[state=checked]:bg-[#00D4FF]" />
                   </div>
                </CardContent>
              </Card>
           </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
           <Card className="bg-[#0a0f1a] border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Alert Preferences</CardTitle>
                <CardDescription className="text-slate-500">Choose how you want to be notified of fleet events.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 {[
                    { label: "Security & Safety Alerts", desc: "Instant notifications for SOS, Panic, and Power Cut events.", icon: ShieldAlert },
                    { label: "Operational Alerts", desc: "Speeding, Harsh braking, and Geofence exit reports.", icon: Activity },
                    { label: "Maintenance Reminders", desc: "Weekly summaries of upcoming service requirements.", icon: Wrench },
                    { label: "Billing & Subscription", desc: "Invoices and subscription renewal notices.", icon: CreditCard }
                 ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                        <div className="flex gap-4">
                           <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                                <item.icon className="w-5 h-5 text-slate-400" />
                           </div>
                           <div>
                                <h4 className="text-slate-200 font-bold text-sm tracking-tight">{item.label}</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                           </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[10px] font-bold text-slate-600 uppercase">Email</span>
                                <Switch defaultChecked className="data-[state=checked]:bg-[#00D4FF]" />
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[10px] font-bold text-slate-600 uppercase">Push</span>
                                <Switch className="data-[state=checked]:bg-[#00D4FF]" />
                            </div>
                        </div>
                    </div>
                 ))}
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
