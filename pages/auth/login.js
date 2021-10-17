import { getCsrfToken, signIn } from "next-auth/react";

const Login = ({ csrfToken }) => {
  const onSubmitHandler = async ({ email, password }) => {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: `${window.location.origin}/`
    });
  };
  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />{" "}
      <label>
        Username
        <input name="username" type="text" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button type="submit">Sign in</button>
    </form>
  );
};

export default Login;

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  };
}
