import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { fetchData } from '../slices/userSlice'
import Header from '../components/Header'
import Main from '../components/Main'
import Vods from '../components/Vods'
import Pagination from '../components/Pagination'

export default function Home() {
  const user = useSelector((state) => state.user.value)

  const fulfilledStatus = useSelector((state) => state.user.isFulfilled)

  const userId = useSelector((state) => state.user.userId)

  const dispatch = useDispatch()

  const [followerData, setFollowerData] = useState([])

  const [open, setOpen] = useState(false)

  const [filteredArray, setFilteredArray] = useState([])

  const [searchInput, setSearchInput] = useState('')

  const [currentFollower, setCurrentFollower] = useState()

  const [token, setToken] = useState(false)

  const [paginationArray, setPaginationArray] = useState([])

  const [allFollowers, setAllFollowers] = useState([])

  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(true)

  //checks for auth toekn in url
  useEffect(() => {
    if (document?.location?.hash) {
      setToken(true)
    } else {
      setToken(false)
    }
  }, [])

  //loads up to 100 more followers
  async function handleNextPage() {
    if (allFollowers || user) {
      setLoading(true)
      await axios
        .get(
          `https://api.twitch.tv/helix/users/follows?from_id=${userId}&first=100&after=${
            allFollowers?.pagination?.cursor == undefined
              ? user.pagination.cursor
              : allFollowers?.pagination?.cursor
          }`,
          {
            headers: {
              'Client-Id': 'mz3oo6erk0hqgzs6o8ydh26c9m8u09',
              Authorization: `Bearer ${document?.location?.hash.slice(14, 44)}`,
            },
          }
        )
        .then((res) => {
          return res.data
        })
        .then((res2) => {
          res2.data.map((item, index) => {
            axios
              .get(`https://api.twitch.tv/helix/users?login=${item.to_login}`, {
                headers: {
                  'Client-Id': 'mz3oo6erk0hqgzs6o8ydh26c9m8u09',
                  Authorization: `Bearer ${document?.location?.hash.slice(
                    14,
                    44
                  )}`,
                },
              })
              .then((res3) => {
                return res3.data.data[0]
              })
              .catch((error) => {
                console.log(error)
              })
              .then((res4) => {
                axios
                  .get(
                    `https://api.twitch.tv/helix/videos?user_id=${res4?.id}&first=3&sort=time&type=archive`,
                    {
                      headers: {
                        'Client-Id': 'mz3oo6erk0hqgzs6o8ydh26c9m8u09',
                        Authorization: `Bearer ${document?.location?.hash.slice(
                          14,
                          44
                        )}`,
                      },
                    }
                  )
                  .then((res5) => {
                    setAllFollowers((allFollowers) => [
                      ...allFollowers,
                      [res4, res5.data],
                    ])
                  })
              })
          })

          return res2
        })
    }
    setLoading(false)
    if (allFollowers?.pagination?.cursor) {
      setPage(true)
    } else {
      setPage(false)
    }
  }

  //search filtering function
  function handleChange(e) {
    setSearchInput(e.target.value)
    const localSearch = e.target.value
    const copyArr = [...allFollowers]
    const filtered = copyArr.filter((item) => {
      return item[0].login.includes(localSearch.toLowerCase())
    })

    setFilteredArray([...filtered])
  }

  //api call for followers after user is connected
  useEffect(() => {
    if (allFollowers.length == 0) {
      setAllFollowers([])

      fulfilledStatus
        ? user.data.map((item, index) => {
            axios
              .get(`https://api.twitch.tv/helix/users?login=${item.to_login}`, {
                headers: {
                  'Client-Id': 'mz3oo6erk0hqgzs6o8ydh26c9m8u09',
                  Authorization: `Bearer ${document?.location?.hash.slice(
                    14,
                    44
                  )}`,
                },
              })
              .then((res) => {
                return res.data.data[0]
              })
              .catch((error) => {
                console.log(error)
              })
              .then((res2) => {
                axios
                  .get(
                    `https://api.twitch.tv/helix/videos?user_id=${res2?.id}&first=3&sort=time&type=archive`,
                    {
                      headers: {
                        'Client-Id': 'mz3oo6erk0hqgzs6o8ydh26c9m8u09',
                        Authorization: `Bearer ${document?.location?.hash.slice(
                          14,
                          44
                        )}`,
                      },
                    }
                  )
                  .then((res) => {
                    setAllFollowers((allFollowers) => [
                      ...allFollowers,
                      [res2, res.data],
                    ])
                  })
              })
          })
        : null
    }
  }, [fulfilledStatus])

  
  useEffect(() => {
    dispatch(fetchData())
  }, [])

  return (
    <div className="bg-gray-900 h-full flex flex-col relative overflow-hidden">
      <Head>
        <title>Twitch Follower Tracker</title>
        <meta name="description" content="twitch follower tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        followerData={followerData}
        filteredArray={filteredArray}
        setFilteredArray={setFilteredArray}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleChange={handleChange}
        token={token}
        setToken={setToken}
      />
      <Pagination
        handleNextPage={handleNextPage}
        page={page}
        loading={loading}
      />
      {open ? (
        <Vods
          followerData={followerData}
          open={open}
          setOpen={setOpen}
          currentFollower={currentFollower}
          setCurrentFollower={setCurrentFollower}
          user={user}
          loading={loading}
          setLoading={setLoading}
        />
      ) : null}

      <Main
        followerData={followerData}
        filteredArray={filteredArray}
        setFilteredArray={setFilteredArray}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        open={open}
        setOpen={setOpen}
        currentFollower={currentFollower}
        setCurrentFollower={setCurrentFollower}
        token={token}
        paginationArray={paginationArray}
        setPaginationArray={setPaginationArray}
        allFollowers={allFollowers}
        loading={loading}
        page={page}
      />
    </div>
  )
}
