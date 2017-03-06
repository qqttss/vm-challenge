
// polupalte the table with data fetched from server
$(".user-item").each(function(i, item) {

  var $item = $(item);
  var id = i + 1;

  $.ajax('http://jsonplaceholder.typicode.com/users/' + id, {
    method: 'GET'
  }).then(function(data) {
    //console.log(data);

    $item.html(function() {
      return '<div class="info-item">' + data.name + '</div>';
    });
  }).then(function() {
    $.ajax('http://jsonplaceholder.typicode.com/albums/' + id, {
      method: 'GET'
    }).then(function(data) {
      //console.log(data);

      $item.html(function() {
        return $item.html() +
          '<div class="info-item">' + data.userId + '</div>' +
          '<div class="info-item">' + data.id + '</div>' +
          '<div class="info-item">' + data.title + '</div>';
      });
    });
  });

});

// below are the drag-and-drop handlers
function dragstart_handler(ev) {
 ev.dataTransfer.setData("text", ev.target.id);
 ev.effectAllowed = "move";
}

function dragover_handler(ev) {
 console.log("dragOver !");
 ev.preventDefault();
}

function drop_handler(ev) {
  console.log("Drop");
  ev.preventDefault();
  // Get the id of drag source element (that was added to the drag data
  // payload by the dragstart event handler)
  var id = ev.dataTransfer.getData("text");
  var sourceElement = document.getElementById(id);
  var childrenNodes;
  var idOfUser;

  // Only move the element into table one or table two, not to their child elements
  if (ev.target.id == "table-one" || ev.target.id == "table-two") {
    ev.target.appendChild(sourceElement);
    idOfUser = sourceElement.lastChild.previousSibling.textContent;
    console.log(idOfUser);
    
    $.ajax('http://jsonplaceholder.typicode.com/albums/' + idOfUser, {
      method: 'GET'
    }).then(function(data) {
            
      sourceElement.firstChild.nextSibling.textContent = data.userId;
      
    }); 

  }
  
}

function dragend_handler(ev) {
  // Remove all of the drag data
  ev.dataTransfer.clearData();
}