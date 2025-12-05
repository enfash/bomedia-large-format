/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./index.tsx",
        "./App.tsx",
        "./constants.tsx",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                primary: {
                    50: '#f0f3fc',
                    100: '#e0e7f8',
                    200: '#c8d3f4',
                    300: '#a3b6ed',
                    400: '#7891e3',
                    500: '#5b74da',
                    600: '#4659cd',
                    700: '#3c49b4',
                    800: '#2b3493',
                    900: '#2a3476',
                },
                neutral: {
                    850: '#1f2937',
                }
            },
            keyframes: {
                'bounce-in': {
                    '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
                    '60%': { opacity: '1', transform: 'translateY(-5px) scale(1.02)' },
                    '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
                }
            },
            animation: {
                'bounce-in': 'bounce-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            }
        }
    },
    plugins: [],
}
