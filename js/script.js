$(document).ready(function(){

  // console.log('hello world');

  let mmi;

  getEarthquakesByIntensity = (mmi) => {
    $.ajax({
      url: `https://api.geonet.org.nz/quake?MMI=${mmi}`,
      type: 'GET',
      dataType: 'json',
      success: function(jsonData){
        console.log('success!');

        for (var i = 0; i < 10; i++) {
          console.log(jsonData.features[0].geometry.coordinates);
        }

        // get 10 results
        // get each result's coordinates 0 - lat
        //                               1 - long
      },
      error: function(jsonData){
        console.log('something terrible has happened.');
      },
    })
  }

  $('#lowIntensity').click(function(reported){
    mmi = 0;
    getEarthquakesByIntensity(mmi);
    for (var i = 0; i < 4; i++) {
      mmi ++;
      getEarthquakesByIntensity(mmi);
    }
  })

  $('#highIntensity').click(function(reported){
    mmi = 0;
    getEarthquakesByIntensity(mmi);
    for (var i = 0; i < 3; i++) {
      mmi ++;
      getEarthquakesByIntensity(mmi);
    }
  })

  getLastMinuteQuakes = () => {

    const oneMinute = 60000;
    const timeNow = Date.now();

    let newTime;

    let mmi = 0;

    for (var i = 0; i < 10; i++) {
      mmi ++;

      $.ajax({
        url: `https://api.geonet.org.nz/quake?MMI=${mmi}`,
        type: 'GET',
        dataType: 'json',
        success: function(jsonData){
          console.log('success!');
          for (var i = 0; i < jsonData.features.length; i++) {
            // console.log(jsonData.features[i].properties.time);
            var quakeTime = Date.parse(jsonData.features[i].properties.time);

            if ((timeNow - quakeTime) > oneMinute){
              // console.log('quakeTime time is less than a minute before time now');
              console.log(quakeTime);
            }
          }
        },
        error: function(jsonData){
          console.log('something terrible has happened');
        },
      })
    }
  }

  setInterval(function (){
    // console.log('thirty seconds has passed');
    getLastMinuteQuakes();


  }, 30000)













  // function initMap() {
  //   var map = new google.maps.Map(document.getElementById('map'), {
  //     center: {lat: -40.90, lng: 174.88},
  //     zoom: 6
  //   });
  // }
  //
  // google.maps.event.addDomListener(window, "load", initMap);
})
