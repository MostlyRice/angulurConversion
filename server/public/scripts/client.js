const app = angular.module('songApp', []);
const songController = app.controller('songController', ['$http', function($http){
  let self = this;

  self.newSong = { };
  self.songArray = [ ];

  self.addSong = function(newSong) {
    $http({
      method: 'POST',
      url: '/songs',
      data: { songs: self.newSong }
    }).then(function(response){
      console.log('response', response.data);
      self.getSongs();
    }).catch(function(error){
      console.log('Error adding new food', error);
    })
    console.log(self.songArray);
  }

  self.getSongs = function(){
    $http({
      method: 'GET',
      url: '/songs'
    }).then(function(response){
      console.log('response', response.data);
      self.songArray = response.data;
    }).catch(function(error){
      console.log('Error getting foods', error);
    })
  }
  self.deleteSong = function(id){
  $http({
   method: 'DELETE',
   url: `/songs/${id}`
  })
  .then((response) => {
   console.log('Song deleted');
   self.getSongs();
  }) // end done
  .catch((error) => {
   console.log('error', error);
  }) // end fail
} // end deleteSong

  function updateSongRating(id, newRating) {
    $.ajax({
      type: 'PUT',
      url: `/songs/${id}`,
      data: { rating: newRating }
    })
    .done(function (response) {
      console.log('Updated song rating');
      getAllSongs();
    })
    .fail(function (error){
      console.log(error);
    })
  }

  // Call function so it displays on load
  self.getSongs();

}]);
