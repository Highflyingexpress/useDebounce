// startTransition для классовых
import { useEffect, useState, useTransition } from "react";
import "./App.css";

const URL = "https://jsonplaceholder.typicode.com";

const filterBySearch = (entities, search) => {
  return entities.filter((item) =>
    item.name.concat(item.body).includes(search.trim())
  );
};

function App() {
  const [isPending, startTransition] = useTransition();
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState("");

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
    startTransition(() => {
      // all not-urgent updates here
      setSearch(e.target.value);
    });
    // позволяет разбить операцию на чанки не блокируя общий пользовательский поток
  };

  return (
    <>
      <h2>Search comments by useTransition</h2>
      <input className="searchInput" onChange={handleSearch} />
      <>{isPending && <h2>Loading...</h2>}</>
      <h2>searched comments:</h2>
      <ul className="comment">
        {filterBySearch(comments, search)?.map(({ id, name, body }) => (
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
