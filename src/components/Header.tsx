import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { shadow } from '@/styles/utils'
import { Button } from '@/components/ui/button'
import  DarkModeToggle  from '@/components/DarkModeToggle'
import LogoutButton from './LogoutButton'
import { getUser } from '@/auth/server' // Adjust the import based on your auth logic

 async function Header() {
    const user = await getUser(); // Replace with actual user state or context>
  return (
    <header className="relative flex items-center justify-between p-4 bg-popover w-full items-center px-3 sm:px-8"
    style={{
        boxShadow: shadow
    }}
  >
        <Link href='/' className='flex items-center gap-2'>
        <Image src='/logo.webp' alt='GOAT Notes Logo' width={50} height={50} />
        <h1 className='flex flex-col pb-1 text-2xl font-semibold leading-6'>
          GOAT <span>Notes</span>
        </h1>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          Your personal note-taking app
        </p>    
       
    </Link>
    <div className="flex gap-4">
    {user ? (
    <LogoutButton />
       
  ) : (
    <>
      <Button className=" px-4 py-2 rounded transition-colors">
        <Link href="/login">Login</Link>
      </Button>
      <Button className="px-4 py-2 rounded transition-colors hidden sm:block">
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </>
  )}
  <DarkModeToggle />
</div>

    
    </header>
  )
}

export default Header;