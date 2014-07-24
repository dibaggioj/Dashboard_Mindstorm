// Initialize with your OAuth.io app public key
OAuth.initialize('X4CpCU8h86NObiHdtI1jOJ2YZM8');

// callback_url is the URL where users are redirected
// after being authorized
//OAuth.redirect('github', 'https://oauth.io/auth');

OAuth.popup('github', function(error, success){
  // See the result below
  console.log(success);
});

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
// OAuth.callback('github', (error, success) { 
//   // See the result below
//   console.dir(access_token);
// });

// OAuth.popup('github', function(error, success){
//   // See the result below
// });

// OAuth.popup('github')
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


// OAuth.popup('github', function(err, result) {
// 	if (err) {
// 		console.log(err); // do something with error
// 		return;
// 	}
// 	console.log("result");
// 	console.log(result); // do something with result
// });


var provider = 'github';