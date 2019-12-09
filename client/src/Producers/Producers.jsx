import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const PRODUCERS = gql`
  {
    producers {
      name
      location
      productTypes
      contactPerson
      phoneNumber
      email
      website
      notes
    }
  }
`;

function Producers() {
  const { loading, error, data } = useQuery(PRODUCERS);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error...</p>;

  const { producers } = data;

  return producers.map(producer => (
    <div key={producer.name}>
      <h2>{producer.name}</h2>
      <p>location: {producer.location}</p>
      <p>productTypes: {producer.productTypes}</p>
      <p>contactPerson: {producer.contactPerson}</p>
      <p>phoneNumber: {producer.phoneNumber}</p>
      <p>email: {producer.email}</p>
      <p>website: {producer.website}</p>
      <p>notes: {producer.notes}</p>
    </div>
  ));
}

export default Producers;
