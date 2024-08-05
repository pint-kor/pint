import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps';

const EXPO_PUBLIC_GOOGLE_MAP_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY ?? "";

function GoogleMaps() {
  const position = {lat: 53.54992, lng: 10.00678};

  return (
    <APIProvider apiKey={EXPO_PUBLIC_GOOGLE_MAP_API_KEY}>
      <Map defaultCenter={position} defaultZoom={10} mapId='DEMO_MAP_ID'>
        <AdvancedMarker position={position} />
      </Map>
    </APIProvider>
  );
}

export default GoogleMaps;