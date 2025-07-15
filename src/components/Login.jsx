import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {
  email: 'Please enter a valid email address',
  password: 'Password must be at least 4 characters long',
  terms: 'You must agree to the terms and privacy policy',
};

const validateForm = (formData) => {
  const newErrors = {};
  let formIsValid = true;

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    newErrors.email = errorMessages.email;
    formIsValid = false;
  }

  if (!formData.password || formData.password.length < 4) {
    newErrors.password = errorMessages.password;
    formIsValid = false;
  }

  if (!formData.terms) {
    newErrors.terms = errorMessages.terms;
    formIsValid = false;
  }

  return { errors: newErrors, isValid: formIsValid };
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const { isValid: currentIsValid, errors: currentErrors } =
      validateForm(form);
    setIsValid(currentIsValid);
    setErrors(currentErrors);
  }, [form]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === 'checkbox' ? event.target.checked : value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { isValid: finalIsValid, errors: finalErrors } = validateForm(form);
    setErrors(finalErrors);
    setIsValid(finalIsValid);
    if (finalIsValid) {
      axios
        .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
        .then((res) => {
          const user = res.data.find(
            (item) =>
              item.password === form.password && item.email === form.email
          );
          if (user) {
            setForm(initialForm);
            navigate('/success');
          } else {
            alert('Invalid email or password');
          }
        })
        .catch((error) => {
          console.error('API call failed:', error);
        });
    } else {
      console.log('Form is invalid. Please correct the errors.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={!!errors.email}
        />
        {errors.email && <FormFeedback data-testid="formfeedbackEmail">{errors.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={!!errors.password}
        />
        {errors.password && <FormFeedback data-testid="formfeedbackPassword">{errors.password}</FormFeedback>}
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
          invalid={!!errors.terms}
          data-testid="termsCheckbox"
        />
               
        <Label htmlFor="terms" check>
          {''}I agree to terms of service and privacy policy{''}
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" type="submit" disabled={!isValid || !form.terms} data-testid="sign-in-button">
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}