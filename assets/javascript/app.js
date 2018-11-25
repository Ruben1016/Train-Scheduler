
  var config = {
    apiKey: "AIzaSyAh0oOMbdhogJPZoLOZ7RZCulYbpCY2Xpc",
    authDomain: "train-scheduler-22f36.firebaseapp.com",
    databaseURL: "https://train-scheduler-22f36.firebaseio.com",
    projectId: "train-scheduler-22f36",
    storageBucket: "train-scheduler-22f36.appspot.com",
    messagingSenderId: "588781418774"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#add-train-btn").on("click", function(event) {

   console.log('derails')
 
 
   var trainName = $("#Train-name-input").val();
   var destination = $("#destination").val();
   var firstTrainTime = $("#firstTrainTime").val();
   var frequency = $("#frequency").val(); 

  
   var newTrain = {
     "trainName": trainName,
     "destination": destination,
     "firstTrainTime": firstTrainTime,
     "frequency": frequency,
   };

 
 

 
 console.log(newTrain);
  database.ref('/').push(newTrain);
 

  
  $("#Train-name").val("");
  $("#destination").val("");
  $("#firstTrainTime").val("");
  $("#frequency").val("");
   
  
});

 database.ref('/').on("child_added", function(childSnapshot) {
   console.error('snapShot', childSnapshot.val());

   var trainName = childSnapshot.val().trainName;
   var destination = childSnapshot.val().destination;
   var firstTrainTime = childSnapshot.val().firstTrainTime;
   var frequency = childSnapshot.val().frequency;
   console.log(moment()._d);
   var currentMoment = moment()._d.toString();
   var indexOfColon = currentMoment.indexOf(':');
   var time = currentMoment.slice(indexOfColon - 2, indexOfColon + 3);
   console.log(time);
 


  var newRow = "<tr><td>" + trainName + "</td>" + "<td>" + destination + "</td>"
  + "<td>" + firstTrainTime + "</td>" + "<td>" + frequency + "</td></tr>";

 
  $("table").append(newRow);
  });