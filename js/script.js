$(document).ready(function(){
  // console.log('hello world');

  let type;

  getEarthquakesByType = (type) => {
    $.ajax({
      url: `https://api.geonet.org.nz/intensity?type=${type}`,
      type: 'GET',
      dataType: 'json',
      success: function(jsonData){
        console.log('success!');
        console.log(jsonData);
      },
      error: function(){
        console.log('something terrible has happened.');
      },
    })
  }

  $('#reported').click(function(reported){
    type = 'reported'
    getEarthquakesByType(type);
  })

  $('#measured').click(function(reported){
    type = 'measured'
    getEarthquakesByType(type);
  })

})
