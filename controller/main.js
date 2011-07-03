//
// example.Resources -- a simple example of loading an external resource.
//

exports[':load'] = function() {
	var self = this;

	/* We have a small timeout here to make sure the backend starts before we
	 * request any data. This will be fixed in Rocket soon. */
	setTimeout(function() {
		self.get('image1').resource('A');
		self.get('image2').resource('B');
	}, 500);
};
