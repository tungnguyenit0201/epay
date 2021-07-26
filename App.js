import React, {useState} from 'react';
import Navigation from 'navigations';
import {QueryClient, QueryClientProvider} from 'react-query';
import {UserProvider} from 'App/Context/User';
// import Storybook from './storybook';
// import {MODE} from '@env';

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Navigation />
      </UserProvider>
    </QueryClientProvider>
  );
};

// __DEV__ && console.log('Running app with mode:', MODE);
// const route = MODE === 'storybook' ? Storybook : App;
export default App;
