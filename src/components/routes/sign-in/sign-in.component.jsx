import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../../utilities/firebase/firebase.utilities";
import Button from "../../form-input/button/button.component";

import SignUpForm from "../../sign-up-form/sign-up-form.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const userDocReference = await createUserDocumentFromAuth(response.user);
    console.log(userDocReference);
  };

  return (
    <div>
      <h2>SIGN IN PAGE</h2>
      <Button onClick={logGoogleUser}>sign in with google</Button>
      <SignUpForm />
    </div>
  )
};

export default SignIn;
