import { fireEvent, render, screen, within } from '@testing-library/react'
import jsonData from '../data.json';
import Home from '@/pages/index'

const DEMO_ROWS = [2,4,5]

describe('Home', () => {
    it('renders a heading', () => {
        render(<Home />)

        const heading = screen.getByRole('heading', {
            name: /SFS Challenge App/i,
        })

        expect(heading).toBeInTheDocument()
    })
    it('renders correct table rows', () => {
        render(<Home />)
        const expectedNumber = screen.getByTestId('total-rows').innerHTML
        expect(+expectedNumber).toEqual(jsonData.length)
    })
    it('correctly adds a row to the table', () => {
        render(<Home />)
        fireEvent.click(
            screen.getByTestId('add-debt'),
        )
        const expectedNumber = screen.getByTestId('total-rows').innerHTML
        expect(+expectedNumber).toEqual(jsonData.length+1)

    })
    it('correctly removes a row to the table', () => {
        render(<Home />)
        fireEvent.click(
            screen.getByTestId('remove-debt'),
        )        
        const expectedNumber = screen.getByTestId('total-rows').innerHTML
        expect(+expectedNumber).toEqual(jsonData.length-1)
    })
    it('correctly shows total checked row count', () => {
        render(<Home />)
        const expectedNumber = screen.getByTestId('total-checked-rows').innerHTML
        expect(+expectedNumber).toEqual(0)
    })
    it('correctly shows total balance of checked boxes', () => {
        render(<Home />)
        const checkboxes = screen.getAllByRole('checkbox')
        // Random checkboxes
        DEMO_ROWS.map((row)=>{
            fireEvent.click(
                checkboxes[row-1]
            )
        })
        const total = DEMO_ROWS.map((row)=>{ return jsonData[row-1].balance}).reduce((partialSum, a) => partialSum + a, 0)
        const { getByText } = within(screen.getByTestId('total-value'))
        expect(getByText(total)).toBeInTheDocument()
    })
    it('correctly shows updated total checked row count', () => {
        render(<Home />)
        const expectedNumber = screen.getByTestId('total-checked-rows').innerHTML
        expect(+expectedNumber).toEqual(DEMO_ROWS.length)
    })
})