import { createClient } from 'graphqurl';
import { uploadProcedures } from './mutations'
import { downloadProcedures } from './queries'
import cleanDeep from 'clean-deep'

async function importDumps() {
  const bundestagIoClient = createClient({
    endpoint: 'http://localhost:3100',
    headers: {
      'content-type': 'application/json'
    }
  });
  const dGraphClient = createClient({
    endpoint: 'http://localhost:8080/graphql',
    headers: {
      'content-type': 'application/json'
    }
  });
  try {
    let { data: { procedures } } = await bundestagIoClient.query({ query: downloadProcedures })
    procedures = cleanDeep(procedures)
    console.log(JSON.stringify(procedures, null, 2))
    const { data: { addProcedure } } = await dGraphClient.query(
      {
        query: uploadProcedures,
        variables: { procedures }
      }
    )
    console.log(JSON.stringify(addProcedure, null, 2))
  } catch(err) {
    console.error(err.errors)
  }
}

importDumps()
