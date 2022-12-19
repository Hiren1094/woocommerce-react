import React from "react";
import { Link, useParams } from "react-router-dom";
import PostPageContent from "../components/PostPageContent";
import { gql, useQuery } from "@apollo/client";

const GET_POST_BY_SLUG = gql`
  query getPostBySlug($id: ID!) {
    post(id: $id, idType: SLUG) {
      title
      date
      content
      categories {
        nodes {
          slug
          name
        }
      }
      author {
        node {
          name
        }
      }
    }
  }
`;

export default function PostPage(props) {
    let { slug } = useParams();
    
    const { loading, error, data } = useQuery(GET_POST_BY_SLUG, {
        variables: {
         id: slug
        }
    });

    const postFound = Boolean(data?.post);

    return (
        <div className="page-container">
            <Link to="/">← Home</Link>
            {loading ? (
                <p>Loading…</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : !postFound ? (
                <p>Post could not be found.</p>
            ) : (
                <PostPageContent post={data.post} />
            )}
        </div>
    );
}