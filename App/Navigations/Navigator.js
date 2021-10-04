import {
  CommonActions,
  StackActions,
  DrawerActions,
} from '@react-navigation/native';
import {SCREEN} from 'configs/Constants';

let _container;

function setContainer(container) {
  _container = container;
}

function popToTop() {
  _container.dispatch(StackActions.popToTop());
}

function reset(name, params, key) {
  _container.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name,
          params,
          key,
        },
      ],
    }),
  );
}

function goBack() {
  _container.dispatch(CommonActions.goBack());
}
function openDrawer() {
  _container.dispatch(DrawerActions.openDrawer());
}
function toggleDrawer() {
  _container.dispatch(DrawerActions.toggleDrawer());
}
function navigate(name, params, key) {
  if (_container) {
    _container.dispatch(
      CommonActions.navigate({
        name,
        params,
        key,
      }),
    );
  }
}

function showAlert(params, key) {
  if (_container) {
    _container.dispatch(
      CommonActions.navigate(SCREEN.MODAL_NAVIGATION, {
        screen: SCREEN.ALERT_MODAL,
        params,
        key,
      }),
    );
  }
}

function showPopup(params, key) {
  if (_container) {
    _container.dispatch(
      CommonActions.navigate(SCREEN.MODAL_NAVIGATION, {
        screen: SCREEN.POPUP_MODAL,
        params,
        key,
      }),
    );
  }
}

function showBottom(params, key) {
  if (_container) {
    _container.dispatch(
      CommonActions.navigate(SCREEN.MODAL_NAVIGATION, {
        screen: SCREEN.BOTTOM_MODAL,
        params,
        key,
      }),
    );
  }
}

function navigateDeep(actions) {
  _container.dispatch(
    actions.reduceRight(
      (prevAction, action) =>
        CommonActions.navigate({
          name: action.name,
          params: action.params,
          action: prevAction,
        }),
      undefined,
    ),
  );
}

function getCurrentRoute() {
  if (!_container || !_container.state) {
    return _container.getCurrentRoute();
  }
  const findCurrentRoute = state => {
    const route = state.routes[state.index];

    if (route.state) {
      return findCurrentRoute(route.state);
    }

    return state;
  };

  return findCurrentRoute(_container.state);
}

function replace(name, params, key) {
  if (_container) {
    _container.dispatch(
      StackActions.replace({
        name,
        params,
        key,
      }),
    );
  }
}

function push(name, params, key) {
  if (_container) {
    _container.dispatch(StackActions.push(name, params));
  }
}

function replaceSecond(name, params) {
  if (_container) {
    _container.dispatch(state => {
      if (state.routes?.length > 1) {
        return CommonActions.reset({
          ...state,
          routes: [
            state.routes[0],
            {
              name,
              params,
            },
          ],
          index: 1,
        });
      } else {
        return CommonActions.navigate({
          name,
          params,
        });
      }
    });
  }
}

function replaceLast(name, params) {
  if (_container) {
    _container.dispatch(state => {
      if (state.routes?.length == 4) {
        return CommonActions.navigate({
          name,
          params,
        });
      }
      if (state.routes?.length > 1) {
        return CommonActions.reset({
          ...state,
          routes: [
            ...state.routes.slice(0, -1),
            {
              name,
              params,
            },
          ],
          index: state.routes.length - 1,
        });
      } else {
        return CommonActions.navigate({
          name,
          params,
        });
      }
    });
  }
}

const Navigator = {
  _container,
  setContainer,
  popToTop,
  navigateDeep,
  navigate,
  reset,
  goBack,
  getCurrentRoute,
  replace,
  replaceSecond,
  replaceLast,
  push,
  openDrawer,
  toggleDrawer,
  showBottom,
  showPopup,
  showAlert,
};

if (__DEV__) {
  Object.keys(Navigator).forEach(value => {
    const _func = Navigator[value];
    if (
      typeof _func === 'function' &&
      value !== 'goBack' &&
      value !== 'setContainer'
    ) {
      Navigator[value] = (...args) => {
        console.log(value, ...args);
        return _func(...args);
      };
    }
  });
}

export default Navigator;
