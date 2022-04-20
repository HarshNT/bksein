

$(document).ready(function () {
  var current_title = $('html').attr('datapagename');
  $(window).scroll(function (event) {
    var scroll = $(window).scrollTop() / 4;
    var targetOpacity = 1;
    if (scroll > 20 && scroll < 1000) {

      //     var opacityVal = 0.4+(Math.min(scroll/100,1));
      // var rgbaCol = 'rgba(21, 34, 56, ' + opacityVal + ')'
      // var rgbaCol2 = 'rgba(255, 255, 255, ' + opacityVal + ')'
      // $('.top-bar').css('background-color', rgbaCol);
      // console.log(opacityVal);
      // $('.nav-link-wrap').css('color', rgbaCol2);
    } else {
      // $('.nav-link-wrap').css('color', 'rgba(255, 255, 255, ' + 1 + ')');
    }
  });

  //  Explore Item Menu
  $('.w-tab-link').click(function (e) {
    e.preventDefault();
    $(this).addClass('w--current');
    $(this).siblings().removeClass('w--current');
    var attrbuit = $(this).attr('data-w-tab');
    $(".w-tab-pane[data-w-tab=" + attrbuit + "]").slideDown(1000);
    $(".w-tab-pane[data-w-tab=" + attrbuit + "]").siblings().slideUp(1000);
  });

  //  Product Hover

  if ($(window).width() > 900) {
    $('#Blogs,#AboutUs,#Home,#Contact,#Exports').hover(function () {
      $('.productdropdown').slideUp(500);
    });

    $('#Products').hover(function () {

      $('.productdropdown').slideDown(500);

    }, function () {

      $('.productdropdown').hover(function () {

      }, function () {
        $('.productdropdown').slideUp(500);
      }
      );


    }
    );
  } else {
    $('#Produtcs').click(function (e) {
      e.preventDefault();
      $('.productdropdown').toggle(500);
    });
  }




  if (current_title == 'Home') {
    // Slide Hero
    var $prev = $('.previousx');
    var $next = $('.nextx');
    var mode = "auto";
    $prev.on({
      click: function (e) {
        e.preventDefault();
        mode = "manual";
        showPreviousImage();
      }
    });
    $next.on({
      click: function (e) {
        e.preventDefault();
        mode = "manual";
        showNextImage();

      }
    });

    setInterval(function () {
      if (mode === "auto") {
        showNextImage();
      }
    }, 4000);

    function showNextImage() {

      var $actEl = $('.activx');
      var $nextEl = $actEl.next('.nslidex');
      var $prevEl = $actEl.prev('.pslidex');
      $prevEl.removeClass('pslidex');
      $prevEl.addClass('nslidex');
      var div2 = $prevEl.detach()
      $('#slide-show').last().append(div2).removeClass('pslidex');
      $actEl.removeClass('activx');
      $actEl.addClass('pslidex');
      $nextEl.removeClass('nslidex');
      $nextEl.addClass('activx');

    }

    $('.speaker').click(function (e) {
      e.preventDefault();
      if ($("#bull-myVideo").prop('muted')) {
        $("#bull-myVideo").prop('muted', false);
        $(".speaker-wrapper").css('opacity', '0.2');
      } else {
        $("#bull-myVideo").prop('muted', true);
        $(".speaker-wrapper").css('opacity', '1');
      }
      $(this).toggleClass('mute');
  
  
    });

    // Buttom Parellax Card

  var o = $(".pcard");
  $("#top").on("mousemove", function (t) {
    var e = -($(window).innerWidth() / 2 - t.pageX) / 20,
      n = -($(window).innerHeight() / 2 - t.pageY) / -50 + 100;

    console.log($(window).innerWidth() + "$$" + $(window).innerHeight() + "$$" + t.pageX + "$$" + t.pageY + "$$" + e + "$$" + n)
    o.attr(
      "style",
      "transform: rotateY(" +
      e +
      "deg) rotateX(" +
      n +
      "deg);-webkit-transform: rotateY(" +
      e +
      "deg) rotateX(" +
      n +
      "deg);-moz-transform: rotateY(" +
      e +
      "deg) rotateX(" +
      n +
      "deg)"
    );
  });

  }




  // var i, resize;

  // i = setInterval(function() {
  //   return $("div").toggleClass("cross");
  // }, 1500);

  // $("div").click(function() {
  //   clearInterval(i);
  //   return $("div").toggleClass("cross");
  // });

  $(".h-menu").children().click(function (e) {
    e.preventDefault();
    $(this).toggleClass("cross")
    var cancelattr = "Opened";

    var attr = $(this).attr('status');

    if (attr != cancelattr) {
      $(".top-bg").slideDown(1000);
      $(".h-navigation").slideDown(1000);
      $(".regstration").fadeOut(500);
      $(".h-navigation").css("display", "grid");
      $("#slide-show").css("z-index", "990");
      $(this).attr('status', cancelattr);

    } else {
      $(".h-navigation").slideUp(1000);
      $(".regstration").fadeIn(500);

      $(".top-bg").slideUp(1000);
      $(this).attr('status', 'closed');
      $('.productdropdown').slideUp(1000);
      $('#Products').children().css({ 'transition': 'transform 1s cubic-bezier(0.25, 0.1, 0.79, 1.07) 0s', 'transform': 'translateY(-00vh)' });
      $('.dropdowarrow').css({ 'transform': 'translateY(-00vh) rotate(0deg)', 'position': 'absolute' });
    }

  });


  // Home Card Hover




  $('.closepreview').click(function (e) {
    e.preventDefault();
    $(".fullpreview").fadeOut();
    $("video").trigger('pause');
  });
  $(".cover").click(function (e) {
    e.preventDefault();
    var src = $(this).children().next().children().attr("src");

    $(".fullpreview").fadeIn();
    $(".fullvideo").children().attr("src", src);
    $(".fullvideo")[0].load();
  });
  $(".cover").hover(function () {
    $(this).children().next().trigger('play');
    $(this).children().first().css({
      'opacity': 0
    });
    // $(this).parent("playlayer").fadeOut();

  }, function () {
    $(this).children().next().trigger('pause');
    $(this).children().first().css({
      'opacity': 1
    });
    // $(this).parent("playlayer").fadeIn();
  }
  );

  if (current_title == 'Registration') {
    var orderId;
    var mamount = "100";
    var tempform = {};
    $("#rzp-button").hide();

    var spacility = ["Bowler", "Batsman", "Wicketkeeper", "All Rounder"]
    var spacilityhtmlString = "";
    for (var i = 0; i < spacility.length; i++) {

      spacilityhtmlString = spacilityhtmlString + "<option value='" + spacility[i] + "'>" + spacility[i] + "</option>";
    }
    $("#speciality").append(spacilityhtmlString);



    var Gujarat = ["Ahmedabad", "Surat", "Bhavnagar", "Jamnagar", "Valsad", "Anand", "Palanpur", "Rajkot"];
    var htmlString = "";
    var optionsList = Gujarat;
    for (var i = 0; i < optionsList.length; i++) {

      htmlString = htmlString + "<option value='" + optionsList[i] + "'>" + optionsList[i] + "</option>";
    }
    $("#inputDistrict").append(htmlString);


    $('#speciality').on('change', function () {
      switch (this.value) {
        case "Bowler":
          $("#r-amount").html("599");
          break;
        case "Batsman":
          $("#r-amount").html("599");
          break;
        case "Wicketkeeper":
          $("#r-amount").html("599");
          break;
        case "All Rounder":
          $("#r-amount").html("599");
          break;
      }
    });



    $.validator.addMethod("letters",
      function (value, element) {
        return /^[a-zA-Z]([-\']?[a-zA-Z]+)*( [a-zA-Z]([-\']?[a-zA-Z]+)*)+$/.test(value);
      });
    $.validator.addMethod("customemail",
      function (value, element) {
        return /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
      });
    $.validator.addMethod("valueNotEquals", function (value, element) {
      return this.optional(element) || value != "-";
    });
    $.validator.addMethod("phone", function (value, element) {
      return this.optional(element) || value == value.match(/^[0-9]+$/);
    });

    $.validator.addMethod("age", function (value, element) {
      return this.optional(element) || value == value.match(/\b(1[6-9]|2[0-5])\b/gm);
    });

    $("#wf-form-Contact-Form").validate({
      rules: {
        name: {
          required: true,
          letters: true,
          minlength: 10
        },
        email: {
          required: true,
          customemail: true,
          minlength: 5
        },
        'checkbox[]': {
          required: true,
          minlength: 1
        },
        phone: {
          required: true,
          minlength: 10,
          maxlength: 10,
          phone: true
        },
        age: {
          required: true,
          age: true,
          minlength: 2,
          maxlength: 2
        },
        speciality: {
          required: true,
          valueNotEquals: true
        },
        district: {
          required: true,
          valueNotEquals: true
        }

      },
      messages: {
        name: "Please enter full name",
        email: "Please enter valid email address",
        phone: "Please enter valid phone number",
        age: "Please enter valid age, (16 to 25) ",
        speciality: "Please select a speciality!",
        district: "Please select a district!",
        'checkbox[]': "Please read & accept Terms & Conditions"
      },
      submitHandler: function (form) {

        tempform = $(form).serializeArray();
        tempform.pop();
        //   $('#wf-form-Contact-Form input, #wf-form-Contact-Form select').each(
        //     function(index){  
        //         var input = $(this);
        //         alert(JSON.stringify(input));
        //     }
        // );

        $.post($(form).attr("action"), $(form).serialize(), function (response) {


          $(form).find('input').prop('disabled', true);
          $(form).find("select").prop('disabled', true);
          $("#feestitle").html("Please verify above details and pay fees to continue");
          $("#submit").slideUp(500);

          if (response == "Already exist") {
            $(".w-form-fail").children().html(response+" please note if you have pending fees pay now by go to 'fee pay' page ");
            $(".w-form-fail").slideDown(500);
          } else {


            console.log(response);
         

            // post('/home/create/order', {
            //   "customerName": response.name,
            //   "customerEmail": response.email,
            //   "customerPhone": response.phone,
            //   "orderId": response.receipt,
            //   "speciality": response.speciality
            // });
            window.location.href = response;


          }
        });





        return false;


      }
    });




  }

  
  if (current_title == 'FeePay') {

    
  $.validator.addMethod("phone", function (value, element) {
    return this.optional(element) || value == value.match(/^[0-9]+$/);
  });

  
  $("#wf-form-fee-Form").validate({
    rules: {
      
      phone: {
        required: true,
        minlength: 10,
        maxlength: 10,
        phone: true
      }

    },
    messages: {
      phone: "Please enter valid phone number"
    },
    submitHandler: function (form) {
      console.log(form);
      tempform = $(form).serializeArray();
     
      //   $('#wf-form-Contact-Form input, #wf-form-Contact-Form select').each(
      //     function(index){  
      //         var input = $(this);
      //         alert(JSON.stringify(input));
      //     }
      // );

      $.post($(form).attr("action"), $(form).serialize(), function (response) {
        

        $(form).find('input').prop('disabled', true);
        $(form).find("select").prop('disabled', true);
        $("#feestitle").html("Please verify above details and pay fees to continue");
        $("#submit").slideUp(500);
        console.log(response);
        if (response == "Please Register Now") {
          $(".w-form-fail").children().html("Please Register Now");
          $(".w-form-fail").slideDown(500);
        
         
        } else {

         
         // post('/home/create/order', {
            //   "customerName": response.name,
            //   "customerEmail": response.email,
            //   "customerPhone": response.phone,
            //   "orderId": response.receipt,
            //   "speciality": response.speciality
            // });
            window.location.href = response;


        }
      });





      return false;


    }
  });

  }

  


});

function post(path, params, method = 'post') {

  // The rest of this code assumes you are not using a library.
  // It can be made less verbose if you use one.
  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}



// Top-navigationbar

















