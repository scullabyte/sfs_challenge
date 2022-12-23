import Head from 'next/head'
import CurrencyFormat from 'react-currency-format';
import { Center, Container, Heading, Spacer, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import jsonData from '../data.json';

export default function Home() {
  return (
    <>
      <Head>
        <title>SFS Challenge App</title>
        <meta name="description" content="Coding Challenge for Strategic Financial Solutions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack>
        <Container h={20} />
        <Heading as="h1">SFS Challenge App</Heading>
        <Center>
          <TableContainer w="1000px" borderColor="slate" borderWidth={1} borderRadius="xl" >
            <Table variant='simple'>
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>Creditor</Th>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th isNumeric>Min Pay %</Th>
                  <Th isNumeric>Balance</Th>
                </Tr>
              </Thead>
              <Tbody>
                {jsonData && jsonData.map((row) => {
                  return (<Tr key={`row_${row.id}`}>
                    <Td>{row.creditorName}</Td>
                    <Td>{row.firstName}</Td>
                    <Td>{row.lastName}</Td>
                    <Td isNumeric>{row.minPaymentPercentage}%</Td>
                    <Td>
                      <CurrencyFormat value={row.balance} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </Td>
                  </Tr>)
                })}

              </Tbody>
              <Tfoot>
                <Tr bgColor="lightblue">
                  <Th>TOTAL</Th>
                  <Th />
                  <Th />
                  <Th />
                  <Th isNumeric>$235.4</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Center>
        <Spacer />
      </VStack>
    </>
  )
}
