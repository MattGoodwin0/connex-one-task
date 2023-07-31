import { act, render, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('axios');

describe('App', () => {
  it('should show "Loading ..." on mount', async () => {
    const { getByTestId } = render(<App />);
    const serverTimeLoadingElement = getByTestId('serverTimeLoading');
    const metricsLoadingElement = getByTestId('metricsLoading');

    expect(serverTimeLoadingElement.innerText).toBe('Loading ...');
    expect(metricsLoadingElement.innerText).toBe('Loading ...');
  });
  it('should fetch data and update state correctly', async () => {
    const { getByTestId } = render(<App />);

    await waitFor(() => {
      const serverTimeElement = getByTestId('serverTime');
      const metricsElement = getByTestId('metrics');

      expect(serverTimeElement).toHaveTextContent('1670630400');
      expect(metricsElement).toHaveTextContent('Mocked Metrics');
    });
  });
});
