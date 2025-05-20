
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidmFuY2VlcSIsImEiOiJjbTFwMjFydWMxOTNpMmtvazYxZ2k0ejlzIn0.yFYzZ1HeE_0KJSyXGYqjRA';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Mapbox({onLocationChange}) {
  const mapContainerRef = useRef(null);
  const [marker, setMarker] = useState(null); 
  const [markerPosition, setMarkerPosition] = useState(null);
  const [map, setMap] = useState(null); 
  const [showPinLocation, setShowPinLocation] = useState(false); 
  const markerRef = useRef(null); // Using ref to track current marker

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [121.7740, 12.8797], 
      zoom: 5,
    });

    mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-left');
    setMap(mapInstance);

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: 'Search for a location',
      bbox: [116.95, 4.6, 126.6, 21.2], 
      proximity: {
        longitude: 121.7740,
        latitude: 12.8797
      }
    });

    mapInstance.addControl(geocoder, 'top-right');

    // Adjust the width of the search box
    const geocoderInput = document.querySelector('.mapboxgl-ctrl-geocoder input');
    if (geocoderInput) {
      geocoderInput.style.width = '250px';
    }

    // Handle geocoder result to place the marker
    geocoder.on('result', (e) => {
      const { center } = e.result;

      // Remove existing marker if it exists
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Create new draggable marker
      const newMarker = new mapboxgl.Marker({ draggable: true })
        .setLngLat(center)
        .addTo(mapInstance);

      // Set dragend event listener
      newMarker.on('dragend', () => {
        const lngLat = newMarker.getLngLat();
        setMarkerPosition([lngLat.lng, lngLat.lat]);
        onLocationChange([lngLat.lng, lngLat.lat])
      });

      // Update both state and ref
      setMarker(newMarker);
      markerRef.current = newMarker;
      setMarkerPosition(center);
      onLocationChange([center[0], center[1]]); // FIXED THIS LINE

      mapInstance.flyTo({
        center: center,
        zoom: 12
      });
    });

    return () => {
      if (mapInstance) mapInstance.remove();
    };
  }, []); // Empty dependency array is fine now since we're using ref

  // Handle map click to move the marker
  const handleMapClick = (e) => {
    const { lngLat } = e;

    if (markerRef.current) {
      markerRef.current.setLngLat(lngLat);
      setMarkerPosition([lngLat.lng, lngLat.lat]); 

    } else {
      const newMarker = new mapboxgl.Marker({ draggable: true })
        .setLngLat(lngLat)
        .addTo(map);
      
      // Set dragend event listener
      newMarker.on('dragend', () => {
        const position = newMarker.getLngLat();
        setMarkerPosition([position.lng, position.lat]);
        onLocationChange([position.lng, position.lat])
      });
      
      setMarker(newMarker);
      markerRef.current = newMarker;
      setMarkerPosition([lngLat.lng, lngLat.lat]);
      onLocationChange([lngLat.lng, lngLat.lat]); // Pass updated location to parent
    }
  };

  useEffect(() => {
    if (!map) return;

    map.on('click', handleMapClick);

    return () => {
      map.off('click', handleMapClick);
    };
  }, [map, marker]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>


      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '400px',
          marginBottom: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      />


      {showPinLocation && markerPosition && (
        <div
          style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <h3>Pin Location</h3>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '1rem', marginBottom: '5px' }}>Latitude:</label>
            <div
              style={{
                padding: '10px',
                fontSize: '1.1rem',
                backgroundColor: '#fff',
                borderRadius: '4px',
                border: '1px solid #ced4da',
              }}
            >
              {markerPosition[1]}
            </div>
          </div>
          <div>
            <label style={{ fontSize: '1rem', marginBottom: '5px' }}>Longitude:</label>
            <div
              style={{
                padding: '10px',
                fontSize: '1.1rem',
                backgroundColor: '#fff',
                borderRadius: '4px',
                border: '1px solid #ced4da',
              }}
            >
              {markerPosition[0]}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

