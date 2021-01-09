/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for NYT API based on form inputs
 */

var query = $("#search-term").val()
var beginDate = $("#start-year").val()
var endDate = $("#end-year").val()


// var beginDate = "2020"
// query = "elections"
// var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query + "&begin_date=" + beginDate + "&api-key=S5QfG34XsbEFdDAFYXy4SCV4EvNGfjrm"


function buildQueryURL() {

  if (beginDate === false && endDate === false) { queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query + "&api-key=S5QfG34XsbEFdDAFYXy4SCV4EvNGfjrm" }

  else if (beginDate === true && endDate === false) {
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query + "&begin_date=" + beginDate + "0101&api-key=S5QfG34XsbEFdDAFYXy4SCV4EvNGfjrm"
  }

  else if (beginDate === false && endDate === true)
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query + "&end_date=" + endDate + "1231&api-key=S5QfG34XsbEFdDAFYXy4SCV4EvNGfjrm"

  else {
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query + "&begin_date=" + beginDate + "0101&end_date=" + endDate + "1231&api-key=S5QfG34XsbEFdDAFYXy4SCV4EvNGfjrm"
  }

  return queryURL;

}

// console.log(queryURL)
/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} NYTData - object containing NYT API data
 */




function updatePage(NYTData) {




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

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);
});

// .on("click") function associated with the clear button
$("#clear-all").on("click", clear);
