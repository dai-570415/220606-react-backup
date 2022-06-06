import { useState, useEffect } from 'react';
import { db } from '../../Firebase';
import { collection, getDocs } from 'firebase/firestore';

export const User = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const usersCollectionRef = collection(db, 'users');
        getDocs(usersCollectionRef).then((QuerySnapshot) => {
            setUsers(QuerySnapshot.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            })));
        });
    }, []);

    return (
        <div>
           {users.map((user) => (
               <div key={user.id}>{user.name}</div>
           ))}
        </div>
    );
}