import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";


const showMain = async({ render }) => {
  const data = {
    NumberOfTopic: await topicService.countTopic(),
    NumberOfQuestion: await questionService.countQuestion(),
    NumberOfAnswer: await answerService.countAnswer(),
  };
  render("main.eta", data);
};

export { showMain };
