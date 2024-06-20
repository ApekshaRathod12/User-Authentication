// import React from 'react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Registration from './pages/Registration'
// import Login from './pages/Login'
// import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
// import Home from './pages/Home'
// import ProtectedRouteLogin from './components/protectedRoute/ProtectedRouteLogin'
// import ErrorBoundary from './utils/ErrorBoundary'

// const App = () => {
//   return (
//     <ErrorBoundary>
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<ProtectedRouteLogin element={<Registration/>} />}/>
//         <Route path='/login' element={<ProtectedRouteLogin element={<Login/>} />}/>
//         <Route path='/home' element={<ProtectedRoute element={<Home/>}/>}/>
//       </Routes>
//     </BrowserRouter>
//     </ErrorBoundary>
//   )
// }

// export default App


import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './utils/ErrorBoundary';
import ProtectedRouteLogin from './components/protectedRoute/ProtectedRouteLogin';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Registration from './pages/Registration';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const Home = React.lazy(() => import('./pages/Home'));

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<ProtectedRouteLogin element={<Registration />} />} />
            <Route path='/login' element={<ProtectedRouteLogin element={<Login />} />} />
            <Route path='/home' element={<React.Suspense fallback={<div>Loading...</div>}><ProtectedRoute element={<Home/>} /></React.Suspense>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
