import { gql } from "@apollo/client";


export  const GETALLCOUNTRIES = gql`
  query GetAllCountries {
    countries {
      code
      name
      native
      phone
      continent {
        name
      }
      currency
      languages {
        name
      }
      emoji
      emojiU
      states {
        name
      }
    }
  }
`;