jQuery(document).ready(function() {

  // $('.contact-form-container').backstretch("img/contact/background.png");

  // new WOW().init();

  $('#contact-form-box').submit(function(e) {
    e.preventDefault();



    var postdata = $('#contact-form-box').serialize();
    $.ajax({
      type: 'POST',
      url: '/mail/mail.php',
      data: postdata,
      dataType: 'json',
      success: function(json) {

        if (json.success == true) {
          $('#contact-form-box input').val('');
          $('#contact-form-box textarea').val('');
          $('.contact-form-success').fadeIn('fast');

          setTimeout(() => {
            $('.contact-form-success').fadeOut('fast');
          }, 5000)

        }

        $('.contact-form-box form label[for="contact-form-name"] .contact-error').fadeOut('fast', function() {
          if (json.nameMessage != '') {
            $(this).html('(' + json.nameMessage + ')').fadeIn('fast');
          }
        });
        $('.contact-form-box form label[for="contact-form-email"] .contact-error').fadeOut('fast', function() {
          if (json.emailMessage != '') {
            $(this).html('(' + json.emailMessage + ')').fadeIn('fast');
          }
        });
        $('.contact-form-box form label[for="contact-form-subject"] .contact-error').fadeOut('fast', function() {
          if (json.subjectMessage != '') {
            $(this).html('(' + json.subjectMessage + ')').fadeIn('fast');
          }
        });
        $('.contact-form-box form label[for="contact-form-message"] .contact-error').fadeOut('fast', function() {
          if (json.messageMessage != '') {
            $(this).html('(' + json.messageMessage + ')').fadeIn('fast');
          }
        });
        if (json.nameMessage == '' && json.emailMessage == '' && json.subjectMessage == '' && json.messageMessage == '') {
          // 	this_form_parent.find('.contact-form-top').fadeOut('fast');
          // 	this_form_parent.find('.contact-form-bottom').fadeOut('fast', function () {
          // 		this_form_parent.append('<p>Thanks for contacting us! We will get back to you very soon.</p>');
          // 		// reload background
          // 		$('.contact-form-container').backstretch("resize");
          // 	});
        }

      }
    });
  });
});