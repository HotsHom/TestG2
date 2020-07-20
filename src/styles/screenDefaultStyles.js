import {StyleSheet} from 'react-native';

export const defaultStyles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
  },
  centerText: {
    color: '#dbdbdb',
    textAlignVertical: 'center',
    textAlign: 'center',
    marginBottom: 10,
  },
  textInput: {
    marginVertical: 5,
    color: '#ffffff',
    height: 35,
    width: '50%',
    borderColor: '#bbbaba',
    borderWidth: 1,
    borderRadius: 50,
    padding: 8,
  },
  button: {
    backgroundColor: '#fde1ab',
    borderColor: '#fde1ab',
    color: '#343434',
    borderWidth: 1,
    borderRadius: 15,
    width: '50%',
    textAlign: 'center',
    margin: 10,
  },
  horizontalConteiner : {
    display : 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
