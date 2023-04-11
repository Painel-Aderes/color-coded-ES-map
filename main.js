let popupContent;

const map = L.map('map', {
  center: [-19.5, -40.7],
  zoom: 8,
  minZoom: 1,
  maxZoom: 9,
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 9,
}).addTo(map);

let allStates = [];

function clickZoom(e, list) {
  // allStates.forEach(each => {
  //   each.setStyle({ fillColor: '#00ff' });
  // });

  // let polygonCenter = e.target.getBounds().getCenter();

  // map.setView(polygonCenter, 9);

  // e.target.setStyle({ fillColor: '#e81e63' });


  // allStates.forEach(each => {
  //   each.setStyle({ fillColor: '#00ff' });
  // });

  // let polygonCenter = e.target.getBounds().getCenter();
  // map.setView(polygonCenter, 9);

  // setTimeout(() => {
  //   e.target.setStyle({ fillColor: '#e81e63' });
  // }, 600);

  list.forEach(each => {
    each.classList.remove('clicked');
  });

  e.classList.add('clicked');
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    let allPaths = document.querySelectorAll('path.leaflet-interactive');
    
    allPaths.forEach(e => {
      e.addEventListener('click', event => {
        clickZoom(event.currentTarget, allPaths);
      });
    });

  }, 1200);
});

fetch('./ES.json').then(r => r.json()).then(r => {
  for (let i = 0; i < r.features.length; i++) {
    let stateArray = [];

    popupContent = `<h2>${r.features[i].properties.NOME}</h2>`;


    for (let j = 0; j < r.features[i].geometry.coordinates[0].length; j++) {
      stateArray.push([r.features[i].geometry.coordinates[0][j][1], r.features[i].geometry.coordinates[0][j][0]]);
    }

    let state = L.polygon(stateArray);
    state.setStyle({ fillColor: '#00ff', fillOpacity: 0.5, color: '#202020', weight: 1 });
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
      each.setStyle({ fillColor: '#00ff' });

      let itemVisivel = allStates.find(estado =>
        estado._popup._content === each._popup._content);

      let popup = itemVisivel._popup._content,
        name = popup.substring(
          popup.indexOf('>') + 1,
          popup.lastIndexOf('</'));

      visibleStates.push(name);

      // let cleanedVisibleStates = visibleStates.filter(onlyUnique);
    } else {
      each.setStyle({ fillColor: '#202020' });
    }
  });
}



map.on('moveend', function () {
  pullVisibleStates();
});