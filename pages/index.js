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

  const [paginationArray, setPaginationArray] = useState([]) ///////////////////////////////

  const [allFollowers, setAllFollowers] = useState([[]])

  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState()

  const [arrayIndex, setArrayIndex] = useState(0)

  const [tempArr, setTempArr] = useState([])

  


  //checks for auth toekn in url
  useEffect(() => {
    if (document?.location?.hash) {
      setToken(true)
    } else {
      setToken(false)
    }
  }, [])

  function handleNextPage() {
    setPage(allFollowers?.pagination?.cursor)
    setArrayIndex(arrayIndex + 1)
    setPaginationArray((paginationArray) => [...paginationArray, allFollowers])
    if (allFollowers || user) {
      axios
        .get(
          `https://api.twitch.tv/helix/users/follows?from_id=${userId}&first=100&after=${
            page == undefined
              ? user.pagination.cursor
              : page
          }`,
          {
            headers: {
              'Client-Id': 'mz3oo6erk0hqgzs6o8ydh26c9m8u09',
              Authorization: `Bearer ${document?.location?.hash.slice(14, 44)}`,
            },
          }
        )
        .then((res) => {
         setAllFollowers([])
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
                    
                    // let copy = [...paginationArray]
                    // setPaginationArray([...copy, [res4, res5.data]])


                    // console.log(paginationArray)
                    // setPaginationArray((paginationArray) => [
                    //   ...paginationArray, [res4, res5.data]
                    // ])

                    setTempArr((tempArr) => [
                      ...tempArr,
                      [res4, res5.data]
                    ])
                    
                    

                    setAllFollowers((allFollowers) => [
                      ...allFollowers,
                      [res4, res5.data],
                    ])
                  })
              })
          })

          return res2
        })
        // .then((res6) => {
          
        //   if (res6.pagination.cursor) {
        //   } else {
        //     console.log('no more pages')
        //   }
        // })

        
    }
    
  }

  function handlePreviousPage() {
    console.log(page)
    
    
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
                    // let copy = [...paginationArray]
                    // setPaginationArray([...copy, [res4, res5.data]])


                    // console.log(paginationArray)
                    // setPaginationArray((paginationArray) => [
                    //   ...paginationArray, [res4, res5.data]
                    // ])

                    // setAllFollowers((allFollowers) => [
                    //   ...allFollowers,
                    //   [res4, res5.data],
                    // ])
                  })
              })
          })

          return res2
        })
        .then((res6) => {
          
          if (res6.pagination.cursor) {
          } else {
            console.log('no more pages')
          }
        })
    }
    
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
                    let arr = [[...allFollowers]]
                    arr[0].push([res2, res.data])
                    setTempArr([[...arr]])
                    setAllFollowers((allFollowers) => [
                      ...allFollowers,
                      [res2, res.data],
                    ])
                    
                  })
              })
          })
        : null
    }
    
    // if (
    //   // paginationArray?.length != 0 &&
    //   fulfilledStatus &&
    //   allFollowers.length == 0
    // ) {
    //   console.log('runs')
    //   getPages()
    // }
    
  }, [fulfilledStatus])

  //
  useEffect(() => {
    dispatch(fetchData())
  }, [])

  
console.log(allFollowers)

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
      <Pagination handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />
    </div>
  )
}
