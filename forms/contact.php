<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'C:\xampp\htdocs\Gayan-Thejawansha.github.io\assets\vendor\PHPMailer\Exception.php';
require 'C:\xampp\htdocs\Gayan-Thejawansha.github.io\assets\vendor\PHPMailer\PHPMailer.php';
require 'C:\xampp\htdocs\Gayan-Thejawansha.github.io\assets\vendor\PHPMailer\SMTP.php';

$mail = new PHPMailer(true);

  // Replace contact@example.com with your real receiving email address
  $receiving_email_address = 'gayan.thejawansha.github.io@gmail.com';

  try {
    //Server settings
    $mail->SMTPDebug = 0;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = $receiving_email_address;                     // SMTP username
    $mail->Password   = '1qaz@WSX3edc';                               // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port       = 587;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom($_POST['email'], $_POST['name']);
    $mail->addAddress('gthejawansha2@gmail.com', 'Gayan Shanaka Thejawansha');     // Add a recipient

    // Content
    $mail->isHTML(false);                                  // Set email format to HTML
    $mail->Subject = $_POST['subject'];
    $mail->Body    = $_POST['message'];

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

  // $to = "gthejawansha2@gmail.com";
  // $subject = $_POST['subject'];
  // $message = $_POST['message'];
  // $headers = "From: " . $_POST['name'] . " <" . $_POST['email'] . ">";
  
  // mail($to, $subject, $message, $headers);

  // if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
  //   include( $php_email_form );
  // } else {
  //   die( 'Unable to load the "PHP Email Form" Library!');
  // }

  // $contact = new PHP_Email_Form;
  // $contact->ajax = true;
  
  // $contact->to = $receiving_email_address;
  // $contact->from_name = $_POST['name'];
  // $contact->from_email = $_POST['email'];
  // $contact->subject = $_POST['subject'];

  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
 
  // $contact->smtp = array(
  //   'host' => 'example.com',
  //   'username' => 'example',
  //   'password' => 'pass',
  //   'port' => '587'
  // );
 

  // $contact->add_message( $_POST['name'], 'From');
  // $contact->add_message( $_POST['email'], 'Email');
  // $contact->add_message( $_POST['message'], 'Message', 10);

  // echo $contact->send();
?>
