import Head from 'next/head'
import { getSession, useSession } from 'next-auth/react'
import Login from "../components/Login.js"
import Sidebar from '@/components/Sidebar.js'
import Feed from '@/fragments/Feed.js'
import { useContext } from 'react'
import { AppContext } from '@/contexts/AppContext.js'
import SinglePost from '@/components/SinglePost.js'
import Trending from '@/components/Trending.js'
import CommentModal from '@/modals/CommentModal.js'

const PostDetail = () => {

    const { data: session } = useSession()
    const [appContext] = useContext(AppContext)
    if (!session) return <Login />

    return (
        <>
            <Head>
                <title>Post Detail</title>
                <meta name="description" content="Post Detail" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='relative max-w-[1400px] mx-auto'>
                <Sidebar />
                <div className='flex gap-6'>
                    <SinglePost/>
                    <Trending/>
                    {appContext?.isModalOpen && <CommentModal />}
                </div>
                
            </main>
        </>
    )
}

export default PostDetail


export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
        props: {
            session
        },
    };
}