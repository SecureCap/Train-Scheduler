$(document).ready(function() {

//initialize firebase
var config = {
    apiKey: "AIzaSyBsdVE_3BkOTKWXMUZDLPIlSXoNGatzHIA",
    authDomain: "first-timer-project.firebaseapp.com",
    databaseURL: "https://first-timer-project.firebaseio.com",
    projectId: "first-timer-project",
    storageBucket: "first-timer-project.appspot.com",
    messagingSenderId: "37083085105"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //add train button
  $("#add-train-btn").on("click", function(event){
      event.preventDefault();

    //adds user input

    var trName = $("#name-input").val().trim();
    var trDestination = $("#destination-input").val().trim();
    var trTime = moment($("#time-input").val().trim(), "HH:mm").format("X");;
    var trFrequency = $("#frequency-input").val().trim();

    //Creates local "temporary" object for holding user data
    var newTrain = {
        name: trName,
        destination: trDestination,
        time: trTime,
        frequency: trFrequency
    };

    //push data to the database
    database.ref().push(newTrain);

    //alert new train added
    alert("Train successfully added");

    //clears all of the text-boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

    //prevent moving to a new page
    return false;
  });

  //create firebase event for adding train to the database and a row in the html when user adds a entry
  database.ref().on("child_added", function(childSnapshot,prevChildKey) {
      
    //store in variable
    var trName = childSnapshot.val().name;
    var trDestination = childSnapshot.val().destination;
    var trTime = childSnapshot.val().time;
    var trFrequency = childSnapshot.val().frequency;

    //difference of times
    var difTimes = moment().diff(moment.unix(trTime), "minutes");
    var tRemainder = difTimes % trFrequency;
    var tMinutes = trFrequency - tRemainder;

    //calc arrival time , add tsminutes to current time
    var trArrival = moment().add(tMinutes, "m").format("hh:mm A");

    //add each trains data into the table
    $("#trainTable > tbody").append("<tr><td>" + trName + "</td><td>" + trDestination + "</td><td>" + trFrequency + "</td><td>" + trArrival + "</td><td>" + tMinutes + "</td><tr>");

  });
});