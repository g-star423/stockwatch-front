import React, { ReactNode } from 'react';
import './App.css';
import Header from './Components/Header'

//conventional props
function Heading({ title }: { title: string; }) {
  return (
    <h1>{title}</h1>
  )
}

function HeadingWithContent({ children }: { children: ReactNode; }) {
  return (
    <h1>{children}</h1>
  )
}

function App() {
  return (
    <div>
      <Heading title={'hello there!!!'}></Heading>
      <HeadingWithContent>Hi!!</HeadingWithContent>
    </div>
  );
}

export default App;
