import { executeQuery } from "../database/database.js";
import { deleteQuestionByTopicId } from "./questionService.js";

const addTopic = async(name, userId) => {
    await executeQuery(
        "INSERT INTO topics(user_id, name) VALUES ($userId, $name);",
        {
            userId: userId,
            name: name,
        }
    );
};

const listTopics = async() => {
    const res = await executeQuery(
        "SELECT * FROM topics ORDER BY name ASC;"
    );

    return res.rows;
};

const deleteTopic = async(topicId) => {
    await deleteQuestionByTopicId(topicId);
    await executeQuery(
        "DELETE FROM topics WHERE id = $topicId;",
        {
            topicId: topicId,
        }
    );
};

const listTopicById = async(id) => {
    const res = await executeQuery(
        "SELECT * FROM topics WHERE id = $id;",
        {
            id: id,
        }
    );

    return res.rows
};

const countTopic = async() => {
    const res = await executeQuery(
        "SELECT COUNT(id) AS count FROM topics;"
    );

    return res.rows[0].count;
};

export { addTopic, listTopics, deleteTopic, listTopicById, countTopic };