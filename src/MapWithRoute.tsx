import React from 'react';
import { Polyline, withGoogleMap, withScriptjs } from 'react-google-maps';
const GoogleMap = require('react-google-maps').GoogleMap;

interface MapPoint {
    lat: number;
    lng: number;
}
function pointAverage(path: MapPoint[]): MapPoint {
    const total = path.reduce((acc, v) => ({ lat: acc.lat + v.lat, lng: acc.lng + v.lng }));
    return { lat: total.lat / path.length, lng: total.lng / path.length };
}
function pointDistance(a: MapPoint, b: MapPoint): number {
    return ((a.lat - b.lat)**2 + (a.lng - b.lng)**2)**.5;
}
function pointMax(path: MapPoint[], average: MapPoint): MapPoint {
    let max = path[0];
    for (let point of path.slice(1)) {
        if (pointDistance(point, average) > pointDistance(max, average)) {
            max = point;
        }
    }
    return max;
}
function getZoom(max: MapPoint, average: MapPoint): number {
    if ((max.lat === average.lat) && (max.lng === average.lng)) return 11;
    return 8 - Math.log2(pointDistance(max, average));
}

type Props = {
    path: MapPoint[],
    pathColor?: string,
}
const MapWithRoute_: React.FC<Props> = ({ path, pathColor }) => {
    const average = pointAverage(path);
    const max = pointMax(path, average);
    const zoom = getZoom(max, average);

    return <GoogleMap
        defaultZoom={zoom}
        defaultCenter={average}
    >
        <Polyline path={path} options={{ strokeColor: pathColor }}></Polyline>
    </GoogleMap>;
}

export const MapWithRoute = withScriptjs(withGoogleMap<Props>(MapWithRoute_));
