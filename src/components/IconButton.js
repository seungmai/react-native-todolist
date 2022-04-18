import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'
import {icons} from '../icons'

const IconButton = ({icon, onPress, item}) => {
	// id값이 있어야 삭제를 할수있기 떄문에 id와 같이 넘겨줌
	const _onPress = () => {
		onPress(item.id)
	}
	return (
		<TouchableOpacity onPress={_onPress}>
			<View>
				<Icon source={icon} completed={item.completed}></Icon>
			</View>
		</TouchableOpacity>
	)
}

const Icon = styled.Image`
	width: 30px;
	height: 30px;
	margin: 10px;
	tint-color: ${({theme, completed}) => (completed ? theme.done : theme.text)};
`

IconButton.propTypes = {
	icon: PropTypes.oneOf(Object.values(icons)).isRequired,
	onPress: PropTypes.func,
	item: PropTypes.object
}

IconButton.defaultProps = {
	item: {completed: false}
}

export default IconButton
