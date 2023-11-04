import { useEffect, useState, useDeferredValue } from "react";
import "./App.css";

const URL = "https://jsonplaceholder.typicode.com";

const filterBySearch = (entities, search) => {
  return entities.filter((item) =>
    item.name.concat(item.body).includes(search.trim())
  );
};

function App() {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search); // useDeferredValue

  // fetch comments from jsonplaceholder
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${URL}/comments`);
      const data = await response.json();
      setComments(data);
    };
    fetchPosts();
  }, []);

  // handle input typing
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <h2>Search comments by useDefferedValue</h2>
      <input className="searchInput" onChange={handleSearch} />
      <h2>searched comments:</h2>
      <ul className="comment">
        {filterBySearch(comments, deferredSearch)?.map(({ id, name, body }) => (
          <li key={id}>
            {id}
            <h3>{name} </h3>
            <p>{body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
