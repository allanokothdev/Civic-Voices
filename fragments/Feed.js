/* eslint-disable react-hooks/exhaustive-deps */
import { firestore } from '@/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi'
import Post from '../items/Post'

const Feed = () => {

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
            
            <div className='bg-[#16181C] flex gap-2 rounded-full py-2 px-4 text-white items-center text-[20px] sticky top-1 z-10'>
                <FiSearch />
                <input className='bg-transparent w-[100%] outline-none' type="text" placeholder='Search Twitter' />
            </div>
            
            <div className='sticky top-0 bg-black flex justify-between font-medium text-[20px] px-4 py-2'>
                Home
                <HiOutlineSparkles />
            </div>
            {posts.map((post) => (
                <Post key={post.id} id={post.id} post={post.data()} />
            ))}
        </div>
    )
}

export default Feed
