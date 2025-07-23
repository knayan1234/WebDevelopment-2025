### React hook form (RHF)

React hook form is a light weight library for validating and submitting forms in react. It does not allows component to re renders. It uses refs etc internally and make the form smooth without re render.

**Main hook methods**

```const {
  register,
  handleSubmit,
  watch,
  setValue,
  getValues,
  reset,
  control,
  formState: { errors, isDirty, isSubmitting }
} = useForm();
```

1. `Register` - Connects your input to the form context.
   `<input {...register("firstName", { required: true })} />`

2. `handleSubmit` - Handles form submission and runs validations.
   `<form onSubmit={handleSubmit(onSubmit)} />`

3. `formState.errors` - Tracks validation errors
   `{errors.email && <p>Email is required</p>}`

### Yup

Yup is a JavaScript schema builder for value parsing and validation.In React Hook Form, Yup is used to centrally define validation rules.

---

## 📋 What is **Formik**?

**Formik** is a popular form library in React for handling:

- Form state
- Validation
- Error messages
- Submission

It simplifies form logic using a declarative and component-driven approach.

---

## ⚖️ **Formik vs React Hook Form (RHF)** – Quick Comparison

| Feature                    | Formik                        | React Hook Form (RHF)               |
| -------------------------- | ----------------------------- | ----------------------------------- |
| 🧠 Philosophy              | Declarative, component-driven | Hook-based, minimal re-renders      |
| 🏃 Performance             | Slower with large forms       | Faster with uncontrolled components |
| 🧩 Validation              | Yup (or custom)               | Yup, Zod, or custom                 |
| 📦 Bundle size             | Bigger                        | Smaller                             |
| 🛠️ Integration             | Easy with Formik components   | Easy with `register`                |
| 🧵 Controlled/Uncontrolled | Controlled inputs             | Uncontrolled inputs                 |
| 📊 Re-render Optimization  | Less optimal                  | Optimized                           |

---

## 🧪 Example – Formik

```jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

function FormikExample() {
  return (
    <Formik
      initialValues={{ name: "" }}
      validationSchema={schema}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <Field name="name" placeholder="Name" />
        <ErrorMessage name="name" component="div" style={{ color: "red" }} />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

export default FormikExample;
```

---

## 🧪 Equivalent – React Hook Form

```jsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

function RHFExample() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" />
      <p style={{ color: "red" }}>{errors.name?.message}</p>
      <button type="submit">Submit</button>
    </form>
  );
}

export default RHFExample;
```

---

## 📝 Final Thoughts

- ✅ Use **RHF** for **better performance** and **uncontrolled** forms.
- ✅ Use **Formik** if you like component-based declarative syntax.
- Both support **Yup schema validation**.

Let me know if you want this saved in Markdown for README or formatted into a Notion-style doc.
