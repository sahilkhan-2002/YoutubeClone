import './App.css';
import Body from './components/Body';
import Header from './components/Head';
import Main from './components/Main';
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './utils/store';
import VideoPage from './components/Videopage';
// import Demo from './components/Demo';
// import SearchPage from './components/SearchPage';

const appRouter = createBrowserRouter([
  {
    path : '/',
    element : <Body/>,
    children : [
      {
        path : '/',
        element : <Main/>
      },
      {
        path : 'watch',
        element : <VideoPage/>
      },
     
    ]
  }
])
function App() {
  return (
    <Provider store={store}>
    <div className="">
      <Header/>
      {/* <Body/> */}
      <RouterProvider router={appRouter} />
    </div>
    </Provider>
  );
}

export default App;