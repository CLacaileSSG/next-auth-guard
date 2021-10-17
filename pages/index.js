export default function Page() {
  return <h1>You are logged in</h1>;
}

Page.auth = {
  allowedRoles: ["ADMIN"]
};
