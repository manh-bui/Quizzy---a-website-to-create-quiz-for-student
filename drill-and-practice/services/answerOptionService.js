import { executeQuery } from "../database/database.js";
import { deleteAnswerByAnswerOptionId } from "./answerService.js";
import * as answerService from "./answerService.js";

const deleteAnswerOptionByQuestionId = async(questionId) => {
    const res = await executeQuery(
        "SELECT * FROM question_answer_options WHERE question_id = $questionId;",
        {
            questionId: questionId,
        }
    );

    for (const question_answer_option of res.rows){
        await deleteAnswerByAnswerOptionId(question_answer_option.id);
    }
    
    await executeQuery(
        "DELETE FROM question_answer_options WHERE question_id = $questionId;",
        {
            questionId: questionId,
        }
    );

};

const listOptions = async(questionId) => {
    const res = await executeQuery(
        "SELECT * FROM question_answer_options WHERE question_id = $questionId ORDER BY id ASC;",
        {
            questionId: questionId,
        }
    );

    return res.rows;
};

const addOption = async(questionId, option_text, is_correct ) => {
    await executeQuery(
        "INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($questionId, $option_text, $is_correct);",
        {
            questionId: questionId,
            option_text: option_text,
            is_correct: is_correct,
        }
    );
};

const deleteAnswerOption = async(AnswerOptionId) => {
    await answerService.deleteAnswerByAnswerOptionId(AnswerOptionId);
    await executeQuery(
        "DELETE FROM question_answer_options WHERE id = $optionId;",
        {
            optionId: AnswerOptionId,
        }
    );
};

const listOptionByOptionId = async(id) => {
    const res = await executeQuery(
        "SELECT * FROM question_answer_options WHERE id = $id;",
        {
            id: id,
        }
    );

    return res.rows;
};

const listCorrectOptionByQuestionId = async(questionId) => {
    const res = await executeQuery(
        "SELECT * FROM question_answer_options WHERE question_id = $questionId AND is_correct = true;",
        {
            questionId: questionId,
        }
    );

    return res.rows;
};

const listOptionByQuestionIdForApi = async(questionId) => {
    const res = await executeQuery(
        "SELECT question_answer_options.id as optionId, question_answer_options.option_text as optionText FROM question_answer_options WHERE question_id = $questionId ORDER BY id ;",
        {
            questionId: questionId
        }
    );

    return res.rows;
};

export{ deleteAnswerOptionByQuestionId, listOptions, addOption, deleteAnswerOption, listOptionByOptionId, listCorrectOptionByQuestionId, listOptionByQuestionIdForApi };