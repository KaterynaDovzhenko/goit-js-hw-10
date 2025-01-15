import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('[name=delay]');
// const submitBtn = document.querySelector('[type=submit]');
const fulfilled = document.querySelector('[value=fulfilled]');

const createPromise = event => {
  event.preventDefault();
  const promise = new Promise((resolve, reject) => {
    const delay = input.value;
    setTimeout(() => {
      const isFulfilled = fulfilled.checked;
      if (isFulfilled) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.show({ message: `✅ Fulfilled promise in ${delay}ms` });
    })
    .catch(delay => {
      iziToast.show({ message: `❌ Rejected promise in ${delay}ms` });
    });
};

form.addEventListener('submit', createPromise);
