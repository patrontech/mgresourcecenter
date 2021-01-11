var doc = new jsPDF()
var contract = document.querySelector('#contract')
doc.fromHTML(contract, 15, 15)
doc.save("output.pdf")

