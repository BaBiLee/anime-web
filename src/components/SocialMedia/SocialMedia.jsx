
import {signInWithGoogle} from "../../firebase.js";

export const SocialMedia = () => {
  return (
    <div className="social-media">
      <button onClick={signInWithGoogle}> Sign in with Google </button>
      <h1>{localStorage.getItem("name")} </h1>
      {/* <h1>{localStorage.getItem("email")}</h1> */}
      <img src={localStorage.getItem("image")}/>
    </div>
  );
};
