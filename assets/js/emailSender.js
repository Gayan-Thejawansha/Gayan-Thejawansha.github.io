//   document.getElementById("sendEmailButton").addEventListener("click", function() {
//     console.log("mailto:gthejawansha2@gmail.com?subject="+document.getElementById("subject").value+
//     "&body="+document.getElementById("message").value+"&cc="+document.getElementById("sender_email").value);
//     wait();
//     // window.location.href = "mailto:gthejawansha2@gmail.com?subject="+document.getElementById("subject").value+
//     // "&body="+document.getElementById("message").value+"&cc="+document.getElementById("sender_email").value;
//   });

function sendEmail() {
//   console.log(
//     "mailto:gthejawansha2@gmail.com?subject=" +
//       document.getElementById("subject").value +
//       "&body=" +
//       document.getElementById("message").value +
//       "&cc=" +
//       document.getElementById("sender_email").value
//   );

  window.location.href =
    "mailto:gthejawansha2@gmail.com?subject=" +
    document.getElementById("subject").value +
    "&body=" +
    document.getElementById("message").value +
    "&cc=" +
    document.getElementById("sender_email").value;
}

// function sendEmail() {
//   var senderName = document.getElementById("sender_name").value;
//   var senderEmail = document.getElementById("sender_email").value;
//   var subject = document.getElementById("subject").value;
//   var message = "test message"; //document.getElementById("message").value;
//   Email.send({
//     Host: "pop3.mailtrap.io",
//     Username: "7684a0b61cea69",
//     Password: "6e453338a7a1f3",
//     To: "gthejawansha2@gmail.com",
//     From: senderEmail,
//     //From: senderName + " < "+senderEmail+" >",
//     Subject: subject,
//     Body: message,
//   }).then((message) => alert(message));
// }

// async function sendEmail() {

//     var senderName = document.getElementById("sender_name").value;
//     var senderEmail = document.getElementById("sender_email").value;
//     var subject = document.getElementById("subject").value;
//     var message = 'test message'//document.getElementById("message").value;

//     // get auth.js

//     // const { google } = require('googleapis');
//     const credentials = require('assets/infosec/credentials.json');

//     const { client_secret, client_id, redirect_uris } = credentials.installed;
//     const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

//     const GMAIL_SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

//     const url = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     prompt: 'consent',
//     scope: GMAIL_SCOPES,
//     });

//     console.log('Authorize this app by visiting this url:', url);

//     // Load the Gmail API client library.
//     // gapi.load('client:auth2', function() {
//     //   gapi.client.init({
//     //     apiKey: 'AIzaSyCCtzYll-6e0nsLrbsR3DTIDsEzyvDfeSs',
//     //     clientId: '927885911599-a8j0kvlam9sdva0crbpii34m5v034gkr.apps.googleusercontent.com',
//     //     discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
//     //     scope: 'https://www.googleapis.com/auth/gmail.send'
//     //   }).then(function() {
//     //     // Check if the user is already signed in.
//     //     gapi.auth2.getAuthInstance().signIn().then(function() {
//     //       // Build the email request.
//     //       var email = 'From: ' + senderName + ' <' + senderEmail + '>\r\n' +
//     //           'To: gthejawansha2@gmail.com\r\n' +
//     //           'Subject: ' + subject + '\r\n\r\n' +
//     //           message;
//     //           console.log(email);
//     //       var request = gapi.client.gmail.users.messages.send({
//     //         'userId': 'me',
//     //         'resource': {
//     //           'raw': btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
//     //         }
//     //       });
//     //       console.log(request);
//     //       // Send the email.
//     //       request.execute(function(response) {
//     //         console.log('Email sent: ' + response.status);
//     //       });
//     //     });
//     //   });
//     // });

//     gapi.auth2.init({
//         apiKey: 'AIzaSyCCtzYll-6e0nsLrbsR3DTIDsEzyvDfeSs',
//         clientId: '927885911599-a8j0kvlam9sdva0crbpii34m5v034gkr.apps.googleusercontent.com',
//         discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
//         scope: 'https://www.googleapis.com/auth/gmail.send'
//       }).then(function() {
//         // Check if the user is already signed in.
//         gapi.auth2.getAuthInstance().signIn().then(function() {
//           // Build the email request.
//           var email = 'From: ' + senderName + ' <' + senderEmail + '>\r\n' +
//               'To: gthejawansha2@gmail.com\r\n' +
//               'Subject: ' + subject + '\r\n\r\n' +
//               message;
//               console.log(email);
//           var request = gapi.client.gmail.users.messages.send({
//             'userId': 'me',
//             'resource': {
//               'raw': btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
//             }
//           });
//           console.log(request);
//           // Send the email.
//           request.execute(function(response) {
//             console.log('Email sent: ' + response.status);
//           });
//         });
//       });
//   }
