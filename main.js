let popupContent;

const map = L.map('map', {
  center: [-19.5, -40.7],
  zoom: 8,
  minZoom: 1,
  maxZoom: 12,
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 12,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let allStates = [];

fetch('./ES.json').then(r => r.json()).then(r => {
  for (let i = 0; i < r.features.length; i++) {
    let stateArray = [];

    popupContent = `<h2>${r.features[i].properties.NOME}</h2>`;


    for (let j = 0; j < r.features[i].geometry.coordinates[0].length; j++) {
      stateArray.push([r.features[i].geometry.coordinates[0][j][1], r.features[i].geometry.coordinates[0][j][0]]);
    }

    let colorsArray = ['#f44336', '#e81e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b'];

    let randomColor = colorsArray[Math.floor(Math.random() * colorsArray.length)];

    let stateStyle = {
      fillColor: randomColor,
      fillOpacity: 0.2,
      color: randomColor,
      weight: 1
    };

    let state = L.polygon(stateArray).setStyle(stateStyle);
    state.bindPopup(popupContent).addTo(map);
    allStates.push(state);

  }
});

function pullVisibleStates() {
  let bounds = map.getBounds();

  let visibleStates = [];

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  allStates.forEach(each => {
    let isInBounds = bounds.contains(each._latlngs);

    if (isInBounds) {
      let itemVisivel = allStates.find(estado =>
        estado._popup._content === each._popup._content);

      let popup = itemVisivel._popup._content,
        name = popup.substring(
          popup.indexOf('>') + 1,
          popup.lastIndexOf('</'));

      visibleStates.push(name);

      let cleanedVisibleStates = visibleStates.filter(onlyUnique);

      console.log(cleanedVisibleStates);
    }
  });
}



map.on('moveend', function () {
  pullVisibleStates();
});