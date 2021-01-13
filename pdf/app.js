jQuery(document).ready(function ($) {

	var form = $('#form-customize')
		contract = $('#contract');

// 	// form.on('submit', function (e) {
// 	// 	e.preventDefault();

// 	// 	// Copy the required stuff (style and encoding)
// 	// 	$('.inc_pdf').clone().addClass('temporary').prependTo('#contract');

// 	// 	// Get the outerHTML
		var html = contract.prop('outerHTML');

// 	// 	/**
// 	// 	 * Save to PDF
// 	// 	 * https://github.com/MrRio/jsPDF
// 	// 	 * http://stackoverflow.com/a/24825130
// 	// 	 */
// 	// 	var doc = new jsPDF();
// 	// 	doc.fromHTML(
// 	// 		html,
// 	// 		15,
// 	// 		15, {
// 	// 			'width': 180		});

// 	// 	// Remove the files we appended earlier on (to restore the screen style)
// 	// 	contract.find('.temporary').remove();

// 	// 	// Open PDF in new window
// 	// 	// doc.output('dataurlnewwindow');
// 	// 	doc.save('my.pdf');
// 	// });


// });

// var doc = new jsPDF();

// 	var elements = {
//     	'#editor': function (element, renderer) {
//         	return true;
//     	}
// 	};

// 	$('#cmd').click(function (e) { 
//  e.preventDefault();

//     	doc.fromHTML($('#contract').html(), 15, 15, {
//         	'width': 170,
//             'elementHandlers': elements
//     	});
//     	doc.save('demo.pdf');
// 	});

$("#cmd").click(function(e) {
		 e.preventDefault();

	
        html2canvas(document.getElementById("content"), {
            onrendered: function(canvas) {

                var imgData = canvas.toDataURL('image/png');
                console.log('Report Image URL: '+imgData);
                var doc = new jsPDF('p', 'mm', 'letter'); 
                
				doc.addImage(imgData, 'PNG', 5, 5
				);
                doc.save('sample.pdf');
            }
        });

	});



	/*
	Editing the form
	 */
	form.on('focus keyup change', '.form-control', function (event) {
		event.preventDefault();
		var inputName = $(this).attr('name');
		var inputVal = $(this).val();
		if (inputVal.length) {
			contract.find('.' + inputName).addClass('item-editing').text(inputVal);
		} else {
			contract.find('.' + inputName).addClass('item-editing');
		}
	});

	/*
	Toggle sidebar visibility
	 */
	$('.cmn-toggle-switch').on('click', function (event) {
		event.preventDefault();
		$(this).toggleClass('active');
		$('#wrapper').toggleClass('toggled');
	});

	


	/*
	Media Queries
	 */
	if (matchMedia) {
		var mq = window.matchMedia('(min-width: 768px) and (max-width: 1200px)');
		mq.addListener(WidthChange);
		WidthChange(mq);
	}

	function WidthChange(mq) {
		if (mq.matches) {
			$('textarea[name="payment"]').attr('rows', 1);
		} else {
			$('textarea[name="payment"]').attr('rows', 2);
		}
	}



var qrcode = new QRCode(document.getElementById("qrcode"), {
	text: '',
	width: 150,
	height: 150,
	colorDark : "#000000",
	colorLight : "#ffffff",
	correctLevel : QRCode.CorrectLevel.H
});
	function makeCode () {		
		var elText = document.getElementById("email");
		var elPass = document.getElementById("password");

	if (!elText.value) {
	elText.focus();
	return;
	}

	qrcode.makeCode("CRED|" + elText.value + "|" + elPass.value);
	}

	makeCode();

	$(".input").
		on("blur", function () {
			makeCode();
			$("#qrcode").show();

		});
	
	on("keydown", function (e) {
		if (e.keyCode == 13) {
		makeCode();
		}
	});
	
	$(".cmd").click(makeCode);

});


