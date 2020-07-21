import * as RootNavigation from './navigationRef';

export function goToHome(){
    RootNavigation.navigate('Tasks')
}

export function goToCreate(){
    RootNavigation.navigate(
      'TaskCreate'
    )
  }

export function goToEdit(id){
    RootNavigation.navigate({
      name: 'TaskCreate',
      params: {
        id
      }
    })
}

export function goToHomeWithoutToken(){
  RootNavigation.navigate('Home')
}

export function goToAuth(){
  RootNavigation.navigate('Auth')
}

export function goToRegister(){
  RootNavigation.navigate('Registration')
}