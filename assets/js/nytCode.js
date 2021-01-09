/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for NYT API based on form inputs
 */


// var beginDate = "2020"
// query = "elections"
// var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query + "&begin_date=" + beginDate + "&api-key=S5QfG34XsbEFdDAFYXy4SCV4EvNGfjrm"


function buildQueryURL() {

  var query = $("#search-term").val()
  var beginDate = $("#start-year").val()
  var endDate = $("#end-year").val()

  if (beginDate === "" && endDate === "") { queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query + "&api-key=S5QfG34XsbEFdDAFYXy4SCV4EvNGfjrm" }

  else if (beginDate !== "" && endDate === "") {
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query + "&begin_date=" + beginDate + "0101&api-key=S5QfG34XsbEFdDAFYXy4SCV4EvNGfjrm"
  }

  else if (beginDate === "" && endDate !== "")
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query + "&end_date=" + endDate + "1231&api-key=S5QfG34XsbEFdDAFYXy4SCV4EvNGfjrm"

  else {
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query + "&begin_date=" + beginDate + "0101&end_date=" + endDate + "1231&api-key=S5QfG34XsbEFdDAFYXy4SCV4EvNGfjrm"
  }

  return queryURL;

}


/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} NYTData - object containing NYT API data
 */




function updatePage(NYTData) {

  var recordCount = parseInt($("#record-count").val())

  for (var i = 0; i < recordCount; i++) {

    var articleDiv = $("<div>")
    var headlineDiv = $("<div>")
    var bylineDiv = $("<div>")
    var numberSpan = $("<span>")
    var headlineSpan = $("<span>")

    articleDiv.addClass("card article-card mb-3 pt-3 pb-3 pl-4 pr-4")
    numberSpan.addClass("article-num")
    headlineSpan.addClass("headline")
    bylineDiv.addClass("byline")

    numberSpan.text(i + 1)
    headlineSpan.text(" " + NYTData.response.docs[i].headline.main)

    if (NYTData.response.docs[i].byline.original) {
      bylineDiv.text(NYTData.response.docs[i].byline.original)
    }


    headlineDiv.append(numberSpan, headlineSpan)
    articleDiv.append(headlineDiv, bylineDiv)

    $("#article-section").append(articleDiv)


  }


}

// Function to empty out the articles
function clear() {
  $("#article-section").empty();
}

$("#run-search").on("click", function (event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // Empty the region associated with the articles
  clear();

  // Build the query URL for the ajax request to the NYT API
  var queryURL = buildQueryURL();
  console.log(queryURL)
  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);
});

// .on("click") function associated with the clear button
$("#clear-all").on("click", clear);
