import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formRef = document.querySelector('.feedback-form');

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

loadPage();

formRef.addEventListener('input', throttle(onInputChange, 500));

function onInputChange(e) {
  const { name, value } = e.target;
  let savedData = load(STORAGE_KEY);
  savedData = savedData ? savedData : {};
  savedData[name] = value;
  save(STORAGE_KEY, savedData);
}

function loadPage() {
  const savedData = load(STORAGE_KEY);

  if (savedData) {
    Object.entries(savedData).forEach(([name, value]) => {
      formRef.elements[name].value = value;
    });
  }
}

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { email, message },
  } = e.currentTarget;

  if (email.value === '' || message.value === '') {
    return console.log('Please fill in all the fields!');
  }
  const formData = {
    email: email.value,
    message: message.value,
  };
  console.log(formData);
  remove(STORAGE_KEY);
  e.currentTarget.reset();
}

////////   Попередній варіант "для себе", майже все вийшло зробити ////////

// const formData = {};

// const emailRef = document.querySelector('.feedback-form input');
// const messageRef = document.querySelector('.feedback-form textarea');

// function onFormSubmit(e) {
//   e.preventDefault();
//   e.currentTarget.reset();
//   console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
//   localStorage.removeItem(STORAGE_KEY);
// }

// function onFormInput(e) {
//   //   const message = e.target.value;
//   //   localStorage.setItem(STORAGE_KEY, message);
//   formData[e.target.name] = e.target.value;
//   //   console.log(formData);
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
// }

// function shareSavedInput() {
//   const savedMessage = localStorage.getItem(STORAGE_KEY);

//   if (savedMessage) {
//     try {
//       const parsedMessage = JSON.parse(savedMessage);
//       console.log(parsedMessage);
//       emailRef.value = parsedMessage.email || '';
//       messageRef.value = parsedMessage.message || '';
//     } catch (error) {
//       console.log(error);
//     }
//   } else '';
// }

// formRef.addEventListener('input', throttle(onFormInput, 500));
// formRef.addEventListener('submit', onFormSubmit);
// shareSavedInput();

// create, read, update, delete
