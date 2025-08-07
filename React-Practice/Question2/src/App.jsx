import { useRef } from "react";
export default function App() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://questions.greatfrontend.com/api/questions/contact-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nameRef.current.value,
            email: emailRef.current.value,
            message: messageRef.current.value,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send data");
      }

      const result = await response.json();
      console.log("Server responded with:", result);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" ref={nameRef} />
      <br />
      <br />
      <label htmlFor="mail">Email:</label>
      <input type="email" id="mail" ref={emailRef} />
      <br />
      <br />
      <label htmlFor="message">Message:</label>
      <textarea type="text" id="message" ref={messageRef} />
      <br />
      <br />
      <button>Submit</button>
    </form>
  );
}
