import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputParams, setInputParams] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState(false);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      if (data && data.users && data.users.length > 0) {
        setUsers(data.users.map((user) => user.username));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setInputParams(query);
    if (query.length > 0) {
      const filteredData =
        users && users.length
          ? users.filter((user) => user.toLowerCase().indexOf(query) > -1)
          : [];
      setSearchName(true);
      setFilteredUsers(filteredData);
    } else {
      setFilteredUsers([]);
    }
  };

  const handleNameClick = (user) => {
    console.log(user);
    setSearchName(false);
    setInputParams(user);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <section>
        <input type="text" value={inputParams} onChange={handleInputChange} />
        <button>submit</button>
      </section>
      {filteredUsers && filteredUsers.length && searchName ? (
        <section>
          <ul>
            {filteredUsers.map((user, index) => (
              <li key={index} onClick={() => handleNameClick(user)}>
                {" "}
                {user}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}

export default App;
