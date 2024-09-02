function importQuestionsFromDoc2() {
  // ID of the Google Doc with questions
  var docId = 'DOC_ID'
  // ID of the Google Form
  var formId = 'FORM_ID'

  // Open the Google Doc
  var doc = DocumentApp.openById(docId)
  var body = doc.getBody()

  // Get the text from the Google Doc
  var text = body.getText()
  // Split the text into lines
  var lines = text.split('\n')

  // Open the Google Form
  var form = FormApp.openById(formId)

  var question = ''
  var options = []
  var section = ''

  // Process each line
  lines.forEach(function (line) {
    line = line.trim()
    if (line.startsWith('#')) {
      // It's a section header
      section = line.substring(1).trim()
      form.addPageBreakItem().setTitle(section)
    } else if (line.startsWith('-')) {
      // It's an option for a multiple-choice question
      options.push(line.substring(1).trim())
    } else {
      // It's a question
      if (question) {
        // Add the previous question to the form
        if (options.length > 0) {
          form
            .addMultipleChoiceItem()
            .setTitle(question)
            .setChoiceValues(options)
        } else {
          form.addTextItem().setTitle(question)
        }
        // Reset options for the next question
        options = []
      }
      question = line
    }
  })

  // Add the last question to the form
  if (question) {
    if (options.length > 0) {
      form.addMultipleChoiceItem().setTitle(question).setChoiceValues(options)
    } else {
      form.addTextItem().setTitle(question)
    }
  }
}
