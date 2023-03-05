import { executeQuery } from "../database/database.js";
import { deleteAnswerOptionByQuestionId } from "./answerOptionService.js";

const deleteQuestionByTopicId = async(topicId) => {
    const res = await executeQuery(
        "SELECT * FROM questions WHERE topic_id = $topicId;",
        {
            topicId: topicId
        }
    );

    for (const question of res.rows){
        await deleteAnswerOptionByQuestionId(question.id);
    }
    
    await executeQuery(
        "DELETE FROM questions WHERE topic_id = $topicId;",
        {
            topicId: topicId
        }
    );
};

const listQuestions = async(topicId) => {
    const res = await executeQuery(
        "SELECT * FROM questions WHERE topic_id = $topicId;",
        {
            topicId: topicId,
        }
    );
    return res.rows
};

const addQuestions = async(userId, topicId, questionText) => {
    await executeQuery(
        "INSERT INTO questions (user_id, topic_id, question_text) VALUES ($userId, $topicId, $questionText);",
        {
            userId: userId,
            topicId: topicId,
            questionText: questionText,
        }
    );
};

const listQuestionsById = async(id) => {
    const res = await executeQuery(
        "SELECT * FROM questions WHERE id = $id;",
        {
            id: id,
        }
    );

    return res.rows;
};

const listRandomQuestionByTopicId = async(topicId) => {
    const res = await executeQuery(
        "SELECT * FROM questions WHERE topic_id = $topicId ORDER BY RANDOM() LIMIT 1 ;",
        {
            topicId: topicId,
        }
    );

    return res.rows;
};

const deleteQuestion = async(id) => {
    await executeQuery(
        "DELETE FROM questions WHERE id = $id;",
        {
            id: id,
        }
    );
};

const countQuestion = async() => {
    const res = await executeQuery(
        "SELECT COUNT(*) as count FROM questions;",
        
    );

    return res.rows[0].count;
};

const listRandomQuestion = async() => {
    const res = await executeQuery(
        "SELECT * FROM questions ORDER BY RANDOM() LIMIT 1;",

    );
    return res.rows[0];
};

export{ deleteQuestionByTopicId, listQuestions, addQuestions, listQuestionsById, listRandomQuestionByTopicId, deleteQuestion, countQuestion, listRandomQuestion };