$(document).ready(function () {

    // charity navigator API https://charity.3scale.net/
    var charityNavigator = {
        search: function (query) {
            var appID = "4dd27455";
            var key = 'd86a037d4ea3f2785abba1684a1e4bfd'; // key
            var requestURL = "https://api.data.charitynavigator.org/v2/Organizations";
            requestURL += "?app_id=" + appID;
            requestURL += "&app_key=" + key;
            requestURL += "&pageSize=10";
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
                charityNavigator.charitiesTableGenerator(response);
            });


            // ------- NEWS API ---------
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

            // news AJAX call
            var newsURL = 'https://newsapi.org/v2/everything?';
            newsURL += 'q=' + query;
            newsURL += '&apiKey=e624c791383a46cabe1b19e39ba150f4';
            $.ajax({
                url: newsURL,
                method: "GET"
            }).then(function (newsresponse) {
                console.log("news AJAX: ", newsresponse);
                charityNavigator.newsTableGenerator(newsresponse);
            });

            // --------- /NEWS -----------
        },

        charitiesTableGenerator: function (response) {
            var $table = $("<table>");
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
                $("#results").append($table);
            }
        },

        newsTableGenerator: function (response) {
            var $table = $("<table>");
            console.log("news table gen");
            console.log("news articles 1: ", response.articles[0].title);
            console.log("news object: ", response);
            for (i = 0; i < response.articles.length; i++) {
                var $title = $("<td>").text(response.articles[i].title);
                var $descrip = $("<td>").text(response.articles[i].description);
                var $source = $("<td>").text(response.articles[i].source.name);
                var $img = $("<td>").html("<img class='article-img' width='64px' height='64px' src='" + response.articles[i].urlToImage + "'>");
                var $url = $("<td>").html("<a href=" + response.articles[i].url + " target='_blank'>Article</a>");
                $table.append($("<tr>").append($title, $descrip, $source, $img, $url));
                $("#results").append($table);
            }
        }
    }

    $("#searchBtn").on("click", function (event) {
        event.preventDefault();
        var query = $("#searchItem").val();
        charityNavigator.search(query);
        // var catID = $("#category-id option:selected").val();
        // console.log("catID: ", catID);
        // if (query !== "") {
        // charityNavigator.search(query, catID);
        // }

    });

});
