import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Truck, Mail, Lock, Building, Layout, Globe, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

export function SignupPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate signup
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#06090F] flex flex-col items-center justify-center p-6 text-slate-100 selection:bg-[#00D4FF]/30 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#00D4FF]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FF6B9D]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#00D4FF] to-[#FF6B9D] flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00D4FF] to-[#FF6B9D]">
              Geektrac
            </span>
        </div>

        <Card className="bg-[#0a0f1a] border-slate-800 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-white">Create an account</CardTitle>
            <CardDescription className="text-slate-500">
              Start managing your fleet in minutes. No credit card required.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#00D4FF] transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#00D4FF] transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Company Name</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Geektrac Solutions"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#00D4FF] transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#00D4FF] transition-colors"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-[#06090F] font-bold h-10 mt-2"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Get Started Free"}
                {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
              </Button>
            </form>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0a0f1a] px-2 text-slate-500">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="border-slate-800 bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:text-white">
                <Globe className="mr-2 w-4 h-4" />
                Google
              </Button>
              <Button variant="outline" className="border-slate-800 bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:text-white">
                <Layout className="mr-2 w-4 h-4" />
                GitHub
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="text-[#00D4FF] font-bold hover:underline">Sign In</Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
