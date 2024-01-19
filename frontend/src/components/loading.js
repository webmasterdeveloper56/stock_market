import React from 'react';
import { Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Spinner
      thickness="4px"  // Thickness of the spinner
      speed="0.65s"    // Duration of the spinner animation
      emptyColor="gray.200" // Color of the empty part of the spinner
      color="blue.500"  // Color of the spinning part of the spinner
      size="xl"        // Size of the spinner (you can use "sm", "md", "lg", "xl", etc.)
    />
  );
};

export default Loading;
