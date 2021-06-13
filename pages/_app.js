import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import GlobalStateProvider from '../src/context/globalState'
import Wrapper from '../src/components/wrapper/wrapper'
import { SWRConfig } from 'swr'
import axios from 'axios'



export default function app ({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: true,
        refreshInterval: 0,
        fetcher: (...args) => axios(...args)
        .then(res => res?.data.data)
        .catch(err => Promise.reject(err))
      }}
    >
      <GlobalStateProvider>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </GlobalStateProvider>
    </SWRConfig>
  )
}