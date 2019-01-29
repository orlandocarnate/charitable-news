// $(document).ready(function () {
// Global Variables
var catID;
var newsData;
var charityData;

// news object & API
var newsFinder = {

    search: function (query) {
        // ------- NEWS API ---------
        /* 
        var url = 'https://newsapi.org/v2/everything?' +
            //'country=us&' +
            'q=' +
            query +
            '&apiKey=e624c791383a46cabe1b19e39ba150f4';
        var req = new Request(url);
        fetch(req)
            .then(function (response) {
                console.log(response.json());
            });
        */

        // news AJAX call
        var newsURL = 'https://newsapi.org/v2/everything?';
        newsURL += 'q=' + query;
        newsURL += '&apiKey=e624c791383a46cabe1b19e39ba150f4';
        newsURL += '&pageSize=6';
        $.ajax({
            url: newsURL,
            method: "GET"
        }).then(function (newsresponse) {
            console.log("news AJAX: ", newsresponse);
            newsData = newsresponse; // save newsresponse to global varial newsData to be used later
            newsFinder.newsGenerator(newsresponse);
        });

        // --------- /NEWS -----------
    },

    newsGenerator: function (response) {

        // clear results section
        $("#gridContainer").empty();
        // var $table = $("<table class='news'>");
        console.log("news table gen");
        console.log("news articles 1: ", response.articles[0].title);
        console.log("news object: ", response);
        for (i = 0; i < response.articles.length; i++) {
            $card = $("<div class='grid-item card newscard' data-article='" + i + "'>");
            var $img = $("<img class='card-img-top'>").attr({ "src": response.articles[i].urlToImage });
            var $body = $("<div class='card-body'>");
            var $title = $("<div class='card-title'>").html(response.articles[i].title);
            var $descrip = $("<div class='card-text'>").html(response.articles[i].description);
            // var $content = $("<td>").text(response.articles[i].content);
            var $source = $("<div class='source'>").text(response.articles[i].source.name);

            // var $url = $("<td>").html("<a href=" + response.articles[i].url + " target='_blank'>Article</a>");
            $card.append($img, $body.append($title, $descrip, $source));
            $("#gridContainer").append($card);
        }
    },

    articleGenerator: function (item) {
        // 
        // display single artile using item as an index to get info from newsData

    },

};


// charity navigator object API https://charity.3scale.net/
var charityNavigator = {
    search: function (query) {
        var appID = "4dd27455";
        var key = 'd86a037d4ea3f2785abba1684a1e4bfd'; // key
        var requestURL = "https://api.data.charitynavigator.org/v2/Organizations";
        requestURL += "?app_id=" + appID;
        requestURL += "&app_key=" + key;
        requestURL += "&pageSize=6";
        // if (query.trim() !== '') {
        //     requestURL += "&search=" + query;
        // }
        requestURL += "&search=" + query;
        // requestURL += "&categoryID=" + query;
        // requestURL += "&rated=true";
        // requestURL += "&fundraisingOrgs=true";
        // requestURL += "&state=IL";
        // requestURL += "&city=chicago";
        // requestURL += "&zip=60608";
        // requestURL += "&minRating=1";
        // requestURL += "&maxRating=3";
        // requestURL += "&sizeRange=1";
        // requestURL += "&donorPrivacy=true";
        // requestURL += "&scopeOfWork=REGIONAL"; // very limited
        // requestURL += "&sort=RATING";
        // if (id !== "") {
        //     requestURL += "&categoryID=" + id;
        // }

        // charity AJAX call
        $.ajax({
            url: requestURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            charityNavigator.charitiesGenerator(response);
        });



    },

    charitiesGenerator: function (response) {
        var $table = $("<table class='charities'>");
        for (i = 0; i < response.length; i++) {
            var $name = $("<td>").text(response[i].charityName);
            var $Location = $("<td>").text(response[i].mailingAddress.city + ", " + response[i].mailingAddress.stateOrProvince);
            var $Mission = $("<td>").text(response[i].mission);
            var $EvaluateURL = $("<td>").html("<a href=" + response[i].charityNavigatorURL + " target='_blank'>Evaluator Link</a>");
            if (response[i].websiteURL !== null) {
                var $URL = $("<td>").html("<a href=" + response[i].websiteURL + " target='_blank'>Charity Link</a>");
            } else {
                var $URL = $("<td>").text("Not Available");
            }
            $table.append($("<tr>").append($name, $Location, $Mission, $EvaluateURL, $URL));
            $("#news").append($table);
        }
    },


};

// --- EVENT LISTENERS ----

// Dropdown listener
$(".dropdown-item").on("click", function (event) {
    event.preventDefault();
    // get value of 'this' selected dropdown
    var selectedID = $(this).attr("id");
    catID = $(this).attr("value");
    console.log("ID, CatID: ", selectedID, catID);
    newsFinder.search(selectedID);
});

$("#searchBtn").on("click", function (event) {
    event.preventDefault();

    var query = $("#searchItem").val();
    newsFinder.search(query);


});

// TODO: Listener for Single Article
$(document).on("click", ".newscard", function (event) {
    event.preventDefault();
    var article = $(this).attr("data-article");
    alert(article);

});

    // TODO: Listener for Single Charity

// });
