import { useFetchUsers } from '../../hooks/useFetchUsers';
import { useFetchPosts } from '../../hooks/useFetchPosts';

export const ArticleList = () => {
    const { userList, isLoading, isError } = useFetchUsers();
    const { postList, isLoading: isPostLoading, isError: isPostError } = useFetchPosts(); // 分割代入時かぶるときは名前を付け替えることが可能

    // 何時間前実装はmoment.jsでできるっぽい

    return (
        <>
            {isError && isPostError && <p style={{ color: 'red' }}>Server Error</p>}
            {isLoading && isPostLoading ? <p>Loading...</p> : (
                <section className="articleList">
                    {postList.map((post) => (
                        <div key={post.id} className="items">
                            {userList.map((user) => (
                                <div key={user.id} className="item">
                                    {post.userId === user.id  && (
                                        <>
                                            <img className="thumbnail" src={`${process.env.PUBLIC_URL}/strage/user/${user.thumbnail}`} alt="サムネイル" />
                                            <div className="content">
                                                <div className="name">{user.name}<span>@{user.userName}</span></div>
                                                <p>{post.content}</p>
                                                {post.image !== '' && <img className="image" src={`${process.env.PUBLIC_URL}/strage/post/${post.image}`} alt="" />}         
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                    <style>{`
                        .articleList .items {
                            width: 100%;
                            margin: 20px auto;
                            padding: 0 20px 20px;
                            border-bottom: 1px solid #ccc;
                        }
                        .articleList .items .item {
                            display: flex;
                            justify-content: space-between;
                        }
                        .articleList .items .item .thumbnail {
                            width: 48px;
                            height: 48px;
                            margin: 0 8px 0 0;
                            border-radius: 50%;
                            object-fit: cover;
                        }
                        .articleList .items .item .content {
                        }
                        .articleList .items .item .content .name {
                            font-size: 16px;
                            font-weight: bold;
                            margin: 0 0 4px 0
                        }
                        .articleList .items .item .content .name span {
                            font-weight: 400;
                            color: #777;
                        }
                        .articleList .items .item .content p {
                            text-align: justify;
                            font-size: 16px;
                            line-height: 1.5;
                        }
                        .articleList .items .item .content .image {
                            width: 100%;
                            height: auto;
                            margin: 8px 0 0 0;
                            border-radius: 12px;
                        }
                    `}</style>
                </section>
            )}
        </>
    );
}