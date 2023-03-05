import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as answerOptionController from "./controllers/answerOptionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as answerController from "./controllers/answerController.js";
import * as questionsApi from "./apis/questionsApi.js";



const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicController.viewTopics);
router.post("/topics", topicController.addTopic);
router.post("/topics/:id/delete", topicController.deleteTopic);

router.get("/topics/:id", questionController.viewQuestions);
router.post("/topics/:id/questions", questionController.addQuestion);
router.post("/topics/:tId/questions/:qId/delete", questionController.deleteQuestion);

router.get("/topics/:id/questions/:qId", answerOptionController.viewAnswerOptions);
router.post("/topics/:id/questions/:qId/options", answerOptionController.addAnswerOption);
router.post("/topics/:tId/questions/:qId/options/:oId/delete", answerOptionController.deleteAnswerOption);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/quiz", answerController.listTopicForQuiz);
router.get("/quiz/:tId", answerController.chooseRandomQuestion);
router.get("/quiz/:tId/questions/:qId", answerController.showRandomQuestion);

router.post("/quiz/:tId/questions/:qId/options/:oId", answerController.checkAndAddAnswer);
router.get("/quiz/:tId/questions/:qId/correct", answerController.showAnswerForCorrectChoice);
router.get("/quiz/:tId/questions/:qId/incorrect", answerController.showAnswerForIncorrectChoice);

router.get("/api/questions/random", questionsApi.sendRandomQuestion);
router.post("/api/questions/answer", questionsApi.receiveAndCheckAnswer);



export { router };
