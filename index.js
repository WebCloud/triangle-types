const sides = Array.from(document.querySelectorAll('input[type="number"]'));
const images = document.querySelector('.images');
let timeout;

const guessTriangle = () => {
  clearTimeout(timeout);

  images.classList.remove('equilateral', 'isosceles', 'scalene');
  const sidesValue = {};
  
  try {
    sides.forEach((side, index) => {
      const value = parseInt(side.value);
      
      if (isNaN(value)) {
        throw new Error('The "tri" in triangle is there for a reason 🤓...');
      }

      sidesValue[`side${index + 1}`] = value;
    });
  } catch(error) {
    ts.ui.Notification.error(error.message);
    return;
  }

  const { side1, side2, side3 } = sidesValue;
  const imageClass = ['show'];
  let message = '';

  if (side1 === side2 && side1 === side3) {
    message = 'You equilateral dawg.';
    imageClass.push('equilateral');
  } else if (side1 === side2 || side1 === side3 || side2 === side3) {
    message = "I've heard being isosceles is so hot right now.";
    imageClass.push('isosceles');
  } else {
    message = 'You have nothing in common! You scalene scum!';
    imageClass.push('scalene');
  }

  images.classList.add(...imageClass);
  ts.ui.Notification.success(message);

  timeout = setTimeout(() => {
    images.classList.remove('show');
  }, 3000);
}

document.querySelector('.ts-primary').onclick = guessTriangle;