import { render, screen } from '@testing-library/react'
import jsonData from '../data.json';
import Home from '@/pages/index'

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
    expect(rows.length).toEqual(jsonData.length+2)
  })

})