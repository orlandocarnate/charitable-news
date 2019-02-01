// $(document).ready(function () {
// Global Variables
var catID;
var newsData;
var charitySearch;
// var charityData;
var searchQuery;

// news object & API
var newsFinder = {

    search: function (query) {
        searchQuery = query;
        // ------- NEWS API ---------
        var newsURL = 'https://newsapi.org/v2/everything?';
        newsURL += 'q=' + query;
        newsURL += '&apiKey=e624c791383a46cabe1b19e39ba150f4';
        newsURL += '&pageSize=6';
        newsURL += '&sortBy=publishedAt';
        // news AJAX call
        $.ajax({
            url: newsURL,
            method: "GET"
        }).then(function (newsresponse) {
            console.log("news AJAX: ", newsresponse);
            newsData = newsresponse; // save newsresponse to global variable newsData to be used later
            newsFinder.newsGenerator(newsresponse, query);
        });
        // --------- /NEWS -----------
    },

    newsGenerator: function (response, query) {

        // clear results section
        $("#gridContainer").empty();
        // var $table = $("<table class='news'>");
        for (i = 0; i < response.articles.length; i++) {
            $card = $("<div class='col-sm-12 col-md-4 news-card card' data-article='" + i + "'>");
            var $img = $("<img class='card-img-top center-block'>").attr({ "src": response.articles[i].urlToImage });
            var date = " (" + moment(response.articles[i].publishedAt, moment.ISO_8601).format("MM/DD/YY") + ")";
            var $body = $("<div class='card-body'>");
            var $title = $("<div class='card-title'>").html(response.articles[i].title + date);
            var $descrip = $("<div class='card-text'>").html(response.articles[i].description);
            var $source = $("<div class='source'>").text(response.articles[i].source.name);

            $card.append($img, $body.append($title, $descrip, $source));
            $("#gridContainer").append($card);
        }
    },

    articleGenerator: function (item) {
        $("#articleDisplay").show();
        // display single artile using item as an index to get info from newsData
        $articleContainer = $("#articleContainer");
        var article = newsData.articles[item];

        var $article = $("<div class='col-sm-12' data-article='" + i + "'>");
        var $articleIMG = $("<img class='article-img-top'>").attr({ "src": article.urlToImage, "style": "text-align: center" });
        var $articleBody = $("<div class='card-body'>");
        var $articleTitle = $("<div class='card-title'>").html(article.title);
        var $articleContent = $("<div class='card-content'>").html(article.content);
        var $articleSource = $("<div class='source'>").text(article.source.name);

        $article.append($articleIMG, $articleBody.append($articleTitle, $articleContent, $articleSource));
        $articleContainer.append($article);

        // call the charities generator method
        charityNavigator.search(searchQuery);  // selectedID is a Global Var
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
        requestURL += "&rated=true";
        if (parseInt(query)) {
            console.log("Is Integer");
            requestURL += "&categoryID=" + id;
        } else {
            console.log("Is String");
            requestURL += "&search=" + query;
        }

        // charity AJAX call
        $.ajax({
            url: requestURL,
            method: "GET"
        }).then(function (response) {
            console.log("Charities Search: ", response);
            charityNavigator.charitiesGenerator(response);
        });

    },

    charitiesGenerator: function (items) {
        $charHolder = $("#charityHolder");
        $charHolder.empty();

        // create cards using for loop
        for (var i = 0; i < items.length; i++) {
            var $charities = $("<div class='col-sm-6' data-charity='" + i + "'>");
            var $charitiesBody = $("<div class='card-body'>");
            var $charitiesName = $("<div class='card-title'>").text(items[i].charityName);
            var $charitiesAddress = $("<div class='card-content'>").text(items[i].mailingAddress.streetAddress1 + " " + items[i].mailingAddress.city + ", " + items[i].mailingAddress.stateOrProvince);
            // if there is no URL then use Charity Navigator URL
            if (items[i].websiteURL === null) {
                var $charitiesURL = $("<a class='website' target='_blank'>").attr({ "href": items[i].charityNavigatorURL });
            } else {
                var $charitiesURL = $("<a class='website' target='_blank'>").attr({ "href": items[i].websiteURL });
            }
            $charities.append($charitiesURL.append($charitiesBody.append($charitiesName, $charitiesAddress)));
            $charHolder.append($charities);
        }

    },

    searchByCategory: function (id) {
        var appID = "4dd27455";
        var key = 'd86a037d4ea3f2785abba1684a1e4bfd'; // key
        var requestURL = "https://api.data.charitynavigator.org/v2/Organizations";
        requestURL += "?app_id=" + appID;
        requestURL += "&app_key=" + key;
        requestURL += "&pageSize=6";
        requestURL += "&rated=true";
        if (parseInt(query)) {
            console.log("Is Integer");
            requestURL += "&categoryID=" + id;
        } else {
            console.log("Is String");
            requestURL += "&search=" + query;
        }

        // charity AJAX call
        $.ajax({
            url: requestURL,
            method: "GET"
        }).then(function (response) {
            console.log("Charities Search: ", response);
            charityNavigator.charitiesMainGenerator(response);
        });
    },
    charitiesMainGenerator: function (items) {

        // clear results section
        $("#gridContainer").empty();
        // var $table = $("<table class='news'>");
        for (i = 0; i < items.length; i++) {
            $card = $("<div class='col-sm-4'>");
            // var $img = $("<img class='card-img-top center-block'>").attr({ "src": response.articles[i].urlToImage });
            var $charitiesBody = $("<div class='card-body'>");
            var $charitiesName = $("<div class='card-title'>").text(items[i].charityName);
            var $mission = $("<div class='card-text'>").html(items[i].mission);
            var $charitiesAddress = $("<div class='card-content'>").text(items[i].mailingAddress.streetAddress1 + " " + items[i].mailingAddress.city + ", " + items[i].mailingAddress.stateOrProvince);
            // var $mission = $("<div class='source'>").text(response.articles[i].source.name);
            // if there is no URL then use Charity Navigator URL
            if (items[i].websiteURL === null) {
                var $charitiesURL = $("<a class='website' target='_blank'>").attr({ "href": items[i].charityNavigatorURL, "text": "Website" });
            } else {
                var $charitiesURL = $("<a class='website' target='_blank'>").attr({ "href": items[i].websiteURL, "text": "Website"  });
            }
            $card.append($charitiesBody.append($charitiesName, $mission, $charitiesAddress, $charitiesURL));
            $("#gridContainer").append($card);
        }

    },

};

// --- EVENT LISTENERS ----

// News Dropdown listener
$(".dropdown-item").on("click", function (event) {
    event.preventDefault();
    // get value of 'this' selected dropdown
    var selectedID = $(this).attr("id");
    catID = $(this).attr("value");
    console.log("ID, CatID: ", selectedID, catID);
    newsFinder.search(selectedID);
    $("#artHolder").empty();
    $("#charHolder").empty();
    $("#articleDisplay").hide();
    $("#gridContainer").show();
});

// Charity Dropdown listener
$(".Charity-dropdown-item").on("click", function (event) {
    event.preventDefault();
    // get value of 'this' selected dropdown
    // var selectedID = $(this).attr("id");
    catID = $(this).attr("value");
    console.log("CatID: ", catID);
    charityNavigator.searchByCategory(catID);
    $("#artHolder").empty();
    $("#charHolder").empty();
    $("#articleDisplay").hide();
    $("#gridContainer").show();
});

// Search Button Listener
$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    var query = $("#searchItem").val().trim();
    // validatation conditional
    if (query !== '') {
        newsFinder.search(query);
        charityNavigator.search(query);
    }

});

// TODO: Listener for Single charity and article
$(document).on("click", ".news-card", function (event) {
    event.preventDefault();
    var articleNum = $(this).attr("data-article");
    console.log(articleNum);
    $("#gridContainer").hide();
    newsFinder.articleGenerator(articleNum);
    // charityNavigator.charitiesGenerator(articleNum);

});

// RETURN BUTTON listener
$(document).on("click", "#returnBtn", function (event) {
    event.preventDefault();
    $("#artHolder").empty();
    $("#charHolder").empty();
    $("#articleDisplay").hide();
    $("#gridContainer").show();
})


    // TODO: Listener for Single Charity

// });
