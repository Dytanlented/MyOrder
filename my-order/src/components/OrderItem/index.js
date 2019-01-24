import React, { Component } from 'react';
import './style.css';
 
class OrderItem extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			stars:this.props.data.stars || 0,
			editing: false,
			comment: this.props.data.comment || ""
		}
	}
	render() {
		const { shop, product, price, picture, ifCommented} = this.props.data;
		return (
			<div className='orderItem'>
				<div className='orderItem__picContainer'>
					<img className='orderItem__pic' src={picture}/>
				</div>
				<div className='orderItem__content'>
					<div className='orderItem__product'>{product}</div>
					<div className='orderItem__shop'>{shop}</div>
					<div className='orderItem__detail'>
						<div className='orderItem__price'>{price}</div>
						<div >
							{
								ifCommented ? (
									<button className='orderItem__btn orderItem__btn--grey'>已评价</button>
								):(
									<button className='orderItem__btn orderItem__btn--red' onClick=
									{this.handleOpenEditArea}>评价
									</button>
								)
							}
							
			
						</div>
					</div>
				</div>
				{this.state.editing? this.renderEditArea():null}
			</div>
		);
	}

	renderEditArea() {
		return (
			<div className='orderItem__commentContainer'>
				<textarea onChange={this.handleCommentChange}
				value= {this.state.comment}
				className='orderItem__comment'/>
				{this.renderStars()}
				<button className='orderItem__btn orderItem__btn--red' onClick=
				{this.handleSubmitComment}>提交</button>
				<button className='orderItem__btn orderItem__btn--grey' onClick=
				{this.handleCancleComment}>取消</button>
			</div>
		)
	}

	renderStars() {
		const { stars } = this.state;
		return(

			<div>
				{
					[1,2,3,4,5].map((item,index) => {
						const lightClass = stars >= item ?
						"orderItem__star--light" : "orderItem__star";
						return (
							<span onClick={this.handleClickStars.bind(this,item)}
							className={ lightClass } 
							key={index}>
							★
							</span>
						)
					})
				}
				
				
			</div>
		)
	}

	handleOpenEditArea = () => {
		this.setState({
			editing: true
		})
	}

	handleCommentChange = (e) => {
		 this.setState({
		 	comment:e.target.value
		 })
	}

	handleClickStars = (stars) => {
		this.setState({
			stars:stars
		})
	}

	handleCancleComment = () => {
		this.setState({
			editing:false,
			comment:"",
			stars:0
		})
	}

	handleSubmitComment = () => {
		const { id } = this.props.data;
		const { comment, stars } = this.state;
		this.setState({
			editing:false,

		})
		this.props.onSubmit(id, comment, stars)
	}
}

export default OrderItem;