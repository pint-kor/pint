import { fetchMyLocation } from "@/lib/features/map";
import { AppDispatch } from "@/lib/store";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const EXPO_PUBLIC_GOOGLE_MAP_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY ?? "";

export default function MiniMap() {
    return (
        <APIProvider apiKey={EXPO_PUBLIC_GOOGLE_MAP_API_KEY}>
            <Map mapId='DEMO_MAP_ID' style={{
                width: "100%",
                height: 300
            }} disableDefaultUI  >
                <FetchLocation />
            </Map>
        </APIProvider>
    )
}

const FetchLocation = () => {
    const map = useMap();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!map) return;

        dispatch(fetchMyLocation()).unwrap().then((data) => {
            const { myLatitude, myLongitude } = data;
            console.log(myLatitude, myLongitude)
            map.setCenter({ lat: myLatitude, lng: myLongitude })
            map.setZoom(18);
        });
    }, [map])

    return (<></>)
}