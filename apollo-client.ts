import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'

// const client = registerApolloClient(() => {
//   return new NextSSRApolloClient({
//     ssrMode: true,
//     uri: process.env.NEXT_PUBLIC_STEPZEN_ENDPOINT as string,
//     cache: new NextSSRInMemoryCache(),
//     headers: {
//       Authorization: `apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
//     }
//   });
// })

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: process.env.NEXT_PUBLIC_STEPZEN_ENDPOINT as string,
    headers: {
      Authorization: `apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
    },
    credentials: 'same-origin',
  }),
  // uri: 'https://spallumcheen.stepzen.net/api/chrap/__graphql',
  // uri: process.env.NEXT_PUBLIC_STEPZEN_ENDPOINT as string,
  // headers: {
  //   Authorization: `apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
  // },
  cache: new InMemoryCache(),
})

export default client
