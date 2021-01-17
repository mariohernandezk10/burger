// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".devour").on("click", function(event) {
      var id = $(this).data("id");
      var boolean = $(this).data("newEatenStatus");
  
      // this var helps the ajax to read if its true or false
      // this is used in line 16 in the ajax
      var newEatenStatus = {
        eatenKey: boolean
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newEatenStatus
      }).then(
        function() {
          console.log("changed sleep to", boolean);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event. AKA no reload
      event.preventDefault();
  
      var newBurger = {
        // this is where the input goes aka the name 
        name: $("#ca").val().trim(),
        // Idk why the "checked" is there but this checks to 
        // see if the value is eatenKey or awake
        eatenKey: $("[name=eatenKey]:checked").val().trim()
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new cat");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".delete-cat").on("click", function(event) {
      let id = $(this).data("id");
  
      $.ajax("/api/burgers/" + id, {
        type: "DELETE"
      }).then(
        function() {
          // Reload the page to get the updated list
          location.reload();
        }
      );
    })
  });