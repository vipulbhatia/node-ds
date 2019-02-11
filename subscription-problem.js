
const subscriptions = [
	{
		start: new Date("2019-01-01"),//yyyy-mm-dd
		end: new Date("2019-01-15"),
		type: 'plan',
		feature: 'storage',
		value: 10,
		units: 'GB'
	},
	{
		start: new Date("2019-01-14"),//yyyy-mm-dd
		end: new Date("2019-01-30"),
		type: 'addon',
		feature: 'storage',
		value: 10,
		units: 'GB'
	}
];

/*
const subscriptions = [
	{
		start: new Date("2019-01-01"),//yyyy-mm-dd
		end: new Date("2019-01-31"),
		type: 'plan',
		feature: 'storage',
		value: 30,
		units: 'GB'
	},
	{
		start: new Date("2019-01-31"),//yyyy-mm-dd
		end: new Date("2019-02-15"),
		type: 'addon',
		feature: 'storage',
		value: 10,
		units: 'GB'
	},
	{
		start: new Date("2019-01-31"),//yyyy-mm-dd
		end: new Date("2019-02-15"),
		type: 'addon',
		feature: 'storage',
		value: 10,
		units: 'GB'
	},
	{
		start: new Date("2019-02-25"),//yyyy-mm-dd
		end: new Date("2019-03-25"),
		type: 'addon',
		feature: 'storage',
		value: 10,
		units: 'GB'
	}
];
*/
const generateEntitlements = (subscriptions) => {
	let timeline = [];
	let stack = [];
	let counter = 0;
	let last_checkpoint_value = 0;
	let extra_value_added = false;
	let extra_value = 0;
	let entitlements = [];
	console.log('subscriptions:', subscriptions);
	subscriptions.forEach((subscription) => {
		timeline.push({ timestamp: subscription.start, value: subscription.value, op: '+' });
		timeline.push({ timestamp: subscription.end, value: subscription.value, op: 'o' });
		let end_date = new Date(subscription.end);
		end_date.setDate(subscription.end.getDate() + 1);
		//console.log('end_date', end_date, 'subscription.end', subscription.end);
		timeline.push({ timestamp: end_date, value: subscription.value, op: '-' });
	});
	sorted_timeline = timeline.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1 );
	console.log('sorted timeline:', sorted_timeline);
	let i = 0;
	while(sorted_timeline[i] !== undefined) {
		console.log('on timestamp', sorted_timeline[i]);
		console.log('current stack', stack);
		if(stack.length === 0) {
			if(sorted_timeline[i].op === 'o') {
				i++;
				continue;
			} else {
				stack.push(sorted_timeline[i]);
				sorted_timeline[i].op === '+' ? counter += sorted_timeline[i].value : counter -= sorted_timeline[i].value ;
				i++;
			}
		} else {
			if(sorted_timeline[i].timestamp.getTime() === stack[0].timestamp.getTime()) {
				stack.pop();
			} else {
				stack.push(sorted_timeline[i]);
				while(stack.length !== 0) {
					const end = stack.pop();
					const start = stack.pop();
					console.log('poped', end, start);
					let entitlement = {
						start: start.timestamp,
						end: end.timestamp,
						value: counter
					}
					if(entitlement.value) entitlements.push(entitlement);
					//console.log('entitlement:', entitlement);
				}	
			}
		}
	}
	console.log('entitlements:', entitlements);
	return entitlements;
}
/*
const generateEntitlements = (subscriptions) => {
	let timeline = [];
	let stack = [];
	let counter = 0;
	let last_checkpoint_value = 0;
	let extra_value_added = false;
	let extra_value = 0;
	let entitlements = [];
	subscriptions.forEach((subscription) => {
		timeline.push({ timestamp: subscription.start, value: subscription.value, op: '+' });
		timeline.push({ timestamp: subscription.end, value: subscription.value, op: '-' });
	});
	sorted_timeline = timeline.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1 );
	console.log(sorted_timeline);
	sorted_timeline.forEach((checkpoint) => {
		console.log('current checkpoint', checkpoint);
		if(stack.length === 0) {
			stack.push(checkpoint);
			(checkpoint.op === '+') ? counter += checkpoint.value : counter -= checkpoint.value;
		} else {
			let last_checkpoint = stack[stack.length-1]; //case if two timestamps collide
			console.log('last_checkpoint', last_checkpoint, checkpoint.timestamp);
			if(last_checkpoint.timestamp.getTime() === checkpoint.timestamp.getTime()) {
				console.log('timestamps equal');
				if(last_checkpoint.op === '+' && checkpoint.op === '+') { //if both timestamps are add then add values
					console.log('not pushing');
					counter += checkpoint.value;
					return;
				} else if(last_checkpoint.op === '-' && checkpoint.op === '-') {
					console.log('here', last_checkpoint_value, counter);
					extra_value_added = true;
					extra_value += last_checkpoint_value;
					counter += extra_value; //add last value to undo
				} else if (last_checkpoint.op != checkpoint.op) {
					extra_value_added = true;
					extra_value += last_checkpoint_value;
					extra_value += checkpoint.value;
					counter += extra_value;
				}
			}
			console.log('pushing', checkpoint);
			stack.push(checkpoint);
			console.log(stack);
			while(stack.length !== 0) {
				const end = stack.pop();
				const start = stack.pop();
				let entitlement = {
					start: start.timestamp,
					end: end.timestamp,
					value: counter
				}
				entitlements.push(entitlement);
			}
			stack.push(checkpoint);
			(checkpoint.op === '+') ? counter += checkpoint.value : counter -= checkpoint.value;
			if(extra_value_added) {
				counter -= extra_value;
				extra_value_added = false;
			}
		}
		last_checkpoint_value = checkpoint.value;
	});
	return entitlements;
}
*/
generateEntitlements(subscriptions);