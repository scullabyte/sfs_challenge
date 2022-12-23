import { fireEvent, getByTestId, getByText, render, screen, within } from '@testing-library/react'
import jsonData from '../data.json';
import Home from '@/pages/index'

const ROW_COUNT = jsonData.length + 3;

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
        const rows = screen.getAllByRole('row')
        expect(rows.length).toEqual(ROW_COUNT)
    })
    it('correctly adds a row to the table', () => {
        render(<Home />)
        fireEvent.click(
            screen.getByTestId('add-debt'),
        )
        const rows = screen.getAllByRole('row')
        expect(rows.length).toEqual(ROW_COUNT + 1)
    })
    it('correctly removes a row to the table', () => {
        render(<Home />)
        fireEvent.click(
            screen.getByTestId('remove-debt'),
        )
        const rows = screen.getAllByRole('row')
        expect(rows.length).toEqual(ROW_COUNT - 1)
    })
    it('correctly shows total balance of checked boxes', () => {
        render(<Home />)
        const checkboxes = screen.getAllByRole('checkbox')
        // Random checkboxes
        const rows = [2,4,5]
        rows.map((row)=>{
            fireEvent.click(
                checkboxes[row-1]
            )
        })
        const total = rows.map((row)=>{ return jsonData[row-1].balance}).reduce((partialSum, a) => partialSum + a, 0)
        const { getByText } = within(screen.getByTestId('total-value'))
        expect(getByText(total)).toBeInTheDocument()
    })

})