$(document).ready(function () {

    // charity navigator API https://charity.3scale.net/
    var charityNavigator = {
        search: function (query, id) {
            var appID = "4dd27455";
            var key = 'd86a037d4ea3f2785abba1684a1e4bfd'; // key
            var requestURL = "https://api.data.charitynavigator.org/v2/Organizations";
            requestURL += "?app_id=" + appID;
            requestURL += "&app_key=" + key;
            requestURL += "&pageSize=10";
            if (query.trim() !== '') {
                requestURL += "&search=" + query;
            }
            // requestURL += "&search=" + query;
            // requestURL += "&categoryID=" + query;
            requestURL += "&rated=true";
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

            var url = 'https://newsapi.org/v2/everything?' +
                //'country=us&' +
                'q=' +
                query +
                '&apiKey=e624c791383a46cabe1b19e39ba150f4';
            var req = new Request(url);
            fetch(req)
                .then(function (response) {
                    console.log(response.json());
                })


            if (id !== "") {
                requestURL += "&categoryID=" + id;
            }
            $.ajax({
                url: requestURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                charityNavigator.tableGenerator(response);
            });
        },

        tableGenerator: function (response) {
            $("#charities-table-body").empty();
            for (i=0; i<response.length; i++) {
                var $name = $("<td>").text(response[i].charityName);
                var $Location = $("<td>").text(response[i].mailingAddress.city + ", " + response[i].mailingAddress.stateOrProvince);
                var $Mission = $("<td>").text(response[i].mission);
                var $EvaluateURL = $("<td>").html("<a href=" + response[i].charityNavigatorURL + " target='_blank'>Evaluator Link</a>");
                if (response[i].websiteURL !== null) {
                    var $URL = $("<td>").html("<a href=" + response[i].websiteURL + " target='_blank'>Charity Link</a>");
                } else {
                    var $URL = $("<td>").text("Not Available");
                }
                
                $("#charities-table-body").append($("<tr>").append($name, $Location, $Mission,$EvaluateURL, $URL))
            }
        }
    }

    $("#charities-submit").on("click", function (event) {
        event.preventDefault();
        var query = $("#query").val().trim();
        var catID = $("#category-id option:selected").val();
        console.log("catID: ", catID);
        // if (query !== "") {
            charityNavigator.search(query, catID);
        // }

    });

});
