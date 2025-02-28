import { City } from '../common/types';
import { SORT_NAME, SORT_DISTANCE } from '../common/consts';

function calculateDistanceToTelAviv(lat: number, lng: number): number {
  const telAvivCoords = { lat: 32.0853, lng: 34.7818 };
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const R = 6371; // Earth radius in km

  const dLat = toRadians(lat - telAvivCoords.lat);
  const dLng = toRadians(lng - telAvivCoords.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(telAvivCoords.lat)) * Math.cos(toRadians(lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

export function sortByOption(sort: string, a: City, b: City) {
  if (sort === SORT_NAME) {
    return a.name.localeCompare(b.name);
  }
  if (sort === SORT_DISTANCE) {
    const distanceA = calculateDistanceToTelAviv(a.coords.lat, a.coords.lng);
    const distanceB = calculateDistanceToTelAviv(b.coords.lat, b.coords.lng);
    return distanceA - distanceB;
  }
  return 0;
}
