function importQuestionsFromDoc() {
  // ID of the Google Doc with questions
  var docId = '1eWO3fyxye4AYjSE6CoLlygclzHoSyf4USPICQkDShUA';
  // ID of the Google Form
  var formId = '1941cFzy8fggLo98BDOdmoGZe6dTaVfuzCk2GTnrWtn0';
  
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
      form.addPageBreakItem().setTitle(section);
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
    // Create the multiple choice item
    var item = form.addMultipleChoiceItem().setTitle(question);

    // Create choice objects, marking the correct answer
    var choices = options.map(function(option) {
      return option === correctAnswer ? item.createChoice(option, true) : item.createChoice(option, false);
    });

    // Set the choices to the item
    item.setChoices(choices);
    
    // Set points for the question if there's a correct answer
    if (correctAnswer) {
      var feedback = FormApp.createFeedback().setText("Correct answer").build();
      item.setFeedbackForCorrect(feedback);
      item.setPoints(1);
    }
  } else {
    form.addTextItem().setTitle(question);
  }
}
