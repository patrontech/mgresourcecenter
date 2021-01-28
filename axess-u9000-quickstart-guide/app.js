jQuery(document).ready(function($) {
    var form = $('#form-customize')
    contract = $('#contract');

const options = {
  margin: .25,
  filename: 'axess-quick-start.pdf',
  image: { 
    type: 'jpeg', 
    quality: 0.98 
  },
  html2canvas: { 
    scale: 1
  },
  jsPDF: { 
    unit: 'in', 
    format: 'letter', 
    orientation: 'portrait' 
  }
}
    $("#cmd").click(function(e) {
        e.preventDefault();
        const element = document.getElementById('content');
        html2pdf().from(element).set(options).save();

   
	});
	
      function test() {
        // Get the element.
        var element = document.getElementById('page1');

        // Choose pagebreak options based on mode.
        var mode = document.getElementById('mode').value;
        var pagebreak = (mode === 'specify') ?
            { mode: '', before: '.before', after: '.after', avoid: '.avoid' } :
            { mode: specify };

        // Generate the PDF.
        html2pdf().from(element).set({
          filename: mode + '.pdf',
          pagebreak: pagebreak,
          jsPDF: {orientation: 'portrait', unit: 'in', format: 'letter', compressPDF: true}
        }).save();
	  }
	
	
	
    /*
    Editing the form
     */
    form.on('focus keyup change', '.form-control', function(event) {
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
    $('.cmn-toggle-switch').on('click', function(event) {
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
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    function makeCode() {
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
    keyup("blur", function() {
        makeCode();
        $("#qrcode").show();

    });



    $(".cmd").click(makeCode);

});

// update to this sam!!!
// codepen.io/davidshimjs/pen/NdBYrg

// $("#text").
// 	on("blur", function () {
// 		makeCode();
// 	}).
// 	on("keydown", function (e) {
// 		if (e.keyCode == 13) {
// 			makeCode();
// 		}
// 	});

// 	// form.on('submit', function (e) {
// 	// 	e.preventDefault();

// 	// 	// Copy the required stuff (style and encoding)
// 	// 	$('.inc_pdf').clone().addClass('temporary').prependTo('#contract');

// 	// 	// Get the outerHTML

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
