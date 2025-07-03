import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNotification } from '@/contexts/NotificationContext';
import { 
  Map as MapIcon, 
  MapPin, 
  Home, 
  Car, 
  Bus, 
  Building, 
  Wifi, 
  Recycle,
  Navigation
} from 'lucide-react';

// Import Leaflet dynamically to avoid SSR issues
let L: any = null;

interface LocationData {
  name: string;
  coords: [number, number];
  description: string;
  services: string[];
  icon: any;
}

export const MapPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { showNotification } = useNotification();

  const locations: LocationData[] = [
    {
      name: 'Whitefield',
      coords: [12.9699, 77.7500],
      description: 'IT Hub with comprehensive smart services',
      services: ['Smart Parking Available', 'Traffic Management', 'Municipal Services'],
      icon: Building
    },
    {
      name: 'KR Puram',
      coords: [12.9904, 77.6710],
      description: 'Residential area with community services',
      services: ['Community Services', 'Public Transport', 'Emergency Services'],
      icon: Home
    },
    {
      name: 'Thippasandra',
      coords: [12.9789, 77.6412],
      description: 'Mixed development with diverse services',
      services: ['Commercial Services', 'Digital Services', 'Waste Management'],
      icon: Wifi
    }
  ];

  useEffect(() => {
    const initializeMap = async () => {
      // Dynamically import Leaflet
      if (typeof window !== 'undefined') {
        L = (await import('leaflet')).default;
        
        // Fix for default marker icons in Leaflet
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        });

        if (mapRef.current && !mapInstanceRef.current) {
          // Initialize map centered on Bangalore
          mapInstanceRef.current = L.map(mapRef.current).setView([12.9716, 77.5946], 11);

          // Add OpenStreetMap tiles
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }).addTo(mapInstanceRef.current);

          // Add markers for each location
          locations.forEach((location) => {
            const popupContent = `
              <div style="font-family: Inter, sans-serif; max-width: 200px;">
                <h3 style="color: var(--smart-primary); font-weight: 600; margin-bottom: 4px; font-size: 14px;">
                  ${location.name} Service Center
                </h3>
                <p style="color: #6b7280; font-size: 12px; margin-bottom: 8px;">
                  ${location.description}
                </p>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                  ${location.services.map(service => `
                    <div style="display: flex; align-items: center; font-size: 11px; color: #374151;">
                      <span style="width: 4px; height: 4px; background-color: var(--smart-accent); border-radius: 50%; margin-right: 6px;"></span>
                      ${service}
                    </div>
                  `).join('')}
                </div>
              </div>
            `;

            const marker = L.marker(location.coords)
              .addTo(mapInstanceRef.current)
              .bindPopup(popupContent);
          });

          setIsMapLoaded(true);
        }
      }
    };

    initializeMap();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const centerMapOnLocation = (locationName: string) => {
    if (!mapInstanceRef.current) return;

    const coordinates: { [key: string]: [number, number] } = {
      'bangalore': [12.9716, 77.5946],
      'whitefield': [12.9699, 77.7500],
      'kr puram': [12.9904, 77.6710],
      'thippasandra': [12.9789, 77.6412]
    };

    const coords = coordinates[locationName.toLowerCase()];
    if (coords) {
      const zoom = locationName.toLowerCase() === 'bangalore' ? 11 : 14;
      mapInstanceRef.current.setView(coords, zoom);
      showNotification(
        `Centered map on ${locationName.charAt(0).toUpperCase() + locationName.slice(1)}`,
        'success'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 page-transition">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Card className="smart-shadow mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[var(--smart-secondary)] rounded-lg flex items-center justify-center mr-4">
                  <MapIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[var(--smart-primary)]">Service Map</h1>
                  <p className="text-gray-600">Explore service locations across Bangalore</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Service Centers</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map Container */}
        <Card className="smart-shadow overflow-hidden mb-6">
          <div 
            ref={mapRef} 
            className="map-container h-96 lg:h-[500px] w-full relative"
          >
            {!isMapLoaded && (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MapIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Loading interactive map...</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Map Controls */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4 flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => centerMapOnLocation('bangalore')}
                  className="text-xs"
                >
                  <Home className="h-3 w-3 mr-2" />
                  Center on Bangalore
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => centerMapOnLocation('whitefield')}
                  className="text-xs"
                >
                  <MapPin className="h-3 w-3 mr-2" />
                  Whitefield
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => centerMapOnLocation('kr puram')}
                  className="text-xs"
                >
                  <MapPin className="h-3 w-3 mr-2" />
                  KR Puram
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => centerMapOnLocation('thippasandra')}
                  className="text-xs"
                >
                  <MapPin className="h-3 w-3 mr-2" />
                  Thippasandra
                </Button>
              </div>
              <div className="text-sm text-gray-500">
                Click on markers for more information
              </div>
            </div>
          </div>
        </Card>

        {/* Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <Card key={index} className="smart-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{location.name}</h3>
                    <p className="text-sm text-gray-500">{location.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {location.services.map((service, serviceIndex) => {
                    const getServiceIcon = (service: string) => {
                      if (service.includes('Parking')) return Car;
                      if (service.includes('Transport')) return Bus;
                      if (service.includes('Community') || service.includes('Municipal')) return Home;
                      if (service.includes('Digital') || service.includes('Wifi')) return Wifi;
                      if (service.includes('Waste')) return Recycle;
                      return Building;
                    };
                    
                    const ServiceIcon = getServiceIcon(service);
                    
                    return (
                      <div key={serviceIndex} className="flex items-center text-sm text-gray-600">
                        <ServiceIcon className="h-3 w-3 mr-2 text-[var(--smart-accent)]" />
                        <span>{service}</span>
                      </div>
                    );
                  })}
                </div>
                
                <Button
                  onClick={() => centerMapOnLocation(location.name)}
                  className="w-full bg-[var(--smart-secondary)] hover:bg-[var(--smart-secondary)]/90 text-white smart-transition"
                  size="sm"
                >
                  <Navigation className="h-3 w-3 mr-2" />
                  View on Map
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapPage;
