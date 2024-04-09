import React from "react";
import { useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const PasswordInput = (props) => {
  const [type, setType] = useState("password");
  const handleClick = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };
  return (
    <InputGroup className="mb-3">
      <FormControl
        type={type}
        placeholder="Password"
        aria-label="Password"
        aria-describedby="password"
        {...props}
      />
      <InputGroup.Text
        id="password"
        //onClick={() => setType(prev => prev === "password" ? "text" : "password")}
        onClick={() => setType(handleClick)}
      >
        {type === "password" ? <AiFillEye /> : <AiFillEyeInvisible />}
      </InputGroup.Text>
      <Form.Control.Feedback type="invalid">
        {props.error}
      </Form.Control.Feedback>
    </InputGroup>
  );
};

export default PasswordInput;
