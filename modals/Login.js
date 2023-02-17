/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState } from 'react'
import { MdClose } from "react-icons/md"
import { BsImage } from "react-icons/bs"
import { useSession } from 'next-auth/react'
import { AppContext } from '../contexts/AppContext'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { firestore } from '../firebase'
import { useRouter } from 'next/router'

const Login = () => {

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

                <div class="container">
                    <div class="box box-one">
                        <i class="fab fa-twitter"><img src="https://img.icons8.com/color/50/000000/twitter--v1.png" /></i>
                        <button>
                            <img src="google.png" width="19"/>
                                <span>Sign in with Google</span>
                        </button>
                        <button>
                            <img src="apple.png" width="19"/>
                                <span>Sign in with Apple</span>
                        </button>
                    </div>
                    <h5>Or</h5>
                    <div class="box box-two">
                        <form>
                            <input type="text" placeholder="Enter Email" />
                        </form>
                        <form>
                            <input type="text" placeholder="Enter Password" />
                        </form>
                        <button class="next-btn">Login</button>
                        <button>Forget password</button>
                    </div>
                    <p>Don't have an account <a href="#">Sign Up</a></p>
                </div>


            </div>

        </div>
    )
}

export default Login