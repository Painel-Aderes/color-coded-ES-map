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

// fetch('./ES.json').then(r => r.json()).then(r => {

//   let polygonArray = [],
//   polygon;

//   for (let i = 0; i < r.features[0].geometry.coordinates[0].length; i++) {
//     polygonArray.push([r.features[0].geometry.coordinates[0][i][1], r.features[0].geometry.coordinates[0][i][0]])
//   }

//   setTimeout(() => {
//     popupContent = /*html*/`<h2>popup</h2>`;
//     // console.log(polygonArray)
//     polygon = L.polygon(polygonArray).bindPopup(popupContent).addTo(map);
//     console.log(polygon)
//   }, 2000);

// })

fetch('./ES.json').then(r => r.json()).then(r => {

  // let polygonArray = [],
  //   polygon;

  // for (let i = 0; i < r.features[0].geometry.coordinates[0].length; i++) {
  //   polygonArray.push([r.features[0].geometry.coordinates[0][i][1], r.features[0].geometry.coordinates[0][i][0]])
  // }

  // setTimeout(() => {
  //   popupContent = /*html*/`<h2>popup</h2>`;
  //   // console.log(polygonArray)
  //   L.polygon(polygonArray).bindPopup(popupContent).addTo(map);
  // }, 2000);


  for (let i = 0; i < r.features.length; i++) {
    let stateArray = [];

    popupContent = `<h2>${r.features[i].properties.NOME}</h2>`;


    for (let j = 0; j < r.features[i].geometry.coordinates[0].length; j++) {
      stateArray.push([r.features[i].geometry.coordinates[0][j][1], r.features[i].geometry.coordinates[0][j][0]]);
    }

    let colorsArray = ['#f44336', '#e81e63', '#9c27b0', '#673ab7',	'#3f51b5','#2196f3','#03a9f4','#00bcd4', '#009688',	'#4caf50', '#8bc34a','#cddc39','#ffeb3b','#ffc107','#ff9800','#ff5722','#795548','#9e9e9e','#607d8b'];

    let randomColor = colorsArray[Math.floor(Math.random()*colorsArray.length)];

    let stateStyle = {
      fillColor: randomColor,
      fillOpacity: 0.2,
      color: randomColor,
      weight: 1
    }

    let state = L.polygon(stateArray).setStyle(stateStyle);
    state.bindPopup(popupContent).addTo(map);
  }

})
