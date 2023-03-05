import * as questionService from "../../services/questionService.js";
import * as answerOptionService from "../../services/answerOptionService.js";

const sendRandomQuestion = async ({ response }) => {
  const question = await questionService.listRandomQuestion();
  if (question) {
    const answerOptions = await answerOptionService
      .listOptionByQuestionIdForApi(question.id);
    answerOptions.forEach((object) => {
      object.optionId = object.optionid;
      object.optionText = object.optiontext;
      delete object.optionid;
      delete object.optiontext;
    });

    const data = {
      questionId: question.id,
      questionText: question.question_text,
      answerOptions: answerOptions,
    };
    console.log(data);
    response.body = data;
  } else {
    response.body = {};
  }
};

const receiveAndCheckAnswer = async ({ response, request }) => {
  const body = request.body({ type: "json" });
  const params = await body.value;
  const optionId = params.optionId;
  const option = await answerOptionService.listOptionByOptionId(optionId);
  if (option[0]) {
    const data = {
      correct: option[0].is_correct,
    };
    console.log(data);
    response.body = data;
  } else {
    const data = {
      error: "there is no such option",
    };
    console.log(data);
    response.body = data;
  }
};

export { receiveAndCheckAnswer, sendRandomQuestion };
