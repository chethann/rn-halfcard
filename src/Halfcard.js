import React, { Component } from 'react'
import {
	Animated,
	Modal,
	TouchableHighlight,
	Dimensions,
	StyleSheet,
	Keyboard,
	View } from 'react-native'

const styles = StyleSheet.create({
	overlay: {
		flexGrow: 1,
		backgroundColor: 'rgb(0,0,0)',
	},

	content: {
		position: 'absolute',
		left: 0,
		right: 0,
	},

	container: { flexGrow: 1 },
})

class Halfcard extends Component {

	constructor (props) {
		super(props)
		const { height } = Dimensions.get('window')
		this.animateHeight = this.props.height || height
		this.state = {
			modalVisible: false,
			position: new Animated.Value(-1 * this.animateHeight),
			opacity: new Animated.Value(0),
		}
		this.hideModal = this.hideModal.bind(this)
	}

	componentDidMount () {
		this.isComponentMounted = true
	}

	componentWillUnmount () {
		this.isComponentMounted = false
	}

	setModalVisible (visible) {
		this.setState({ modalVisible: visible })
	}

	animateUp () {
		const slideAnimation = Animated.timing(
			this.state.position,
			{
				toValue: 0,
				duration: this.props.slideDuration || 300,
			},
		)

		const fadeAnimation = Animated.timing(
			this.state.opacity,
			{
				toValue: 0.4,
				duration: this.props.slideDuration || 300,
				useNativeDriver: true,
			},
		)

		Animated.parallel([ slideAnimation, fadeAnimation ]).start()
	}

	animateDown () {
		const slideDownTo = -1 * this.animateHeight
		const slideAnimation = Animated.timing(
			this.state.position,
			{
				toValue: this.props.slideDownTo || slideDownTo,
				duration: this.props.slideDuration || 300,
			},
		)

		const fadeAnimation = Animated.timing(
			this.state.opacity,
			{
				toValue: 0,
				duration: this.props.slideDuration || 300,
				useNativeDriver: true,
			},
		)

		Animated.parallel([ slideAnimation, fadeAnimation ]).start(() => {
			this.props.onClose && this.props.onClose()
			this.setModalVisible(false)
		})
	}

	close () {
		if (!this.isComponentMounted)
			return
		this.props.onCloseStart && this.props.onCloseStart()
		this.animateDown()
		Keyboard.dismiss()
	}

	show () {
		if (!this.isComponentMounted)
			return
		this.setModalVisible(true)
		this.animateUp()
	}

	render () {
		const heightStyle = this.props.height ? { height: this.props.height } : {}
		const containerStyle = { opacity: this.state.opacity, flexGrow: 1 }
		return (
			<View>
				<Modal
					transparent
					visible={ this.state.modalVisible }
					onShow={ this.props.onShow }
					onRequestClose={ this.hideModal }
				>
					<View style={ styles.container }>
						<Animated.View style={ containerStyle }>
							<TouchableHighlight
								style={ styles.overlay }
								onPress={ this.hideModal }
							>
								<View />
							</TouchableHighlight>
						</Animated.View>

						<Animated.View style={ [ styles.content, heightStyle, { bottom: this.state.position } ] }>
							{this.props.children}
						</Animated.View>
					</View>
				</Modal>
			</View>
		)
	}
}

Halfcard.propTypes = {
	height: React.PropTypes.number,
	slideDownTo: React.PropTypes.number,
	onShow: React.PropTypes.func,
	onClose: React.PropTypes.func,
	children: React.PropTypes.object,
	slideDuration: React.PropTypes.number,
	onCloseStart: React.PropTypes.func,
}

export default Halfcard
