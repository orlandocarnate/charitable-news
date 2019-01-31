# [Project 1](https://awilmoth.github.io/project1/)
NW Coding Bootcamp Project 1

## Overview

## Pseudocode
* On First use:
* Dropdown Listener:
    * When the user uses the dropdown for a category search, an event listener will get the ID and value of the selected drowndown item.
    * The listener will send the values to the newsfinder.search() method
    
* Search listener:
* newsFinder Object:
    * The .search() method will take the input argument and obtain JSON data from the news API using an AJAX function
        * assigns that to an object called newsresponse.
        * newsResponse is sent to the newsfinder.newsGenerator() method to create 6 cards based from the newsresponse object.
    * The .newsGenerator() method runs a FOR loop will loop 6 times to generate 6 news cards that a user can click on.
    * The .articleGenerator() method is called when a news card is clicked.
        * This hides the news cards content
        * Unhides the single article element and populates it with the article img, title, content, and source.
        * This also calls the charityNavigator.search() method to generate charity cards at the bottom of the article.
        * If the user clicks on the Return button, the article element is emptied and the news cards are unhidden.

* charityNavigator Object:
    * The .search() method takes the query string and is used for the AJAX method to obtain 6 charities from the Charity Navigator API and is assigned to the global variable charityData. This is sent to the method charityNavigator.charitiesGenerator method as an input argument.
    * The .charitiesGenerator() method takes the charityData object.
        * A For Loop is used to create the cards based on the number of items in the charityData object.
        * Each card is a clickable link to the charity's URL.
        * If there is no charity URL, the link is replaced with Charity Navigator's review page instead.



* Firebase for user persistence





***
## Firebase notes

### Creating User IDs using Anonymous Authentication
* Enabled [Anonymous Authentication in Firebase](https://firebase.google.com/docs/auth/web/anonymous-auth)
* call the `signInAnonymously` method
```
firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
```

* obtain user id with the following code:
```
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        console.log("user signed in?: ", isAnonymous);
        user_id = user.uid;
        console.log(user_id);
    } else {
        // User is signed out.
    }
});
```

### `.set()` sets a value:
```
    database.ref("/contact").set({
    name: name,
    age: age,
    phone: phone
    });
```

### `.push()` - Push to add child data (From 7.3, Excercise 18-19). 
    ```
    database.ref().push({
        name: name,
        email: email,
        age: age,
        comment: comment,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    ```

### `.ref().on("value", function (snapshot) {..})` - Getting values when changes occur:
```
    // Firebase watcher + initial loader HINT: .on("value")
    // When changes occurs it will print them to console and html
    database.ref("/contact").on("value", function (snapshot) {

      // Print the initial data to the console.
      console.log(snapshot.val());

      // Log the value of the various properties
      console.log(snapshot.val().name);

      // Change the HTML
      $("#displayed-data").text(snapshot.val().name);

      // If any errors are experienced, log them to console.
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
```

### `.ref).on("child_added", ...` - When a child has been added event?
    ```
    // Firebase watcher + initial loader HINT: .on("value")
    dataRef.ref().on("child_added", function(snapshot) {
      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().name);
      console.log(snapshot.val().email);

      // Change the HTML to reflect
      $("#name-display").text(snapshot.val().name);
      $("#email-display").text(snapshot.val().email);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
    ```

### `.ref().orderByChild() AND .limitToLast(5)` - Sorting and Filtering
* Sorting: `orderByChild()`
* Filtering: `limitToLast()`
```
dataREf.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function(...
```

### `.exists()` checks to see if there is existing data.
```
    // If Firebase has a highPrice and highBidder stored (first case)
    if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

        // Set the local variables for highBidder equal to the stored values in firebase.
        highBidder = snapshot.val().highBidder;
        highPrice = parseInt(snapshot.val().highPrice);
    ...
```
### Setting Child Name and value
* `database.ref("users").child(user_id).set(name);`

### Finding exact matches
* use `equalTo()` method to filter based on exact matches
  ```
  ref.orderByChild("height").equalTo(25).on("child_added", function(snapshot) {
  console.log(snapshot.key);
  });

