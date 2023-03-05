import * as topicService from "../../services/topicService.js";
import * as questionSerivce from "../../services/questionService.js";
import * as answerOptionService from "../../services/answerOptionService.js";
import * as answerService from "../../services/answerService.js";

const listTopicForQuiz = async({ render }) => {
    const data = {
        topics: await topicService.listTopics(),
    };
    render("quiz.eta", data)
};

const chooseRandomQuestion  = async({ params, response, render }) => {
    const topicId = params.tId;
    const question = await questionSerivce.listRandomQuestionByTopicId(topicId);
    if (question[0]){
        response.redirect(`/quiz/${ topicId }/questions/${question[0].id}`);
    } else {
        const data = {
            topic: await topicService.listTopicById(topicId),
        };
        render("outOfQuestionQuiz.eta", data)
    }
};

const showRandomQuestion = async({ render, params }) => {
    const topicId = params.tId;
    const questionId = params.qId;
    const data = {
        question: await questionSerivce.listQuestionsById(questionId),
        topic: await topicService.listTopicById(topicId),
        options: await answerOptionService.listOptions(questionId),
    };
    render("showQuizQuestion", data);
};

const checkAndAddAnswer = async({ params, user, response }) => {
    const topicId = params.tId;
    const questionId = params.qId;
    const optionId = params.oId;
    await answerService.addAnswer(user.id, questionId, optionId);
    const answerOption = await answerOptionService.listOptionByOptionId(optionId);
    const isAnswerCorrect = answerOption[0].is_correct
    if (isAnswerCorrect){
        response.redirect(`/quiz/${ topicId }/questions/${ questionId }/correct`);
    } else {
        response.redirect(`/quiz/${ topicId }/questions/${ questionId }/incorrect`);
    }
};

const showAnswerForCorrectChoice = async({ params, render }) => {
    const topicId = params.tId;
    const questionId = params.qId;
    const data = {
        topic: await topicService.listTopicById(topicId),
        question: await questionSerivce.listQuestionsById(questionId),
    };
    render("showCorrectAnswer.eta", data);  
};

const showAnswerForIncorrectChoice = async({ params, render }) => {
    const topicId = params.tId;
    const questionId = params.qId;
    const data = {
        topic: await topicService.listTopicById(topicId),
        question: await questionSerivce.listQuestionsById(questionId),
        correctOption: await answerOptionService.listCorrectOptionByQuestionId(questionId),
    };
    render("showIncorrectAnswer.eta", data);
};


export { listTopicForQuiz, chooseRandomQuestion, showRandomQuestion, checkAndAddAnswer, showAnswerForCorrectChoice, showAnswerForIncorrectChoice };