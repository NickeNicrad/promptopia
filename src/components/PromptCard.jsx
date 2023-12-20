'use client'

import Image from "next/image"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

function PromptCard({item, handleTagClick, handleEdit, handleDelete}) {
  const [copied, setCopied] = useState('')
  const {data: session} = useSession()
  const pathName = usePathname()

  const handleCopy = () => {
    setCopied(item?.prompt)
    navigator.clipboard.writeText(item?.prompt)

    setTimeout(() => setCopied(''), 3000)
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={item?.creator?.image}
            alt="User Image"
            height={40}
            width={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {item?.creator?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {item?.creator?.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={() => handleCopy && handleCopy(item?.tag)}>
          <Image
            src={copied === item?.prompt ?
              'assets/icons/tick.svg' : 'assets/icons/copy.svg'}
            alt="User Image"
            height={12}
            width={12}
            className="rounded-full object-contain"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {item?.prompt}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(item?.tag)}>
        {item?.tag}
      </p>
      {session?.user?.id === item?.creator?._id &&
        pathName === '/profile' &&(
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p className="font-inter text-sm green_gradient cursor-pointer" onClick={() => handleEdit(item)}>
              Edit
            </p>
            <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={() => handleDelete(item)}>
              Delete
            </p>
          </div>
      )}
    </div>
  )
}

export default PromptCard