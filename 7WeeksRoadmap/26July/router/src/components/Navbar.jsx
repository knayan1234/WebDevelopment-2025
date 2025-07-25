import { Link, NavLink } from "react-router-dom"; // ✅ Correct

const Navbar = () => {
  return (
    <>
      <div>
        <ul
          style={{
            justifyContent: "space-evenly",
            display: "flex",
          }}
        >
          <li>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "red" : "black",
              })}
            >
              Home
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink
              to="/about"
              style={({ isActive }) => ({
                color: isActive ? "red" : "black",
              })}
            >
              About
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink
              to="/dashboard"
              style={({ isActive }) => ({
                color: isActive ? "red" : "black",
              })}
            >
              Dashboard
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Navbar;
