mapboxgl.accessToken = "pk.eyJ1IjoiY2hyaXN0aWFuZ3VuYXdhbiIsImEiOiJjbGg0NWoxYnQxbWE5M3JveGZ2ODZjbmRnIn0.7MMJ1m2StWhpisdmxFhDJw";

var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v10",
    center: [110.4198, -7.9797],
    zoom: 7,
});

map.on("load", function() {
    map.addSource("stunting-cases", {
        type: "geojson",
        data: "stunting-data.geojson",
    });

    map.addLayer({
        id: "stunting-cases",
        type: "circle",
        source: "stunting-cases",
        paint: {
            "circle-color": ["interpolate", ["linear"],
                ["get", "stunting_rate"], 0, "#00FF00", 10, "#FFFF00", 20, "#FFA500", 30, "#FF0000"
            ],
            "circle-radius": ["interpolate", ["linear"],
                ["get", "stunting_cases"], 0, 0, 10000, 20, 50000, 50, 100000, 80
            ],
            "circle-opacity": 0.8,
        },
    });

    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
    });

    map.on("mouseenter", "stunting-cases", function(e) {
        map.getCanvas().style.cursor = "pointer";

        var properties = e.features[0].properties;

        var popupHtml = "<h3>" + properties.province + "</h3>" + "<p>Kasus Stunting: " + properties.stunting_cases + "</p>" + "<p>Angka Stunting: " + properties.stunting_rate + "%</p>";

        popup.setLngLat(e.features[0].geometry.coordinates).setHTML(popupHtml).addTo(map);
    });

    map.on("mouseleave", "stunting-cases", function(e) {
        map.getCanvas().style.cursor = "";
        popup.remove();
    });
});