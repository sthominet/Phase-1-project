// First Event Listener 
document.addEventListener('DOMContentLoaded', () => {
    fetchParks();
    searchParksByState();
})

// Fetch 
// The function getParks() fetches the data from the National Park Service using an API Key
function fetchParks() {
	fetch('https://developer.nps.gov/api/v1/parks?api_key=qh3WS45OJg8kF9CSaIP1qMPZn8heC2A2sfpY6UHC')
		.then(resp => {
			return resp.json()
		})
		.then(data => {
			parks = data
		})
}

// Selecting a state from the dropdown menu
function searchParksByState() {
  const searchButton = document.getElementById('submit')
  searchButton.addEventListener('click', () => {
      const state = document.getElementById('states-dropdown')
      const selectedState = [state].map(option => option.value) 
      renderParks(selectedState) 
  })
}

// Creating the list of Park Cards
function renderParks(selectedState) {
    const parkCard = document.getElementById('parks-list')
    parkCard.innerHTML = ' '
    let selectedParks = parks.data.filter(element => {
          return element.states.includes(selectedState)
        }
    )
    
    // Iterating over each of the elements in the filtered array
    for (let i = 0; i < selectedParks.length; i++) {
      const name = document.createElement('ul');
      const image = document.createElement('img');
      const description = document.createElement('p');
      const directions = document.createElement('a');
      const heart = document.createElement('button');
      const divider = document.createElement('h2');

      name.innerText = selectedParks[i].fullName
      image.src = selectedParks[i].images[0].url
      description.innerText = selectedParks[i].description
      directions.innerText = 'Take Me There'
      directions.href = selectedParks[i].directionsUrl
      directions.target = '_blank' // open link in new window
      heart.textContent = EMPTY_HEART
      divider.innerText = '_______________________________________________'

      parkCard.append(image, name, heart, description, directions, divider) 
      heart.addEventListener('click', likeButton)
    }
}  

// Simple Liker Function
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

const likeButton = (event) => {
  const liker = event.target;
  const like = liker.textContent;
  if(like===EMPTY_HEART) {
      liker.textContent = FULL_HEART
  } else {
      liker.textContent = EMPTY_HEART
  }
}
