$(document).on("click", ".scrape", function() {
    putNews();
    getNews();
    })

    function putNews(){
      $.ajax({
        method: "post",
        url: "/scrape"
    }) .then(function(data) {})
    }

    function getNews(){
      $.ajax({
        method:"get",
        url:"/scrape"
      }).then(function(result){
        //console.log(result)
  
        $(".article-container").empty()
       
        result.forEach((element,index) => $(".article-container").append("<a href = https://www.nytimes.com"+element.link+" class = \"list-group-item list-group-item-action btn-light active text-center h5\"<h1>" +element.title+"</h1></a><br>"))
      })
    }
    
  $(document).on("click", ".clear", function() {
    $(".article-container").empty()
    $(".article-container").append("<a href= # class = \"list-group-item list-group-item-action btn-light active text-center h5\" <h1>"+"Your only option here is to Scrape"+"</h1></a>    ")
  
    $(document).on("click", ".article-container", function() {
      getNews();
    })

    $.ajax({
      method:"delete"
    }).then(function(result){

    })

  })

  <button type="button" class="btn btn-secondary">Secondary</button>
