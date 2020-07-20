import * as RootNavigation from '../../Components/Navigation/navigationRef';

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