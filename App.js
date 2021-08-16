import React, {useState} from 'react';
import Navigation from 'navigations';
import {QueryClient, QueryClientProvider} from 'react-query';
import {UserProvider} from 'App/Context/User';
import {AuthProvider} from 'App/Context/Auth';
import {LanguageProvider} from 'App/Context/Language';
// import Storybook from './storybook';
// import {MODE} from '@env';

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <UserProvider>
            <Navigation />
          </UserProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

// __DEV__ && console.log('Running app with mode:', MODE);
// const route = MODE === 'storybook' ? Storybook : App;
export default App;
