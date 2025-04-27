import dynamic from "next/dynamic";

const Login = dynamic(() => import("@/containers/login/login"), { ssr: false });

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
