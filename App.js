import React, {useState} from 'react';
import Navigation from 'navigations';
import {QueryClient, QueryClientProvider} from 'react-query';
import {UserProvider} from 'App/Context/User';
import {WalletProvider} from 'App/Context/Wallet';
import {CommonProvider} from 'App/Context/Common';
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
            <WalletProvider>
              <Wrapper>
                <Navigation />
              </Wrapper>
            </WalletProvider>
          </UserProvider>
        </CommonProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

// __DEV__ && console.log('Running app with mode:', MODE);
// const route = MODE === 'storybook' ? Storybook : App;
export default App;
