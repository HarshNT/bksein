
$(document).ready(function(){

        $.ajax({
          url: "/home/admin/search",
          crossDomain: true,
          dataType: "json",
          success: function (data) {
            console.log(data);
          }
        }); 
        

});

