import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../../utilities/firebase/firebase.utilities";

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const userDocReference = await createUserDocumentFromAuth(response.user);
    console.log(userDocReference);
  };

  return (
    <div>
      <h2>SIGN IN PAGE</h2>
      <button onClick={logGoogleUser}>sign in with google</button>
    </div>
  )
};

export default SignIn;
