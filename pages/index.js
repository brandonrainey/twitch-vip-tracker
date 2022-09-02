import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from '../slices/userSlice'
import { fetchData } from '../slices/userSlice'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import Main from '../components/Main'
import Vods from '../components/Vods'


export default function Home() {
  const user = useSelector((state) => state.user.value)

  const connectedUser = useSelector((state) => state.user.followValue)
  const fulfilledStatus = useSelector((state) => state.user.isFulfilled)
  const userId = useSelector((state) => state.user.userId)
  const dispatch = useDispatch()
  const router = useRouter()

  const [followerData, setFollowerData] = useState([])

  const [vodData, setVodData] = useState([])

  const [finished, setFinished] = useState(false)

  const [open, setOpen] = useState(false)

  const [filteredArray, setFilteredArray] = useState([])

  const [searchInput, setSearchInput] = useState('')

  const [currentFollower, setCurrentFollower] = useState()

  const [something, setSomething] = useState(false)

  const [paginationArray, setPaginationArray] = useState()

  const [allFollowers, setAllFollowers] = useState([])

  useEffect(() => {
    if (document?.location?.hash) {
      setSomething(true)
    } else {
      setSomething(false)
    }
  }, [])

  function handleChange(e) {
    setSearchInput(e.target.value)
    const localSearch = e.target.value
    const copyArr = [...allFollowers]
    const filtered = copyArr.filter((item) => {
      return item[0].login.includes(localSearch)
    })

    setFilteredArray([...filtered])
  }

  //gets pagination arrays of followers over 100
  function getPages() {
    if (paginationArray || user) {
      axios
        .get(
          `https://api.twitch.tv/helix/users/follows?from_id=${userId}&first=100&after=${
            paginationArray?.pagination?.cursor == undefined
              ? user.pagination.cursor
              : paginationArray.pagination.cursor
          }`,
          {
            headers: {
              'Client-Id': 'mz3oo6erk0hqgzs6o8ydh26c9m8u09',
              Authorization: `Bearer ${document?.location?.hash.slice(14, 44)}`,
            },
          }
        )
        .then((res) => {
          setPaginationArray(res.data)
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
        .then((res6) => {
          console.log(res6)
          if (res6.pagination.cursor) {
            console.log('go')
            //getPages()
          } else {
            console.log('no more pages')
            //  setAllFollowers((allFollowers) => [...followerData, ...allFollowers ])
          }
        })
    }
  }

  //USE FETCH FROM BELOW TO CHANGE THE GET THE GETPAGES FOLLOWERS VODS, BEFORE SETTING TO ALLFOLLOWERS

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
    if (paginationArray?.length != 0 && fulfilledStatus && allFollowers.length == 0) {
      getPages()
    }
  }, [fulfilledStatus])

  useEffect(() => {
    dispatch(fetchData())
  }, [])

  
  return (
    <div className="bg-gray-900 h-full flex flex-col relative overflow-x-hidden">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        followerData={followerData}
        filteredArray={filteredArray}
        setFilteredArray={setFilteredArray}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleChange={handleChange}
        something={something}
        getPages={getPages}
      />
      {open ? (
        <Vods
          followerData={followerData}
          open={open}
          setOpen={setOpen}
          currentFollower={currentFollower}
          setCurrentFollower={setCurrentFollower}
          user={user}
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
        something={something}
        paginationArray={paginationArray}
        setPaginationArray={setPaginationArray}
        allFollowers={allFollowers}
      />
    </div>
  )
}
