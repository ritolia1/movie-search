/*
  Calls the web application to get movie list and render it on screen.
*/

//Global variable to keep track of page number.
var pagecount=0;

//Will change pagecount based on button click and call action function.
$(document).ready(function() {
  $("#search_btn").on('click', function() {
    pagecount=1;
    action();
  });
  $("#previous").on('click', function() {
    pagecount--;
    if(pagecount<=0)
      pagecount=1;
    action();
  });
  $("#next").on('click', function() {
    pagecount++;
    action();
  });

  $("#text_area").keyup(function(event){
    if(event.keyCode == 13){
        $("#search_btn").click();
    }
});
});

//Will fetch list of movie from web application and render it to card div in index.html file.
function action() {
  var item = $('#text_area').val();
  var link = "http://127.0.0.1:8090/movie/list/"+item+"/"+pagecount;
  if (item != "") {
     var searchResultHTML = "";
      $.getJSON(link, function(response) {
          for(var i=0;i<20;i++){
            var obj=(JSON.parse(response));
            searchResultHTML+="<div class=\"row\">"+
              "<div class=\"col-sm-6\" style=\"margin-left:25%;border:1px blue\" id="+obj.results[i].original_title.replace(/[\s]/g, '+')+" onClick=\"reply_click(this.id)\" >"+
                "<div class=\"col-sm-3\">"+
                  "<img style=\"width:100%\" src=\"http://image.tmdb.org/t/p/w500/"+obj.results[i].poster_path+"class=\"doc_avatar\" >"+
                "</div>"+
                "<div class=\"col-sm-9\">"+
                  "<table class=\"table table-striped table-responsive\" style=\"float:right\">"+
                      "<tbody>"+
                        "<tr>"+
                          "<td>Original Title:</td>"+
                          "<td>"+obj.results[i].original_title+"</td>"+
                        "</tr>"+
              
                        "<tr>"+
                          "<td>Original_language</td>"+
                          "<td>"+obj.results[i].original_language+"</td>"+
                        "</tr>"+
                         "<tr>"+
                          "<td>Popularity:</td>"+
                          "<td>"+obj.results[i].popularity+"</td>"+
                        "</tr>"+
                        "<tr>"+
                          "<td>Vote Count:</td>"+
                          "<td>"+obj.results[i].vote_count+"</td>"+
                        "</tr>"+
                        "<tr>"+
                          "<td>Vote Average:</td>"+
                          "<td>"+obj.results[i].vote_average+"</td>"+
                        "</tr>"+
                      "</tbody>"+
                  "</table>"+
                "</div>"+
              "</div>"+
            "</div>"
          } 
        $("#card").html(searchResultHTML);
    });    
  };
}

//Will move window to movie-detail.html file with movie id.
function reply_click(clicked_id){
    window.location="movie-details.html?"+clicked_id;
}