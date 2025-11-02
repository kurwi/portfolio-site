import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'

test('renders site name', () => {
  render(<Navbar />)
  expect(screen.getByText('Your Name')).toBeInTheDocument()
})
