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
        newsURL += '&sortBy=publishedAt';
        $.ajax({
            url: newsURL,
            method: "GET"
        }).then(function (newsresponse) {
            console.log("news AJAX: ", newsresponse);
            newsData = newsresponse; // save newsresponse to global variable newsData to be used later
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
            $card = $("<div class='grid-item' data-article='" + i + "'>");
            var $img = $("<img class='card-img-top center-block'>").attr({ "src": response.articles[i].urlToImage });
            var date = " (" + moment(response.articles[i].publishedAt, moment.ISO_8601).format("MM/DD/YY") + ")"; 
            //moment(response[i].applicationstartdate, moment.ISO_8601).format("dddd, MMMM Do YYYY");
            var $body = $("<div class='card-body'>");
            var $title = $("<div class='card-title'>").html(response.articles[i].title + date);
            var $descrip = $("<div class='card-text'>").html(response.articles[i].description);
            // var $content = $("<td>").text(response.articles[i].content);
            var $source = $("<div class='source'>").text(response.articles[i].source.name);

            // var $url = $("<td>").html("<a href=" + response.articles[i].url + " target='_blank'>article</a>");
            $card.append($img, $body.append($title, $descrip, $source));
            $("#gridContainer").append($card);
        }
    },

    articleGenerator: function (item) {
        $("#articleDisplay").show();
        // display single artile using item as an index to get info from newsData
        // console.log("item: ", item, "newsData: ", newsData, "newsData.charitys[item]: ", newsData.charitys[item]);
        // $charityDisplay = $("#charityDisplay");
        $artHolder = $("#artHolder");
        var article = newsData.articles[item];
        // console.log("charity object: ",charity);
        console.log("item: ", item);
        console.log("Title: ", article.title);
        console.log("content: ", article.content);
        console.log("source: ", article.source.name);

        var $article = $("<div class='grid-item card newscard' data-article='" + i + "'>");
        var $articleIMG = $("<img class='article-img-top'>").attr({ "src": article.urlToImage, "style": "text-align: center" });
        var $articleBody = $("<div class='card-body'>");
        var $articleTitle = $("<div class='card-title'>").html(article.title);
        var $articleContent = $("<div class='card-content'>").html(article.content);
        var $articleSource = $("<div class='source'>").text(article.source.name);

        $article.append($articleIMG, $articleBody.append($articleTitle, $articleContent, $articleSource));
        $artHolder.append($article);

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
            charityData = response;
        });

    },

    charitiesGenerator: function (item) {
        
        // display single artile using item as an index to get info from newsData
        // console.log("item: ", item, "newsData: ", newsData, "newsData.charitys[item]: ", newsData.charitys[item]);
        // $charityDisplay = $("#charityDisplay");
        $charHolder = $("#charHolder");
        var charity = charityData[item];
        // console.log("charity object: ",charity);
        console.log("item: ", item);
        console.log("name: ", charity.charityName);
        console.log("Address: ", charity.mailingAddress.streetAddress1);
        console.log("Address: ", charity.mailingAddress.city);
        console.log("Address: ", charity.mailingAddress.stateOrProvince);
        console.log("URL: ", charity.mailingAddress.charityNavigatorURL);

        var $charity = $("<div class='grid-item card newscard' data-charity='" + i + "'>");
        var $charityBody = $("<div class='card-body'>");
        var $charityName = $("<div class='card-title'>").text(charity.charityName);
        var $charityAddress = $("<div class='card-content'>").text(charity.mailingAddress.streetAddress1 + " " + charity.mailingAddress.city + ", " + charity.mailingAddress.stateOrProvince);
        var $charityURL = $("<div class='source'>").text(charity.mailingAddress.charityNavigatorURL);

        $charity.append($charityBody.append($charityName, $charityAddress, $charityURL));
        $charHolder.append($charity);

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
    $("#artHolder").empty();
    $("#charHolder").empty();
    $("#articleDisplay").hide();
    $("#gridContainer").show();
});

$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    var query = $("#searchItem").val();
    newsFinder.search(query);
    charityNavigator.search(query);
});

// TODO: Listener for Single charity and article
$(document).on("click", ".grid-item", function (event) {
    event.preventDefault();
    var articleNum = $(this).attr("data-article");
    console.log(articleNum);
    $("#gridContainer").hide();
    newsFinder.articleGenerator(articleNum);
    charityNavigator.charitiesGenerator(articleNum);

});

// RETURN BUTTON listener
$(document).on("click", "#returnBtn", function (event){
    event.preventDefault();
    $("#artHolder").empty();
    $("#charHolder").empty();
    $("#articleDisplay").hide();
    $("#gridContainer").show();
})


    // TODO: Listener for Single Charity

// });
