/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        vazirmatn: ["Vazirmatn-Regular"],
        "vazirmatn-black": ["Vazirmatn-Black"],
        "vazirmatn-bold": ["Vazirmatn-Bold"],
        "vazirmatn-extrabold": ["Vazirmatn-ExtraBold"],
        "vazirmatn-extralight": ["Vazirmatn-ExtraLight"],
        "vazirmatn-light": ["Vazirmatn-Light"],
        "vazirmatn-medium": ["Vazirmatn-Medium"],
        "vazirmatn-semiBold": ["Vazirmatn-SemiBold"],
        "vazirmatn-thin": ["Vazirmatn-Thin"],
      },
    },
  },
  plugins: [],
}