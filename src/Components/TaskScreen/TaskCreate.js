import React from 'react'
import {View, Text, TextInput, Alert, Switch} from 'react-native' 
import {observer} from 'mobx-react';
import { Button } from 'react-native-elements';

import {defaultStyles} from '../../styles/screenDefaultStyles';
import TasksStore from '../../ModuleRepositories/local/store/tasksStore';
import { goToHome } from '../../ModuleRepositories/local/navigationService';
import HistoryStore from '../../ModuleRepositories/local/store/historyStore';

export const TaskCreate = observer(() => {
    exitPtotect = () => {
        TasksStore.task.changed ?
            Alert.alert( 'Отменить изменения?', 'Вы уверены что хотите не сохранять изменения?',
                [
                  { text: "Сохранить", style: 'cancel', onPress: () => {TasksStore.CreateOrChangeTask()} },
                  {
                    text: 'Не сохранять',
                    style: 'destructive',
                    onPress: () => {goToHome()},
                  },
                ]
            )
        : goToHome()
    }

    const toggleSwitch = () => { 
        HistoryStore.addPast()
        TasksStore.switchDone()
        TasksStore.change()
    }

    return (
        <View style={ [ defaultStyles.screen, {width : '100%'} ] }>
            <View>
                <View style={ defaultStyles.horizontalConteiner }>
                    <Button 
                        onPress={ () => HistoryStore.getPast() } 
                        titleStyle={ {color: '#232323'} }
                        containerStyle={ defaultStyles.button }
                        type="clear"
                        title="Undo"
                        />
                    <Button 
                        onPress={ () => HistoryStore.getFuture() } 
                        titleStyle={ {color: '#232323'} }
                        containerStyle={ defaultStyles.button }
                        type="clear"
                        title="Redo"
                    />
                </View>
                <Text style={ defaultStyles.centerText }>
                    {TasksStore.task.id ? 'Редактирование таска' : 'Создание таска'}
                </Text>
            </View>
            <TextInput
                style = { defaultStyles.textInput }
                value = { TasksStore.task.title }
                onChange = { event => {
                    HistoryStore.addPast()
                    TasksStore.setField('title', event.nativeEvent.text);
                    TasksStore.change()
                }}
                placeholder="Заголовок"
                placeholderTextColor="#fff"
            />
            <TextInput
                multiline={ true }
                style={ [defaultStyles.textInput, {height: "30%", borderRadius: 10, }] }
                value = { TasksStore.task.body }
                onChange = { event => {
                    HistoryStore.addPast()
                    TasksStore.setField('body', event.nativeEvent.text);
                    TasksStore.change()
                }}
                placeholder="Текст"
                placeholderTextColor="#fff"
            />
            <View style={defaultStyles.horizontalConteiner}>
                <Text style={defaultStyles.centerText}>
                    Актуально
                </Text>
                <Switch
                    trackColor={{ false: "#f4f3f4", true: "#f4f3f4" }}
                    thumbColor={TasksStore.task.done ? "#ff9f75" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={TasksStore.task.done}
                    style={{marginHorizontal: 5}}
                />
                <Text style={defaultStyles.centerText}>
                    Завершено
                </Text>
            </View>
            <Button 
                containerStyle={ defaultStyles.button }
                titleStyle={ {color: '#232323'} }
                type="clear"
                title='Сохранить'
                onPress={ () => { TasksStore.CreateOrChangeTask() } }
            />
            <Button 
                containerStyle={ defaultStyles.button }
                titleStyle={ {color: '#232323'} }
                type="clear"
                title='Закрыть'
                onPress={ () => { exitPtotect() } }
            />
        </View>
    )
})