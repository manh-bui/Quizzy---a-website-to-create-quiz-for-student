import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
    name: [ validasaur.required, validasaur.minLength(1)],
};

const getTopicData = async(request) =>{
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        name: params.get("name"),
    };
};


const addTopic = async({ response, request, render, user }) => {
    if (user.admin){
        const topicData = await getTopicData(request);

        const [passes, errors] = await validasaur.validate( topicData, topicValidationRules);
    
        if (!passes) {
            topicData.validationErrors = errors;
            topicData.nameValue = topicData.name;
            topicData.topics = await topicService.listTopics();
            topicData.admin = user.admin;
            render("topics.eta", topicData);
        } else {
            await topicService.addTopic(topicData.name, user.id);
            response.redirect("/topics");
        }

    } else {
        response.redirect("/topics");
    }
};

const viewTopics = async({ render, user }) => {
    render("topics.eta",{
        nameValue: "",
        topics: await topicService.listTopics(),
        admin: user.admin,
    });
};

const deleteTopic = async({ params, response, user }) => {
    if (user.admin){
        const topicId = params.id;
        await topicService.deleteTopic(topicId);
        response.redirect("/topics");
    } else {
        response.redirect("/topics");
    }
};

export{ addTopic, viewTopics, deleteTopic };