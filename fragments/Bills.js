/* eslint-disable react-hooks/exhaustive-deps */
import { firestore } from '@/firebase'
import Bill from '@/items/Bill'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

const Bills = () => {

    const [posts, setPosts] = useState([])

    useEffect(
        () => onSnapshot(
            query(collection(firestore, "posts"), orderBy("date", "desc")),
            (snapshot) => {
                setPosts(snapshot.docs)
            }
        ), [firestore]
    )

    console.log(posts)


    return (
        <div className='sm:ml-[81px] xl:ml-[340px] w-[600px] min-h-screen border-r border-gray-400 text-white py-2'>
            <div className='sticky top-0 bg-black flex justify-between font-medium text-[20px] px-4 py-2'>
                Bills
            </div>
            {posts.map((post) => (
                <Bill key={post.id} id={post.id} post={post.data()} />
            ))}
        </div>
    )
}

export default Bills
