import '@/styles/signIn/index.scss';

export default function SignInPage() {
  return (
    <div className="sign-mainContainer">
      <article className="sign-contentContainer">
        <p className="signIn-letter">SIGN IN</p>
        <input
          name="id"
          type="text"
          id="id"
          placeholder="YOUR ID"
          minLength={2}
          maxLength={100}
        />
        <input
          name="id"
          type="text"
          id="id"
          className="pw"
          placeholder="YOUR PASSWORD"
          minLength={2}
          maxLength={100}
        />
      </article>
    </div>
  );
}
