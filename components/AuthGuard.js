import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const hasAccess = (role, allowedRoles) => allowedRoles.includes(role);

const AuthGuard = ({ children, allowedRoles }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isUser = !!session?.user;

  useEffect(() => {
    if (status !== "loading") {
      if (!isUser) {
        router.push("/auth/login");
      } else if (!hasAccess(session?.user?.role, allowedRoles)) {
        router.push("403");
      }
    } else {
      return <h1>Loading...</h1>;
    }
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <h1>Loading...</h1>;
};

export default AuthGuard;
