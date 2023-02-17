/* eslint-disable react-hooks/exhaustive-deps */
import { firestore } from '@/firebase'
import Topic from '@/items/Topic'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

const Topics = () => {

    const [topics, setTopics] = useState([])

    useEffect(
        () => onSnapshot(
            query(collection(firestore, "topics"), orderBy("id", "desc")),
            (snapshot) => {
                setTopics(snapshot.docs)
            }
        ), [firestore]
    )

    console.log(topics)


    return (
        <div className='sm:ml-[81px] xl:ml-[340px] w-[600px] min-h-screen border-r border-gray-400 text-white py-2'>
            <div className='sticky top-0 bg-black flex justify-between font-medium text-[20px] px-4 py-2'>
                Kenya Conversations
            </div>
            {topics.map((topic) => (
                <Topic key={topic.id} id={topic.id} topic={topic.data()} />
            ))}
        </div>
    )
}

export default Topics
