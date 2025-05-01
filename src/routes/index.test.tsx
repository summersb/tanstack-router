// index.test.tsx
import { render, screen } from '@testing-library/react'
import { Route } from './index.tsx'

describe('Index route component', () => {
  it('renders welcome message', () => {
    render(<Route.options.component />)
    expect(screen.getByText('Welcome Home!')).toBeInTheDocument()
  })
})
