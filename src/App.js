import React, {useState} from 'react'
import {StatusBar, Dimensions} from 'react-native'
import styled, {ThemeProvider} from 'styled-components/native'
import {theme} from './theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppLoading from 'expo-app-loading'

import Input from './components/Input'
import Task from './components/Task'

export default function App() {
	const width = Dimensions.get('window').width

	// // 임시데이터
	// const tempData = {
	// 	1: {id: '1', text: 'React Native', completed: false},
	// 	2: {id: '2', text: 'Expo', completed: true},
	// 	3: {id: '3', text: 'JavaScript', completed: false}
	// }

	const [tasks, setTasks] = useState({})
	const [newTask, setNewTask] = useState('')
	//로딩 화면을 보여줄지 아니면 앱을 보여줄지에 대한 데이터
	const [isReady, setIsReady] = useState(false)

	// 1.데이터 저장 공간
	const storeDate = async (tasks) => {
		try {
			// 저장할 객체를 전달받고 문자열로 키 값을 해야하기 때문에 tasks라는 키와 전달된 객체를 문자열로 만들어서 저장한다.
			await AsyncStorage.setItem('tasks', JSON.stringify(tasks))
			setTasks(tasks)
		} catch (e) {
			//
		}
	}

	// 2. 저장된 데이터 불러오는 공간
	const getData = async () => {
		const loadedData = await AsyncStorage.getItem('tasks')
		// 가져온 데이터는 문자열이기 때문에 객체형태로 변경한다.
		setTasks(JSON.parse(loadedData || '{}'))
	}

	// 추가 함수
	const addTask = () => {
		if (newTask.length < 1) {
			return
		}
		const ID = Date.now().toString()
		const newTaskObject = {
			[ID]: {id: ID, text: newTask, completed: false}
		}
		alert(newTask)
		setNewTask('')
		storeDate({...tasks, ...newTaskObject})
	}

	// 삭제 함수
	const deleteTask = (id) => {
		// 현재 항목들과 동일한 항목을 갖고 있는 변수를 만든다.
		const currentTasks = Object.assign({}, tasks)
		// 변수에서 삭제하고자 하는 아이디 찾아 삭제를 한다.
		delete currentTasks[id]
		// 삭제하고자하는 삭제된 목록을 tasks에 대입
		storeDate(currentTasks)
		alert('삭제되었습니다.')
	}

	// 완료 함수
	const toggleTask = (id) => {
		const currentTasks = Object.assign({}, tasks)
		currentTasks[id]['completed'] = !currentTasks[id]['completed']
		storeDate(currentTasks)
	}

	// 수정 함수
	const updateTask = (item) => {
		const currentTasks = Object.assign({}, tasks)
		currentTasks[item.id] = item
		storeDate(currentTasks)
	}
	return isReady ? (
		<ThemeProvider theme={theme}>
			<Container>
				<Title>TODO LIST</Title>
				<StatusBar barStyle="light-content" backgroundColor={theme.background} />
				<Input placeholder="+ Add a Task" value={newTask} onChangeText={(text) => setNewTask(text)} onSubmitEditing={addTask} onBlur={() => setNewTask('')} />
				<List width={width}>
					{Object.values(tasks)
						.reverse()
						.map((item) => (
							<Task key={item.id} item={item} deleteTask={deleteTask} toggleTask={toggleTask} updateTask={updateTask} />
						))}
				</List>
			</Container>
		</ThemeProvider>
	) : (
		<AppLoading startAsync={getData} onFinish={() => setIsReady(true)} onError={() => {}} />
	)
}

const Container = styled.SafeAreaView`
	flex: 1;
	background-color: ${({theme}) => theme.background};
	align-items: center;
	justify-content: flex-start;
`
const Title = styled.Text`
	font-size: 40px;
	font-weight: 600;
	color: ${({main}) => theme.main};
	width: 100%;
	align-items: flex-end;
	padding: 0 20px;
`
const List = styled.ScrollView`
	flex: 1;
	width: ${({width}) => width - 40};
`
