import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
    question_text: [validasaur.required, validasaur.minLength(1)],
};

const getQuestionData = async( request, topicId ) =>{
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        topicId: topicId,
        question_text: params.get("question_text"),
    };
};

const addQuestion = async({ request, render, response, params, user }) => {
    const questionData = await getQuestionData(request, params.id);

    const [passes, errors] = await validasaur.validate( questionData, questionValidationRules);
    
    if (!passes){
        questionData.validationErrors = errors;
        questionData.questionTextValue = questionData.question_text;
        questionData.questions = await questionService.listQuestions(params.id);
        render("questions.eta", questionData);
    } else {
        await questionService.addQuestions(user.id, params.id, questionData.question_text);
        response.redirect(`/topics/${params.id}`);
    }
};

const viewQuestions = async({ render, params }) => {
    const topicId = params.id;
    render("questions.eta",
    {
        questionTextValue: "",
        topicId: topicId,
        questions: await questionService.listQuestions(topicId),
    });
};

const deleteQuestion = async({ params, response, user }) => {
    if (user){
        const questionId = params.qId;
        await questionService.deleteQuestion(questionId);
        response.redirect(`/topics/${params.tId}`);
    }
};

export { viewQuestions, addQuestion, deleteQuestion };