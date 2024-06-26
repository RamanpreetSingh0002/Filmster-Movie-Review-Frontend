import React, { useEffect, useState } from "react";
import Submit from "../form/Submit";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../form/FormContainer";
import { useAuth, useNotification } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../utils/helper";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import CustomLink from "../CustomLink";

const validateUserInfo = ({ email, password }) => {
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { updateNotification } = useNotification();
  const { handleLogin, authInfo } = useAuth();
  const { isPending, isLoggedIn } = authInfo;

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);

    handleLogin(userInfo.email, userInfo.password);
  };

  // useEffect(() => {
  //   // we want to move our user to somewhere else
  //   if (isLoggedIn) navigate("/");
  // }, [isLoggedIn]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>Sign In</Title>
          <FormInput
            value={userInfo.email}
            onChange={handleChange}
            label="Email"
            placeholder="filmster@email.com"
            name="email"
          />
          <FormInput
            value={userInfo.password}
            onChange={handleChange}
            label="Password"
            placeholder="********"
            name="password"
            type="password"
          />
          <Submit value="Sign In" busy={isPending} />

          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
            <CustomLink to="/auth/sign-up">Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default SignIn;
