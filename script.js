$.get( "http://217.71.129.139:4003/students.php", function(data) {
let students = JSON.parse(data).response;
let tabs = document.querySelector('#tabs');

	let groups = [];
	let container = [];
		students.forEach((item) => {
			let group = item['group'] ?? 'Без группы';
			groups[group] = groups[group] ?? [];
			groups[group].push(item);
		});
	
	let titles = document.createElement('ul');	
	let counter = 1;		
		for (const group in groups) {
			titles.innerHTML += '<li><a href="#tabs-' + counter + '">' + group + '</a></li>';

			let block = document.createElement('div');
			block.setAttribute('id', 'tabs-' + counter);
							
			let table = document.createElement('table');
			table.innerHTML = '<tr id="first"><td>ID</td><td>Фамилия</td><td>Имя</td><td>Средняя оценка</td></tr>';
			table.insertAdjacentHTML('beforeend', groups[group].map((item) => {
				return '<tr><td>' + item.id + '</td><td>' + item.surname + '</td><td>' + item.name + '</td><td>' + average(item.scores) + '</td></tr>';
			}).join(''));
						
			block.append(table);
			container.push(block);
			counter++;
		}

	tabs.append(titles);
	tabs.append(...container);
	$(tabs).tabs();

		});
			
	function average(nums) {
		if(Array.isArray(nums)) {
			let num = nums.reduce((a, b) => (a + b)) / nums.length;
			return num.toFixed(1);
		}
	}
		
