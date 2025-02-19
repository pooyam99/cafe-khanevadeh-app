/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        vazirmatn: ["Vazirmatn-FD-Regular"],
        "vazirmatn-black": ["Vazirmatn-FD-Black"],
        "vazirmatn-bold": ["Vazirmatn-FD-Bold"],
        "vazirmatn-extrabold": ["Vazirmatn-FD-ExtraBold"],
        "vazirmatn-extralight": ["Vazirmatn-FD-ExtraLight"],
        "vazirmatn-light": ["Vazirmatn-FD-Light"],
        "vazirmatn-medium": ["Vazirmatn-FD-Medium"],
        "vazirmatn-semiBold": ["Vazirmatn-FD-SemiBold"],
        "vazirmatn-thin": ["Vazirmatn-FD-Thin"],
      },
    },
  },
  plugins: [],
}