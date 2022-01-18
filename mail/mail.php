<?php

// Email address verification
function isEmail($email)
{
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

if ($_POST) {

    // Enter the email where you want to receive the message
    $emailTo = 'inquiry@sparkappstech.com';

    $name = addslashes(trim($_POST['name']));
    $email_address = addslashes(trim($_POST['email']));
    $phone = addslashes(trim($_POST['phone']));
    $subject = addslashes(trim($_POST['subject']));
    $message = addslashes(trim($_POST['message']));

    $array = array('success' => false, 'nameMessage' => '', 'emailMessage' => '', 'subjectMessage' => '', 'messageMessage' => '');

    if ($name == '') {
        $array['nameMessage'] = 'Empty name!';
    }
    if (!isEmail($email_address)) {
        $array['emailMessage'] = 'Invalid email!';
    }
    if ($subject == '') {
        $array['subjectMessage'] = 'Empty subject!';
    }
    if ($message == '') {
        $array['messageMessage'] = 'Empty message!';
    }
    if ($name != '' && isEmail($email_address) && $subject != '' && $message != '') {

        $array['success'] = true;

        // Create the email and send the message
        $to = $emailTo; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
        $email_subject = "Website Contact Form:  $name";
        $email_body = "You have received a new message from your website contact form.\n\n" . "Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nMessage:\n$message";
        $headers = "From: noreply@sparkappstech.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
        $headers .= "Reply-To: $email_address";
        mail($to, $email_subject, $email_body, $headers);
    }

    echo json_encode($array);
}
