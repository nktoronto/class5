import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function Reddit() {
  const [posts, setPosts] = useState([]);

  React.useEffect(() => {
    axios.get(`https://www.reddit.com/r/reactjs.json`)
      .then(res => {
        const newPosts = res.data.data.children
          .map(obj => obj.data);
        
        setPosts(newPosts);
      });
  }, []);
  
  return (
    <div>
      <h1> /r/reactjs </h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.title}</li>
        ))}
      </ul>
    </div>
  );
 }
/* the map function loops over the posts and 
returns an <li> for each item in the array.*/
/* posts.map is not a React thing. That’s calling 
the map function that already exists on JS arrays, 
and it transforms (a.k.a, “maps”) each item in the
array into a new thing. In this case, each array
item is being turned into a JSX <li> element with
a key prop and the post’s title, and the resulting
array of <li>’s is what gets rendered inside the <ul>.
React knows how to render arrays of elements as long 
as they each have a unique key prop. 
*/

ReactDOM.render(
  
  <Reddit />,
  
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
