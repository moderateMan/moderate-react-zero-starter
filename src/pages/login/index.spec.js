// import dependencies
import React from 'react'

// import API mocking utilities from Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Login from '.'
describe('test Login page', () => {
  const server = setupServer(
    rest.post('/api/users/register', (req, res, ctx) => {
      return res(ctx.json({ greeting: 'hello there' }))
    })
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('handles server ok1', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('register'))
    let domInfo
    await waitFor(() => (domInfo = screen.getByRole('infoOk')))

    expect(domInfo).toHaveTextContent('登陆成功')
  })
  test('handles server ok', async () => {
    await waitFor(() => {
      server.use(
        rest.post('/api/users/register', (req, res, ctx) => {
          return res(ctx.status(500))
        })
      )
    })

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    setTimeout(async () => {
      await waitFor(() => fireEvent.click(screen.getByRole('register')))

      let domInfo
      await waitFor(() => (domInfo = screen.getByRole('infoNologin')))

      expect(domInfo).toHaveTextContent('未登陆')
    }, 0)
  })

  test('renders correctly', async () => {
    const tree = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    expect(tree).toMatchSnapshot()
  })
})
