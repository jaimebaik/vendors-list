import React from 'react';
import { css } from 'aphrodite';
import { gql, useQuery } from '@apollo/client';

import Text from './lib/Text';
import customStyleSheet from './lib/customStyleSheet';
import evergreenIcon from './img/evergreen_icon.png';
import getImageUri from './utils/getImageUri';

const GET_VENDORS_QUERY = gql`
  query GetVendors {
    vendors {
      id
      name
      description
      externalLink
      category
      status
      risk
      tier
    }
  }
`;

function Vendors() {
  const { loading, error, data } = useQuery(GET_VENDORS_QUERY);

  if (loading) console.log('Loading...');
  if (error) console.log(`Error! ${error.message}`);
  
  console.log(data);

  return (
    <div>
      <Text title2>
        hello
      </Text>
    </div>
  );
}

export default Vendors;