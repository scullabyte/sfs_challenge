import Head from 'next/head'
import { Center, Container, Spacer, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, VStack } from '@chakra-ui/react'


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
                <Tr>
                  <Td>Creditor</Td>
                  <Td>First Name</Td>
                  <Td>Last Name</Td>
                  <Td isNumeric>25.4%</Td>
                  <Td isNumeric>235.4</Td>
                </Tr>
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
