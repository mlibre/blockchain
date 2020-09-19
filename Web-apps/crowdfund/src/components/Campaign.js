import React, { Component } from 'react';
import { Button, Input, Table, TableRow, TableBody } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

export class Campaign extends Component
{
	ONGOING_STATE = '0'
	FAILED_STATE = '1'
	SUCCEEDED_STATE = '2'
	PAID_OUT_STATE = '3'
	
	state = {
		campaign:
		{
			name: 'N/A',
			targetAmount:0,
			totalCollected: 0,
			campaignFinished: false,
			deadline: new Date(0),
			isBeneficiary: false,
			state: ''
		},
		contributionAmount: '0'
	}
	constructor(props){
		super(props);
		this.onContribute = this.onContribute.bind(this);
	};
	async componentDidMount(){
		const currentCampaign = this.getCampaign(this.getCampaignAddress())
		this.setState({
			campaign: currentCampaign
		})
	}
	getCampaignAddress(){
		return this.props.match.params.address
	}
	getCampaign(address)
	{
		return{
			name: 'Contract Name',
			targetAmount: 100,
			totalCollected: 50,
			campaignFinished: false,
			deadline: new Date(),
			isBeneficiary: true,
			state: this.ONGOING_STATE
		}
	}
	render(){
		return(
			<div>
				<Table celled padded color="teal" striped>
					<Table.Header>
						<TableRow>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Value</Table.HeaderCell>
						</TableRow>
					</Table.Header>
					<TableBody>
						<TableRow>
							<Table.Cell singleLine>
								Name
							</Table.Cell>
							<Table.Cell singleLine>
								{this.state.campaign.name}
							</Table.Cell>
						</TableRow>
						<TableRow>
							<Table.Cell singleLine>
								Target Amount
							</Table.Cell>
							<Table.Cell singleLine>
								{this.state.campaign.targetAmount}
							</Table.Cell>
						</TableRow>
						<TableRow>
							<Table.Cell singleLine>
								Total Collected
							</Table.Cell>
							<Table.Cell singleLine>
								{this.state.campaign.totalCollected}
							</Table.Cell>
						</TableRow>
						<TableRow>
							<Table.Cell singleLine>
								Campaign Finished
							</Table.Cell>
							<Table.Cell singleLine>
								{this.state.campaign.campaignFinished.toString()}
							</Table.Cell>
						</TableRow>
						<TableRow>
							<Table.Cell singleLine>
								Deadline
							</Table.Cell>
							<Table.Cell singleLine>
								{this.state.campaign.deadline.toString()}
							</Table.Cell>
						</TableRow>
						<TableRow>
							<Table.Cell singleLine>
								Is Beneficiary
							</Table.Cell>
							<Table.Cell singleLine>
								{this.state.campaign.isBeneficiary.toString()}
							</Table.Cell>
						</TableRow>
						<TableRow>
							<Table.Cell singleLine>
								state
							</Table.Cell>
							<Table.Cell singleLine>
								{this.state.campaign.state}
							</Table.Cell>
						</TableRow>
						
					</TableBody>
					<Table.Footer fullWidth>
						<Table.Row>
							<Table.HeaderCell colSpan="2">
								{this.campaignIntractionSection()}
							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				</Table>
			</div>
		);
	}
	campaignIntractionSection()
	{
		if(this.state.campaign.campaignFinished)
		{
			return this.postCampaignInterface()
		}
		else
		{
			return this.contributeInterface()
		}
	}
	postCampaignInterface()
	{
		if(this.state.campaign.state === this.ONGOING_STATE){
			return <div>
				<Button type='submit' positive>Finish Campaign</Button>
			</div>
		}
		if(this.state.campaign.state === this.SUCCEEDED_STATE && this.state.campaign.isBeneficiary === true){
			return <div>
				<Button type='submit' positive>Collect Funds</Button>
			</div>
		}
		if(this.state.campaign.state === this.FAILED_STATE){
			return <div>
				<Button type='submit' positive>Refund</Button>
			</div>
		}
	}
	contributeInterface()
	{
		return <div>
			<Input
				action={{
					color: 'teal',
					content: 'Contribute',
					onClick: this.onContribute
				}}
				actionPosition='left'
				label='ETH'
				labelPosition='right'
				placeholder='1'
				onChange={(e) => this.setState({contributionAmount: e.target.value})}
			/>
			</div>
	}
	onContribute(event){
		alert(`Contribution ${this.state.contributionAmount} to a contract`)
	}
}