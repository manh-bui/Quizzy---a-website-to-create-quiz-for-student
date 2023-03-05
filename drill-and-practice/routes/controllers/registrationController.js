import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const registrationValidationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)],
};

const getRegistrationData = async(request) => {
    const body = request.body({ type:"form" });
    const params = await body.value;
    const data = {
        email: params.get("email"),
        password: params.get("password"),
    };
    return data;
};

const registerUser = async ({ request, response, render }) => {
  const registrationData = await getRegistrationData(request);
  const userFromDatabase = await userService.findUserByEmail(registrationData.email);

  const [passes, errors] = await validasaur.validate( registrationData, registrationValidationRules);

  if (!passes){
    registrationData.emailValue = registrationData.email;
    registrationData.validationErrors = errors;
    render("registration.eta", registrationData);
  } else if (userFromDatabase[0]){
    registrationData.emailValue = registrationData.email;
    registrationData.registrationErrors = "This email has existed";
    render("registration.eta", registrationData);
  } else {
    await userService.addUser( registrationData.email, await bcrypt.hash( registrationData.password ) );
    
    response.redirect("/auth/login");
  }
};

const showRegistrationForm = ({ render }) => {
  const data = {
    emailValue: "",
  };
  render("registration.eta", data);
};

export { registerUser, showRegistrationForm };