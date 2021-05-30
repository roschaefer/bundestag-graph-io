import { gql } from './helpers'
export const uploadProcedures = gql`
mutation($procedures: [AddProcedureInput!]!) {
  addProcedure(input: $procedures) {
    procedure {
      title
      procedureId
      type
      period
      currentStatus
    }
  }
}
`
