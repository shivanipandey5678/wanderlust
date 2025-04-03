
	mapboxgl.accessToken = MAP_TOKEN;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });

    const marker=new mapboxgl.Marker({color:"red"})

    .setLngLat(coordinates)
    .setPopup(
        new mapboxgl.Popup({offset:25}).setHTML(
            `<h4>${Location}</h4> <p>Exact location provided after abooking</p>`
        )
    )
    .addTo(map);
