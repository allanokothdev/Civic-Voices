/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Moment from 'react-moment'
import { BsChat } from 'react-icons/bs'
import { AiOutlineShareAlt } from 'react-icons/ai'
import { TiArrowDownOutline, TiArrowDownThick, TiArrowUpThick, TiArrowUpOutline } from 'react-icons/ti'
import { AppContext } from '@/contexts/AppContext'
import { useSession } from 'next-auth/react'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { firestore } from '@/firebase'

const Post = ({ id, post }) => {

  const [upVotes, setUpVotes] = useState([])
  const [upVoted, setUpVoted] = useState(false)
  const [downVotes, setDownVotes] = useState([])
  const [downVoted, setDownVoted] = useState(false)
  const [comments, setComments] = useState([])

  const { data: session } = useSession()
  const router = useRouter()
  const [appContext, setAppContext] = useContext(AppContext)

  useEffect(() =>
    onSnapshot(query(collection(firestore, "posts", id, "comments"),orderBy("timestamp", "desc")),
        (snapshot) => setComments(snapshot.docs)
      ),
    [firestore, id]
  )

  useEffect(() =>
      onSnapshot(collection(firestore, "posts", id, "upvotes"), (snapshot) =>
        setUpVotes(snapshot.docs)
      ),
    [firestore, id]
  )

  useEffect(() =>
    setUpVoted(
      upVotes.findIndex((upvote) => upvote.id === session?.user?.uid) !== -1
    ), [upVotes]
  )


  useEffect(
    () =>
      onSnapshot(collection(firestore, "posts", id, "downvotes"), (snapshot) =>
        setDownVotes(snapshot.docs)
      ),
    [firestore, id]
  )

  useEffect(() =>
    setDownVoted(
      downVotes.findIndex((downvote) => downvote.id === session?.user?.uid) !== -1
    ), [downVotes]
  )

    const upVotePost = async () => {
      if (upVoted) {
        await deleteDoc(doc(firestore, "posts", id, "upvotes", session.user.uid))
      } else {
        await setDoc(doc(firestore, "posts", id, "upvotes", session.user.uid), {
          username: session.user.name
        })
      }
    }

    const downVotePost = async () => {
      if (downVoted) {
        await deleteDoc(doc(firestore, "posts", id, "downvotes", session.user.uid))
      } else {
        await setDoc(doc(firestore, "posts", id, "downvotes", session.user.uid), {
          title: session.user.name
        })
      }
    }

  const openModal = () => {
    setAppContext({
      ...appContext,
      isModalOpen: true,
      post,
      postId: id
    })

    console.log('opening model ', appContext.post);
  }

  return (
    <div className='mt-4 border-t border-gray-500 px-4 pt-6 pb-4 cursor-pointer' onClick={() => router.push(`/${id}`)}>
      <div className='grid grid-cols-[48px,1fr] gap-4'>
        <div>
          <img src={post?.brand.pic} alt="" className='h-12 w-12 rounded-full object-cover' />
        </div>

        <div>
          <div className='block gap-1'>
            <h1 className='font-medium text-white'>{post?.brand.title}</h1>
            <p className='text-gray-500'>Deadline: {post?.timestamp}</p>
          </div>
          <p>{post?.summary}</p>
          <img className='max-h-[450px] object-cover rounded-[20px] mt-2' src={post?.pic} alt="" />
          <p className='mt-2'>{post?.location.address}</p>
          <div className='flex justify-between text-[20px] mt-4 w-[80%]'>

            <div className='flex gap-1 items-center'>
              <BsChat className='hoverEffect w-7 h-7 p-1'
                onClick={(e) => {
                  e.stopPropagation()
                  openModal()
                }} />
              {comments.length > 0 && (<span className='text-sm'>{comments.length}</span>)}
            </div>

            <div className='flex gap-1 items-center'
              onClick={(e) => {
                e.stopPropagation()
                upVotePost()
              }}>
              {upVoted ? <TiArrowUpThick className='hoverEffect w-7 h-7 p-1 text-pink-700' />
                : <TiArrowUpOutline className='hoverEffect w-7 h-7 p-1' />}

              {upVotes.length > 0 && (<span className={`${upVoted && "text-pink-700"} text-sm`}>{upVotes.length}</span>)}
            </div>

            <div className='flex gap-1 items-center'
              onClick={(e) => {
                e.stopPropagation()
                downVotePost()
              }}>
              {downVoted ? <TiArrowDownThick className='hoverEffect w-7 h-7 p-1 text-pink-700' />
                : <TiArrowDownOutline className='hoverEffect w-7 h-7 p-1' />}

              {downVotes.length > 0 && (<span className={`${downVoted && "text-pink-700"} text-sm`}>{downVotes.length}</span>)}
            </div>

            <AiOutlineShareAlt className='hoverEffect w-7 h-7 p-1' onClick={(e) => {}}/>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Post