import React, {useState} from 'react';
import Navigation from 'navigations';
import {QueryClient, QueryClientProvider} from 'react-query';
import {UserProvider} from 'App/Context/User';
import {CommonProvider} from 'App/Context/Common';
import {AuthProvider} from 'App/Context/Auth';
import {LanguageProvider} from 'App/Context/Language';
import {Wrapper} from 'components';
// import Storybook from './storybook';
// import {MODE} from '@env';

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CommonProvider>
          <UserProvider>
            <Wrapper>
              <Navigation />
            </Wrapper>
          </UserProvider>
        </CommonProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

// __DEV__ && console.log('Running app with mode:', MODE);
// const route = MODE === 'storybook' ? Storybook : App;
export default App;
