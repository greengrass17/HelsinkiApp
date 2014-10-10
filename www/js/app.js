// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
    })

    .state('app.place', {
      url: "/place",
      views: {
        'menuContent' :{
          templateUrl: "templates/place.html"
        }
      }
    })

    .state('app.restaurant', {
      url: "/restaurant",
      views: {
        'menuContent' :{
          templateUrl: "templates/restaurant.html",
          controller:'restaurantCtrl',
        }
      }
    })

    .state('app.restaurantDetail', {
      url: "/restaurant/:restaurantId",
      views: {
        'menuContent' :{
          templateUrl: "templates/restaurantDetail.html",
          controller:'restaurantDetailCtrl',
        }
      }
    })

    .state('app.event', {
      url: "/event",
      views: {
        'menuContent' :{
          templateUrl: "templates/event.html",
        }
      }
    })

    .state('app.place1', {
      url: "/place1",
      views: {
        'menuContent' :{
          templateUrl: "templates/1.html",
        }
      }
    })

    .state('app.place2', {
      url: "/place2",
      views: {
        'menuContent' :{
          templateUrl: "templates/2.html"
        }
      }
    })
    .state('app.place3', {
      url: "/place3",
      views: {
        'menuContent' :{
          templateUrl: "templates/3.html"
        }
      }
    })

    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/place');
});

/*.controller('MediaCtrl', function($scope, $cordovaMedia) {
    var src = "/android_asset/www/test.mp3";

    var mediaSource = $cordovaMedia.newMedia(src);
    var promise = mediaSource.promise;
    var mediaStatus = mediaSource.mediaStatus;
    var media = mediaSource.media;

    $scope.play = function() {
        $cordovaMedia.play(media);
    }

    $cordovaMedia.pause(media)

    $cordovaMedia.stop(media)

    $cordovaMedia.release(media)

    $cordovaMedia.getDuration(media)

    $cordovaMedia.seekTo(media, 5000000) // milliseconds

    $cordovaMedia.setVolume(media, 80)

    $cordovaMedia.startRecord(media)

    $cordovaMedia.stopRecord(media)

    $cordovaMedia.getCurrentPosition(media).then(...)
})*/


// Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
//
function onDeviceReady() {
    playAudio(src);
}

// Audio player
//
var my_media = null;
var mediaTimer = null;
var playing = false;

// Play audio
//
function playAudio(src) {
    if (my_media == null) {
        // Create Media object from src
        my_media = new Media(src, onSuccess, onError);
    } // else play current audio

    if (playing == false) {
    // Play audio
    my_media.play();
    playing = !playing;
    } else pauseAudio();

    // Update my_media position every second
    if (mediaTimer == null) {
        mediaTimer = setInterval(function() {
            // get my_media position
            my_media.getCurrentPosition(
                // success callback
                function(position) {
                    getAudioDuration();
                    if (position > -1) {
                        setAudioPosition((position / my_media.getDuration() * 100) + " % ");
                        var bar = document.getElementById('bar-inner');
                        bar.style.width = (position / my_media.getDuration() * 100) + "%";
                    }
                },
                // error callback
                function(e) {
                    console.log("Error getting pos=" + e);
                    setAudioPosition("Error: " + e);
                }
            );
        }, 1000);
    }
}

// Pause audio
// 
function pauseAudio() {
    if (my_media) {
        my_media.pause();
        playing = !playing;
    }
}

// Stop audio
// 
function stopAudio(src) {
    if (my_media) {
        my_media.stop();
    }
    clearInterval(mediaTimer);
    mediaTimer = null;
    playing = false;
    my_media.release();
}

// onSuccess Callback

function onSuccess() {
    console.log("playAudio():Audio Success");
}

// onError Callback 

function onError(error) {
    alert('code: '    + error.code    + '\n' + 
          'message: ' + error.message + '\n');
}

// Set audio position

function setAudioPosition(position) {
    document.getElementById('audio_position').innerHTML = position;
}

 // Get duration
function getAudioDuration() {
    var counter = 0;
    var timerDur = setInterval(function() {
        counter = counter + 100;
        if (counter > 2000) {
            clearInterval(timerDur);
        }
        var dur = my_media.getDuration();
        if (dur > 0) {
            clearInterval(timerDur);
            document.getElementById('audio_duration').innerHTML = (dur) + " sec";
        }
   }, 100);
}