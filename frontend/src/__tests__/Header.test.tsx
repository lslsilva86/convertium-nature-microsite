import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Header from '@/components/Header';
import { Poppins } from 'next/font/google';

const mock = new MockAdapter(axios);

jest.mock('next/font/google', () => ({
  Poppins: jest.fn().mockReturnValue({
    className: 'poppins',
  }),
}));

describe('Header Component', () => {
  beforeEach(() => {
    mock.reset();
  });

  test('renders loader while fetching data', () => {
    render(<Header isVisible={true} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('renders header content when data is fetched successfully', async () => {
    const mockData = {
      logoUrl: '/assets/images/logo.svg',
      linkText: 'Test Link',
      linkAddress: 'https://example.com',
    };

    mock.onGet(`${process.env.NEXT_PUBLIC_API_URL}/header`).reply(200, mockData);

    await act(async () => {
      render(<Header isVisible={true} />);
    });

    await waitFor(() => expect(screen.getByAltText('Logo')).toBeInTheDocument());
    expect(screen.getByRole('img')).toHaveAttribute('src', `${process.env.NEXT_PUBLIC_SERVER_URL}${mockData.logoUrl}`);
    expect(screen.getByText('Test Link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com');
  });

  test('renders error message when data fetching fails', async () => {
    mock.onGet(`${process.env.NEXT_PUBLIC_API_URL}/header`).reply(500);

    await act(async () => {
      render(<Header isVisible={true} />);
    });

    await waitFor(() => expect(screen.getByText('Error fetching header data')).toBeInTheDocument());
  });

  test('does not render LinkButton when isVisible is false', async () => {
    const mockData = {
      logoUrl: '/assets/images/logo.svg',
      linkText: 'Test Link',
      linkAddress: 'https://example.com',
    };

    mock.onGet(`${process.env.NEXT_PUBLIC_API_URL}/header`).reply(200, mockData);

    await act(async () => {
      render(<Header isVisible={false} />);
    });

    await waitFor(() => expect(screen.getByAltText('Logo')).toBeInTheDocument());
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
