/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState } from 'react'
import { MdClose } from "react-icons/md"
import { BsImage } from "react-icons/bs"
import { useSession } from 'next-auth/react'
import { AppContext } from '../contexts/AppContext'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { firestore } from '../firebase'
import { useRouter } from 'next/router'

const CommentModal = () => {

    const [title, setTitle] = useState("")
    const [summary, setSummary] = useState("")
    const [appContext, setAppContext] = useContext(AppContext)
    const { data: session } = useSession()
    const router = useRouter()

    const closeModal = () => {
        setAppContext({ ...appContext, isModalOpen: false })
    }

    const post = appContext.post

    const sendComment = async (e) => {

        e.preventDefault();

        await addDoc(collection(firestore, "posts", appContext.postId, "comments"), {
            id: Date.now().toString(),
            uid: session.user.uid,
            pic: session.user.image,
            name: session.user.name,
            token: session.user.token,
            title: title,
            summary: summary,
            type: "comments",
            status: "Submitted",
            reported: false,
            anonymous: false,
            timestamp: serverTimestamp(),
        });

        setAppContext({ ...appContext, isModalOpen: false })
        setTitle("");
        setSummary("");

        router.push(`/${appContext.postId}`);
    }

    return (
        <div className='fixed to-0 left-0 z-[20] h-screen w-screen bg-[#242d34bb]' onClick={closeModal}>

            <div className='bg-black w-[350px] md:w-[650px] text-white absolute left-[50%] translate-x-[-50%] mt-[40px] p-4 rounded-[20px]'
                onClick={(e) => e.stopPropagation()}>

                <MdClose className='text-[22px] cursor-pointer' onClick={closeModal} />

                <div className='relative mt-8 grid grid-cols-[48px,1fr] gap-4'>

                    <div>
                        <img className='rounded-full' src={post?.brand.pic} alt="" />
                    </div>

                    <div>
                        <div className='flex gap-2 text-[12px] md:text-[16px]'>
                            <h1>{post?.brand.title}</h1>
                            <h2 className='text-gray-500'>Deadline: {post?.timestamp}</h2>
                        </div>
                        <p className='text-[12px] md:text-[16px]'>{post?.summary}</p>

                        <img src={post?.image} className='mt-2 max-h-[250px] rounded-[15px] object-cover' alt="" />

                        <p className='mt-4 text-gray-500'>Replying to: <span className='text-[#1d9bf0]'>{post?.brand.title}</span></p>

                    </div>

                    <div className='mt-4'>
                        <img className='rounded-full' src={session?.user?.image} alt="" />
                    </div>

                    <div className='mt-4'>
                        <textarea
                            className='w-[100%] bg-transparent outline-none text-[18px]'
                            rows="4"
                            placeholder="Add your Voice"
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)} />

                        <div className='flex justify-between items-center'>
                            <div className='flex gap-4 text-[20px] text-[#1d9bf0]'>

                             
                            </div>

                            <button
                                className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                                disabled={!summary.trim()}
                                onClick={sendComment}>
                                Reply
                            </button>
                        </div>



                    </div>

                </div>

            </div>

        </div>
    )
}

export default CommentModal