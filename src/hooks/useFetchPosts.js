// useFetchUsers.jsからコピーしてそれぞれ名前を付け替えただけ

import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchPosts = () => {
    const [postList, setPostList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    
    useEffect(() => {
        fetchPosts();
    }, []);
    const fetchPosts = () => {
        setIsLoading(true);
        axios
            .get('http://localhost:3001/posts')
            .then(result => {
                const posts = result.data.map(post => ({
                    id: post.id,
                    userId: post.userId,
                    content: post.content,
                    image: post.image,
                }));
                setPostList(posts);
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }
    return { postList, isLoading, isError }; // isLoading, isErrorが同じ名前でもコンポーネント側の分割代入時に付け替えられるのでこのままでOK
}