import { CognitoUserPool } from "amazon-cognito-identity-js";

const userPool = {
	UserPoolId: "eu-west-3_FnAsl6N0j",
	ClientId: "71bildurmdkcl9vrrj3g2akci0"
};

export default new CognitoUserPool(userPool) 