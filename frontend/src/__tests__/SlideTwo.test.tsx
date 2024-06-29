import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SlideTwo from '../components/SlideTwo';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('SlideTwo Component', () => {
  beforeEach(() => {
    mock.reset();
  });

  test('renders loader while fetching data', () => {
    render(<SlideTwo />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('renders content when data is fetched successfully', async () => {
    const mockData = {
      title: 'Test Title',
    };

    mock.onGet(`${process.env.NEXT_PUBLIC_API_URL}/slideTwo`).reply(200, mockData);

    await act(async () => {
      render(<SlideTwo />);
    });

    await waitFor(() => expect(screen.getByText('Test Title')).toBeInTheDocument());
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  test('renders error message when data fetching fails', async () => {
    mock.onGet(`${process.env.NEXT_PUBLIC_API_URL}/slideTwo`).reply(500);

    await act(async () => {
      render(<SlideTwo />);
    });

    await waitFor(() => expect(screen.getByText('Failed to fetch slide data')).toBeInTheDocument());
  });

  test('renders AlertBox when there is no data', async () => {
    mock.onGet(`${process.env.NEXT_PUBLIC_API_URL}/slideTwo`).reply(500, {});

    await act(async () => {
      render(<SlideTwo />);
    });

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
  });
});
