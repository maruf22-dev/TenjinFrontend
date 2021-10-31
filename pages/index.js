// import Head from 'next/head'
// import Image from 'next/image'
import Loader from '../Components/Loader'
import styles from "../styles/Home.module.css"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'


export const Home = () => {
  const Router = useRouter();

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }
  useEffect(async () => {   
    Router.push("/home");
  }, [Router]) // All the magic is here
  return (
      <div className={styles.Container}>
        <p>Loading . . .</p>
      </div>
  )
}
export default Home;