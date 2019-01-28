$(document).ready(function () {
    // ---------- FIREBASE ----------------
    // FIREBASE API
    var config = {
        apiKey: "AIzaSy" + "AASk8ZLQcP1A5" + "idZbp5DEbKqjr7oWDndY",
        authDomain: "project1-4750c.firebaseapp.com",
        databaseURL: "https://project1-4750c.firebaseio.com",
        projectId: "project1-4750c",
        storageBucket: "",
        messagingSenderId: "87599609437"
    };
    firebase.initializeApp(config); // Initialize Firebase

    // ---------- FIREBASE Variables ----------------------
    var database = firebase.database(); // Create a variable to reference the database.
    var connections = database.ref("/connections"); // All of our connections will be stored in this directory.
    var isConnected = database.ref(".info/connected"); // boolean value - true if client is connected, false if not.
    var user_UID; // Global USER object for firebase.auth().onAuthStateChanged(function (user) {...}

    // OBJECT for Anon Auth ands SIGNS IN
    firebase.auth().signInAnonymously().catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error code & Message if any: ", errorCode, errorMessage);
        // ...
    });

    // ---------- ANONYMOUS AUTHENTICATION to get a userID -------------------
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var isAnonymous = user.isAnonymous;
            console.log("user signed in?: ", isAnonymous);
            user_UID = user.uid;
            console.log("user.uid: ", user.uid);
        } else {
            // FirebaseAuth.getInstance().signOut();
        }
    });

    // User listener - retreives user's saved preferences
    database.ref("/users").on("value", function (userSnapshot) {
        console.log("Query exists? ", userSnapshot.child(user_UID).child("query").exists());
        console.log("CatID exists? ", userSnapshot.child(user_UID).child("query").exists());
        console.log("userID saved? ", userSnapshot.child(user_UID).exists());
        // if (userSnapshot.child(user_UID).exists()) {
        // console.log("user ID: ", userSnapshot.child(user_UID));
        // };
        if (userSnapshot.child(user_UID).child("lastsearch").exists()) {
            console.log("lastsearch: ", userSnapshot.child(user_UID).val().lastsearch);
            query = userSnapshot.child(user_UID).val().lastsearch;
            newsFinder.search(query);
        };

    });

    // Firebase connection status
    isConnected.on("value", function (connectedSnapshot) {
        if (connectedSnapshot.val()) {
            var connList = connections.push(true); // add user to list from connections
            connList.onDisconnect().remove(); // remove user from list when disconnected
        }
    });

    // ------------ TODO ------------
    // save user's preference
    // set the user pref to Firebase

    // --- EVENT LISTENERS ----

    // Dropdown listener
    $(".dropdown-item").on("click", function (event) {
        event.preventDefault();
        // get value of 'this' selected dropdown
        var selectedID = $(this).attr("id");
        catID = $(this).attr("value");
        console.log("ID, CatID: ", selectedID, catID);
        newsFinder.search(selectedID);
        if (selectedID !== '') {
            database.ref("/users").child(user_UID).update({ lastsearch: selectedID });
        }

    });

    $("#searchBtn").on("click", function (event) {
        event.preventDefault();
        if (searchItem !== '') {
            database.ref("/users").child(user_UID).update({ lastsearch: searchItem });
        }

        // var catID = $("#category-id option:selected").val();
        // console.log("catID: ", catID);
        // if (query !== "") {
        // charityNavigator.search(query, catID);
        // }

    });

});