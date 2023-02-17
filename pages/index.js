import Head from 'next/head'
import { useSession } from 'next-auth/react'
import Login from "../components/Login.js"
import Sidebar from '@/components/Sidebar.js'
import Feed from '@/fragments/Feed.js'
import { useContext } from 'react'
import { AppContext } from '@/contexts/AppContext.js'
import CommentModal from '@/modals/CommentModal.js'
import Trending from '@/components/Trending.js'

export default function Home() {

  const { data: session } = useSession()

  const [appContext] = useContext(AppContext)

  if (!session) return <Login />

  return (
    <>
      <Head>
        <title>Civic Voices</title>
        <meta name="description" content="Public Participation & Civic Accountability" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='relative max-w-[1400px] mx-auto'>
        <Sidebar />
        <div className='flex gap-6'>
          <Feed />
          <Trending />

          {appContext?.isModalOpen && <CommentModal />}
        </div>
      </main>
    </>
  )
}
