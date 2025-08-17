import "./App.css";
import axios from "axios";
import { useUser } from "./hooks/useUser";
import { useEffect } from "react";

function App() {
  interface resposneStr {
    data: {
      userId: number;
      id: number;
      title: string;
      body: string;
    };
  }

  async function getPost() {
    try {
      const response = await axios.get<resposneStr>(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("I always executes!!");
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  const { user, loading, error } = useUser(5);
  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>
        <h1>User Details</h1>
        {user ? (
          <div>
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Address:</strong> {user.address.street},{" "}
              {user.address.city}
            </p>
            <p>
              <strong>Company:</strong> {user.company.name}
            </p>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    </>
  );
}

export default App;
