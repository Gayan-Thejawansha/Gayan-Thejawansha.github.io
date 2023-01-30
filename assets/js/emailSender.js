async function sendEmail() {

    var senderName = document.getElementById("sender_name").value;
    var senderEmail = document.getElementById("sender_email").value;
    var subject = document.getElementById("subject").value;
    var message = 'test message'//document.getElementById("message").value;

    // Load the Gmail API client library.
    gapi.load('client:auth2', function() {
      gapi.client.init({
        apiKey: 'AIzaSyCCtzYll-6e0nsLrbsR3DTIDsEzyvDfeSs',
        clientId: '927885911599-a8j0kvlam9sdva0crbpii34m5v034gkr.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
        scope: 'https://www.googleapis.com/auth/gmail.send'
      }).then(function() {
        // Check if the user is already signed in.
        gapi.auth2.getAuthInstance().signIn().then(function() {
          // Build the email request.
          var email = 'From: ' + senderName + ' <' + senderEmail + '>\r\n' +
              'To: gthejawansha2@gmail.com\r\n' +
              'Subject: ' + subject + '\r\n\r\n' +
              message;
          var request = gapi.client.gmail.users.messages.send({
            'userId': 'me',
            'resource': {
              'raw': btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
            }
          });
          // Send the email.
          request.execute(function(response) {
            console.log('Email sent: ' + response.status);
          });
        });
      });
    });
  }