
$(document).ready(function(){
    
   
    
  $("#title").click(function(){
      alert("vip");
      call('/home/admin/all',{});
});
 
  
 $("#search-icon").click(function(){
   
    //  alert($(this).siblings().val());
    // //  $('#search-phone')
    // // .filter(function() {
    // //     return this.value.match(/[a-z]+_\d+/);
    // // })
    // // .addClass("error")
   var data = $('#search-phone').val();
   console.log(data);
    var rege = /^[0-9]*$/;
if(rege.test($('#search-phone').val())){ 
  alert("error"); $('#search-phone').removeClass("error");  
  
  
  call('/home/admin/search',{"key":data});

 }else{$('#search-phone').addClass("error")};

           
});

// post('/home/admin/search', {
//   "customerName": "responsename"
// });





// //creates new orderId everytime
// $.ajax(settings).done(function (response) {

  
//   console.log(response);
  
// });

//   $.ajax({
//     url: "/home/admin/all",
//     crossDomain: true,
//     dataType: "json",
//     success: function (data) {
//       console.log(data);
//       var id = '1';
//       for (let i = 0; i < data.length; i++){
     
//         $('.t-body').append(`
//         <tr class="t-data-row">
//             <td class="t-data">`+id+`</td>
//             <td class="t-data">`+data[i].time+`</td>
//             <td class="t-data">`+data[i].uname+`</td>
//             <td class="t-data">`+data[i].name+`</td>
//             <td class="t-data">`+data[i].email+`</td>
//             <td class="t-data">`+data[i].phone+`<span><img class="ml-2 wa-btn" width="20px" height="20px" src="assets/icon/whatsapp.jpg" ></span><span><a href="tel:`+data[i].phone+`"><img class="ml-2 call-btn" width="20px" height="20px" src="assets/icon/telephone.png" ></a></span></td>
//             <td class="t-data">`+data[i].age+`</td>
//             <td class="t-data">`+data[i].speciality+`</td>
//             <td class="t-data">`+data[i].district+`</td>
//             <td class="t-data">`+data[i].payment_id+`</td>
//           </tr>
//         `);
//         id++;
//       }
//       $('.wa-btn').click(function (e) { 
//         e.preventDefault();
//           // $(this).pev().html();
//          var number = $(this).parent().parent().text();
//           var url = "https://api.whatsapp.com/send?phone=91"+number+"&text="

//           window.open(url, '_blank');
//       });
//     }
//   }); 


function call(path,mydata){
  console.log("mydata"+mydata);
  
  $.post( path, mydata )
  .done(function( data ) {
    
    console.log(data);
    var id = '1';
    for (let i = 0; i < data.length; i++){
      $(".t-body").empty();
      $('.t-body').append(`
      <tr class="t-data-row">
          <td class="t-data">`+id+`</td>
          <td class="t-data">`+data[i].time+`</td>
          <td class="t-data">`+data[i].uname+`</td>
          <td class="t-data">`+data[i].name+`</td>
          <td class="t-data">`+data[i].email+`</td>
          <td class="t-data">`+data[i].phone+`<span><img class="ml-2 wa-btn" width="20px" height="20px" src="assets/icon/whatsapp.jpg" ></span><span><a href="tel:`+data[i].phone+`"><img class="ml-2 call-btn" width="20px" height="20px" src="assets/icon/telephone.png" ></a></span></td>
          <td class="t-data">`+data[i].age+`</td>
          <td class="t-data">`+data[i].speciality+`</td>
          <td class="t-data">`+data[i].district+`</td>
          <td class="t-data">`+data[i].payment_id+`</td>
         </tr>
      `);
      id++;
    }
    $('.wa-btn').click(function (e) { 
      e.preventDefault();
        // $(this).pev().html();
       var number = $(this).parent().parent().text();
        var url = "https://api.whatsapp.com/send?phone=91"+number+"&text="
 
        window.open(url, '_blank');
    });


  });





}

});




