
function setBackground() {
  if(Cookies.get().mhData) var backgroundImage = JSON.parse(Cookies.get().mhData.slice(2)).image;
  if(backgroundImage === 'red.png') $('.img').toggleClass('redBall');
  else if(backgroundImage === 'blue.png') $('.img').toggleClass('blueBall');
}

function loadVisits() {
  if(Cookies.get().mhData) {
    var visits = JSON.parse(Cookies.get().mhData.slice(2)).visits;
    visits = visits === 1 ? `${visits} time.` : `${visits} times.`
  } else {
    var visits = '1 time.';
  }
  $('.visits').text(visits)
}

$(document).ready(function() {
  setBackground();
  loadVisits();
})