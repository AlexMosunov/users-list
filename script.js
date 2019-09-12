
class DataService {
    constructor(url) {
        this.url = url;
    }

    async getUsers() {
        try {
            let response = await fetch(`${this.url}/?nat=us&results=20&inc=name,dob`);
            let data = await response.json();

            return data.results;
        } catch (error) {
            throw new Error('Could not get user data');
        }
    }
};

let users;


(async () => {
    let dataService = new DataService('https://randomuser.me/api');
    try {
        users = await dataService.getUsers();
        render(users);
        document.querySelector('.header').addEventListener('click', event => {
            if (event.target.classList.contains('a-z')) {
                sortNames(users);
                render(users);

            } else if (event.target.classList.contains('z-a')) {
                sortNames(users).reverse();
                render(users);
            } else if (event.target.classList.contains('age-increasing')) {
                sortAge(users);
                render(users);
            } else if (event.target.classList.contains('age-decreasing')) {
                sortAge(users).reverse();
                render(users);
            }
        });

    } catch (error) {
        console.error(error);
    }

})();


class User {
    constructor(name, dob) {
        this.name = name;
        this.dob = dob;
    }
    getUser() {
        return (`${this.name} ${this.dob}`);
    }
}


function sortNames(data) {
    return data.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1);
}
function sortAge(data) {
    return data.sort((a, b) => {
        firstDate = new Date(a.dob.date);
        secondDate = new Date(b.dob.date);
        return (firstDate > secondDate) ? 1 : -1;
    })
}

function render(users) {
    document.querySelector('.users').innerHTML = '';
    users.forEach(item => {
        let user = new User(item.name.first, item.dob.date);
        document.querySelector('.users').insertAdjacentHTML('beforeend', `<li>${user.getUser()}</li>`)
    });
}


