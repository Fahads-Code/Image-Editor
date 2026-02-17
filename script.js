let filters = {
   Brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%"
   },
   Contrast: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%"
   },
   Exposure: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%"
   },
   Saturation: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%"
   },
   HueRotation: {
      value: 0,
      min: 0,
      max: 360,
      unit: "deg"
   },
   Blur: {
      value: 0,
      min: 0,
      max: 30,
      unit: "px"
   },
   GrayScale: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%"
   },
   Sepia: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%"
   },
   Opacity: {
      value: 100,
      min: 0,
      max: 100,
      unit: "%"
   },
   Invert: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%"
   },
}

const imageCanvas = document.querySelector("#image-canvas");
const imageCanvasctx = imageCanvas.getContext("2d"); //  yeh ek tarhan ka drawing pen hai, canvas ka
const imageInput = document.querySelector("#image-input");
const filterElements = document.querySelector(".filters");
const resetBtn = document.querySelector("#reset-btn");
const downloadBtn = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets");
let file = null;
let image = null;

function createFilterElement(name, unit = "%", value, min, max) {
   const div = document.createElement("div");
   div.classList.add("filter");

   const input = document.createElement("input");
   input.type = "range";
   input.min = min;
   input.max = max;
   input.value = value;
   input.id = name;

   input.addEventListener("input", (event) => {
      filters[name].value = input.value;
      applyFilters();
   })

   const p = document.createElement("p");
   p.textContent = name;

   div.appendChild(p);
   div.appendChild(input);

   return div;
}

function createFilters() {
   Object.keys(filters).forEach(key => { // yahan pr object.keys filters object ki sari keys ko array main convert kar dega or un sab pr loop chalega, jis main ek ek kar ke sari keys aayengi
      const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max);
      filterElements.appendChild(filterElement);
   });
}
createFilters();

let file1;

imageInput.addEventListener("change", (event) => {
   file = event.target.files[0]; // yahan pr image select ho rahi hai jo bhi ham open kar rahe hain
   file1 = file.name;
   const imagePlaceHolder = document.querySelector(".placeholder");
   imagePlaceHolder.style.display = "none";
   imageCanvas.style.display = "initial";
   const img = new Image(); // yahan pr image create ho rahi hai
   img.src = URL.createObjectURL(file); // yeh hamari image ko ek src means ke url/link main convert kar deta hai
   img.onload = () => { // yeh ek tarhan ka event hai jo tab chalta hai jab image properly load ho jayeee, taake koi error na aaye
      image = img;
      imageCanvas.width = img.width;
      imageCanvas.height = img.height;
      imageCanvasctx.drawImage(img, 0, 0); // Draw image canvas pr image draw karta hai, or yahan pr img jo likha hai, is ka matlab hai ke kon si image draw karni hai, or jo 0 hai, pehla 0
   }                                       // Us ka matlab ke left se 0 rakhna hai, or jo dusra 0 hai us ka matlab hai ke top se 0 rakhna hai.
})

function applyFilters() {
   imageCanvasctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height) // yeh pehle wali image ko hata deta hai, remove kar deta hai
   imageCanvasctx.filter = `
      brightness(${filters.Brightness.value}${filters.Brightness.unit})
      contrast(${filters.Contrast.value}${filters.Contrast.unit})
      saturate(${filters.Saturation.value}${filters.Saturation.unit})
      hue-rotate(${filters.HueRotation.value}${filters.HueRotation.unit})
      blur(${filters.Blur.value}${filters.Blur.unit})
      grayscale(${filters.GrayScale.value}${filters.GrayScale.unit})
      opacity(${filters.Opacity.value}${filters.Opacity.unit})
      sepia(${filters.Sepia.value}${filters.Sepia.unit})
      invert(${filters.Invert.value}${filters.Invert.unit})
      `

   imageCanvasctx.drawImage(image, 0, 0);
}

resetBtn.addEventListener("click", () => {
   filters = {
      Brightness: {
         value: 100,
         min: 0,
         max: 200,
         unit: "%"
      },
      Contrast: {
         value: 100,
         min: 0,
         max: 200,
         unit: "%"
      },
      Exposure: {
         value: 100,
         min: 0,
         max: 200,
         unit: "%"
      },
      Saturation: {
         value: 100,
         min: 0,
         max: 200,
         unit: "%"
      },
      HueRotation: {
         value: 0,
         min: 0,
         max: 360,
         unit: "deg"
      },
      Blur: {
         value: 0,
         min: 0,
         max: 30,
         unit: "px"
      },
      GrayScale: {
         value: 0,
         min: 0,
         max: 100,
         unit: "%"
      },
      Sepia: {
         value: 0,
         min: 0,
         max: 100,
         unit: "%"
      },
      Opacity: {
         value: 100,
         min: 0,
         max: 100,
         unit: "%"
      },
      Invert: {
         value: 0,
         min: 0,
         max: 100,
         unit: "%"
      },
   }
   applyFilters();
   filterElements.innerHTML = "";
   createFilters();
})

downloadBtn.addEventListener("click",()=>{
   const link = document.createElement("a");
   link.download = (`${file1}`); // yeh browser ko kehta hai ke image ko open nahi karo, seedha download karo,  or yeh image ka name hai file1 jo ke dynamically aayega
   link.href = imageCanvas.toDataURL(); // yeh canvas ki image ko ek url bana deta hai or href main save kar deta hai, basically yeh canvas ka screen shot le leta hai
   link.click(); // yeh kehta hai ke image download hone ke liye automatiaclly click ho jayeey
})

const presets = {
  SoftGlow: {
  Brightness: 115,
  Contrast: 90,
  Exposure: 110,
  Saturation: 105,
  HueRotation: 20,
  Blur: 2,
  GrayScale: 0,
  Sepia: 15,
  Opacity: 100,
  Invert: 0
},

  Drama: {
    Brightness: 110,
    Contrast: 150,
    Exposure: 110,
    Saturation: 130,
    HueRotation: 0,
    Blur: 0,
    GrayScale: 0,
    Sepia: 20,
    Opacity: 100,
    Invert: 0
  },

  Vintage: {
    Brightness: 105,
    Contrast: 90,
    Exposure: 100,
    Saturation: 70,
    HueRotation: 10,
    Blur: 1,
    GrayScale: 20,
    Sepia: 60,
    Opacity: 100,
    Invert: 0
  },

  OldSchool: {
    Brightness: 95,
    Contrast: 110,
    Exposure: 90,
    Saturation: 60,
    HueRotation: 0,
    Blur: 0,
    GrayScale: 40,
    Sepia: 50,
    Opacity: 100,
    Invert: 0
  },

  BlackWhite: {
    Brightness: 100,
    Contrast: 120,
    Exposure: 100,
    Saturation: 0,
    HueRotation: 0,
    Blur: 0,
    GrayScale: 100,
    Sepia: 0,
    Opacity: 100,
    Invert: 0
  },

  Cool: {
    Brightness: 100,
    Contrast: 110,
    Exposure: 100,
    Saturation: 120,
    HueRotation: 180,
    Blur: 0,
    GrayScale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0
  },

  Warm: {
    Brightness: 110,
    Contrast: 105,
    Exposure: 105,
    Saturation: 120,
    HueRotation: 330,
    Blur: 0,
    GrayScale: 0,
    Sepia: 30,
    Opacity: 100,
    Invert: 0
  },

  BrightPop: {
    Brightness: 120,
    Contrast: 130,
    Exposure: 120,
    Saturation: 150,
    HueRotation: 0,
    Blur: 0,
    GrayScale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0
  },

  Sunset: {
  Brightness: 110,
  Contrast: 115,
  Exposure: 105,
  Saturation: 140,
  HueRotation: 330,
  Blur: 0,
  GrayScale: 0,
  Sepia: 35,
  Opacity: 100,
  Invert: 0
},

Night: {
  Brightness: 80,
  Contrast: 140,
  Exposure: 85,
  Saturation: 90,
  HueRotation: 220,
  Blur: 0,
  GrayScale: 10,
  Sepia: 0,
  Opacity: 100,
  Invert: 0
},

Cinematic: {
  Brightness: 95,
  Contrast: 150,
  Exposure: 95,
  Saturation: 120,
  HueRotation: 200,
  Blur: 0,
  GrayScale: 0,
  Sepia: 10,
  Opacity: 100,
  Invert: 0
},

IceBlue: {
  Brightness: 105,
  Contrast: 120,
  Exposure: 100,
  Saturation: 110,
  HueRotation: 180,
  Blur: 0,
  GrayScale: 0,
  Sepia: 0,
  Opacity: 100,
  Invert: 0
},

};

Object.keys(presets).forEach((presetName)=>{
   const presetButton = document.createElement("button");
   presetButton.classList.add("btn");
   presetButton.textContent = presetName;
   presetsContainer.appendChild(presetButton);

   presetButton.addEventListener("click",()=>{
      const preset = presets[presetName];

      Object.keys(filters).forEach(filterName => {
         filters[filterName].value = preset[filterName]
      });

      applyFilters();
      filterElements.innerHTML = "";
      createFilters();
   })
})







