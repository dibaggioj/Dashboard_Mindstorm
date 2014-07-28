$('#signIn').click(function() {
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

    var parent = document.getElementById( "navbarLinks" );
    var child = document.getElementById( "signIn" );
    parent.removeChild( child ); // remove sign in link
    var para = document.createElement( "li" ); // create list element
    var node = document.createTextNode( response.name );
    para.setAttribute( "class", "dropdown" );
    para.setAttribute( "id", "userDropdown" );
    para.appendChild( node );
    parent.appendChild( para );

});

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
    	var parent = document.getElementById( "navbarLinks" );
	    var child = document.getElementById( "signIn" );
	    parent.removeChild( child ); // remove sign in link
	    var para = document.createElement( "li" ); // create list element
	    para.setAttribute( "class", "dropdown" );

	    var para2 = document.createElement( "a" );
	    para2.setAttribute( "class", "dropdown-toggle" );
	    para2.setAttribute( "data-toggle", "dropdown" );
	    para2.setAttribute( "id", "userDropdown" );
	    para2.setAttribute( "title", "User sign-in and sign-out" );
	    var node = document.createTextNode( response.name + " " );
	    para2.appendChild( node );

	    var para0 = document.createElement( "span" );
	    para0.setAttribute("class", "caret");
	    para2.appendChild( para0 );

	    var para3 = document.createElement( "ul" );
	    para3.setAttribute( "class", "dropdown-menu" );
	    para3.setAttribute( "id", "userDropdownList" );

	    var para4 = document.createElement( "li" );

	   	var para5 = document.createElement( "a" );
	   	para5.setAttribute( "id", "userSignOut" );
	   	var node5 = document.createTextNode( "Sign out" );
	    para5.appendChild(node5);
	    
	    para4.appendChild(para5);

	    var para6 = document.createElement( "li" );

	    var para7 = document.createElement( "a" );
	    para7.setAttribute( "id", "userGithub" );
	    para7.setAttribute( "title", "Visit my GitHub profile" );
	    var githubUserUrl = "https://github.com/" + response.alias;
	    para7.setAttribute( "href", githubUserUrl );
	    para7.setAttribute( "target", "_blank" );
	    var node7 = document.createTextNode( "My GitHub Profile" );
	    para7.appendChild(node7);
	    para6.appendChild(para7);
	    para4.insertBefore(para6,para5);

	   	para3.appendChild(para4);

	   	para.appendChild( para3 );

	    para.appendChild( para2 );
	    var directions = document.getElementById( "directions" );
	    parent.insertBefore(para,directions);
	    //parent.appendChild( para );
	    })

	   //    	<li class="dropdown">
				// <a class="dropdown-toggle" id="botSelector" data-toggle="dropdown" title="Control a Currently Connected Gigabot">Select Gigabot <span class="caret"></span></a>
				// <ul class="dropdown-menu" id="botSelectorList">
	   //          <li class="divider" id="dropdownDivider"></li>
	   //          <li><a id="addBot">Add a New Bot</a></li>
		  //       </ul>
	   //    	</li>


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

