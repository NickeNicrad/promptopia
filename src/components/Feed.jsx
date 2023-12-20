'use client'

import { useState, useEffect } from 'react'

import PromptCardList from './PromptCardList'

function Feed() {
  const [posts, setPosts] = useState([])
  const [searchText, setSearchText] = useState('')

  const handleSearchChange = () => {}

  const fetchPosts = async () => {
    const response = await fetch('/api/prompts')
    const data = await response.json()

    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          required
          type='text'
          value={searchText}
          onChange={handleSearchChange}
          className='search_input peer'
          placeholder='Search for a tag or username'
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed