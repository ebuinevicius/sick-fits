import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  console.log('Running update function after deleting...');
  cache.evict(cache.identify(payload.data.deleteProduct));
}

function DeleteProduct({ id, children }) {
  const [deleteProduct, { data, loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: {
        id,
      },
      update,
    }
  );

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete the product?')) {
          // Delete
          console.log('deleting...');
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}

export default DeleteProduct;
