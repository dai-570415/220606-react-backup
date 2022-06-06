import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchUsers = () => {
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    // ページにアクセスした際、描画
    useEffect(() => {
        fetchUsers();
    }, []);
    // カスタムフックの関数
    const fetchUsers = () => {
        // ローディング処理
        setIsLoading(true);
        // Feath処理
        axios
            .get('http://localhost:3001/users') // 公開する際は本番環境のURLにする
            .then(result => {
                // APIから取り出し
                const users = result.data.map(user => ({
                    id: user.id,
                    userName: user.userName,
                    name: user.name,
                    thumbnail: user.thumbnail,
                }));
                // 状態変更
                setUserList(users);
            })
            .catch(() => setIsError(true)) // catch Serverが起動していない場合
            .finally(() => setIsLoading(false)); // finally 最終的にローディング解除
    }
    // それぞれの値をreturn
    return { userList, isLoading, isError };
}