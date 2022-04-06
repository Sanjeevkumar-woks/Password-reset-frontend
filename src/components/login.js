import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import * as YUP from "yup";
import { context } from "../App";

// schema
const schema = YUP.object().shape({
  email: YUP.string().required("Please enter your email id"),
  password: YUP.string()
    .min(5, "password should be more than 4 characters")
    .required("please enter your password"),
});

export default function Login() {
  const history = useHistory();
  const [log, setLog] = useContext(context);
  console.log(log);
  const [dummy, setDummy] = useState(false);
  const [loader, setLoader] = useState(false);
  const[show,setShow]=useState(true);
  
  const loginAccount = async (values) => {
    try {
      const response = await axios.post(
        "https://password---reset.herokuapp.com/users/login",
        {
          email: values.email,
          password: values.password,
        }
      );
      if (response.status === 200) {
        window.localStorage.setItem("auth-token", response.data.token);
      }
      return true;
      //   setInfo("User Login Successfully");
    } catch (err) {
      setDummy(true);
      setLoader(false)
      //   return false;
    }
  };
const showpassword=()=>{ setShow(!show);}
  return (
    <div className="d-flex justify-content-center mt-5">
      <Card>
        <Card.Header className="text-center">
          <h4>Login</h4>
        </Card.Header>
        <Card.Body>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={schema}
            onSubmit={async (values) => {
              setLoader(true);
              let reset = await loginAccount(values);
              //   if reset is true
              if (reset) {
                setLog(true);
                history.push("/protected");
              }
            }}
          >
            {() => {
              return (
                <Form className="mb-3">
                  {/* email */}

                  <div className="mb-3">
                    <label>Email</label>
                    <Field
                      className="form-control"
                      type="text"
                      name="email"
                      component="input"
                    />
                    <div>
                      <ErrorMessage name="email" />
                    </div>
                  </div>

                  {/* password */}
                  <div>
                    <label>Password</label>
                    <Field
                      className="form-control"
                      type={show?"password":"text"}
                      name="password"
                      component="input"
                    />
                    <br/>
                    <input type="checkbox" onClick={showpassword}/> <label><small>Show Password</small></label>  
                    <div>
                      <ErrorMessage name="password" />
                    </div>
                  </div>
                  <div className="mt-3 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">
                    {loader ? <div className='loader' ></div> : "LOG IN"}
                    </button>
                  </div>
                  <div className="mt-3 d-flex justify-content-between">
                    <div>
                      <NavLink to="/register">New Here? Register</NavLink>
                    </div>
                    <div>
                      <NavLink to="forgotpassword">Forgot Password?</NavLink>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
          {dummy ? (
            <div className="d-flex justify-content-center text-danger">
              <h3>Email or Password is wrong</h3>
            </div>
          ) : (
            <div></div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
