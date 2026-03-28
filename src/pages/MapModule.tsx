import { useState, useEffect } from "react";
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  Polyline,
  useMap
} from "react-leaflet";
import L from "leaflet";
import { Search, Filter, Compass, Navigation, Zap, Battery, Shield, MoreVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Fix Leaflet marker icon issues in React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const vehicles = [
  { id: 1, name: "Truck-01", plate: "MH 12 AB 1234", status: "moving", pos: [19.0760, 72.8777], speed: 45, fuel: 75 },
  { id: 2, name: "Truck-02", plate: "MH 12 CD 5678", status: "idle", pos: [19.1000, 72.9000], speed: 0, fuel: 42 },
  { id: 3, name: "Van-12", plate: "MH 12 EF 9012", status: "stopped", pos: [19.0500, 72.8500], speed: 0, fuel: 90 },
  { id: 4, name: "Truck-05", plate: "MH 12 GH 3456", status: "moving", pos: [19.1200, 72.8800], speed: 62, fuel: 15 },
];

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

export default function MapModule() {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([19.0760, 72.8777]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHistoryMode, setIsHistoryMode] = useState(false);
  const [liveVehicles, setLiveVehicles] = useState(vehicles);

  // Simulate live movement
  useEffect(() => {
    if (isHistoryMode) return;
    const interval = setInterval(() => {
      setLiveVehicles(prev => prev.map(v => {
        if (v.status === "moving") {
          return {
            ...v,
            pos: [v.pos[0] + (Math.random() - 0.5) * 0.001, v.pos[1] + (Math.random() - 0.5) * 0.001]
          };
        }
        return v;
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, [isHistoryMode]);

  const historyRoute: [number, number][] = [
    [19.0760, 72.8777],
    [19.0800, 72.8800],
    [19.0850, 72.8850],
    [19.0900, 72.8900],
    [19.0950, 72.8950],
    [19.1000, 72.9000],
  ];

  const filteredVehicles = liveVehicles.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    v.plate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-100px)] flex bg-[#06090F] rounded-xl overflow-hidden border border-slate-800 relative">
      
      {/* Search & Filter Floating Bar */}
      <div className="absolute top-4 left-4 right-4 z-[1000] flex gap-2 pointer-events-none">
        <div className="flex-1 max-w-md pointer-events-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search vehicles, drivers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0f1a]/90 backdrop-blur-md border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#00D4FF] transition-all shadow-xl"
            />
          </div>
        </div>
        <div className="flex gap-2 pointer-events-auto">
            <Button variant="outline" size="icon" className="bg-[#0a0f1a]/90 backdrop-blur-md border-slate-700 text-slate-300">
                <Filter className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-[#0a0f1a]/90 backdrop-blur-md border-slate-700 text-slate-300">
                <Compass className="w-4 h-4" />
            </Button>
        </div>
      </div>

      {/* Map Content */}
      <div className="flex-1 relative z-0">
        <MapContainer 
          center={mapCenter} 
          zoom={13} 
          style={{ height: "100%", width: "100%", background: "#06090F" }}
          zoomControl={false}
        >
          <ChangeView center={mapCenter} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {isHistoryMode && (
             <Polyline 
                positions={historyRoute} 
                color="#00D4FF" 
                weight={4} 
                opacity={0.8}
                dashArray="10, 10"
             />
          )}
          
          {liveVehicles.map((vehicle) => (
            <Marker 
              key={vehicle.id} 
              position={vehicle.pos as [number, number]}
              eventHandlers={{
                click: () => {
                  setSelectedVehicle(vehicle);
                  setMapCenter(vehicle.pos as [number, number]);
                },
              }}
            >
              <Popup className="custom-popup">
                <div className="p-1 min-w-[150px]">
                  <div className="font-bold text-[#06090F] mb-1">{vehicle.name}</div>
                  <div className="text-xs text-slate-600 mb-2">{vehicle.plate}</div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                    <span className={
                      vehicle.status === "moving" ? "text-emerald-600" :
                      vehicle.status === "idle" ? "text-amber-600" : "text-slate-400"
                    }>{vehicle.status}</span>
                    <span className="text-[#06090F]">{vehicle.speed} km/h</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Sidebar - Vehicle List & Info */}
      <div className="w-80 border-l border-slate-800 bg-[#0a0f1a] flex flex-col z-10">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="font-bold text-slate-100 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#00D4FF]" />
                Fleet Live
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] text-[10px] font-bold">
                {vehicles.length} ONLINE
            </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {filteredVehicles.map((vehicle: any) => (
                <Card 
                    key={vehicle.id}
                    className={`cursor-pointer transition-all border-slate-800 ${
                        selectedVehicle.id === vehicle.id 
                        ? "bg-[#00D4FF]/5 border-[#00D4FF]/40 ring-1 ring-[#00D4FF]/20" 
                        : "bg-[#06090F] hover:border-slate-700"
                    }`}
                    onClick={() => {
                        setSelectedVehicle(vehicle);
                        setMapCenter(vehicle.pos as [number, number]);
                    }}
                >
                    <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <div className="font-bold text-slate-200">{vehicle.name}</div>
                                <div className="text-[10px] text-slate-500 font-mono tracking-tighter">{vehicle.plate}</div>
                            </div>
                            <div className={`w-2 h-2 rounded-full mt-1.5 ${
                                vehicle.status === "moving" ? "bg-emerald-500 animate-pulse" :
                                vehicle.status === "idle" ? "bg-amber-500" : "bg-slate-600"
                            }`} />
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                <Zap className="w-3 h-3 text-emerald-500" />
                                {vehicle.speed} km/h
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                <Battery className="w-3 h-3 text-[#00D4FF]" />
                                {vehicle.fuel}%
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

        {/* Selected Vehicle Quick Actions */}
        <div className="p-4 bg-[#06090F] border-t border-slate-800">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-[#00D4FF]" />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-white">{selectedVehicle.name}</div>
                        <div className="text-[10px] text-slate-500 font-medium">LATEST UPDATE: JUST NOW</div>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-400">
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Button 
                    size="sm" 
                    className={`${isHistoryMode ? "bg-[#FF6B9D]" : "bg-[#00D4FF]"} hover:opacity-80 text-[#06090F] font-bold text-xs h-8`}
                    onClick={() => setIsHistoryMode(!isHistoryMode)}
                >
                    {isHistoryMode ? "Live Feed" : "History"}
                </Button>
                <Button size="sm" variant="outline" className="text-slate-200 border-slate-700 hover:bg-slate-800 text-xs h-8">
                    Info
                </Button>
            </div>
        </div>
      </div>

        <style>{`
          .custom-popup .leaflet-popup-content-wrapper {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(8px);
            border-radius: 8px;
            padding: 0;
          }
          .custom-popup .leaflet-popup-tip {
            background: rgba(255, 255, 255, 0.95);
          }
          .leaflet-container {
            font-family: inherit;
          }
        `}</style>
    </div>
  );
}
