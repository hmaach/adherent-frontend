import React from 'react'
import Post from './post/Post';


const SearchMain = (props) => {

    const data = props.data
    const posts = data.posts
    const stagiaires = data.stagiaires
    const documents = data.documents

    return (
        <div id="container-main">

            {posts &&
                posts.map((post) => (
                    <Post
                        key={post.id}
                        post={post}
                    />
                )
                )
            }

        </div>
    );
}


export default SearchMain
