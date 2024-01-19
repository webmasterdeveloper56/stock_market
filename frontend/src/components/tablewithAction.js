import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, VStack, Button } from '@chakra-ui/react';


const TableWithAction = ({ data, columns, headers,actionHandler, actionTitle }) => {
    return (
        <Box overflowX="auto">
            <Table variant="simple">
                <Thead>
                    <Tr>
                        {headers.map((header) => (
                            <Th key={header}>{header}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((row, rowIndex) => (
                        <Tr key={rowIndex} >
                            {columns.map((column, columnIndex) => (
                                <Td key={columnIndex} pt={1} pb={1}>{row[column]}</Td>
                            ))}
                            <Td pt={2} pb={2}>
                                <Button key={rowIndex} onClick={()=>actionHandler(row)} height={30}>{actionTitle}</Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            {
                data.length == 0 &&
                <VStack height={'200px'} justifyContent={'center'}>
                    <Text>No Data</Text>
                </VStack>
            }
        </Box>
    );
};

export default TableWithAction;
