var $ = require('jQuery');

$(document).ready(function() {
	var height = $('.container').height(),
		$imgs = $('.hero');

	function resize() {
		$imgs.each(function() {
			var $img = $(this),
				width = $img.width() * (height /$img.height());
			$img.css({
				'height': '100%',
				'width': width + 'px'
			});
		});
	}

	resize();
});