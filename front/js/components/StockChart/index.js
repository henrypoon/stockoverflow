import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactFC from 'react-fusioncharts';
import fusioncharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import PropTypes from 'prop-types';
import { setCurrPrice } from '../../actions/tradeActions';

@connect((store) => {
	return {
		balance: store.user.balance
	};
})
export default class StockChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stockList: '',
			data: {},
			description: ''
		};
	}

	componentWillMount() {
		this.getDes();
		this.getStock();
	}

	getDes() {
		axios.get('https://sandbox.tradier.com/v1/markets/lookup?q=' + this.props.stockID, {
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer pxibpJik4b0nxFtuXcuXcpPMcJ0A'
			}
		})
		.then((response) => {
			this.setState({
				description: response.data.securities.security.description || response.data.securities.security[0].description
			});
		})
		.catch((error) => {
			console.log(error);
		});
	}

	getStock() {
		axios.get('https://sandbox.tradier.com/v1/markets/history?symbol=' + this.props.stockID + '&interval=weekly', {
			headers: {
				Accept: 'application/json',
				Authorization: 'Bearer pxibpJik4b0nxFtuXcuXcpPMcJ0A'
			}
		})
		.then((response) => {
			this.props.dispatch(setCurrPrice(this.props.stockID, response.data.history.day[0].open));
			const category = response.data.history.day.map((e) => {
				return {'label': e.date.replace('2017-', '')};
			});
			let categories = [];
			categories.push({'category': category});
			// console.log(categories);
			const data = response.data.history.day.map((e) => {
				return {'value': e.open.toString()};
			});
			let dataset = [];
			let obj = {'seriesname': 'Price(In USD)','renderas': 'area', 'showvalues': '0', 'data':data };
			dataset.push(obj);

			const max = response.data.history.day[0].open*1.5;
			const min = response.data.history.day[0].open*0.5;
			const des = this.state.description;
			this.setState({
				data: {'chart': {
					'caption': des,
					'subcaption': 'NasdaqGS - NasdaqGS Delayed Price.',
					'xaxisname': 'Date',
					'yaxisname': 'Amount (In USD)',
					'numberprefix': '$',
					'theme': 'ocean'
				}, 'categories': categories, 'dataset':dataset}
			});
		})
		.catch((error) => {
			console.log(error);
		});
	}

	render() {
		charts(fusioncharts);
		var props_multi_chart = {
			id: 'msline_chart',
			type: 'msline',
			width: '100%',
			height: '80%',
			dataFormat: 'json',
			dataSource: this.state.data
		};
		return (
			<div id='chart-container'>
				<ReactFC {...props_multi_chart} />
			</div>
		);
	}
}

StockChart.propTypes = {
	stockID: PropTypes.string,
	dispatch: PropTypes.function
};
