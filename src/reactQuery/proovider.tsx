import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PropsWithChildren} from 'react';

const ReactQueryProvider = ({children}: PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
