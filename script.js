const bannerArea = document.getElementById("bannerArea");
const controls = document.getElementById("controls");
const imageUpload = document.getElementById("imageUpload");
const uploadedImage = document.getElementById("uploadedImage");
const bgMode = document.getElementById("bgMode");
const bgImageUpload = document.getElementById("bgImageUpload");
const bgImageLabel = document.getElementById("bgImageLabel");
const removeBgImageBtn = document.getElementById("removeBgImageBtn");
const imageScale = document.getElementById("imageScale");
const imageSize = document.getElementById("imageSize");
const leftText = document.getElementById("leftText");
const rightText = document.getElementById("rightText");
const leftTextDisplay = document.getElementById("leftTextDisplay");
const rightTextDisplay = document.getElementById("rightTextDisplay");
const fontSelect = document.getElementById("fontSelect");
const fontSize = document.getElementById("fontSize");
const fontColor = document.getElementById("fontColor");
const bgColor = document.getElementById("bgColor");
const centerBtn = document.getElementById("centerBtn");
const downloadBtn = document.getElementById("downloadBtn");
const notice = document.getElementById("notice");

let backgroundImage = null;

// Upload image
imageUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    uploadedImage.src = event.target.result;
    uploadedImage.style.left = "50%";
    uploadedImage.style.top = "50%";
    uploadedImage.style.width = imageSize.value + "px";
    uploadedImage.style.transform = "translate(-50%, -50%) scale(1)";
    bannerArea.style.display = "flex";
    controls.style.display = "flex";
    setTimeout(() => {
      bannerArea.style.opacity = "1";
      controls.style.opacity = "1";
    }, 50);
    notice.style.display = "none";
  };
  reader.readAsDataURL(file);
});
// Move image
let isDraggingImg = false,
  imgOffsetX,
  imgOffsetY;
uploadedImage.addEventListener("mousedown", (e) => {
  isDraggingImg = true;
  imgOffsetX = e.clientX - uploadedImage.getBoundingClientRect().left;
  imgOffsetY = e.clientY - uploadedImage.getBoundingClientRect().top;
});
document.addEventListener("mousemove", (e) => {
  if (isDraggingImg) {
    const parentRect = bannerArea.getBoundingClientRect();
    const newX = e.clientX - parentRect.left - imgOffsetX;
    const newY = e.clientY - parentRect.top - imgOffsetY;
    uploadedImage.style.left = newX + "px";
    uploadedImage.style.top = newY + "px";
  }
});
document.addEventListener("mouseup", () => (isDraggingImg = false));
// BACKGROUND MODE SWITCH
bgMode.addEventListener("change", () => {
  if (bgMode.value === "color") {
    bgColor.style.display = "inline-block";
    bgImageLabel.style.display = "none";
    removeBgImageBtn.style.display = "none";

    bannerArea.style.backgroundImage = "none";
  } else {
    bgColor.style.display = "none";
    bgImageLabel.style.display = "inline-block";
    removeBgImageBtn.style.display = "inline-block";
  }
});
// BACKGROUND IMAGE UPLOAD
bgImageUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    backgroundImage = ev.target.result;
    bannerArea.style.backgroundImage = `url(${backgroundImage})`;
  };
  reader.readAsDataURL(file);
});

// REMOVE BACKGROUND IMAGE
removeBgImageBtn.addEventListener("click", () => {
  backgroundImage = null;
  bannerArea.style.backgroundImage = "none";
  bgImageUpload.value = "";
});

// Image scale and size
imageScale.addEventListener("input", () => {
  uploadedImage.style.transform = `translate(-50%, -50%) scale(${imageScale.value})`;
});
imageSize.addEventListener("input", () => {
  uploadedImage.style.width = imageSize.value + "px";
});

// Text updates
leftText.addEventListener(
  "input",
  () => (leftTextDisplay.textContent = leftText.value)
);
rightText.addEventListener(
  "input",
  () => (rightTextDisplay.textContent = rightText.value)
);

// Make text draggable
const makeTextDraggable = (element) => {
  let dragging = false,
    offsetX,
    offsetY;
  element.addEventListener("mousedown", (e) => {
    dragging = true;
    offsetX = e.clientX - element.getBoundingClientRect().left;
    offsetY = e.clientY - element.getBoundingClientRect().top;
  });
  document.addEventListener("mousemove", (e) => {
    if (dragging) {
      const parentRect = bannerArea.getBoundingClientRect();
      const newX = e.clientX - parentRect.left - offsetX;
      const newY = e.clientY - parentRect.top - offsetY;
      element.style.left = newX + "px";
      element.style.top = newY + "px";
    }
  });
  document.addEventListener("mouseup", () => (dragging = false));
};
makeTextDraggable(leftTextDisplay);
makeTextDraggable(rightTextDisplay);

// Font customization
fontSelect.addEventListener("change", () => {
  leftTextDisplay.style.fontFamily = rightTextDisplay.style.fontFamily =
    fontSelect.value;
});
fontSize.addEventListener("input", () => {
  leftTextDisplay.style.fontSize = rightTextDisplay.style.fontSize =
    fontSize.value + "px";
});
fontColor.addEventListener("input", () => {
  leftTextDisplay.style.color = rightTextDisplay.style.color = fontColor.value;
});

// Background
bgColor.addEventListener("input", () => {
  bannerArea.style.backgroundColor = bgColor.value;
});

// Center everything
centerBtn.addEventListener("click", () => {
  uploadedImage.style.left = "50%";
  uploadedImage.style.top = "50%";
  uploadedImage.style.transform = `translate(-50%, -50%) scale(${imageScale.value})`;
  leftTextDisplay.style.left = "40px";
  leftTextDisplay.style.top = "50%";
  leftTextDisplay.style.transform = "translateY(-50%)";
  rightTextDisplay.style.right = "40px";
  rightTextDisplay.style.top = "50%";
  rightTextDisplay.style.transform = "translateY(-50%)";
});

// Download banner
downloadBtn.addEventListener("click", () => {
  html2canvas(bannerArea).then((canvas) => {
    const link = document.createElement("a");
    link.download = "youtube_banner.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});

// Load html2canvas
const script = document.createElement("script");
script.src =
  "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
document.body.appendChild(script);
