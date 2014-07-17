OAuth.initialize('50d5b8dcdbb4d01a21e2');

// OAuth.popup('github')
// .done(function(result) {
// console.log(result.access_token);
// })
// .fail(function(err) {
// console.log(err);
// });

// OAuth.redirect('github', "callback/url");
// OAuth.redirect('github', "http://localhost.dev/Dashboard_Gigabots_dibaggioj/callback");

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