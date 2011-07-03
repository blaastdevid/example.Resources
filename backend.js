var http    = require('blaast/simple-http');

/* You'll see a message about this interface being obsolete. The new interface
 * will work exactly the same way. */
var scaling = new (require('blaast/scaling').Scaling)();

/*
 * The following resource handler will deal with resource requests coming from
 * the application.
 */
app.setResourceHandler(function(request, response) {
	/* We handle two different resources here, A and B. Applications can use
	 * any resource id. */

	app.debug('Client requested resource-id=' + request.id);

	/* Helper function that sends the image data to the client, see below how
	 * we use it. */
	function sendReply(response, error, imageType, data) {
		if (error) {
			app.warn('Failed to load image: ' + error);

			/* Notify the client the image request failed. */
			response.failed();
		} else {
			app.debug('Loaded image.');

			/* Send the image data back to the client. */
			response.reply(imageType, data);
		}
	}

	if (request.id === 'B') {
		/* More interesting than just fetching the image, is to adapt it to the
		 * mobile device we are targetting. We're actually using the device's
		 * screen size here. This shows why doing image fetching through the
		 * backend is an efficient way of fetching external resources.*/

		scaling.scale('http://www.google.com/images/logos/ps_logo2.png',
					request.display_width, request.display_height, 'image/jpeg',
			function(err, data) {
				sendReply(response, err, 'image/jpeg', data);
			});

	} else if (request.id === 'A') {
		/* You are not limited though, and can fetch raw resources from the
		 * Internet. */

		http.get('http://blaast.com/logo.png', { type: 'binary' }, {
			ok: function(data) {
				sendReply(response, null, 'image/png', data);
			},

			error: function(err) {
				sendReply(response, err);
			}
		});
	} else {
		response.notFound();
	}
});
