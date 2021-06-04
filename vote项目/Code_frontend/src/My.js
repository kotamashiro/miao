import axios from "axios"
import { useState } from "react"
import { useUserInfo } from "./UserContext"
import { Link } from 'react-router-dom'
import { useForceLogin } from "./hooks"
import { List, InfiniteLoader, AutoSizer } from 'react-virtualized';
import { UserOutlined, FileTextOutlined } from '@ant-design/icons';

import 'react-virtualized/styles.css'; // only needs to be imported once


export default function My() {
  // var userInfo = useUserInfo()
  var [voteData, setVoteData] = useState({ row: [], count: 10 })
  var [votes, setVotes] = useState([])
  var user = useForceLogin()

  // useEffect(() => {
  //   axios.get('/vote/myvotes?startIndex=0&stopIndex=30').then(res => {
  //     setVotes(res.data.rows)
  //     setVoteData(res.data)
  //   })
  // }, [user])

  if (!votes) {
    return <div>loading...</div>
  }

  function loadMore({ startIndex, stopIndex }) {
    return axios.get(`/vote/myvotes?startIndex=${startIndex}&stopIndex=${stopIndex}`).then(res => {
      setVoteData(res.data)//里面有总条目数
      votes.splice(startIndex, 0, ...res.data.rows)
      setVotes([...votes])
    }).catch(e => {
      console.log(e)
    })
  }

  function rowRenderer({ key, index, style }) {
    // debugger
    if (index >= votes.length) {
      return <div style={style} key={key}>loading...</div>
    }
    return (
      <div style={style} key={key}>
        <Link to={"/vote/" + votes[index].id}>{votes[index].title}</Link>
      </div>
    )
  }

  function isRowLoaded({ index }) {
    return !!votes[index]
  }

  return (
    <div className="My">
      <InfiniteLoader

        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMore}
        rowCount={voteData.count}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ width, height }) => (
              <List
                onRowsRendered={onRowsRendered}
                ref={registerChild}
                width={width}
                height={height}
                rowCount={voteData.count}
                rowHeight={20}
                rowRenderer={rowRenderer}
              />
            )
            }
          </AutoSizer>
        )}
      </InfiniteLoader>
      <div className="footer">

        <div className="footleft">
          <FileTextOutlined />
          <Link to="/home">创建</Link>
        </div>
        <div className="footright">
          <UserOutlined style={{ color: '#1890ff' }} />
          <Link to="/my">我的</Link>
        </div>
      </div>

    </div>
  )
}
