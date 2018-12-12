var config = {
  apiKey: "AIzaSyAXT1eWoEyDYoz90NkoLxeSaWZ6MiTQMHw",
  authDomain: "new-train-scheduler-46721.firebaseapp.com",
  databaseURL: "https://new-train-scheduler-46721.firebaseio.com",
  projectId: "new-train-scheduler-46721",
  storageBucket: "new-train-scheduler-46721.appspot.com",
  messagingSenderId: "539283283430"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var empName = $("#train-name-input").val().trim();
  var empRole = $("#destination-input").val().trim();
  var empStart = moment($("#first-input").val().trim(), "MM/DD/YYYY").format("X");
  var empRate = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    first: trainFirst,
    frequency: trainFrenquency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().first;
  var trainFrenquency= childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFirst);
  console.log(trainFrenquency);

  // Prettify the employee start
  var empStartPretty = moment.unix(trainFirst).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment(trainFirst, "X"), "months");
  console.log(empMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * empRate;
  console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(TrainName),
    $("<td>").text(trainDestination),
    $("<td>").text(empStartPretty),
    $("<td>").text(empMonths),
    $("<td>").text(trainFrenquency),
    $("<td>").text(empBilled)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});


// week-4-day-2-activity-17,day-3-activity-21