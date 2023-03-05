import * as answerOptionService from "../../services/answerOptionService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const answerOptionValidationRules = {
    option_text: [validasaur.required, validasaur.minLength(1)],
};

const getAnswerOptionData = async( request, topicId, questionId ) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    const data = {
        topicId: topicId,
        questionId: questionId,
        option_text: params.get("option_text"),
        is_correct: params.get("is_correct"),
    };

    if(!data.is_correct){
        data.is_correct = false;
    }
    
    return data;
};

const addAnswerOption  = async({ render, response, request, params }) => {
    const answerOptionData = await getAnswerOptionData(request, params.id, params.qId);
    const [passes, errors] = await validasaur.validate( answerOptionData, answerOptionValidationRules );
    const question = await questionService.listQuestionsById(params.qId);

    if (!passes){
        console.log(errors);
        answerOptionData.validationErrors = errors;
        answerOptionData.optionTextValue = answerOptionData.option_text;
        answerOptionData.questionText = question[0].question_text;
        answerOptionData.options = await answerOptionService.listOptions(params.qId);
        render("answerOption.eta", answerOptionData);
    } else {
        answerOptionService.addOption(params.qId, answerOptionData.option_text, answerOptionData.is_correct);
        response.redirect(`/topics/${params.id}/questions/${params.qId}`)
    }
};



const viewAnswerOptions = async({ params, render }) => {
    const topicId = params.id;
    const questionId = params.qId;
    const question = await questionService.listQuestionsById(questionId);
    const data = {
        topicId: topicId,
        questionId: questionId,
        questionText: question[0].question_text,
        optionTextValue: "",
        options: await answerOptionService.listOptions(questionId),
    };
    render("answerOption.eta", data)
};

const deleteAnswerOption = async({params, response}) => {
    const answerOptionId = params.oId;
    await answerOptionService.deleteAnswerOption(answerOptionId);
    response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
};


export { viewAnswerOptions, addAnswerOption, deleteAnswerOption };
