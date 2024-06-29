import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SlideOne from '../components/SlideOne';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('SlideOne Component', () => {
  beforeEach(() => {
    mock.reset();
  });

  test('renders loader while fetching data', () => {
    render(<SlideOne />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('renders video and content when data is fetched successfully', async () => {
    const mockData = {
      videoUrl: 'https://example.com/video.mp4',
      content: {
        title: 'Test Title',
        description: 'Test Description',
      },
    };

    mock.onGet(`${process.env.NEXT_PUBLIC_API_URL}/slideOne`).reply(200, mockData);

    render(<SlideOne />);

    await waitFor(() => expect(screen.getByText('Test Title')).toBeInTheDocument());
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('renders error message when data fetching fails', async () => {
    mock.onGet(`${process.env.NEXT_PUBLIC_API_URL}/slideOne`).reply(500);

    render(<SlideOne />);

    await waitFor(() => expect(screen.getByText('Failed to fetch slide data')).toBeInTheDocument());
  });
});
