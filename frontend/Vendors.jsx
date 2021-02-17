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
  
  const vendors = data && data.vendors;
  const vendorsArray = vendors ? vendors.map((vendor, i)=> {
    return (
      <tr key={'row'+i}>
        <td key={'cell'+i}>
          <div key={'main'+i}>
            <div >{vendor.name}</div>
            <div>{vendor.description}</div>
            <a href={vendor.externalLink}>{vendor.externalLink}</a>
          </div>
        </td>
        <td>{vendor.category}</td>
        <td>{vendor.status}</td>
        <td>{vendor.tier}</td>
        <td>{vendor.risk}</td>
      </tr>
    )
  }) : <></>;

  return (
    <div>
      {/* <Text title2>
        hello
      </Text> */}
      <table>
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Category</th>
            <th>Status</th>
            <th>Risk</th>
            <th>Tier</th>
          </tr>
        </thead>
        <tbody>{vendorsArray}</tbody>
      </table>
    </div>
  );
}

export default Vendors;