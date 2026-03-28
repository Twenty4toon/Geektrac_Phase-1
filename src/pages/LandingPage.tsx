import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Check, 
  Map, 
  MapPin, 
  Video, 
  AlertTriangle, 
  Droplets,
  Users,
  Route,
  Activity,
  Truck,
  ClipboardCheck,
  Bell,
  Wallet,
  Thermometer,
  Weight,
  Wrench,
  Gauge,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#06090F] text-slate-100 font-sans selection:bg-[#00D4FF]/30">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#06090F]/80 backdrop-blur-md border-b border-slate-800" : "bg-transparent"}`}>
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00D4FF] to-[#FF6B9D] flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00D4FF] to-[#FF6B9D]">
              Geektrac
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-[#00D4FF] transition-colors">Features</a>
            <a href="#pricing" className="hover:text-[#00D4FF] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[#00D4FF] transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-[#00D4FF] transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800 hidden md:inline-flex">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-[#06090F] font-bold">Get Demo</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#00D4FF]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#FF6B9D]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-[#00D4FF] text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D4FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D4FF]"></span>
            </span>
            Vibe Coding Guide v1.0 Ready
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl mx-auto leading-tight">
            Advanced Fleet Management <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-white to-[#FF6B9D]">Software Platform</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Everything you need to track, manage, and optimize your entire fleet in real-time. Full-featured telematics built for the modern era.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-[#06090F] font-bold w-full h-12 px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="text-white border-slate-700 hover:bg-slate-800 w-full h-12 px-8">
                View Live Demo
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-y border-slate-800 py-10">
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-[#00D4FF] mb-2">50+</span>
              <span className="text-sm text-slate-400 font-medium uppercase tracking-wider">Countries</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</span>
              <span className="text-sm text-slate-400 font-medium uppercase tracking-wider">Users</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-[#FF6B9D] mb-2">1.2K+</span>
              <span className="text-sm text-slate-400 font-medium uppercase tracking-wider">GPS Devices</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-white mb-2">17+</span>
              <span className="text-sm text-slate-400 font-medium uppercase tracking-wider">Modules</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-[#0a0f1a] relative border-t border-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Every Feature You Need</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">17 comprehensive modules covering tracking, fuel, maintenance, reporting, and more.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="bg-[#06090F] border-slate-800 hover:border-[#00D4FF]/50 transition-colors bg-opacity-50">
                <CardHeader className="pb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${feature.bg}`}>
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg text-slate-200">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Choose the perfect plan for your fleet size.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Lite */}
            <Card className="bg-[#0a0f1a] border-slate-800">
              <CardHeader>
                <CardTitle className="text-xl text-slate-300">Lite</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">₹999</span>
                  <span className="text-slate-500 text-sm"> /vehicle/mo</span>
                </div>
                <CardDescription className="pt-4">Essential tracking for small fleets.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {["Live Tracking Map", "Trip History (30 days)", "Basic Alerts", "Driver Management"].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-[#00D4FF]" /> {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white">Get Started</Button>
              </CardFooter>
            </Card>

            {/* Standard */}
            <Card className="bg-[#06090F] border-[#00D4FF]/50 relative shadow-[0_0_30px_rgba(0,212,255,0.1)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00D4FF] text-[#06090F] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-[#00D4FF]">Standard</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">₹1,999</span>
                  <span className="text-slate-500 text-sm"> /vehicle/mo</span>
                </div>
                <CardDescription className="pt-4">Advanced tools for growing businesses.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {["Everything in Lite", "Fuel Monitoring System", "Maintenance Reminders", "Expense Management", "Geofencing & 75+ Alerts"].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-[#00D4FF]" /> {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-[#06090F] font-bold">Start Free Trial</Button>
              </CardFooter>
            </Card>

            {/* Premium */}
            <Card className="bg-[#0a0f1a] border-slate-800">
              <CardHeader>
                <CardTitle className="text-xl text-[#FF6B9D]">Premium</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">₹3,499</span>
                  <span className="text-slate-500 text-sm"> /vehicle/mo</span>
                </div>
                <CardDescription className="pt-4">Enterprise-grade features and AI.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {["Everything in Standard", "Video Telematics (Dashcam)", "ADAS & DMS Safety", "Route Optimization", "Temperature & Load Sensors", "Custom Reports API"].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-[#FF6B9D]" /> {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white">Contact Sales</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-[#0a0f1a] border-t border-slate-800/50">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <Accordion className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-slate-800 px-6 bg-[#06090F] rounded-lg">
                <AccordionTrigger className="text-left text-slate-200 hover:text-[#00D4FF] hover:no-underline font-medium py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#06090F] pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00D4FF] to-[#FF6B9D] flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00D4FF] to-[#FF6B9D]">
                  Geektrac
                </span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6">
                Empowering businesses with intelligent, real-time telematics and intuitive fleet management software globally.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-[#00D4FF] transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-[#00D4FF] transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-[#00D4FF] transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-[#00D4FF] transition-colors">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-[#00D4FF] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[#00D4FF] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[#00D4FF] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#00D4FF] transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Geektrac Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}


const features = [
  { icon: Map, title: "Live Tracking", desc: "Real-time location of all vehicles color-coded by status.", color: "text-[#00D4FF]", bg: "bg-[#00D4FF]/10" },
  { icon: Droplets, title: "Fuel Monitoring", desc: "Track fills, drains, and detect fuel theft instantly.", color: "text-[#FF6B9D]", bg: "bg-[#FF6B9D]/10" },
  { icon: Users, title: "Driver Management", desc: "Driver profiles, license tracking, and scorecard.", color: "text-[#a855f7]", bg: "bg-[#a855f7]/10" },
  { icon: Route, title: "Route Optimization", desc: "Find the most efficient multi-stop delivery route.", color: "text-[#10b981]", bg: "bg-[#10b981]/10" },
  { icon: Video, title: "Video Telematics", desc: "Live streaming and video clips on harsh events.", color: "text-[#00D4FF]", bg: "bg-[#00D4FF]/10" },
  { icon: Activity, title: "Tire Management", desc: "Real-time tyre pressure and temperature alerts.", color: "text-[#f59e0b]", bg: "bg-[#f59e0b]/10" },
  { icon: ClipboardCheck, title: "Vehicle Inspection", desc: "Digital pre-trip DVIR checklists via mobile app.", color: "text-[#10b981]", bg: "bg-[#10b981]/10" },
  { icon: Bell, title: "75+ Alerts System", desc: "Speeding, geofence, idle, and engine fault alerts.", color: "text-[#FF6B9D]", bg: "bg-[#FF6B9D]/10" },
  { icon: Wallet, title: "Expense Tracking", desc: "Log fuel, toll, and repair costs. Cost per km analysis.", color: "text-[#10b981]", bg: "bg-[#10b981]/10" },
  { icon: Thermometer, title: "Temperature Sensor", desc: "Cold chain logistics monitoring with alerts.", color: "text-[#00D4FF]", bg: "bg-[#00D4FF]/10" },
  { icon: Weight, title: "Load Monitoring", desc: "Prevent overloading with axle weight tracking.", color: "text-[#a855f7]", bg: "bg-[#a855f7]/10" },
  { icon: AlertTriangle, title: "ADAS & DMS", desc: "Drowsiness & distraction detection, lane warnings.", color: "text-[#FF6B9D]", bg: "bg-[#FF6B9D]/10" },
  { icon: Wrench, title: "Parts Inventory", desc: "Track spare parts, service history and costs.", color: "text-[#f59e0b]", bg: "bg-[#f59e0b]/10" },
  { icon: Gauge, title: "RPM Monitoring", desc: "Track engine RPM for heavy machinery usage.", color: "text-[#00D4FF]", bg: "bg-[#00D4FF]/10" },
  { icon: MapPin, title: "Job Management", desc: "Assign delivery jobs and track completion status.", color: "text-[#10b981]", bg: "bg-[#10b981]/10" },
  { icon: Calendar, title: "Maintenance", desc: "Schedule reminders by mileage or engine hours.", color: "text-[#f59e0b]", bg: "bg-[#f59e0b]/10" },
];

const faqs = [
  { q: "What GPS hardware is required?", a: "Geektrac is hardware agnostic. You can connect tracking devices from Ruptela, Teltonika, Concox, or your phone's GPS." },
  { q: "Can I manage multiple organizations?", a: "Yes, our platform supports multi-tenant white-labeling, allowing you to manage several sub-fleets individually." },
  { q: "Is there a mobile app for drivers?", a: "The Premium plan includes a dedicated mobile app for drivers to view jobs, run inspections, and log expenses." },
  { q: "How does Fuel Monitoring work?", a: "We integrate with capable sensors installed in your vehicle's tank to show real-time changes in fuel level, pinpointing suspected drain events automatically." },
  { q: "Can I set custom geofencing zones?", a: "Absolutely. Draw custom polygons or circles anywhere on the live map and create targeted enter/exit alerts." },
  { q: "Do you offer API access?", a: "Yes, our REST API allows seamless integration of your fleet data to ERPs like SAP and Oracle." },
  { q: "How long is trip history stored?", a: "Historically, routes are saved for 30 days on Lite, 3 months on Standard, and up to a year on Premium." },
  { q: "Can we use custom domain mapping?", a: "Yes! White-label accounts can fully map to custom domains with customized login pages and branding." }
];
