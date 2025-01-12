import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');

startBtn.disabled = true;
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= Date.now()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;

      // Оновлення інтерфейсу після вибору дати
      const initialTime = timer.convertMs(userSelectedDate - Date.now());
      timer.updateUI(initialTime);
    }
  },
};

flatpickr(datetimePicker, options);

const timer = {
  intervalId: null,
  elements: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },
  start() {
    if (!userSelectedDate) {
      return;
    }
    datetimePicker.disabled = true;
    startBtn.disabled = true;

    this.intervalId = setInterval(() => {
      const ms = userSelectedDate - Date.now();
      if (ms <= 0) {
        this.stop();
        datetimePicker.disabled = false;
        return;
      }
      const timeComponents = this.convertMs(ms);
      this.updateUI(timeComponents);
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    datetimePicker.disabled = false;
  },
  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },
  updateUI({ days, hours, minutes, seconds }) {
    this.elements.days.textContent = this.pad(days);
    this.elements.hours.textContent = this.pad(hours);
    this.elements.minutes.textContent = this.pad(minutes);
    this.elements.seconds.textContent = this.pad(seconds);
  },
  pad(value) {
    return String(value).padStart(2, '0');
  },
};

startBtn.addEventListener('click', () => timer.start());
