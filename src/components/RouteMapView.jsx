import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const CATEGORY_COLORS = {
  museum: '#14532D',
  dining: '#9A3412',
  shopping: '#854D0E',
  performance: '#581C87',
  historic: '#1E3A8A',
  scenic: '#0F766E',
  hotel: '#0F241D',
  transit: '#475569',
};

function makePinIcon(label, bgColor, isHotel = false) {
  const size = isHotel ? 34 : 28;
  return L.divIcon({
    className: 'custom-leaflet-pin',
    html: `<div style="
      width:${size}px;
      height:${size}px;
      border-radius:50%;
      background:${bgColor};
      color:#FFFDF9;
      border:2.5px solid #F5E6C8;
      box-shadow:0 3px 10px rgba(0,0,0,0.32);
      display:flex;
      align-items:center;
      justify-content:center;
      font-weight:700;
      font-size:${isHotel ? '14px' : '12px'};
      font-family:'Plus Jakarta Sans',sans-serif;
    ">${label}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function RouteMapView({
  stops = [],
  baseHotel = null,
  shoppingWalk = null,
  showShoppingWalk = false,
  onSelectStop = null,
  height = 340,
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const layerGroupRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const initialCenter = baseHotel?.coordinates
      ? [baseHotel.coordinates.lat, baseHotel.coordinates.lng]
      : [51.515, -0.14];

    const map = L.map(containerRef.current, {
      center: initialCenter,
      zoom: 13,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    layerGroupRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [baseHotel]);

  useEffect(() => {
    const map = mapRef.current;
    const group = layerGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();
    const boundsPoints = [];

    if (showShoppingWalk && Array.isArray(shoppingWalk) && shoppingWalk.length > 0) {
      const walkCoords = [];
      shoppingWalk.forEach((pt) => {
        if (typeof pt.lat === 'number' && typeof pt.lng === 'number') {
          const latlng = [pt.lat, pt.lng];
          walkCoords.push(latlng);
          boundsPoints.push(latlng);
          const marker = L.marker(latlng, {
            icon: makePinIcon(pt.step, '#854D0E', pt.step === 1),
          });
          const appleUrl = `https://maps.apple.com/?q=${encodeURIComponent(pt.name)}&ll=${pt.lat},${pt.lng}&dirflg=w`;
          marker.bindPopup(
            `<div style="font-family:'Plus Jakarta Sans',sans-serif;min-width:180px;">
              <div style="font-size:11px;font-weight:700;color:#854D0E;text-transform:uppercase;">Shopping Walk · Stop ${pt.step}</div>
              <div style="font-size:14px;font-weight:700;margin:3px 0;">${pt.name}</div>
              <div style="font-size:12px;color:#444;margin-bottom:6px;">${pt.highlight || ''} (${pt.walkMinutes || ''})</div>
              <a href="${appleUrl}" target="_blank" rel="noopener noreferrer" style="font-size:12px;font-weight:600;color:#0F241D;">Walk in Apple Maps →</a>
            </div>`
          );
          marker.addTo(group);
        }
      });
      if (walkCoords.length > 1) {
        L.polyline(walkCoords, {
          color: '#B45309',
          weight: 3.5,
          dashArray: '6, 8',
          opacity: 0.85,
        }).addTo(group);
      }
    } else {
      // Base Hotel Pin
      if (baseHotel?.coordinates?.lat && baseHotel?.coordinates?.lng) {
        const hCoord = [baseHotel.coordinates.lat, baseHotel.coordinates.lng];
        boundsPoints.push(hCoord);
        const hMarker = L.marker(hCoord, {
          icon: makePinIcon('★', '#0F241D', true),
        });
        hMarker.bindPopup(
          `<div style="font-family:'Plus Jakarta Sans',sans-serif;min-width:180px;">
            <div style="font-size:11px;font-weight:700;color:#9A7426;text-transform:uppercase;">Home Base Hotel</div>
            <div style="font-size:14px;font-weight:700;margin:2px 0;">${baseHotel.name}</div>
            <div style="font-size:12px;color:#555;">${baseHotel.address || ''}</div>
          </div>`
        );
        hMarker.addTo(group);
      }

      const routeCoords = [];
      stops.forEach((stop, idx) => {
        const lat = stop?.coordinates?.lat;
        const lng = stop?.coordinates?.lng;
        if (typeof lat !== 'number' || typeof lng !== 'number') return;
        const latlng = [lat, lng];
        routeCoords.push(latlng);
        boundsPoints.push(latlng);

        const color = CATEGORY_COLORS[stop.category] || '#0F241D';
        const marker = L.marker(latlng, {
          icon: makePinIcon(idx + 1, color, false),
        });
        const appleUrl = `https://maps.apple.com/?q=${encodeURIComponent(stop.title)}&ll=${lat},${lng}&dirflg=w`;
        const popupEl = document.createElement('div');
        popupEl.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
        popupEl.style.minWidth = '195px';
        popupEl.innerHTML = `
          <div style="font-size:11px;font-weight:700;color:${color};text-transform:uppercase;">Stop ${idx + 1} · ${stop.time || ''}</div>
          <div style="font-size:14px;font-weight:700;margin:3px 0;color:#111;">${stop.title}</div>
          <div style="font-size:12px;color:#555;margin-bottom:8px;">${stop.neighborhood || ''}</div>
          <div style="display:flex;gap:8px;align-items:center;">
            <button type="button" class="map-popup-open-btn" style="background:#0F241D;color:#FFF;border:none;border-radius:6px;padding:5px 10px;font-size:12px;font-weight:600;cursor:pointer;">Open Guide</button>
            <a href="${appleUrl}" target="_blank" rel="noopener noreferrer" style="font-size:12px;font-weight:600;color:#0F241D;text-decoration:underline;">Apple Maps</a>
          </div>
        `;
        const btn = popupEl.querySelector('.map-popup-open-btn');
        if (btn && onSelectStop) {
          btn.addEventListener('click', () => onSelectStop(stop));
        }
        marker.bindPopup(popupEl);
        marker.addTo(group);
      });

      if (routeCoords.length > 1) {
        L.polyline(routeCoords, {
          color: '#0F241D',
          weight: 3,
          dashArray: '6, 8',
          opacity: 0.78,
        }).addTo(group);
      }
    }

    if (boundsPoints.length > 1) {
      map.fitBounds(boundsPoints, { padding: [36, 36], maxZoom: 15 });
    } else if (boundsPoints.length === 1) {
      map.setView(boundsPoints[0], 14);
    }

    setTimeout(() => map.invalidateSize(), 150);
  }, [stops, baseHotel, shoppingWalk, showShoppingWalk, onSelectStop]);

  return (
    <div className="route-map-shell" style={{ height }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
