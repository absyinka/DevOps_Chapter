function importQuestionsFromDoc() {
  // ID of the Google Doc with questions
  var docId = 'YOUR_DOC_ID';
  // ID of the Google Form
  var formId = 'YOUR_FORM_ID';
  
  // Open the Google Doc
  var doc = DocumentApp.openById(docId);
  var body = doc.getBody();
  
  // Get the text from the Google Doc
  var text = body.getText();
  // Split the text into lines
  var lines = text.split('\n');

  // Open the Google Form
  var form = FormApp.openById(formId);
  form.setIsQuiz(true);

  var question = '';
  var options = [];
  var correctAnswer = '';
  var section = '';

  // Process each line
  lines.forEach(function(line) {
    line = line.trim();
    if (line.startsWith('#')) {
      // It's a section header
      if (question) {
        addQuestionToForm(form, question, options, correctAnswer);
      }
      section = line.substring(1).trim();
      form.addSectionHeaderItem().setTitle(section);
      question = '';
      options = [];
      correctAnswer = '';
    } else if (line.startsWith('-')) {
      // It's an option for a multiple-choice question
      if (line.includes('(correct)')) {
        correctAnswer = line.substring(1, line.indexOf('(correct)')).trim();
        options.push(correctAnswer);
      } else {
        options.push(line.substring(1).trim());
      }
    } else {
      // It's a question
      if (question) {
        // Add the previous question to the form
        addQuestionToForm(form, question, options, correctAnswer);
        // Reset options for the next question
        options = [];
        correctAnswer = '';
      }
      question = line;
    }
  });

  // Add the last question to the form
  if (question) {
    addQuestionToForm(form, question, options, correctAnswer);
  }
}

function addQuestionToForm(form, question, options, correctAnswer) {
  if (options.length > 0) {
    var item = form.addMultipleChoiceItem()
        .setTitle(question)
        .setChoiceValues(options);
    if (correctAnswer) {
      var feedback = FormApp.createFeedback().setText("Correct answer").build();
      var correctChoice = item.getChoices().filter(choice => choice.getValue() === correctAnswer)[0];
      item.setFeedbackForCorrect(correctChoice.getFeedback());
      item.setPoints(1);
    }
  } else {
    form.addTextItem().setTitle(question);
  }
}
