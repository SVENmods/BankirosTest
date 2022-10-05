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
    label.innerHTML = String(value).replace(
      /(\d)(?=(\d{3})+([^\d]|$))/g,
      "$1,"
    );
  })
);

document.querySelector(".cost-label").addEventListener("change", function () {
  console.log(document.querySelector(".cost-label"));
});

slider[0].oninput = function () {
  progress[0].style.width = `${slider[0].value / 5}%`;
};

slider[1].oninput = function () {
  progress[1].style.width = `${slider[1].value / 100}%`;
};

slider[2].oninput = function () {
  progress[2].style.width = `${slider[2].value * 1.58}%`;
};

document.querySelector(".number-input").addEventListener("change", function () {
  document.querySelector("#implementation").value =
    (document.querySelector(".number-input").value - 1) * 20 + 219;
});

slider.forEach((element) =>
  element.addEventListener("change", function () {
    const impVal =
      (document.querySelector(".number-input").value - 1) * 20 + 219;
    document.querySelector("#implementation").value =
      String(impVal).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1,") + " €";

    const saveVal =
      (((slider[0].value * slider[1].value * slider[2].value) / 100 / 100) *
        94.69375) /
      100;
    document.querySelector("#saving").value =
      String(Math.round(saveVal)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1,") +
      " €";

    const roiVal = impVal / saveVal;
    if (saveVal < 1) {
      document.querySelector("#roi").value = "Infinity";
    } else document.querySelector("#roi").value = roiVal.toFixed(2);
  })
);

const form = document.querySelector(".calc-container");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  form.reset();
  console.log(
    "Form Submitted!",
    "||",
    "Implementation costs: ",
    document.querySelector("#implementation").value,
    "||",
    "Mounthly saving: ",
    document.querySelector("#saving").value,
    "||",
    "ROI in mounths: ",
    document.querySelector("#roi").value,
    "||",
    "Number of units: ",
    document.querySelector(".number-input").value,
    "||",
    "Cost per unit per year: ",
    document.querySelector(".cost-input").value,
    "||",
    "Saving per unit: ",
    document.querySelector(".saving-input").value
  );
});

document.querySelector(".send-button").addEventListener("click", function () {
  form.requestSubmit();
});
