// Tailwind CSS CDN Configuration for Vintage Car Restoration Shop
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a1a2e',
          light: '#2d2d4a',
          dark: '#0f0f1a',
        },
        secondary: {
          DEFAULT: '#f5f0e8',
          light: '#faf8f4',
          dark: '#e8e0d0',
        },
        accent: {
          DEFAULT: '#c8a951',
          light: '#d4bc6e',
          dark: '#b89a3d',
        },
        surface: {
          dark: '#16162b',
          card: '#1e1e38',
        },
        txtdark: '#2d2d3f',
        txtlight: '#9a9ab0',
        danger: '#e74c3c',
        success: '#27ae60',
        warning: '#f39c12',
        info: '#3498db',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%)',
        'gradient-accent': 'linear-gradient(135deg, #c8a951 0%, #e8d48b 100%)',
        'gradient-hero': 'linear-gradient(135deg, #1a1a2e 0%, #c8a951 100%)',
        'gradient-gold': 'linear-gradient(135deg, #c8a951 0%, #b89a3d 50%, #d4bc6e 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'glass-lg': '0 12px 48px rgba(0, 0, 0, 0.15)',
        'gold': '0 4px 20px rgba(200, 169, 81, 0.3)',
        'gold-lg': '0 8px 40px rgba(200, 169, 81, 0.4)',
        'card': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(200, 169, 81, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(200, 169, 81, 0.6)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
};
