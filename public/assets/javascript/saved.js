$(document).ready(function() {
  var articleContainer = $(".article-container");
  // Handle on-click events
  $(document).on("click", ".delete", deleteArticle);
  $(document).on("click", ".comments", commentArticle);

  // Gotta start somewhere..
  start();
  // See index.js
  function start() {
    articleContainer.empty();
    $.get("/api/headlines?saved=true").then(function(data) {
      if (data && data.length) {
        renderArticles(data);
      }
      else {
        emptyPage();
      }
    });
  }
  // Render saved articles - Happens after start
  function renderArticles(articles) {
    var articlePanels = [];
    for (var i = 0; i < articles.length; i++) {
      articlePanels.push(createCard(articles[i]));
    }
    articleContainer.append(articlePanels);
  }
  // Create a new card
  function createCard(article) {
    var card = $(
      [
        "<div class='card w-75 p-1 m-3 mx-auto'>",
        "<div class='card-body'>",
        "<div class='card-title'>",
        "<h4>",
        "<a class='article-link' target='_blank' href='" + article.url + "'>",
        article.headline,
        "</a>",
        "</h4>",
        "<a class='btn btn-outline-primary float-right comments m-1'>Comments</a>",
        "<a class='btn btn-outline-danger float-right delete m-1'>Delete</a>",
        "</div>",
        article.summary ,
        "</div>",
        "</div>"
      ].join("")
    );
    card.data("_id", article._id);
    return card;
  }

  function emptyPage() {
    var emptyAlert = $(
      [
        "<div class='alert alert-warning text-center'>",
        "<h4>Uh Oh. Looks like we don't have any saved articles.</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>Would You Like to Browse Available Articles?</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a href='/'>Browse Articles</a></h4>",
        "</div>",
        "</div>"
      ].join("")
    );
    articleContainer.append(emptyAlert);
  }
  // Delete an article
  function deleteArticle() {
    var articleToDelete = $(this).parents(".card").data();
    $.ajax({
      method: "DELETE",
      url: "/api/headlines/" + articleToDelete._id
    }).then(function(data) {
      if (data.ok) {
        start();
      }
    });
  }

  function commentArticle() {
    alert("Just imagine this is a beautiful comment section...  You have to believe... I've seriously spent way too much time on this to find out that bootbox is not available for bootstrap 4 so I've ran out of steam..");
  }

});
