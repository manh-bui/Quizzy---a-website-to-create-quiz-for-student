import { assertEquals } from "../deps.js";
import { superoak } from "../deps.js";
import { app } from "../app.js";
import * as topicController from "../routes/controllers/topicController.js";
import * as topicService from "../services/topicService.js";
import * as questionService from "../services/questionService.js";

Deno.test({
  name:
    "GET random question as JSON file when send GET to /apis/questions/random",
  async fn() {
    const testClient1 = await superoak(app);
    await testClient1.get("/api/questions/random")
      .expect(200)
      .expect("Content-Type", new RegExp("application/json"));
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "View topics use `topics.eta` as view template",
  async fn() {
    let usedViewTemplate = null;
    let usedData = null;

    const myRenderFunction = (viewTemplate, data) => {
      usedViewTemplate = viewTemplate;
      usedData = data;
    };

    const myContext = {
      render: myRenderFunction,
      user: {
        admin: true,
      },
    };
    await topicController.viewTopics(myContext);
    assertEquals(usedViewTemplate, "topics.eta");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Add topic work as expected",
  async fn() {
    const msg = `${Math.floor(Math.random() * 1000000)}`;
    let Topics = await topicService.listTopics();
    const numberOfTopic = Topics.length;
    await topicService.addTopic(msg, "1");
    Topics = await topicService.listTopics();
    const numberOfTopicAfterAdd = Topics.length;
    assertEquals(numberOfTopic, numberOfTopicAfterAdd - 1);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "list topic by id work as expected",
  async fn() {
    const res = await topicService.listTopicById("1");
    assertEquals(res[0].name, "Finnish language");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Delete topic work as expected",
  async fn() {
    let Topics = await topicService.listTopics();
    const numberOfTopic = Topics.length;
    await topicService.deleteTopic("2");
    Topics = await topicService.listTopics();
    const numberOfTopicAfterDelete = Topics.length;
    assertEquals(numberOfTopic, numberOfTopicAfterDelete + 1);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "add question and list question work as expected",
  async fn() {
    const msg = `${Math.floor(Math.random() * 1000000)}`;
    await questionService.addQuestions("1", "1", msg);
    const question = await questionService.listQuestionsById("1");
    assertEquals(question[0].question_text, msg);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "delete work as expected",
  async fn() {
    const numberOfQuestion = await questionService.countQuestion();
    await questionService.deleteQuestion("1");
    const numberOfQuestionAfterDelete = await questionService.countQuestion();
    assertEquals(
      Number(numberOfQuestion),
      Number(numberOfQuestionAfterDelete) + 1,
    );
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
