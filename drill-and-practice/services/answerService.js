import { executeQuery } from "../database/database.js";

const deleteAnswerByAnswerOptionId = async(answerOptionId) => {
    await executeQuery(
        "DELETE FROM question_answers WHERE question_answer_option_id = $answerOptionId",
        {
            answerOptionId: answerOptionId,
        }
    );
};

const addAnswer = async(userId, questionId, answerOptionId) => {
    await executeQuery(
        "INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES ($userId, $questionId, $answerOptionId);",
        {
            userId,
            questionId: questionId,
            answerOptionId: answerOptionId,
        }
    );
};

const countAnswer = async() => {
    const res = await executeQuery(
        "SELECT COUNT(*) as count FROM question_answers;"
    );

    return res.rows[0].count;
};

export{ deleteAnswerByAnswerOptionId, addAnswer, countAnswer }