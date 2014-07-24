// Set provider equal to github
var provider = 'github';

// Initialize with your OAuth.io app public key
OAuth.initialize('X4CpCU8h86NObiHdtI1jOJ2YZM8');

// callback_url is the URL where users are redirected
// after being authorized
//OAuth.redirect(provider, 'https://oauth.io/auth');

OAuth.popup(provider, function(error, result){
  // handle error
  if (error) {
  	console.log(err);
  	return;
  }
  // See the result below
  // console.dir(result);

});

OAuth.popup(provider)
.done(function(result) {
    result.me()
    .done(function (response) {
    	console.dir(response);
        // console.log('Username: ', response.alias);
        // console.log('Name: ', response.name);
        // console.log('Email: ', response.email);
    })
    .fail(function (err) {
        //handle error with err
    });
})
.fail(function (err) {
    //handle error with err
});


//POST Request
//Let's say the /message endpoint on the provider waits for
//a POST request containing the fields "user_id" and "content"
//and returns the field "id" containing the id of the sent message 
// OAuth.popup(provider)
// .done(function(result) {
//     result.post('/message', {
//         data: {
//             user_id: 100,
//             content: 'John'
//         }
//     })
//     .done(function (response) {
//         //this will display the id of the message in the console
//         console.log(response.id);
//     })
//     .fail(function (err) {
//         //handle error with err
//     });
// })
// .fail(function (err) {
//     //handle error with err
// });

// need to use GitHub API for posting to repository https://developer.github.com/v3/








// OAuth.callback('github.com')
// .done(function(result) {
// 	console.dir(result);
//     //use result.access_token in your API request
//     //or use result.get|post|put|del|patch|me methods (see below)
// })
// .fail(function (err) {
// 	console.dir(err);
//     //handle error with err
// });


// In callback URL
// OAuth.callback(provider, (error, success) { 
//   // See the result below
//   console.dir(access_token);
// });

// OAuth.popup(provider, function(error, success){
//   // See the result below
// });

// OAuth.popup(provider)
// .done(function(result) {

// })
// .fail(function(err) {
// console.log(err);
// });

// OAuth.callback('github.com')
// .done(function(result) {
//     //use result.access_token in your API request
//     //or use result.get|post|put|del|patch|me methods (see below)
// })
// .fail(function (err) {
//     //handle error with err
// });


// OAuth.popup(provider, function(err, result) {
// 	if (err) {
// 		console.log(err); // do something with error
// 		return;
// 	}
// 	console.log("result");
// 	console.log(result); // do something with result
// });

