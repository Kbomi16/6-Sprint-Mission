import { Routes, Route, BrowserRouter } from 'react-router-dom'
import {
  AddItem,
  Items,
  ItemsDetail,
  Main,
  Signin,
  Signup,
} from './pages/index.ts'
import Layout from './pages/Layout.tsx'
import './styles/globals.css'
import './styles/style.css'
import PostDetail from './pages/PostDetail.tsx'
import Boards from './pages/Boards.tsx'
import AddBoards from './pages/AddBoards.tsx'

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="items">
              <Route index element={<Items />} />
              <Route path=":id" element={<ItemsDetail />} />
            </Route>
            <Route path="additem" element={<AddItem />} />
 
          <Route path="boards">  
            <Route index element={<Boards />} />
            <Route path=":id" element={<PostDetail post={{
              id: 0,
              title: '',
              content: '',
              image: undefined,
              likeCount: 0,
              createdAt: '',
              updatedAt: '',
              writer: {
                id: 0,
                nickname: ''
              }
            }} />} />
          </Route>
          <Route path="addBoards" element={<AddBoards />} />
          </Route>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
