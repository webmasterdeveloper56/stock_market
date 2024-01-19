import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import Loading from './loading';


const TableComponent = ({ data, columns, headers, isLoading }) => {
    const fontSize = useBreakpointValue({base: 'lg', md:'small'})
    return (
        <Box overflowX="auto" width={'100%'} >
            <Table variant="simple"  width={'100%'} fontSize={fontSize}>
                <Thead>
                    <Tr>
                        {headers.map((header) => (
                            <Th key={header}>{header}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {data?.map((row, rowIndex) => (
                        <Tr key={rowIndex}>
                            {columns.map((column, columnIndex) => (
                                <Td key={columnIndex}>{row[column]}</Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            {
                data?.length == 0 && !isLoading &&
                <VStack height={'200px'} justifyContent={'center'}>
                    <Text>No Data</Text>
                </VStack>
            }
            {
                isLoading &&
                <VStack height={'200px'} justifyContent={'center'}>
                    <Loading />
                </VStack>
            }
        </Box>
    );
};

export default TableComponent;
