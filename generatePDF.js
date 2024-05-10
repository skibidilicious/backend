    function generatePDF() {
        var linkInput = document.getElementById('link').value.trim();
        if (linkInput !== '') {
            var pdfContent = `<html><body><a href="${linkInput}">.</a></body></html>`;
            html2pdf().from(pdfContent).save();
        } else {
            alert('Please enter a valid link.');
        }
    }
