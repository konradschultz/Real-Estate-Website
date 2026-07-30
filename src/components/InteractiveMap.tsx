import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { PropertyListing } from '../types';
import { MapPin, Layers, Maximize2, Compass } from 'lucide-react';

interface InteractiveMapProps {
  listings: PropertyListing[];
  selectedListing: PropertyListing | null;
  onSelectListing: (listing: PropertyListing) => void;
  onViewDetails: (listing: PropertyListing) => void;
  onScheduleTour: (listing: PropertyListing) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  listings,
  selectedListing,
  onSelectListing,
  onViewDetails,
  onScheduleTour
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const [mapTileStyle, setMapTileStyle] = useState<'dark' | 'street' | 'satellite'>('dark');

  // Tile Layer URLs
  const tileLayers = {
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    street: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  };

  const attributions = {
    dark: '&copy; <a href="https://carto.com/">CARTO</a>',
    street: '&copy; OpenStreetMap contributors',
    satellite: 'Tiles &copy; Esri'
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Default center on Aventura / Sunny Isles Beach (25.95, -80.13)
    const map = L.map(mapContainerRef.current, {
      center: [25.92, -80.13],
      zoom: 11,
      zoomControl: false
    });

    L.control.zoom({ position: 'topright' }).addTo(map);

    L.tileLayer(tileLayers.dark, {
      attribution: attributions.dark,
      maxZoom: 19
    }).addTo(map);

    mapInstanceRef.current = map;

    // ResizeObserver for canvas fluidity
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Tile Layer Switch
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    L.tileLayer(tileLayers[mapTileStyle], {
      attribution: attributions[mapTileStyle],
      maxZoom: 19
    }).addTo(map);
  }, [mapTileStyle]);

  // Format price helper
  const formatShortPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 2)}M`;
    }
    return `$${Math.round(price / 1000)}K`;
  };

  // Render & Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    (Object.values(markersRef.current) as L.Marker[]).forEach((marker) => marker.remove());
    markersRef.current = {};

    if (listings.length === 0) return;

    const bounds = L.latLngBounds([]);

    listings.forEach((listing) => {
      const isSelected = selectedListing?.id === listing.id;

      // Custom HTML DivIcon for price tag on pin
      const priceTagHtml = `
        <div class="custom-map-pin ${isSelected ? 'active-pin' : ''}">
          <div class="px-2.5 py-1 rounded-full text-xs font-bold shadow-lg transition-all flex items-center gap-1 ${
            isSelected
              ? 'bg-cyan-500 text-slate-950 ring-4 ring-cyan-400/40 scale-110 z-50'
              : 'bg-slate-900 border border-cyan-500/50 text-white hover:bg-cyan-600 hover:text-slate-950'
          }">
            <span>${formatShortPrice(listing.price)}</span>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: priceTagHtml,
        className: 'custom-leaflet-div-icon',
        iconSize: [60, 30],
        iconAnchor: [30, 15]
      });

      const marker = L.marker([listing.lat, listing.lng], { icon: customIcon }).addTo(map);

      // Popup content
      const popupHtml = `
        <div class="p-1 max-w-[220px] font-sans">
          <img src="${listing.images[0]}" alt="${listing.title}" class="w-full h-24 object-cover rounded-lg mb-2" />
          <div class="font-bold text-slate-900 text-sm truncate">${listing.title}</div>
          <div class="text-xs text-slate-600 mb-1">${listing.city} • ${listing.bedrooms} Beds, ${listing.bathrooms} Baths</div>
          <div class="text-base font-extrabold text-cyan-600 mb-2">$${listing.price.toLocaleString()}</div>
          <div class="flex gap-1">
            <button id="pop-details-${listing.id}" class="flex-1 py-1.5 bg-slate-900 text-white font-semibold text-xs rounded-md hover:bg-slate-800 transition-colors">Details</button>
            <button id="pop-tour-${listing.id}" class="flex-1 py-1.5 bg-cyan-600 text-white font-semibold text-xs rounded-md hover:bg-cyan-500 transition-colors">Tour</button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        closeButton: false,
        className: 'custom-leaflet-popup'
      });

      marker.on('click', () => {
        onSelectListing(listing);
      });

      marker.on('popupopen', () => {
        const btnDetails = document.getElementById(`pop-details-${listing.id}`);
        const btnTour = document.getElementById(`pop-tour-${listing.id}`);

        if (btnDetails) {
          btnDetails.onclick = () => onViewDetails(listing);
        }
        if (btnTour) {
          btnTour.onclick = () => onScheduleTour(listing);
        }
      });

      markersRef.current[listing.id] = marker;
      bounds.extend([listing.lat, listing.lng]);
    });

    if (listings.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [listings, selectedListing]);

  // Pan to selected listing if set
  useEffect(() => {
    if (selectedListing && mapInstanceRef.current) {
      mapInstanceRef.current.panTo([selectedListing.lat, selectedListing.lng], { animate: true });
      const marker = markersRef.current[selectedListing.id];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedListing]);

  return (
    <div className="relative w-full h-full min-h-[450px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
      
      {/* Map Element Container */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Map Control Bar Overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-800 shadow-xl text-xs font-semibold">
        <span className="text-slate-400 pl-2 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          Map Style:
        </span>
        <button
          onClick={() => setMapTileStyle('dark')}
          className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
            mapTileStyle === 'dark' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          Dark Luxury
        </button>
        <button
          onClick={() => setMapTileStyle('street')}
          className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
            mapTileStyle === 'street' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          Street
        </button>
        <button
          onClick={() => setMapTileStyle('satellite')}
          className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
            mapTileStyle === 'satellite' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          Satellite
        </button>
      </div>

      {/* Active Listings Counter Badge */}
      <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-semibold text-cyan-400 flex items-center gap-2 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        <span>Showing {listings.length} Active South Florida Properties</span>
      </div>

    </div>
  );
};
