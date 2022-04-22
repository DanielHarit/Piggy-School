import axios from 'axios'
import { useEffect, useState } from 'react'
import config from '../../conf.json'
import { sessionStorageService } from '../../services/sessionStorageService'

export const useStories = () => {
  const [stories, setStories] = useState(null)

  const fetchStories = async () => {
    const user = sessionStorageService.get('profileObj')
    if (!user || !user.email) {
      return
    }
    try {
      const stories = await axios.get(
        `${config.PIGGY_DB_URL}/stories/${user.email}`
      )
      console.log(stories)
      setStories(stories.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchStories()
  }, [fetchStories])

  return { stories }
}
