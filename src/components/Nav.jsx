'use client'

import Link from "next/link"
import Image from "next/image"

import { useState, useEffect } from "react"

import { signIn, signOut, getProviders, useSession } from 'next-auth/react'

function Nav() {
  const { data: session } = useSession()

  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  const handleProviders = async () => {
    const response = await getProviders()

    setProviders(response)
  }

  useEffect(() => {
    handleProviders()
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={'/'} className="flex gap-2 flex-center">
        <Image
          width={30}
          height={30}
          alt="Promptopia Logo"
          className="object-contain"
          src={'/assets/images/logo.svg'}
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* desktop */}
      <div className="sm:flex hidden">
        {session?.user ?
          <div className="flex gap-3 md:gap-5">
            <Link href={'/create-prompt'} className="black_btn">
              Create Prompt
            </Link>
            <button className="outline_btn" onClick={() => {}}>SignOut</button>
            <Link href={"/profile"}>
              <Image
                src={session?.user?.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile Image"
              />
            </Link>
          </div> :
          <>
            {providers && Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider?.name}
                className="black_btn"
                onClick={() => signIn(provider?.id)}>
                  Sign In
                </button>
            ))}
          </>
        }
      </div>

      {/* mobile */}
      <div className="sm:hidden flex relative">
        {session?.user ?
          <div className="flex">
            <Image
              src={session?.user?.image}
              width={37}
              height={37}
              alt="Profile Image"
              className="rounded-full"
              onClick={() => setToggleDropdown(prev => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  className="mt-4 w-full black_btn"
                  onClick={() => {
                    signOut()
                    setToggleDropdown(false)
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div> :
          <>
            {providers && Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider?.name}
                className="black_btn"
                onClick={() => signIn(provider?.id)}
                >
                Sign In
              </button>
            ))}
          </>
        }
      </div>
    </nav>
  )
}

export default Nav