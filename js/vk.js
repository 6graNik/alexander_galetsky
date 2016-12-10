$(document).ready(function() {
  var escapeIds = [-75764217, 7282114]; // нежелательные id авторов

  $.ajax({
    url: "https://api.vk.com/method/board.getComments?group_id=75764217&topic_id=30450418&need_likes=1&count=100&extended=1&v=5.60",
    method: "get",
    crossDomain: true,
    dataType: "jsonp",
    data: {
      q: "select title,abstract,url from search.news where query=\"cat\"",
      format: "json"
    },
    jsonp: "callback"
  })
  .done(function(data){
    if (data.error) return;

    var response = data.response,
        profiles = response.profiles,
        comments = response.items.slice(1).filter(
          function(item) {
            return !escapeIds.find(
              function(element){return element === item.from_id}
          );
    }) || [];

    var authors = profiles.reduce(function(obj, item) {
      obj[item.id] = Object.assign({}, item);

      return obj;
    }, {});

    if (comments.length) {
      // у нас есть комменты, которые нужно пульнуть в дом
      var feedbackList = $('.feedback-list');


      comments.map(function(item) {
        feedbackList.append(createFeedBackElement(item));
      });

      feedbackList.append(comments);
    }

    function createFeedBackElement(item) {
      var author = authors[item.from_id];

      var name = $("<span class='feedback-item__author-name'></span>").text(author.first_name + ' ' + author.last_name + ':  ');
      var container = $("<div class='feedback-item'></div>");
      var avatar = $("<img class='feedback-item__avatar' src='" + author.photo_100 + "' />");
      var content = $("<div class='feedback-item__content'></div>");
      var text = !!item.text && $("<div class='feedback-item__content-text'></div>").text(item.text);
      var date = $("<div class='feedback-item__data'></div>").text(1473062076);

      // фотки не поддерживаем пока только текст
      // var photosArr = !!item.attachments && item.attachments.length && item.attachments.filter(function(attachment) {
      //   return attachment.type === "photo";
      // })
      content.append(name);
      content.append(text);
      content.append(date);

      container.append(avatar);
      container.append(content);



      return container;
    }
  })
});
