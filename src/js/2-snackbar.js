import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('[name=delay]');
const submitBtn = document.querySelector('[type=submit]');
const fulfilled = document.querySelector('[value=fulfilled]');

const createPromise = event => {
  event.preventDefault();
  const promise = new Promise((resolve, reject) => {
    console.log('robymo zapyt na server');
    const delay = input.value;
    setTimeout(() => {
      const isFulfilled = fulfilled.checked;
      if (isFulfilled) {
        resolve(
          iziToast.show({ message: `✅ Fulfilled promise in ${delay}ms` })
        );
      } else {
        reject(iziToast.show({ message: `❌ Rejected promise in ${delay}ms` }));
      }
    }, delay);
  });

  promise
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
};

submitBtn.addEventListener('click', createPromise);
