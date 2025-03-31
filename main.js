// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', function() {
  // Get all like buttons (hearts)
  const likeButtons = document.querySelectorAll('.like');

  // Get the modal and error message elements
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');

  // Make sure modal is hidden on page load
  modal.classList.add('hidden');

  // Add event listeners to each "Like!" button
  likeButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Check if the heart is empty or full
      const glyph = this.querySelector('.like-glyph');

      // Simulate server call
      mimicServerCall()
        .then(() => {
          // If successful:
          if (glyph.innerHTML === 'EMPTY_HEART;') { // Empty heart
            glyph.innerHTML = 'FULL_HEART;'; // Full heart (red)
            this.classList.add('activated-heart'); // Make the heart red
          } else { // Full heart
            glyph.innerHTML = 'EMPTY_HEART;'; // Empty heart
            this.classList.remove('activated-heart'); // Remove red color
          }
        })
        .catch((errorMessage) => {
          // If there's an error, show the modal
          modal.classList.remove('hidden');
          modalMessage.innerText = errorMessage;

          // Hide the modal after 3 seconds
          setTimeout(() => {
            modal.classList.add('hidden');
          }, 3000);
        });
    });
  });
});



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
