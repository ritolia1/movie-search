/*
  Calls the web application to get movie details and render it on screen.
  Two api are called for movie details
    a) http://api.themoviedb.org
    b) Imdb
*/

$(document).ready(function() {
  var query = window.location.search.substring(1);
  var movie=query.replace(/[\+]/g,' ');
  var link = "http://127.0.0.1:8090/movie/specific/"+movie;
  var imdbLink= "http://127.0.0.1:8090/movie/imdb/"+movie;
  var imageSearchResult="";
  var textAreaSearchResut="";
  
  if (movie != "") {
     $.getJSON(link, function(response) {
         var obj=(JSON.parse(response));
          console.log(obj);
         imageSearchResult+="<img src=\"http://image.tmdb.org/t/p/w500/"+obj.results[0].backdrop_path+"\" style=\"outline: 5px solid black;\">";
         $(".image_bar").html(imageSearchResult);

         textAreaSearchResut+="<div class=\"panel panel-primary\" style=\"margin-top:20px\">"+
                              "<div class=\"panel-heading\">Title</div>"+
                              "<div class=\"panel-body\">"+
                                obj.results[0].original_title+
                              "</div>"+
                              "</div>";

         textAreaSearchResut+="<div class=\"panel panel-primary\" style=\"margin-top:20px\">"+
                              "<div class=\"panel-heading\">Popularity</div>"+
                              "<div class=\"panel-body\">"+
                                obj.results[0].popularity+
                              "</div>"+
                              "</div>";

        textAreaSearchResut+="<div class=\"panel panel-primary\" style=\"margin-top:20px\">"+
                              "<div class=\"panel-heading\">Overview</div>"+
                              "<div class=\"panel-body\">"+
                                obj.results[0].overview+
                              "</div>"+
                              "</div>";
         textAreaSearchResut+="<div class=\"panel panel-primary\" style=\"margin-top:20px\">"+
                              "<div class=\"panel-heading\">Release Date</div>"+
                              "<div class=\"panel-body\">"+
                                 obj.results[0].release_date+
                              "</div>"+
                              "</div>";   

          $.getJSON(imdbLink, function(imdbresponse) {
              var imdbobj=(JSON.parse(imdbresponse));
              console.log(imdbobj);
              textAreaSearchResut+="<div class=\"panel panel-primary\" style=\"margin-top:20px\">"+
                              "<div class=\"panel-heading\">Genre</div>"+
                              "<div class=\"panel-body\">"+
                               imdbobj.Genre+
                              "</div>"+
                              "</div>";

              textAreaSearchResut+="<div class=\"panel panel-primary\" style=\"margin-top:20px\">"+
                              "<div class=\"panel-heading\">Actors</div>"+
                              "<div class=\"panel-body\">"+
                               imdbobj.Actors+
                              "</div>"+
                              "</div>";

              textAreaSearchResut+="<div class=\"panel panel-primary\" style=\"margin-top:20px\">"+
                              "<div class=\"panel-heading\">ImdbRating</div>"+
                              "<div class=\"panel-body\">"+
                               imdbobj.imdbRating+
                              "</div>"+
                              "</div>";
              textAreaSearchResut+="<div class=\"panel panel-primary\" style=\"margin-top:20px\">"+
                              "<div class=\"panel-heading\">ImdbVotes</div>"+
                              "<div class=\"panel-body\">"+
                               imdbobj.imdbVotes+
                              "</div>"+
                              "</div>";
              textAreaSearchResut+="<div class=\"panel panel-primary\" style=\"margin-top:20px\">"+
                              "<div class=\"panel-heading\">Language</div>"+
                              "<div class=\"panel-body\">"+
                               imdbobj.Language+
                              "</div>"+
                              "</div>";
                              
              $(".text-area").html(textAreaSearchResut);
          });                                    
    });
  }
});