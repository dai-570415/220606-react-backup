import { useState } from 'react';
import firebase, { storage, db } from '../../Firebase';
import { useForm } from 'react-hook-form';
import { useCollectionData } from 'react-firebase-hooks/firestore'; // v3.0.4
import SignOut from '../../components/FirebaseAuth/SignOut';

export const Upload = () => {
    // Create
    const [msg, setMsg] = useState('');
    // eslint-disable-next-line
    const [pending,setPending] = useState(false);
    // Upload
    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    // eslint-disable-next-line
    const { register, formState: { errors }, handleSubmit } = useForm();

    // auth user
    const user = firebase.auth().currentUser;
    let authId;
    let email;
    let name;
    let photoURL;
    if (user != null) {
        user.providerData.forEach(() => {
            authId = user.uid;
            email = user.email;
            name = user.displayName;
            photoURL = user.photoURL;
        });
    }

    // Create
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    // eslint-disable-next-line
    const OnSubmit = async () => {
        setMsg('');
        setImageUrl('');
        setPending(true);
        const hashId = Math.random().toString(36).slice(-8);
        try {
            await firebase
                .firestore()
                .collection('posts')
                .add({
                    msg,
                    createdAt,
                    imageUrl,
                    hashId,
                    // 以下firebase.auth().currentUser情報
                    authId,
                    email,
                    name,
                    photoURL,
                });
        } finally {
            setPending(false);
        }
    }
    
    // Render
    const [ list, loading, error ] = useCollectionData(db.collection('posts').orderBy('createdAt', 'desc'), { idField: 'docId' });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;

    // eslint-disable-next-line
    const result = Object.keys(list).length; // Countを数える

    // Delete
    // eslint-disable-next-line
    const handleDelete = (uid) => {
        if (window.confirm('削除しますか？')) {
            db.collection('posts').doc(uid).delete();
        }
    }

    // File upload
    // eslint-disable-next-line
    const handleImage = e => {
        const image = e.target.files[0];
        setImage(image);
    }
    // eslint-disable-next-line
    const onSubmit = e => {
        e.preventDefault();
        if (image === '') {
            console.log('ファイルが選択されていません');            
        }
        const uploadTask = storage.ref(`/images/${image.name}`).put(image);
        uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            next,
            uploadError,
            complete
        );
    }
    const next = snapshot => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percent + '% done');
        console.log(snapshot);
    }
    const uploadError = error => {
        console.log(error);
    }
    const complete = () => {
        storage
        .ref('images')
        .child(image.name)
        .getDownloadURL()
        .then(fireBaseUrl => {
            setImageUrl(fireBaseUrl);
        });
    }

    return (
        <>
            <SignOut />
            
            <form onSubmit={handleSubmit(OnSubmit)}>
                <textarea
                    {...register('msg', { required: true })}
                    value={ msg }
                    onChange={ e => setMsg(e.target.value) }
                    placeholder="いまどうしてる？"
                    name="msg"
                >
                </textarea>
                {errors.msg?.type === 'required' && 'メッセージが入力されていません'}

                {imageUrl && (
                    <>
                        <input
                            type="hidden"
                            value={imageUrl}
                            onChange={ e => setImageUrl(e.target.value) }
                            name="image"
                        />
                    </>
                )}
                <button type="submit">投稿</button>
                { pending && 'Pendeing...' }  
            </form>

            <form onSubmit={onSubmit}>
                <input type="file" onChange={handleImage} />
                <button>Upload</button>
            </form>
            {imageUrl && (
                <>
                    <img src={imageUrl} id="imgSample" alt="uploaded" />
                </>
            )}
            
            {list.map(item => (
                <div key={item.hashId + String(new Date())}>
                    {authId === item.authId ? (
                        <>
                            {item.photoURL ? (
                                <img src={ item.photoURL } alt="ユーザー画像" />
                            ) : (
                                <div>no image</div>
                            )}

                            {item.name ? (
                                <div>{item.name}</div>
                            ) : (
                                <div>ゲストユーザー</div>
                            )}

                            {item.msg}

                            {item.imageUrl && (
                                <img src={item.imageUrl} alt="イメージ画像" />
                            )}
                            
                            <div className="delete" onClick={() => handleDelete(item.docId)}>Delete</div>
                        </>
                    ) : (
                        <>
                            <div>
                                {item.photoURL ? (
                                    <img src={ item.photoURL } alt="ユーザー画像" />
                                ) : (
                                    <div>no image</div>
                                )}

                                {item.name ? (
                                    <div>{item.name}</div>
                                ) : (
                                    <div>ゲストユーザー</div>
                                )}

                                {item.msg}

                                {item.imageUrl && (
                                    <img src={item.imageUrl} alt="イメージ画像" />
                                )}
                            </div>
                        </>
                    )}
                </div>
            ))}
        </>
    );
}