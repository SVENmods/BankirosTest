const range = document.getElementById("range");

const slider = [
  document.querySelector(".number-input"),
  document.querySelector(".cost-input"),
  document.querySelector(".saving-input"),
];

const progress = [
  document.querySelector(".number-progress"),
  document.querySelector(".cost-progress"),
  document.querySelector(".saving-progress"),
];

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

slider.forEach((element) =>
  element.addEventListener("input", (e) => {
    const value = +e.target.value;
    const label = e.target.nextElementSibling;
    const rangeWidth = getComputedStyle(e.target).getPropertyValue("width");
    const labelWidth = getComputedStyle(label).getPropertyValue("width");
    const numWidth = +rangeWidth.substring(0, rangeWidth.length - 2);
    const numLabelWidth = +labelWidth.substring(0, labelWidth.length - 2);
    const max = +e.target.max;
    const min = +e.target.min;
    const left =
      value * (numWidth / max) -
      numLabelWidth / 2 +
      scale(value, min, max, 10, -10);
    label.style.left = `${left}px`;
    label.innerHTML = value;
  })
);

slider[0].oninput = function () {
  progress[0].style.width = `${slider[0].value / 5}%`;
};

slider[1].oninput = function () {
  progress[1].style.width = `${slider[1].value / 100}%`;
};

slider[2].oninput = function () {
  progress[2].style.width = `${slider[2].value * 1.58}%`;
};

function ALERTNUM() {
  const num1 = [
    document.querySelector(".number-input").value,
    document.querySelector(".cost-input").value,
    document.querySelector(".saving-input").value,
  ];
  alert(num1);
}

// const implementation = document.querySelector("#implementation").value;

// document
//   .querySelector(".number-input")
//   .addEventListener("change", function () {
//      document.querySelector("#implementation").value = 219;
//     console.log(document.querySelector("#implementation").value);
//   });

// console.log(implementation);
document.querySelector("#implementation").value =
  document.querySelector("#implementation").value + " €";

document.querySelector(".number-input").addEventListener("change", function () {
  document.querySelector("#implementation").value =
    (document.querySelector(".number-input").value - 1) * 20 + 219;

  document.querySelector("#roi").value =
    document.querySelector("#implementation").value /
    document.querySelector("#saving").value;
});

document.querySelector("#implementation").value = implVAL;
