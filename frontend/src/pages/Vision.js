import React from 'react';
import { Center, Paper, Blockquote } from '@mantine/core';

function Vision() {
  return (
    <Center style={{ height: '70vh' }}>
      <Paper shadow="xl" radius="lg" p="xl" withBorder>
        <Blockquote cite="- Gunnar Carlsson" color="blue" iconSize={30}>
          Data have shape, shape has meaning, meaning brings value.
        </Blockquote>
      </Paper>
    </Center>
  );
}
export default Vision;