import { PublicKey } from '@solana/web3.js'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import styles from './ExplorePage.module.scss'
import AppLayout from '../components/AppLayout'
import ArtsList from '../components/ArtsList'
import ArtsSort from '../components/ArtsSort'
import Preloader from '../components/Preloader'
import { useArts } from '../contexts/artDetails'
import { useWallet } from '../contexts/wallet'
// import {
//   getAllMintedArts,
//   getAllUserMintedArts,
// } from '../mocks/mock_functions'
import { shortenAddress } from '../utils/utils'
import { BuyButton } from '../components/BuyButton'

const getHeaderText = ({ walletKey, userAddress }) => {
  return `${walletKey}` === userAddress
    ? "My Fract's"
    : userAddress
    ? `Collection of ${shortenAddress(userAddress)}`
    : 'Explore'
}

const NoFraktsBlock = ({ type = 'explore', myFracts = false }: any) => {
  const message = myFracts
    ? "Unfortunately, you don't have any frakt's yet"
    : type === 'user'
    ? "This account doesn't have any frakt's yet"
    : ''

  return (
    <div className={styles.noFractsBlock}>
      <p>{message}</p>
      {myFracts && <BuyButton className={styles.noFractBuyButton} />}
    </div>
  )
}

const ExplorePage = (props: any) => {
  const { userAddress } = useParams<{ userAddress: string }>()
  const { wallet } = useWallet()
  const { getUserArts, getArts } = useArts()
  const [headerText, setHeaderText] = useState('Explore')
  const [arts, setArts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setHeaderText(getHeaderText({ walletKey: wallet?.publicKey, userAddress }))
  }, [userAddress, wallet])

  const loadArts = async () => {
    setLoading(true)
    ;`${wallet?.publicKey}` === userAddress
      ? setArts(await getUserArts(wallet?.publicKey))
      : userAddress
      ? setArts(await getUserArts(new PublicKey(userAddress)))
      : setArts(await getArts())
    setLoading(false)
  }

  useEffect(() => {
    loadArts()
  }, [userAddress, wallet])

  return (
    <AppLayout headerText={headerText} mainClassName={styles.appMain}>
      {loading && <Preloader size='lg' className={styles.preloader} />}
      {!loading && !arts.length && (
        <NoFraktsBlock
          myFracts={`${wallet?.publicKey}` === userAddress}
          type={userAddress ? 'user' : 'explore'}
        />
      )}
      {!loading && arts.length && (
        <>
          <ArtsSort />
          <ArtsList arts={arts} />
          <ArtsList arts={arts} />
        </>
      )}
    </AppLayout>
  )
}

export default ExplorePage
