import Head from 'next/head'
import CurrencyFormat from 'react-currency-format';
import { Button, Center, Checkbox, Container, Heading, Spacer, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import jsonData from '../data.json';
import { useState } from 'react';

export type JSONData = (typeof jsonData[number] & { isChecked: boolean })[];

const checkedData = (jsonData as JSONData).map((data)=>{
  return {...data, isChecked: false};
})

export default function Home() {
  const [data, setData] = useState(checkedData)
  const [rowsAdded, setRowsAdded] = useState(0)
  const addDebt = () => {
    const newRow = Object.assign({}, data[0])
    newRow.id = data.length + rowsAdded + 1;
    setRowsAdded(rowsAdded + 1)
    setData([...data, newRow])
  }
  const removeDebt = () => {
    setData(data.filter((_, index) => index < data.length - 1))
  }
  const checkRow = (row: JSONData[number]) => {
    // row.isChecked = !row.isChecked
    const newData = data.map((_row)=>{
      if(_row.id===row.id){
        _row.isChecked = !row.isChecked
      }
      return _row
    })
    setData(newData)
  }
  const totalValue = data.map((row)=>{
    return row.isChecked ? row.balance : 0
  }).reduce((b, a) => b + a, 0)
  const totalCheckedRows = data.filter((row)=>{
    return row.isChecked
  }).length

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
              <TableCaption>Submission from Kevin Scully</TableCaption>
              <Thead>
                <Tr>
                  <Th maxW={10}></Th>
                  <Th>Creditor</Th>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th isNumeric>Min Pay %</Th>
                  <Th isNumeric>Balance</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data && data.map((row) => {
                  return (<Tr key={`row_${row.id}`}>
                    <Td><Checkbox                    
                    isChecked={row.isChecked || false}
                    onChange={(e) => checkRow(row)}
                    >
                    </Checkbox></Td>
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
                  <Th />
                  <Th data-testid="total-value" isNumeric>{totalValue}</Th>
                </Tr>
                <Tr>
                  <Th>Total Row Count:</Th>
                  <Th data-testid="total-rows" textAlign="start">{data.length}</Th>
                  <Th>Total Checked Rows:</Th>
                  <Th data-testid="total-checked-rows" textAlign="start">{totalCheckedRows}</Th>
                  <Th />
                  <Th />
                </Tr>
                <Tr>
                  <Th><Button onClick={addDebt} data-testid="add-debt" colorScheme="green">Add Debt</Button></Th>
                  <Th><Button onClick={removeDebt} data-testid="remove-debt" colorScheme="red">Remove Debt</Button></Th>
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
