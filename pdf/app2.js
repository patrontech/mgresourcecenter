const options = {
  margin: .25,
  filename: 'codepen-test.pdf',
  image: { 
    type: 'jpeg', 
    quality: 0.98 
  },
  html2canvas: { 
    scale: 2 
  },
  jsPDF: { 
    unit: 'in', 
    format: 'letter', 
    orientation: 'portrait' 
  }
}


$('.btn-download').click(function(e){
  e.preventDefault();
  $('#qrcode').toggle();

  const element = document.getElementById('content');
  html2pdf().from(element).set(options).save();
});